import { clusterChurnReasons, generateActionPlan } from '../../../lib/llm';

export async function POST(request: Request) {
  const { feedback } = await request.json();
  const reasons = await clusterChurnReasons(feedback);
  const plan = await generateActionPlan(reasons);
  return new Response(JSON.stringify({ reasons, plan }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
