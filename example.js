/**
 * OPERATOR'S MANUAL - VIABILITY GRID (EXAMPLE LOGIC)
 * 
 * This script demonstrates the mechanical scoring system used
 * to evaluate side hustles or income opportunities.
 * 
 * Scores are calculated from 0 to 5 based on specific inputs.
 */

const calculateViabilityScore = (ttd, pay, friction, stability, risk) => {
    // Inputs must be integers between 0 and 5
    // 0 = Catastrophic, 5 = Exceptional

    let status = "UNKNOWN";
    let details = [];

    // Calculate Average Score
    const average = (ttd + pay + friction + stability + risk) / 4;

    // Rule 1: Any score <= 2?
    const failScores = [ttd, pay, friction, stability, risk].filter(s => s <= 2);

    if (failScores.length >= 2) {
        status = "REJECT";
        details.push("Automatic Fail: Two or more scores are <= 2.");
    } 
    // Rule 2: Any score <= 2?
    else if (failScores.length === 1) {
        status = "PROBATION";
        details.push("Probation: One score is <= 2. Proceed with caution.");
    } 
    // Rule 3: Priority (Average >= 4)
    else if (average >= 4) {
        status = "PRIORITY";
        details.push(`Priority: High Score (${average.toFixed(1)}).`);
    } 
    // Rule 4: Acceptable (All >= 3)
    else if (failScores.length === 0) {
        status = "ACCEPTABLE";
        details.push(`Acceptable: Viable opportunity (Score: ${average.toFixed(1)}).`);
    }

    return {
        status: status,
        average: parseFloat(average.toFixed(2)),
        details: details
    };
};

// --- EXAMPLE USAGE ---

// Example 1: "General Content Creator" (Usually fails)
const hustleA = {
    ttd: 1,    // Paid "eventually" (Audience building takes time)
    pay: 3,    // $30-50/hr potential, but volatile
    friction: 1, // Instant signup
    stability: 2, // Trend-dependent
    risk: 1      // High risk of algorithm change
};

console.log("Analysis for Hustle A:", calculateViabilityScore(hustleA.ttd, hustleA.pay, hustleA.friction, hustleA.stability, hustleA.risk));


// Example 2: "Expert RLHF Evaluator" (Priority Candidate)
const hustleB = {
    ttd: 4,    // Paid within 30 days
    pay: 5,    // $75+/hr
    friction: 5, // Exams + Identity + Screening
    stability: 4, // Repeatable tasks
    risk: 4      // Human judgment required
};

console.log("Analysis for Hustle B:", calculateViabilityScore(hustleB.ttd, hustleB.pay, hustleB.friction, hustleB.stability, hustleB.risk));
