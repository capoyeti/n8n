# Workflow Architecture: Clover Era Sentiment Analysis System

## System Overview
4 interconnected workflows with daily scheduled execution, comprehensive error handling, and real-time monitoring.

## Workflow 1: Daily Scraper (20-25 nodes)

### Triggers
- **Primary**: Schedule Trigger (daily at 9 AM EST)
- **Secondary**: Manual Trigger (for testing and emergency runs)

### Data Flow
1. **Initialize** → Load target companies and configuration
2. **Company Loop** → Iterate through company list with rate limiting
3. **Multi-Source Scraping**:
   - Glassdoor: `/company-name-reviews` pages
   - Indeed: `/cmp/company-name/reviews` pages  
   - Reddit: Search API for company mentions
4. **Parse & Clean** → Extract review text, ratings, metadata
5. **Validate** → Filter out invalid/duplicate content
6. **Enrich** → Add scraped_at timestamp, source, review_length
7. **Store** → Write to Google Sheets `raw_reviews` tab
8. **Rate Limit** → 3-5 second delays between requests
9. **Monitor** → Track success rates, execution time

### Error Handling
- **HTTP failures**: Exponential backoff (2s, 4s, 8s, 16s)
- **Rate limiting**: Dynamic delay adjustment (up to 30s)
- **Parsing errors**: Log issue, continue with next review
- **Sheet write failures**: Retry 3x, then alert
- **Complete failure**: Slack notification + email alert

## Workflow 2: Sentiment Analyzer (15-20 nodes)

### Triggers
- **Primary**: Google Sheets Trigger (new rows in `raw_reviews`)
- **Secondary**: Schedule Trigger (hourly cleanup for missed items)

### Data Flow
1. **New Data Detection** → Identify unanalyzed reviews
2. **Batch Processing** → Group reviews for efficient API usage
3. **CLOVER Analysis** → Custom OpenAI prompt for 6-dimension scoring
4. **Sentiment Scoring** → Overall sentiment + confidence level
5. **Quality Assessment** → Flag low-confidence analyses
6. **Risk Detection** → Identify burnout/turnover indicators
7. **Store Results** → Write to `analyzed_reviews` tab
8. **Aggregate** → Update company-level metrics

### CLOVER Framework Implementation
Using `nodes-langchain.lmChatOpenAi` with structured prompt:
```
Analyze this employee review using the CLOVER framework:
- Communication (1-10): How well does the company communicate?
- Learning (1-10): Growth and development opportunities?
- Opportunities (1-10): Career advancement available?
- Vulnerability (1-10): Risk of burnout/leaving?
- Enablement (1-10): Tools/resources to succeed?
- Recognition (1-10): Are contributions recognized?

Return JSON with scores and brief explanations.
```

### Error Handling
- **OpenAI API failures**: Fallback to basic sentiment analysis
- **Token limits**: Truncate long reviews, maintain context
- **Rate limiting**: Built-in queue management
- **Invalid responses**: Retry with simplified prompt

## Workflow 3: Insight Generator (15-20 nodes)

### Triggers
- **Primary**: Schedule Trigger (daily at 2 PM EST, after analysis)
- **Secondary**: Manual Trigger (for ad-hoc analysis)

### Data Flow
1. **Aggregate Data** → Company-level sentiment statistics
2. **Trend Analysis** → Week-over-week sentiment changes
3. **Opportunity Scoring** → Calculate CloverEra opportunity score
4. **Risk Assessment** → Flag high-turnover/burnout companies
5. **Prioritization** → Rank companies by intervention potential
6. **Insight Generation** → Extract key issues and opportunities
7. **Store Insights** → Write to `company_insights` tab
8. **Flag High-Value** → Update `high_opportunity_companies`

### Opportunity Scoring Algorithm
```javascript
CloverEra_Score = (
  (10 - Communication) * 0.25 +
  (10 - Learning) * 0.20 +
  (10 - Opportunities) * 0.20 +
  (Vulnerability) * 0.15 +
  (10 - Enablement) * 0.15 +
  (10 - Recognition) * 0.05
) * (review_volume_factor) * (confidence_factor)
```

### Error Handling
- **Data gaps**: Use previous day's data with warning
- **Calculation errors**: Log issue, use default values
- **Sheet write failures**: Retry with exponential backoff

## Workflow 4: Outreach Strategist (10-15 nodes)

### Triggers
- **Primary**: Schedule Trigger (daily at 4 PM EST)
- **Secondary**: High-opportunity alert trigger

### Data Flow
1. **Identify Targets** → Companies with high opportunity scores
2. **Generate Messaging** → Personalized outreach strategies
3. **Content Angles** → Specific pain points to address
4. **Approach Recommendations** → LinkedIn, email, or content marketing
5. **Confidence Scoring** → Rate strategy quality
6. **Store Strategies** → Write to `outreach_strategies` tab
7. **Alert Team** → Notify of new high-value opportunities

### Messaging Strategy
- **Indirect approach**: Focus on general value proposition
- **Thought leadership**: Share insights without referencing surveillance
- **Timing**: Consider company news cycles and industry trends
- **Personalization**: Reference specific challenges (without being obvious)

## Connected Systems

### Google Sheets
- **Document ID**: `1I9c6XXbkM7WpuTZ73IJ6zfaFb9z3by9B9RPmipcOl2Y`
- **Authentication**: OAuth 2.0 service account
- **Permissions**: Editor access for all tabs
- **Tabs**: raw_reviews, analyzed_reviews, company_insights, high_opportunity_companies, outreach_strategies

### OpenAI API
- **Model**: GPT-4 for CLOVER analysis
- **Fallback**: GPT-3.5-turbo for basic sentiment
- **Rate limits**: 3 requests per second
- **Monthly budget**: $200 (~10,000 reviews)

### Notification Systems
- **Slack**: Daily summaries, error alerts
- **Email**: Critical failures, weekly reports
- **Google Sheets**: Real-time data updates

## Monitoring & Alerting

### Daily Health Checks
- **Execution completion**: All workflows finish successfully
- **Data quality**: 90% of reviews have sufficient text
- **API usage**: Stay within budget limits
- **Error rates**: Less than 5% failure rate

### Alert Conditions
- **Critical**: Complete workflow failure (immediate notification)
- **Warning**: High error rate >10% (daily summary)
- **Info**: New high-opportunity companies (business team notification)

### Performance Metrics
- **Execution time**: Target <30 minutes for all workflows
- **Success rate**: Target >95% for all operations
- **Data throughput**: 50+ companies, 200+ reviews daily
- **Cost efficiency**: <$0.02 per review analyzed

## Disaster Recovery

### Backup Plans
- **Sheet backup**: Daily exports to Google Drive
- **Configuration backup**: n8n workflow exports to Git
- **Credential backup**: Secure storage in 1Password

### Recovery Procedures
1. **Workflow failure**: Restart from last successful checkpoint
2. **API quota exceeded**: Switch to fallback models
3. **Data corruption**: Restore from previous day's backup
4. **Complete system failure**: Manual execution procedures in runbook

## Security Considerations

### Data Protection
- **PII handling**: No personal data collection
- **Access control**: Minimum necessary permissions
- **Encryption**: All API communications over HTTPS
- **Retention**: 6-month data cleanup policy

### Compliance
- **Rate limiting**: Respect all robots.txt files
- **Legal boundaries**: Only public information
- **Ethical usage**: Transparent business development context
- **Audit trail**: Complete logging of all data access