#!/usr/bin/env node

/**
 * Test the Auto-Validation Framework
 * 
 * This script demonstrates how the auto-validation framework would work
 * when creating n8n workflows following the manifesto enforcement protocol.
 */

const N8nAutoValidator = require('./auto_validation_framework.js');

async function demonstrateAutoValidation() {
  console.log("🚀 Demonstrating n8n Auto-Validation Framework\n");
  
  const validator = new N8nAutoValidator();
  
  // Example workflow (simplified version of our sentiment scraper)
  const sampleWorkflow = {
    name: "Sample Sentiment Scraper",
    nodes: [
      {
        id: "schedule-trigger",
        name: "Daily Schedule",
        type: "n8n-nodes-base.scheduleTrigger",
        parameters: {
          rule: {
            interval: [{ field: "hours", hoursInterval: 24 }]
          }
        },
        position: [240, 300]
      },
      {
        id: "http-request",
        name: "Fetch Reviews",
        type: "n8n-nodes-base.httpRequest", 
        parameters: {
          method: "GET",
          url: "https://api.example.com/reviews",
          options: {
            timeout: 30000,
            retry: { enabled: true, maxTries: 3 }
          }
        },
        position: [460, 300]
      },
      {
        id: "openai-analysis",
        name: "Sentiment Analysis",
        type: "n8n-nodes-base.openAi",
        parameters: {
          resource: "chat",
          operation: "complete",
          prompt: "Analyze sentiment: {{ $json.review_text }}"
        },
        position: [680, 300]
      }
    ],
    connections: {
      "schedule-trigger": {
        main: [[{ node: "http-request", type: "main", index: 0 }]]
      },
      "http-request": {
        main: [[{ node: "openai-analysis", type: "main", index: 0 }]]
      }
    },
    settings: { executionOrder: "v1" }
  };

  // Mock context files
  const contextFiles = {
    'requirements.md': 'Business requirements documented',
    'architecture.md': 'System architecture documented'
  };

  try {
    console.log("=".repeat(60));
    console.log("PHASE 1: DISCOVERY AUTO-VALIDATION");
    console.log("=".repeat(60));
    
    const discoveryReport = await validator.validateDiscoveryPhase(
      "sentiment analysis web scraping", 
      "employee review analysis"
    );
    console.log(discoveryReport);
    
    console.log("\n" + "=".repeat(60));
    console.log("PHASE 2: TECHNICAL AUTO-VALIDATION");
    console.log("=".repeat(60));
    
    const technicalReport = await validator.validateTechnicalPhase(sampleWorkflow);
    console.log(technicalReport);
    
    console.log("\n" + "=".repeat(60));
    console.log("PHASE 3: LOGIC AUTO-TESTING");
    console.log("=".repeat(60));
    
    // Add custom test scenario
    const customTests = [
      {
        name: "API Rate Limit Test",
        description: "Test behavior when API rate limit is hit",
        input: { scenario: "rate_limit" },
        expectedBehavior: "exponential backoff retry",
        timeout: 20000
      }
    ];
    
    const logicReport = await validator.validateLogicPhase(sampleWorkflow, customTests);
    console.log(logicReport);
    
    console.log("\n" + "=".repeat(60));
    console.log("PHASE 4: MANIFESTO COMPLIANCE AUTO-AUDIT");
    console.log("=".repeat(60));
    
    const manifestoReport = await validator.validateManifestoCompliance(sampleWorkflow, contextFiles);
    console.log(manifestoReport);
    
    console.log("\n" + "=".repeat(60));
    console.log("COMPREHENSIVE VALIDATION REPORT");
    console.log("=".repeat(60));
    
    const finalReport = validator.generateComprehensiveReport();
    console.log(`\nOverall Status: ${finalReport.overallStatus}\n`);
    
    console.log("Phase Results:");
    Object.entries(finalReport.phases).forEach(([phase, result]) => {
      const status = result?.passed ? '✅ PASSED' : '❌ FAILED';
      console.log(`  ${phase}: ${status}`);
    });
    
    console.log("\nStrategic Checkpoints:");
    finalReport.strategicCheckpoints.forEach((checkpoint, index) => {
      console.log(`  ${index + 1}. ${checkpoint}`);
    });
    
    console.log("\nNext Steps:");
    finalReport.nextSteps.forEach((step, index) => {
      console.log(`  ${index + 1}. ${step}`);
    });
    
    console.log("\n" + "=".repeat(60));
    console.log("DEMONSTRATION COMPLETE");
    console.log("=".repeat(60));
    
    if (finalReport.overallStatus === 'PASSED') {
      console.log("\n🎉 All validations passed! This workflow follows the manifesto and is ready for deployment.");
      console.log("\n👤 User's role: Review strategic checkpoints and approve deployment");
    } else {
      console.log("\n⚠️  Some validations failed. Address issues before proceeding.");
      console.log("\n👤 User's role: Review failed validations and decide next steps");
    }
    
  } catch (error) {
    console.error("\n❌ Auto-Validation Failed:");
    console.error(error.message);
    console.log("\n🔧 This demonstrates the enforcement mechanism catching problems early!");
  }
}

// Command line interface
if (require.main === module) {
  demonstrateAutoValidation().catch(console.error);
}

module.exports = { demonstrateAutoValidation };