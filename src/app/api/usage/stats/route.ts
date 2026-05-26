import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type UsageLog = any; // Will be properly typed after prisma generate

export async function GET() {
  try {
    const usageLogs = await prisma.usageLog.findMany();

    const totalCost = usageLogs.reduce(
      (sum: number, log: UsageLog) => sum + log.costUsd,
      0
    );

    const totalTokens = usageLogs.reduce(
      (sum: number, log: UsageLog) => sum + log.totalTokens,
      0
    );

    const totalRequests = usageLogs.length;

    const totalCredits = usageLogs.reduce(
      (sum: number, log: UsageLog) => sum + log.creditsUsed,
      0
    );

    const usageByProvider = usageLogs.reduce((acc: Record<string, number>, log: UsageLog) => {
      acc[log.provider] =
        (acc[log.provider] || 0) + log.costUsd;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      totalCost,
      totalTokens,
      totalRequests,
      totalCredits,
      usageByProvider,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch usage stats" },
      { status: 500 }
    );
  }
}
