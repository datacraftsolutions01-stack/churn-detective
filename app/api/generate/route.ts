import { NextRequest, NextResponse } from "next/server";
import { clusterChurnReasons, generateActionPlan } from "@/lib/llm";

export async function POST(req: NextRequest) {
  const { feedbackText } = await req.json();

  if (!feedbackText || typeof feedbackText !== "string") {
    return NextResponse.json({ error: "Invalid feedbackText." }, { status: 400 });
  }

  try {
    const churnReasons = await clusterChurnReasons(feedbackText);
    const actionPlan = await generateActionPlan(churnReasons);

    return NextResponse.json({
      churnReasons,
      actionPlan,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
