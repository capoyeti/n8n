# Runbook: Clover Era Sentiment Analysis System

## Quick Reference

### System Status Dashboard
- **Google Sheets**: [CloverEra Sentiment Analysis](https://docs.google.com/spreadsheets/d/1I9c6XXbkM7WpuTZ73IJ6zfaFb9z3by9B9RPmipcOl2Y)
- **n8n Workflows**: Check execution history for all 4 workflows
- **API Status**: OpenAI, Google Sheets API status pages

### Emergency Contacts
- **Primary**: Chad (system owner)
- **Secondary**: Clover Era dev team
- **Escalation**: Business development team (if critical opportunity missed)

## Common Issues & Solutions

### 1. "No new reviews scraped today"

**Symptoms**: 
- `raw_reviews` sheet has no new entries
- Daily execution shows success but 0 results

**Diagnosis Steps**:
1. Check scraper workflow execution logs
2. Test individual HTTP requests to target sites
3. Verify robots.txt compliance
4. Check for website structure changes

**Solutions**:
- **Website blocking**: Rotate user agents, add delays
- **Structure changes**: Update CSS selectors in scraper
- **Rate limiting**: Increase delays between requests
- **Site maintenance**: Skip problematic sites, retry later

### 2. "Sentiment analysis failing"

**Symptoms**:
- Reviews in `raw_reviews` but not in `analyzed_reviews`
- OpenAI API errors in logs
- Analysis workflow timing out

**Diagnosis Steps**:
1. Check OpenAI API key validity
2. Verify API quota usage
3. Test sample request manually
4. Check for malformed review text

**Solutions**:
- **API key expired**: Update credentials in n8n
- **Quota exceeded**: Upgrade plan or optimize usage
- **Malformed JSON**: Improve prompt instructions
- **Long reviews**: Implement text truncation

### 3. "Google Sheets write errors"

**Symptoms**:
- Data processing succeeds but sheets not updated
- "Permission denied" or "Quota exceeded" errors
- Sheets API 429 errors

**Diagnosis Steps**:
1. Check Google Sheets API quotas
2. Verify service account permissions
3. Test manual sheet write operation
4. Check for concurrent write conflicts

**Solutions**:
- **Quota exceeded**: Implement write batching
- **Permission denied**: Verify service account access
- **Rate limiting**: Add delays between sheet operations
- **Concurrent writes**: Serialize operations

### 4. "High opportunity companies not detected"

**Symptoms**:
- Analysis running but no alerts generated
- `high_opportunity_companies` sheet empty
- Opportunity scores seem low

**Diagnosis Steps**:
1. Check CLOVER scoring algorithm
2. Verify opportunity score thresholds
3. Review recent analyzed reviews
4. Test scoring logic with sample data

**Solutions**:
- **Threshold too high**: Lower opportunity score threshold
- **Scoring errors**: Debug CLOVER calculation logic
- **Data quality**: Improve review filtering
- **Algorithm tuning**: Adjust scoring weights

## Scheduled Maintenance

### Daily Tasks (Automated)
- [ ] Execute scraper workflow at 9 AM EST
- [ ] Process sentiment analysis as new data arrives
- [ ] Generate insights at 2 PM EST
- [ ] Create outreach strategies at 4 PM EST
- [ ] Send daily summary report

### Weekly Tasks (Manual)
- [ ] Review error logs and patterns
- [ ] Check API usage and costs
- [ ] Validate data quality in sheets
- [ ] Review and adjust company target list
- [ ] Analyze opportunity detection accuracy

### Monthly Tasks (Manual)
- [ ] Backup Google Sheets data
- [ ] Review and update CLOVER scoring weights
- [ ] Analyze outreach success rates
- [ ] Update website selectors if needed
- [ ] Review and optimize API usage

## Troubleshooting Procedures

### Step 1: Initial Assessment
1. Check last execution time of all workflows
2. Verify recent error logs
3. Test basic connectivity (Google Sheets, OpenAI)
4. Confirm credentials are valid

### Step 2: Component Testing
1. **Scraper**: Test HTTP request to one company
2. **Sentiment**: Test OpenAI API with sample review
3. **Sheets**: Test write operation to test sheet
4. **Scheduling**: Verify trigger configurations

### Step 3: Data Validation
1. Check for recent entries in `raw_reviews`
2. Verify sentiment scores are within expected ranges
3. Confirm company insights are being generated
4. Validate opportunity detection logic

### Step 4: Performance Check
1. Review execution times for all workflows
2. Check memory usage and timeouts
3. Verify API response times
4. Monitor error rates and patterns

## Manual Recovery Procedures

### Restart Failed Workflow
1. Go to n8n executions page
2. Find failed workflow execution
3. Click "Retry" or "Execute" for manual trigger
4. Monitor execution logs for success

### Restore from Backup
1. Access Google Drive backup folder
2. Find most recent clean backup
3. Copy data to main sheet
4. Verify data integrity
5. Resume normal operations

### Emergency Data Collection
If automated scraping fails completely:
1. Use manual scraping scripts in `/scripts/manual/`
2. Export data to CSV format
3. Import directly to Google Sheets
4. Run sentiment analysis on imported data

## Monitoring & Alerts

### Key Metrics to Monitor
- **Daily review count**: Should be 200+ per day
- **Analysis success rate**: Should be >95%
- **Opportunity detection**: 3-5 high-value companies per week
- **API costs**: Should stay under $200/month
- **Execution time**: All workflows <30 minutes

### Alert Thresholds
- **Critical**: Complete workflow failure
- **High**: Error rate >10%
- **Medium**: API costs >$150/month
- **Low**: Performance degradation >50%

### Alert Channels
- **Slack**: `#clover-sentiment-alerts`
- **Email**: chad@cloverera.com
- **SMS**: For critical failures only

## Performance Optimization

### Scaling Strategies
1. **Batch processing**: Group similar operations
2. **Parallel execution**: Use multiple HTTP requests
3. **Caching**: Store frequent API responses
4. **Rate limiting**: Optimize request timing

### Cost Optimization
1. **Token usage**: Optimize OpenAI prompts
2. **API calls**: Batch requests when possible
3. **Data storage**: Regular cleanup of old data
4. **Monitoring**: Track usage patterns

## Security Considerations

### Credential Management
- Store all API keys in n8n credential store
- Regular rotation of service account keys
- Monitor for unauthorized access
- Backup credentials securely

### Data Protection
- No PII collection or storage
- Regular data cleanup (6-month retention)
- Secure API communications only
- Audit trail for all data access

## Upgrade & Maintenance

### Version Updates
1. Test in development environment first
2. Backup current workflows
3. Update node versions incrementally
4. Validate all functionality post-update

### Capacity Planning
- Monitor API usage trends
- Plan for seasonal spikes
- Prepare scaling strategies
- Budget for increased usage

## Contact Information

### Internal Support
- **Chad**: System owner and primary contact
- **Clover Era Dev Team**: Technical escalation
- **Business Team**: Opportunity prioritization

### External Support
- **n8n Support**: For workflow platform issues
- **OpenAI Support**: For API-related problems
- **Google Support**: For Sheets API issues

## Appendix

### Useful Commands
```bash
# Check workflow status
curl -X GET "https://your-n8n-instance.com/api/v1/workflows" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Manual trigger workflow
curl -X POST "https://your-n8n-instance.com/api/v1/workflows/WORKFLOW_ID/execute" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Test OpenAI API
curl -X POST "https://api.openai.com/v1/chat/completions" \
  -H "Authorization: Bearer YOUR_OPENAI_KEY" \
  -d '{"model": "gpt-4", "messages": [{"role": "user", "content": "test"}]}'
```

### Log Locations
- **n8n Logs**: Check execution history in web interface
- **System Logs**: `/var/log/n8n/` (if self-hosted)
- **Error Logs**: Check workflow error outputs
- **Performance Logs**: Check execution timing data

### Configuration Files
- **Workflow Exports**: `/workflows/` directory
- **Credential Templates**: `/configs/` directory
- **Test Data**: `/context/test-scenarios/` directory