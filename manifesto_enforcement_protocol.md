# Manifesto Enforcement Protocol: Self-Validating AI Agent

> **Core Principle:** The AI agent validates itself automatically. User provides strategic guidance only.

## The Problem We're Solving

Previously, I created broken n8n workflows by:
- Skipping discovery phase under pressure
- Not validating JSON syntax during creation
- Building large workflows without incremental testing
- Ignoring my own n8n Context Engineering Manifesto

**Root cause:** No enforcement mechanism to ensure methodology compliance.

## The Solution: Automated Self-Validation

### User's Role (Strategic Only)
✅ **What you DO:**
- Confirm business requirements make sense
- Approve high-level architectural approach  
- Say "looks reasonable, proceed" at major milestones
- Escalate when auto-validation fails repeatedly

❌ **What you DON'T do:**
- Check JSON syntax (I validate automatically)
- Verify node connections (I test automatically)
- Debug technical issues (I self-diagnose)
- Validate manifesto compliance (I self-audit)

### AI Agent's Role (Technical Validation)

**I automatically validate EVERYTHING before proceeding:**

1. **Discovery Phase Auto-Validation**
2. **Technical Syntax Auto-Validation**  
3. **Logical Testing Auto-Validation**
4. **Manifesto Compliance Auto-Validation**

## Auto-Validation Framework

### Phase 1: Discovery Auto-Validation

**What I automatically do:**
```javascript
// MANDATORY: Use actual n8n-mcp tools - NO SIMULATION ALLOWED
const discoveryResults = {
  nodesFound: await mcp__n8n_mcp__search_nodes({ query: userRequirement }),
  templatesFound: await mcp__n8n_mcp__search_templates({ query: useCase }),
  docsReviewed: await mcp__n8n_mcp__get_node_documentation({ nodeType: chosenNodes }),
  mcpToolsUsed: true  // MANDATORY tracking
};

// CRITICAL: Verify actual MCP tools were used
if (!discoveryResults.mcpToolsUsed) {
  throw new Error("CRITICAL FAILURE: n8n-mcp tools were not used. This violates the manifesto.");
}

// Self-validation logic
if (discoveryResults.nodesFound.length === 0) {
  throw new Error("Discovery incomplete - no relevant nodes found using n8n-mcp");
}
if (discoveryResults.templatesFound.length === 0) {
  console.warn("No templates found - building from scratch (higher risk)");
}
```

**What I report to you:**
```
✅ Discovery Phase Auto-Validation Complete
  - Searched for: "glassdoor scraping sentiment analysis"
  - Found 3 relevant nodes: httpRequest, openAi, googleSheets
  - Found 2 working templates: web-scraping-basic, sentiment-batch-processor
  - Reviewed docs for all 3 chosen nodes
  - Risk assessment: Medium (no exact template, but good node coverage)

Strategic Question: Does this discovery approach align with your business goals?
```

### Phase 2: Technical Auto-Validation

**What I automatically do:**
```bash
# JSON syntax validation
python3 -m json.tool workflow.json > /dev/null
echo "✅ JSON syntax valid"

# n8n workflow validation  
validate_workflow(workflow)
echo "✅ Workflow structure valid"

# Connection validation
validate_workflow_connections(workflow) 
echo "✅ Node connections valid"

# Expression validation
validate_workflow_expressions(workflow)
echo "✅ Expressions syntax valid"
```

**What I report to you:**
```
✅ Technical Auto-Validation Complete
  - JSON syntax: ✅ Valid
  - Workflow structure: ✅ Valid (11 nodes, 10 connections)
  - Node connections: ✅ All nodes properly connected
  - Expressions: ✅ All 8 expressions syntactically correct
  - Node configurations: ✅ All required fields populated

Strategic Question: Does this technical approach seem reasonable?
```

### Phase 3: Logic Auto-Testing

**What I automatically do:**
```javascript
// Create test scenarios automatically
const testScenarios = [
  {
    name: "Happy Path",
    input: sampleCompanyData,
    expectedSteps: ["fetch", "parse", "analyze", "save"],
    expectedOutput: { company: "Microsoft", sentiment: 7.2, reviews: 10 }
  },
  {
    name: "API Failure", 
    input: invalidApiKey,
    expectedBehavior: "graceful error handling",
    expectedOutput: { error: "API_FAILED", retryScheduled: true }
  },
  {
    name: "Empty Data",
    input: emptyResponse,
    expectedBehavior: "skip processing",
    expectedOutput: { processed: 0, skipped: 1 }
  }
];

// Run tests automatically
const testResults = await runAllTests(workflow, testScenarios);
```

