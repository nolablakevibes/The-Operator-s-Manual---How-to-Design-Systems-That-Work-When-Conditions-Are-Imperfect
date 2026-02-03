# OPERATOR'S MANUAL - VIABILITY GRID (EXAMPLE LOGIC)
#
# This script demonstrates the mechanical scoring system used
# to evaluate side hustles or income opportunities.
#
# Scores are calculated from 0 to 5 based on specific inputs.

def calculate_viability_score(ttd, pay, friction, stability, risk):
    """
    Inputs: 4 integers (0-5)
    Returns: Dictionary with status, average, and details
    """
    
    # Validate inputs (optional safety check)
    inputs = [ttd, pay, friction, stability, risk]
    fail_scores = [s for s in inputs if s <= 2]
    
    status = "UNKNOWN"
    details = []
    
    # Calculate Average Score
    average = sum(inputs) / 4
    
    # Rule 1: REJECT (Two scores <= 2)
    if len(fail_scores) >= 2:
        status = "REJECT"
        details.append("Automatic Fail: Two or more scores are <= 2.")
        
    # Rule 2: PROBATION (One score <= 2)
    elif len(fail_scores) == 1:
        status = "PROBATION"
        details.append("Probation: One score is <= 2. Proceed with caution.")
        
    # Rule 3: PRIORITY (Average >= 4)
    elif average >= 4:
        status = "PRIORITY"
        details.append(f"Priority: High Score ({round(average, 1)}).")
        
    # Rule 4: ACCEPTABLE (All >= 3)
    elif len(fail_scores) == 0:
        status = "ACCEPTABLE"
        details.append(f"Acceptable: Viable opportunity (Score: {round(average, 1)}).")

    return {
        "status": status,
        "average": round(average, 2),
        "details": details
    }

# --- EXAMPLE USAGE ---

# Example 1: "General Data Labeler" (Low Pay Trap)
hustle_a = {
    "ttd": 2,      # Paid after 90+ days
    "pay": 2,      # $20-30/hr
    "friction": 2, # Instant signup
    "stability": 3, # Semi-repeatable
    "risk": 2       # Likely replaced by AI
}

print("Analysis for Hustle A:", calculate_viability_score(**hustle_a))

# Example 2: "Expert Legal Data Analyst" (Priority Candidate)
hustle_b = {
    "ttd": 3,      # 1-2 weeks for credentialing
    "pay": 5,      # $50-65/hr
    "friction": 5, # Credential + Exam required
    "stability": 4, # Recurrent analysis batches
    "risk": 3       # AI assists but human review mandatory
}

print("Analysis for Hustle B:", calculate_viability_score(**hustle_b))
