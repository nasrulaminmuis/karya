import { NextRequest } from "next/server";

// Mock prisma
const mockPortfolioVisitCount = jest.fn();
const mockProjectImpressionCount = jest.fn();
const mockProjectInteractionCount = jest.fn();
const mockProjectFindMany = jest.fn();

jest.mock("@/lib/prisma", () => ({
  prisma: {
    portfolioVisit: { count: mockPortfolioVisitCount },
    projectImpression: { count: mockProjectImpressionCount },
    projectInteraction: { count: mockProjectInteractionCount },
    project: { findMany: mockProjectFindMany },
  },
}));

// Mock auth
const mockGetAuthUser = jest.fn();
jest.mock("@/lib/auth", () => ({
  getAuthUser: mockGetAuthUser,
  unauthorizedResponse: () =>
    Response.json({ error: "Unauthorized" }, { status: 401 }),
}));

import { GET } from "@/app/api/analytics/route";

const mockUser = { id: "user-1", email: "test@test.com" };

describe("GET /api/analytics", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 401 if not authenticated", async () => {
    mockGetAuthUser.mockResolvedValue(null);
    const req = new NextRequest("http://localhost:3000/api/analytics");
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("should return monthly stats, project stats, and totals", async () => {
    mockGetAuthUser.mockResolvedValue(mockUser);

    // Mock counts for 7 months (called 7 times each)
    mockPortfolioVisitCount.mockResolvedValue(10);
    mockProjectImpressionCount.mockResolvedValue(20);
    mockProjectInteractionCount.mockResolvedValue(5);

    mockProjectFindMany.mockResolvedValue([
      {
        id: "p1",
        title: "Project 1",
        _count: { impressions: 100, interactions: 30 },
      },
    ]);

    const req = new NextRequest("http://localhost:3000/api/analytics");
    const res = await GET(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.monthly).toHaveLength(7);
    expect(body.monthly[0]).toHaveProperty("date");
    expect(body.monthly[0]).toHaveProperty("views");
    expect(body.monthly[0]).toHaveProperty("impressions");
    expect(body.monthly[0]).toHaveProperty("interactions");

    expect(body.projects).toHaveLength(1);
    expect(body.projects[0].title).toBe("Project 1");

    expect(body.totals).toHaveProperty("views");
    expect(body.totals).toHaveProperty("impressions");
    expect(body.totals).toHaveProperty("interactions");
    // 7 months * 10 views each = 70
    expect(body.totals.views).toBe(70);
  });
});
