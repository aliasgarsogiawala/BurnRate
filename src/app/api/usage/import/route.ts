import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      sourceName,
      provider,
      model,
      inputTokens = 0,
      outputTokens = 0,
      totalTokens = 0,
      creditsUsed = 0,
      costUsd,
      notes,
    } = body;

    // Validate required fields
    if (!sourceName || !provider || !costUsd) {
      return NextResponse.json(
        {
          error: 'Missing required fields: sourceName, provider, costUsd',
        },
        { status: 400 }
      );
    }

    // Create usage log in database
    const usageLog = await prisma.usageLog.create({
      data: {
        sourceName,
        provider,
        model: model || null,
        inputTokens,
        outputTokens,
        totalTokens: totalTokens || inputTokens + outputTokens,
        creditsUsed,
        costUsd: parseFloat(costUsd),
        notes: notes || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Usage imported successfully',
        data: usageLog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error importing usage:', error);
    return NextResponse.json(
      { error: 'Failed to import usage' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const usageLogs = await prisma.usageLog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Limit to last 50 records
    });

    return NextResponse.json(
      {
        success: true,
        data: usageLogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching usage logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usage logs' },
      { status: 500 }
    );
  }
}
