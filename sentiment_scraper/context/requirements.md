# Project: Clover Era Sentiment Analysis System

## Problem Statement
Clover Era needs to identify companies experiencing internal employee engagement challenges by monitoring sentiment on review sites like Glassdoor, Indeed, and Reddit. This intelligence enables strategic, indirect outreach to companies that might benefit from Clover Era's employee engagement solutions.

## Success Criteria
- [ ] **Data Collection**: Successfully scrape 50+ companies daily from multiple review sites
- [ ] **Analysis Speed**: Complete daily sentiment analysis within 30 minutes
- [ ] **Accuracy**: 95% accuracy in sentiment classification using CLOVER framework
- [ ] **Opportunity Detection**: Identify 3-5 high-value companies weekly with actionable insights
- [ ] **System Reliability**: 99% uptime for daily scheduled executions
- [ ] **Data Quality**: 90% of scraped reviews contain sufficient text for analysis

## CLOVER Framework Scoring
Each review will be scored on:
- **Communication**: How well does the company communicate with employees?
- **Learning**: Are growth and development opportunities available?
- **Opportunities**: Career advancement and internal mobility
- **Vulnerability**: Are employees at risk of burnout or leaving?
- **Enablement**: Do employees have tools/resources to succeed?
- **Recognition**: Are employees recognized for their contributions?

## Constraints
- **Budget**: $200/month for OpenAI API calls (estimated 10,000 reviews/month)
- **Runtime**: Daily execution must complete within 45 minutes
- **Legal**: Must respect robots.txt and rate limits (3-5 seconds between requests)
- **Dependencies**: Use existing Google Sheets document (ID: 1I9c6XXbkM7WpuTZ73IJ6zfaFb9z3by9B9RPmipcOl2Y)
- **APIs**: OpenAI GPT-4 for advanced analysis, Google Sheets API for data storage

## Users
- **Who triggers it**: Automated daily schedule (9 AM EST)
- **Who uses output**: Clover Era business development team via Google Sheets
- **Who monitors it**: Chad (primary) with automated notifications
- **Who maintains it**: Chad with comprehensive documentation and runbooks

## Target Companies (Initial List)
Microsoft, Google, Apple, Amazon, Meta, Tesla, Netflix, Uber, Airbnb, Salesforce, Zoom, Slack, HubSpot, Stripe, Shopify, Atlassian, Canva, Figma, Notion, Airtable, Monday.com, Asana, Trello, GitHub, GitLab, Vercel, Netlify, Twilio, SendGrid, Mailchimp

## Data Sources
1. **Glassdoor** (Primary) - Company reviews, ratings, pros/cons
2. **Indeed** (Secondary) - Employee reviews and company ratings  
3. **Reddit** (Tertiary) - Subreddits like r/jobs, r/antiwork, company-specific subs

## Business Context
Clover Era provides employee engagement solutions. The goal is NOT to directly reference negative sentiment in outreach, but to:
- Identify companies with engagement challenges
- Approach with general value proposition
- Demonstrate expertise in areas where they struggle
- Build relationships based on thought leadership, not surveillance

Example approach: "We help companies enhance their recognition programs" (not "We saw your employees complain about lack of recognition")

## Compliance & Ethics
- Respect all robots.txt files and rate limits
- Only use publicly available information
- No personal data collection (focus on aggregate sentiment)
- Transparent about data use in business development context
- Regular cleanup of old data (6-month retention policy)