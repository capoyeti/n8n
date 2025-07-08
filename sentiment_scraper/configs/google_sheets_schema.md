# Google Sheets Schema Configuration

## Required Sheets and Column Headers

### 1. raw_reviews
```
company | source | date_scraped | review_title | overall_rating | review_text | pros | cons | job_title | location | review_date | employment_status | url | review_length | has_pros_cons
```

### 2. analyzed_reviews
```
company | source | date_scraped | review_title | review_text | sentiment_score | communication_score | learning_score | opportunities_score | vulnerability_score | enablement_score | recognition_score | clover_overall | key_issues | opportunity_areas | risk_level | high_turnover_risk | burnout_indicators | communication_issues | growth_concerns | cloverera_opportunity_score | analyzed_at | analysis_version
```

### 3. company_insights
```
company_name | total_reviews | avg_sentiment_score | avg_clover_overall | avg_communication | avg_learning | avg_opportunities | avg_vulnerability | avg_enablement | avg_recognition | turnover_risk_pct | burnout_risk_pct | communication_issues_pct | growth_concerns_pct | cloverera_opportunity_score | priority_level | top_issues | top_opportunities | last_analyzed | data_quality
```

### 4. high_opportunity_companies
```
company | opportunity_score | sentiment_score | clover_overall | key_issues | risk_indicators | flagged_at
```

### 5. outreach_strategies
```
company_name | priority_level | opportunity_score | total_reviews_analyzed | avg_sentiment | weakest_clover_dimension | primary_risk_factor | personalized_pitch | pain_points_addressed | suggested_approach | content_marketing_angles | social_proof_needed | data_confidence | ready_for_outreach | key_stats | strategy_generated_at | next_review_date
```

## Setup Instructions

1. Existing Google Sheets document titled "CloverEra Sentiment Analysis" with ID "1I9c6XXbkM7WpuTZ73IJ6zfaFb9z3by9B9RPmipcOl2Y"
2. Use 5 tabs with the names above
3. Use the column headers for each sheet
