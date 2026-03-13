import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorizedResponse } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return unauthorizedResponse();

  // Get date range for last 7 months
  const now = new Date();
  const months: { date: string; views: number; impressions: number; interactions: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

    const [visits, impressions, interactions] = await Promise.all([
      prisma.portfolioVisit.count({
        where: {
          userId: user.id,
          visitedAt: { gte: d, lt: nextMonth },
        },
      }),
      prisma.projectImpression.count({
        where: {
          project: { userId: user.id },
          impressedAt: { gte: d, lt: nextMonth },
        },
      }),
      prisma.projectInteraction.count({
        where: {
          project: { userId: user.id },
          interactedAt: { gte: d, lt: nextMonth },
        },
      }),
    ]);

    months.push({
      date: monthStr,
      views: visits,
      impressions,
      interactions,
    });
  }

  // Get per-project stats
  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    include: {
      _count: {
        select: {
          impressions: true,
          interactions: true,
        },
      },
    },
  });

  const projectStats = projects.map((p) => ({
    id: p.id,
    title: p.title,
    views: p._count.impressions,
    impressions: p._count.interactions,
  }));

  return Response.json({
    monthly: months,
    projects: projectStats,
    totals: {
      views: months.reduce((s, m) => s + m.views, 0),
      impressions: months.reduce((s, m) => s + m.impressions, 0),
      interactions: months.reduce((s, m) => s + m.interactions, 0),
    },
  });
}
