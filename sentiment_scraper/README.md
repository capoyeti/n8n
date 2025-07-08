# Clover Era Sentiment Analysis System

> **Built with the n8n Context Engineering Manifesto**  
> Daily sentiment intelligence for strategic business development

## Overview

The Clover Era Sentiment Analysis System is a comprehensive n8n workflow solution that monitors employee sentiment across review platforms (Glassdoor, Indeed, Reddit) to identify companies experiencing engagement challenges. This intelligence enables strategic, indirect outreach to companies that might benefit from Clover Era's employee engagement solutions.

## Business Purpose

- **Monitor** employee sentiment across 50+ target companies daily
- **Analyze** using the CLOVER framework (Communication, Learning, Opportunities, Vulnerability, Enablement, Recognition)
- **Identify** companies with engagement challenges and intervention opportunities
- **Generate** strategic outreach recommendations for business development
- **Track** sentiment trends and company-level insights over time

## Architecture

### 4 Interconnected Workflows

1. **Daily Scraper** (20-25 nodes) - Multi-site data collection
2. **Sentiment Analyzer** (15-20 nodes) - CLOVER framework analysis
3. **Insight Generator** (15-20 nodes) - Company intelligence and scoring
4. **Outreach Strategist** (10-15 nodes) - Personalized outreach recommendations

### Key Technologies
- **n8n**: Workflow automation platform
- **OpenAI GPT-4**: Advanced sentiment analysis and CLOVER scoring
- **Google Sheets**: Data storage and business intelligence
- **Multiple APIs**: Glassdoor, Indeed, Reddit data sources

## Quick Start

