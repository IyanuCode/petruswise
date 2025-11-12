import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [pages, users, messages] = await Promise.all([
      prisma.pageContent.count(),
      prisma.admin.count(),
      prisma.contactMessage.count(),
    ]);

    const recentPages = await prisma.pageContent.findMany({
      orderBy: { id: "desc" },
      take: 5,
      select: { id: true, title: true, updatedAt: true },
    });

    // Weekly analytics
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const userCounts = await Promise.all(
      last7Days.map(async (day) => ({
        date: day,
        users: await prisma.admin.count({
          where: {
            createdAt: {
              gte: new Date(`${day}T00:00:00Z`),
              lt: new Date(`${day}T23:59:59Z`),
            },
          },
        }),
        messages: await prisma.contactMessage.count({
          where: {
            createdAt: {
              gte: new Date(`${day}T00:00:00Z`),
              lt: new Date(`${day}T23:59:59Z`),
            },
          },
        }),
      }))
    );

    return NextResponse.json({
      stats: { pages, users, messages },
      recentPages,
      userCounts,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}
