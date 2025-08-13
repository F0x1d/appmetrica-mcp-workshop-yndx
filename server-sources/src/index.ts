#!/usr/bin/env node

/**
 * AppMetrica MCP Server
 * 
 * A Model Context Protocol server that provides access to Yandex AppMetrica API
 * for retrieving crash data and user session events. This server enables AI assistants
 * to query AppMetrica analytics data through standardized MCP tools.
 * 
 * Features:
 * - get_crashes: Retrieve crash data by time interval or crash group ID
 * - get_events: Retrieve user session events by time interval and device ID
 * - Intelligent retry logic for AppMetrica's async processing
 * - Comprehensive error handling and validation
 * 
 * Environment Variables Required:
 * - APPMETRICA_OAUTH_TOKEN: OAuth token for AppMetrica API authentication
 * - APPMETRICA_APPLICATION_ID: Application ID for AppMetrica API requests
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { AppMetricaClient } from './api-client.js';
import { AppMetricaTools } from './tools.js';
import { loadConfig } from './config.js';

// Load configuration from environment variables
const config = loadConfig();

// Initialize AppMetrica API client
const appmetricaClient = new AppMetricaClient(config.oauthToken, config.applicationId);

// Initialize MCP tools
const appmetricaTools = new AppMetricaTools(appmetricaClient);

// Create MCP server instance
const server = new Server(
  {
    name: "appmetrica-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register list tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: appmetricaTools.getToolDefinitions(),
  };
});

// Register call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    const result = await appmetricaTools.handleToolCall(name, args || {});
    return result;
  } catch (error) {
    console.error(`Error handling tool call ${name}:`, error);
    
    return {
      content: [{
        type: "text",
        text: `Error: ${error instanceof Error ? error.message : String(error)}`
      }],
      isError: true
    };
  }
});

/**
 * Main function to start the MCP server
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("AppMetrica MCP server running on stdio");
}

// Start the server
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});