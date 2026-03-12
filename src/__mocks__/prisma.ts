import { PrismaClient } from "@prisma/client";

// Deep mock of PrismaClient for testing
const mockPrismaModel = () => ({
  findUnique: jest.fn(),
  findFirst: jest.fn(),
  findMany: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  count: jest.fn(),
  deleteMany: jest.fn(),
  upsert: jest.fn(),
});

export const prismaMock = {
  user: mockPrismaModel(),
  portfolioSettings: mockPrismaModel(),
  socialLink: mockPrismaModel(),
  project: mockPrismaModel(),
  userSkill: mockPrismaModel(),
  certificationAward: mockPrismaModel(),
  portfolioVisit: mockPrismaModel(),
  projectImpression: mockPrismaModel(),
  projectInteraction: mockPrismaModel(),
} as unknown as PrismaClient;

// Mock the prisma module
jest.mock("@/lib/prisma", () => ({
  prisma: prismaMock,
}));

export function resetAllMocks() {
  for (const model of Object.values(prismaMock)) {
    if (typeof model === "object" && model !== null) {
      for (const method of Object.values(model as Record<string, unknown>)) {
        if (typeof method === "function" && "mockReset" in method) {
          (method as jest.Mock).mockReset();
        }
      }
    }
  }
}