### Prerequisites
- n8n instance (cloud or self-hosted)
- Google Sheets API credentials (service account)
- OpenAI API key with GPT-4 access
- Google Sheets document: [CloverEra Sentiment Analysis](https://docs.google.com/spreadsheets/d/1I9c6XXbkM7WpuTZ73IJ6zfaFb9z3by9B9RPmipcOl2Y)

### Installation
1. Clone workflows from `/workflows/` directory
2. Import each workflow into n8n
3. Configure credentials (OpenAI, Google Sheets)
4. Update company target list in configuration
5. Test with sample data using `/context/test-scenarios/`
6. Enable daily schedule trigger

### Configuration
- **Schedule**: Daily execution at 9 AM EST
- **Target Companies**: 30+ companies (configurable)
- **Data Sources**: Glassdoor, Indeed, Reddit
- **Analysis Model**: OpenAI GPT-4 with CLOVER framework
- **Storage**: Google Sheets with 5 tabs (see schema in `/configs/`)

## File Structure

```
sentiment_scraper/
├── README.md                    # This file - start here
├── context/                     # Context engineering files
│   ├── requirements.md          # Business requirements and success criteria
│   ├── architecture.md          # Technical architecture and workflow design
│   ├── discovery.md             # Node research and selection rationale
│   ├── runbook.md               # Troubleshooting and maintenance guide
│   ├── validation.md            # Pre-deployment validation checklist
│   └── test-scenarios/          # Test data and scenarios
│       ├── happy-path.json      # Normal execution scenarios
│       ├── edge-cases.json      # Edge cases and unusual data
│       └── error-cases.json     # Error conditions and recovery
├── workflows/                   # n8n workflow definitions
│   ├── scraper-workflow.json    # Daily scraper workflow
│   ├── sentiment-analyzer.json  # CLOVER analysis workflow
│   ├── insight-generator.json   # Company intelligence workflow
│   └── outreach-strategist.json # Outreach recommendations workflow
└── configs/                     # Configuration and schema files
    └── google_sheets_schema.md  # Google Sheets column definitions
```

## CLOVER Framework

Each employee review is analyzed using the CLOVER framework:

- **Communication** (1-10): How well does the company communicate with employees?
- **Learning** (1-10): Are growth and development opportunities available?
- **Opportunities** (1-10): Career advancement and internal mobility
- **Vulnerability** (1-10): Are employees at risk of burnout or leaving?
- **Enablement** (1-10): Do employees have tools/resources to succeed?
- **Recognition** (1-10): Are employees recognized for their contributions?

## Daily Execution Flow

1. **9:00 AM EST**: Scraper workflow triggers
   - Iterates through target companies
   - Scrapes reviews from multiple sources
   - Parses and validates data
   - Stores in Google Sheets `raw_reviews` tab

2. **Throughout day**: Sentiment analysis triggers on new data
   - Analyzes reviews using CLOVER framework
   - Generates sentiment scores and insights
   - Stores in `analyzed_reviews` tab

3. **2:00 PM EST**: Insight generation workflow
   - Aggregates company-level metrics
   - Calculates opportunity scores
   - Identifies high-value companies
   - Updates `company_insights` and `high_opportunity_companies` tabs

4. **4:00 PM EST**: Outreach strategy workflow
   - Generates personalized outreach strategies
   - Creates messaging recommendations
   - Scores strategy effectiveness
   - Updates `outreach_strategies` tab

## Monitoring & Alerts

### Success Metrics
- **Daily Reviews**: 200+ reviews collected
- **Analysis Success**: >95% of reviews analyzed
- **Execution Time**: <30 minutes per workflow
- **Opportunity Detection**: 3-5 high-value companies weekly
- **Cost Efficiency**: <$200/month in API costs

### Alert Channels
- **Slack**: `#clover-sentiment-alerts`
- **Email**: Critical failures and daily summaries
- **Google Sheets**: Real-time data updates

## Business Intelligence

### Google Sheets Tabs
1. **raw_reviews**: Scraped review data
2. **analyzed_reviews**: CLOVER framework analysis results
3. **company_insights**: Company-level aggregated metrics
4. **high_opportunity_companies**: Flagged opportunities for outreach
5. **outreach_strategies**: Personalized outreach recommendations

### Key Insights
- Companies with declining sentiment trends
- High-vulnerability employees at risk of leaving
- Communication and recognition gaps
- Learning and development opportunities
- Strategic timing for outreach

## Troubleshooting

### Common Issues
- **No new reviews**: Check website structure changes, rate limits
- **Sentiment analysis failing**: Verify OpenAI API key, check quotas
- **Google Sheets errors**: Validate permissions, check API limits
- **High opportunity companies not detected**: Review scoring thresholds

### Quick Fixes
1. Check `/context/runbook.md` for detailed troubleshooting
2. Test individual workflows manually
3. Verify API credentials and quotas
4. Review recent execution logs

### Emergency Procedures
- **Complete failure**: Manual execution procedures in runbook
- **Data corruption**: Backup and restore procedures
- **API issues**: Fallback and alternative approaches

## Development

### Following the Manifesto
This system was built using the [n8n Context Engineering Manifesto](../n8n_context_engineering_manifesto.md):

1. **Discovery First**: Researched existing nodes before building
2. **Context Engineering**: Comprehensive documentation and planning
3. **Incremental Development**: Built and tested one node at a time
4. **Smart Architecture**: Workflows sized 10-30 nodes for maintainability
5. **Validation**: Comprehensive testing and error handling

### Adding New Companies
1. Update target company list in scraper workflow
2. Test scraping with new company names
3. Verify data quality and parsing accuracy
4. Monitor for any site-specific issues

### Extending Data Sources
1. Research new review platforms
2. Implement parsing logic for new data format
3. Test with sample data
4. Update data validation rules

## Security & Compliance

### Data Protection
- No PII collection or storage
- Public information only
- 6-month data retention policy
- Secure API communications (HTTPS)

### Ethical Considerations
- Respect robots.txt and rate limits
- Transparent business development use
- Indirect outreach approach (not surveillance-based)
- Regular compliance reviews

## Support

### Internal Support
- **Chad**: System owner and primary contact
- **Clover Era Dev Team**: Technical escalation
- **Business Team**: Opportunity prioritization

### Documentation
- **Architecture**: `context/architecture.md`
- **Troubleshooting**: `context/runbook.md`
- **Testing**: `context/test-scenarios/`
- **Validation**: `context/validation.md`

## Performance

### Optimization Features
- Batch processing for efficiency
- Rate limiting to prevent blocks
- Caching for repeated API calls
- Exponential backoff for errors
- Parallel processing where possible

### Monitoring
- Real-time execution tracking
- Error rate monitoring
- Cost tracking and optimization
- Performance benchmarking

## Future Enhancements

### Planned Features
- Additional data sources (LinkedIn, Twitter)
- Advanced trend analysis
- Automated A/B testing for outreach
- Integration with CRM systems
- Enhanced company intelligence

### Scalability
- Multi-region deployment
- Increased company coverage
- Real-time sentiment monitoring
- Advanced ML models for prediction

---

**Built with battle scars and lessons learned. May your workflows be stable and your errors be few.**

For detailed implementation guidance, start with `context/requirements.md` and follow the Context Engineering Manifesto approach.