**What I report to you:**
```
✅ Logic Auto-Testing Complete
  - Happy Path Test: ✅ Passed (processed 10 reviews, sentiment score 7.2)
  - API Failure Test: ✅ Passed (graceful error, retry scheduled)
  - Empty Data Test: ✅ Passed (correctly skipped, no errors)
  - Performance Test: ✅ Passed (processed in 1.2s, within 2s limit)
  - Error Recovery Test: ✅ Passed (resumed after network timeout)

Strategic Question: Do these test results meet your business requirements?
```

### Phase 4: Manifesto Compliance Auto-Audit

**What I automatically check:**
```javascript
// Manifesto compliance validation
const manifestoAudit = {
  discoveryFirst: discoveryResults.nodesFound.length > 0,
  incrementalDevelopment: nodeCount <= 30 || hasSplitJustification,
  documentationPresent: fs.existsSync('context/requirements.md'),
  testScenariosCreated: testScenarios.length >= 3,
  errorHandlingImplemented: workflow.nodes.filter(n => n.onError).length > 0,
  validationExecuted: allValidationsPassed
};
```

**What I report to you:**
```
✅ Manifesto Compliance Auto-Audit Complete
  - Discovery-first methodology: ✅ Followed (searched before building)
  - Incremental development: ✅ Followed (11 nodes, within guidelines)
  - Documentation created: ✅ requirements.md, architecture.md present
  - Test scenarios: ✅ 5 scenarios created and tested
  - Error handling: ✅ All critical nodes have error handling
  - Validation: ✅ All 4 validation phases completed

Strategic Question: Are you satisfied with manifesto compliance?
```

## User Checkpoint System

### Strategic Checkpoints (Your Role)

**After Discovery Phase:**
- *"Does this discovery approach align with your business goals?"*
- Expected response: "Looks reasonable, proceed" or "Try a different approach"

**After Technical Validation:**
- *"Does this technical approach seem reasonable?"*  
- Expected response: "Approved to proceed" or "Concerns about X"

**After Logic Testing:**
- *"Do these test results meet your business requirements?"*
- Expected response: "Tests look good, proceed" or "Need additional test for Y"

**After Manifesto Audit:**
- *"Are you satisfied with manifesto compliance?"*
- Expected response: "Compliant, ready for deployment" or "Address concern Z first"

### Escalation Protocol

**When auto-validation fails:**
1. I report the specific failure and attempted fixes
2. I explain the business impact and risk assessment
3. I propose alternative approaches with trade-offs
4. You decide: proceed with risk, try alternative, or stop

**Example escalation:**
```
❌ Technical Auto-Validation Failed
  - Issue: HTTP Request node failing with 403 Forbidden
  - Attempted fixes: Updated headers, checked API key, tried different endpoints
  - Business impact: Cannot collect review data, core functionality blocked
  - Risk assessment: High - workflow cannot function
  
Proposed alternatives:
1. Use different API (Indeed instead of Glassdoor) - 70% functionality
2. Manual data upload workflow - 100% functionality, manual effort required
3. Delay until API access resolved - 0% functionality short-term

Strategic Decision Needed: Which alternative do you prefer?
```

## Success Metrics

**This enforcement protocol succeeds when:**
- ✅ No broken JSON files are created
- ✅ All workflows are tested before deployment
- ✅ Manifesto compliance is verified automatically
- ✅ User time is focused on strategic decisions, not technical validation
- ✅ Problems are caught early in discovery/design, not late in deployment

**This enforcement protocol fails when:**
- ❌ User is asked to validate technical details
- ❌ Workflows break due to skipped validation steps
- ❌ I proceed without completing auto-validation phases
- ❌ Business requirements are misunderstood due to insufficient strategic checkpoints

## Implementation Checklist

- [ ] Create auto-validation functions for each phase
- [ ] Build test scenario generation capability
- [ ] Implement validation reporting format
- [ ] Create user checkpoint question templates
- [ ] Test enforcement protocol on real workflow
- [ ] Refine based on what actually prevents failures

---

**Remember:** The goal is **technical excellence through automation** + **strategic alignment through collaboration**.