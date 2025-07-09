# The n8n Context Engineering Manifesto

> "Stop coding on vibes. Start engineering with context."

This manifesto represents a battle-tested approach to building production-ready n8n workflows that actually work, scale, and can be maintained by humans. It's born from real failures (like that time I built a 100+ node monstrosity that no one could debug) and real successes in the n8n trenches.

## Core Philosophy: Discover, Don't Invent

The n8n ecosystem has 500+ nodes and thousands of community workflows. Your first instinct should be **discovery**, not creation.

```
Bad: "I'll build a custom webhook handler"
Good: "Let me search for webhook nodes first"
Best: "Let me check templates for webhook patterns"
```

## The Discovery-First Method

### 1. MANDATORY: Use n8n-mcp Tools First
```javascript
// MANDATORY - Use these n8n-mcp tools before ANY coding:
mcp__n8n_mcp__search_nodes({ query: 'glassdoor' })      // Someone probably built it
mcp__n8n_mcp__search_templates({ query: 'scraping' })    // Someone definitely solved it
mcp__n8n_mcp__list_node_templates(['n8n-nodes-base.httpRequest'])  // See proven patterns
mcp__n8n_mcp__get_node_documentation({ nodeType: 'nodes-base.splitOut' })  // Read docs first

// VIOLATION: Writing custom code without using n8n-mcp tools first
// PUNISHMENT: Auto-validation framework will FAIL and block deployment
```

### 2. Research Before Architecture
Before drawing a single connection:
- What triggers this workflow? Check `list_nodes({ category: 'trigger' })`
- What data sources? Search existing integrations
- What transformations? Look for utility nodes
- What's the output? Find destination nodes

### 3. Document Your Discovery
Create `discovery.md`:
```markdown
## Searched For
- Glassdoor scraping: No dedicated node, but HTTP Request works
- Sentiment analysis: Found @n8n/n8n-nodes-langchain.sentimentAnalysis
- Google Sheets: Native integration exists

## Chosen Approach
- HTTP Request for Glassdoor (with these headers...)
- LangChain sentiment node (because...)
- Native Sheets node (version 2.1 for batch operations)
```

## Context Files: Your Project's Brain

Every n8n project should have:

```
project/
├── context/
│   ├── requirements.md      # What problem are we solving?
│   ├── architecture.md      # How do workflows connect?
│   ├── discovery.md         # What did we find/choose?
│   ├── test-scenarios/      # Real data examples
│   │   ├── happy-path.json
│   │   ├── edge-cases.json
│   │   └── error-cases.json
│   ├── runbook.md          # When things break at 3am
│   └── validation.md       # Pre-deployment checklist
├── workflows/
│   ├── main-flow.json
│   ├── error-handler.json
│   └── test-harness.json   # Yes, test workflows!
└── README.md               # Start here, always
```

### requirements.md Template
```markdown
# Project: [Name]

## Problem Statement
[1-2 sentences on what hurts]

## Success Criteria
- [ ] Metric 1: Response time < 2s
- [ ] Metric 2: 99% success rate
- [ ] Metric 3: Handles 1000 records/day

## Constraints
- Budget: $X/month for APIs
- Runtime: Must complete in 5 minutes
- Dependencies: Can only use existing credentials

## Users
- Who triggers it: Marketing team via Slack
- Who uses output: Sales team in Google Sheets
- Who maintains it: DevOps on rotation
```

### architecture.md Template
```markdown
# Workflow Architecture

## Triggers
- Webhook from Slack (when user types /analyze)
- Daily schedule at 9 AM EST
- Manual execution for testing

## Data Flow
1. Slack command → Parse intent
2. Fetch data from Glassdoor API
3. Clean and normalize (remove nulls, fix formats)
4. Sentiment analysis via OpenAI
5. Write to Google Sheets
6. Notify Slack channel

## Error Handling
- API failures: Exponential backoff + alert
- Data issues: Log to error sheet + continue
- Complete failure: Slack notification + email

## Connected Systems
- Slack (webhook token)
- Glassdoor (API key)
- OpenAI (API key) 
- Google Sheets (OAuth)
```

## Incremental Development: One Node at a Time

### The Golden Rule
**Test each node before connecting the next one.**

### The Process
```
1. Add node
2. Configure with real credentials
3. Test with production-like data
4. Verify output format
5. Add error handling
6. Document sample input/output
7. ONLY THEN connect to next node
```

### Example: Building a Scraper
```
Step 1: HTTP Request node
- Test: Can I reach the API?
- Document: Required headers
- Error handling: What if 429 rate limit?

Step 2: Parse JSON node
- Test: Does the structure match?
- Document: Expected format
- Error handling: What if fields missing?

Step 3: Only NOW add transformation...
```

## Smart Workflow Architecture

### Size Guidelines
- **10-30 nodes**: Perfectly fine if cohesive
- **30-50 nodes**: Consider splitting if natural boundaries exist
- **50+ nodes**: Definitely split (future you will thank present you)

