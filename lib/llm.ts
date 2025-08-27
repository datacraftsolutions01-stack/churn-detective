// Core LLM functions for churn reason clustering and action plan generation

/**
 * Simulate clustering churn reasons from feedback.
 * Replace with real LLM API integration in production.
 */
export async function clusterChurnReasons(feedbackText: string): Promise<string[]> {
  // Fake clustering for demo
  const lower = feedbackText.toLowerCase();
  const reasons: string[] = [];
  if (lower.includes('price')) reasons.push('Pricing concerns');
  if (lower.includes('support')) reasons.push('Customer support issues');
  if (lower.includes('features')) reasons.push('Missing features');
  if (lower.includes('competition')) reasons.push('Competitor offering');
  if (reasons.length === 0) reasons.push('Other (see feedback)');
  return reasons;
}

/**
 * Simulate generating a retention action plan from churn reasons.
 * Replace with real LLM API integration in production.
 */
export async function generateActionPlan(churnReasons: string[]): Promise<string> {
  // Fake action plan for demo
  let plan = '<ul>';
  for (const reason of churnReasons) {
    if (reason === 'Pricing concerns') {
      plan += '<li>Review pricing strategy and offer targeted discounts.</li>';
    } else if (reason === 'Customer support issues') {
      plan += '<li>Improve support response time and train agents.</li>';
    } else if (reason === 'Missing features') {
      plan += '<li>Prioritize feature requests in roadmap.</li>';
    } else if (reason === 'Competitor offering') {
      plan += '<li>Highlight unique value propositions and customer success stories.</li>';
    } else {
      plan += '<li>Investigate feedback and reach out to customers for more details.</li>';
    }
  }
  plan += '</ul>';
  return plan;
}