### When to Split Workflows
✅ **Good reasons:**
- Different triggers need same logic (webhook vs schedule)
- Reusable components (address validation used by 5 workflows)
- Different error handling needs (critical vs nice-to-have)
- Scale requirements differ (real-time vs batch)
- Different teams own different parts

❌ **Bad reasons:**
- "It looks big"
- "Best practices say so"
- "I read about microservices"

### Connection Patterns
```
Main Workflow
    ├→ Error Handler Workflow (via Error Trigger)
    ├→ Notification Workflow (via Execute Workflow)
    └→ Cleanup Workflow (via Webhook)
```

## The n8n Pre-Flight Checklist

Before ANY workflow goes to production:

### Node-Level Checks
- [ ] Each node tested with real data
- [ ] Error outputs configured
- [ ] Credentials use production values
- [ ] Rate limiting considered
- [ ] Timeout values set appropriately

### Workflow-Level Checks
- [ ] Start-to-end test with production data
- [ ] Error workflow connected
- [ ] All expressions validated: `validate_workflow_expressions()`
- [ ] Connections validated: `validate_workflow_connections()`
- [ ] Resource usage acceptable (memory, API calls)

### Documentation Checks
- [ ] README explains business purpose
- [ ] Sample payloads provided
- [ ] Runbook covers common failures
- [ ] Architecture diagram current
- [ ] Credential requirements listed

### Security Checks
- [ ] Webhook URLs use authentication
- [ ] No hardcoded secrets
- [ ] API keys properly scoped
- [ ] Data retention policies followed
- [ ] PII handling documented

## Self-Testing and Validation Patterns

### Test Workflows Are Real Workflows
Create `test-[workflow-name].json`:
```
Manual Trigger
    ↓
Load Test Data (from context/test-scenarios/)
    ↓
Execute Main Workflow
    ↓
Validate Output (IF node checking structure)
    ↓
Report Results (to Slack/Email)
```

### Health Check Pattern
```
Schedule Trigger (every 5 min)
    ↓
Simple API Call
    ↓
Check Response Time < 2s
    ↓
IF Slow: Alert DevOps
```

### Validation Within Workflows
```javascript
// After every external API call:
IF ($.statusCode !== 200)
    → Log Error Details
    → Execute Error Handler
    → Stop Execution

// After every transformation:
IF (!$.requiredField)
    → Set Default Value
    → Log Warning
    → Continue with Default
```

## Debugging Manifesto

When things break (they will):

### 1. Check the Obvious First
- Are credentials expired?
- Did the API change?
- Is the service down?

### 2. Use Built-in Tools
- Execution history
- Node output pins
- Expression previews

### 3. Add Debug Nodes
```
Problem Node
    ↓
Set Node (label: "DEBUG: Before Transform")
    ↓
Your Transform
    ↓
Set Node (label: "DEBUG: After Transform")
```

### 4. Create Debug Workflows
`debug-[workflow-name].json`:
- Manual trigger
- Same nodes as production
- Extra logging nodes
- Test data injection points

## The Anti-Patterns Hall of Shame

### 1. The Rampage Build
Building 100+ nodes without testing, then wondering why nothing works.

### 2. The Black Box
No documentation, no samples, no runbook. "It worked on my machine!"

### 3. The Optimist
No error handling. "The API never fails!" (Narrator: It failed immediately)

### 4. The Hoarder
Everything in one workflow. "But it's all related!" (Future you disagrees)

### 5. The Inventor
Custom code for everything. "I didn't know there was a node for that!"

## Evolution and Maintenance

### Version Your Workflows
- Export regularly to Git
- Tag releases
- Document breaking changes

### Monitor and Improve
- Track execution times
- Monitor error rates
- Gather user feedback
- Refactor based on pain points

### Knowledge Sharing
- Document patterns that work
- Share templates with team
- Contribute back to community

## Final Wisdom

1. **Your future self is your customer** - Document like they're a stranger
2. **Test data is sacred** - Real examples prevent real failures  
3. **Errors are teachers** - Handle them, learn from them
4. **The community has answers** - Search before you build
5. **Context is king** - More context = fewer surprises

---

*Remember: Every workflow you build is a promise to your future self and your team. Make it a promise worth keeping.*

## Quick Reference Card

```bash
# Discovery Commands
search_nodes({ query: 'your-need' })
search_templates({ query: 'use-case' })
list_nodes({ category: 'category' })
get_node_documentation('nodes-base.nodeName')

# Validation Commands  
validate_node_minimal(nodeType, config)
validate_workflow(workflow)
validate_workflow_connections(workflow)
validate_workflow_expressions(workflow)

# Essential Files
context/requirements.md      # Why
context/architecture.md      # How
context/test-scenarios/      # Proof
context/runbook.md          # Help
README.md                   # Start
```

---

Built with battle scars and lessons learned. May your workflows be stable and your errors be few.