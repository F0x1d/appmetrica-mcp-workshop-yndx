You have a TypeScript project with configuration, types, and API client implemented. Now create the MCP tools and main server implementation. This includes tool definitions, handlers, and the complete MCP server setup.

REQUIREMENTS:
Create tools.ts and index.ts files to complete the MCP server functionality.

SPECIFIC TASKS:

1. CREATE src/tools.ts with:
   - Import axios from 'axios'
   - Import AppMetricaClient from './api-client.ts'
   - Import constants: CRASH_FIELDS, EVENT_FIELDS, DEFAULT_CRASH_FIELDS, DEFAULT_EVENT_FIELDS
   - AppMetricaTools class with:
     * Private client: AppMetricaClient property
     * Constructor(client: AppMetricaClient) that sets this.client
     * getToolDefinitions() method returning array with two tool definitions:
       
       Tool 1 - get_crashes:
       - name: "get_crashes"
       - description: "Get crashes from AppMetrica by time interval or crash group ID"
       - inputSchema with type "object" and properties:
         * date_since: type "string", description "Start date in YYYY-MM-DD format"
         * date_until: type "string", description "End date in YYYY-MM-DD format"
         * crash_group_id: type "string", description "Specific crash group ID to filter by (optional)"
         * fields: type "string", description with all CRASH_FIELDS listed, default DEFAULT_CRASH_FIELDS
         * limit: type "string", description "Maximum number of records to return (optional)"
       - required: ["date_since", "date_until"]
       
       Tool 2 - get_events:
       - name: "get_events"
       - description: "Get user session events from AppMetrica by time interval and optionally device ID"
       - inputSchema with type "object" and properties:
         * date_since: type "string", description "Start date in YYYY-MM-DD format"
         * date_until: type "string", description "End date in YYYY-MM-DD format"
         * appmetrica_device_id: type "string", description "Specific device ID to filter by (optional)"
         * event_name: type "string", description "Specific event name to filter by (optional)"
         * fields: type "string", description with all EVENT_FIELDS listed, default DEFAULT_EVENT_FIELDS
         * limit: type "string", description "Maximum number of records to return (optional)"
       - required: ["date_since", "date_until"]
     
     * async handleGetCrashes(args: any) method that:
       - Extracts parameters with defaults
       - Validates required date_since and date_until
       - Calls this.client.getCrashes()
       - Returns MCP response format with content array containing text object
       - Handles axios errors with proper error response format
     
     * async handleGetEvents(args: any) method that:
       - Extracts parameters with defaults
       - Validates required date_since and date_until
       - Calls this.client.getEvents()
       - Returns MCP response format with content array containing text object
       - Handles axios errors with proper error response format
     
     * async handleToolCall(toolName: string, args: any) method that:
       - Switches on toolName
       - Calls appropriate handler method
       - Throws error for unknown tools

2. CREATE src/index.ts with:
   - Shebang line: #!/usr/bin/env node
   - JSDoc comment block describing the AppMetrica MCP Server
   - Import Server from "@modelcontextprotocol/sdk/server/index.js"
   - Import StdioServerTransport from "@modelcontextprotocol/sdk/server/stdio.js"
   - Import CallToolRequestSchema, ListToolsRequestSchema from "@modelcontextprotocol/sdk/types.js"
   - Import AppMetricaClient from './api-client.ts'
   - Import AppMetricaTools from './tools.ts'
   - Import loadConfig from './config.ts'
   - Load configuration: const config = loadConfig()
   - Initialize client: const appmetricaClient = new AppMetricaClient(config.oauthToken, config.applicationId)
   - Initialize tools: const appmetricaTools = new AppMetricaTools(appmetricaClient)
   - Create Server instance with:
     * name: "appmetrica-mcp"
     * version: "0.1.0"
     * capabilities: { tools: {} }
   - Register ListToolsRequestSchema handler that returns tools from appmetricaTools.getToolDefinitions()
   - Register CallToolRequestSchema handler that calls appmetricaTools.handleToolCall()
   - main() async function that:
     * Creates StdioServerTransport
     * Connects server to transport
     * Logs "AppMetrica MCP server running on stdio" to stderr
   - Call main().catch() with error logging and process.exit(1)

CRITICAL IMPLEMENTATION DETAILS:
- All imports must use .ts extensions for TypeScript modules
- MCP response format: { content: [{ type: "text", text: string }] }
- Error responses include isError: true property
- Use console.error for server logging (not console.log)
- Proper async/await patterns throughout
- Comprehensive error handling with axios.isAxiosError() checks
- Tool responses must include data count and JSON.stringify with formatting

VALIDATION:
- All imports resolve correctly with .ts extensions
- MCP tool schemas are properly formatted
- Error handling covers all scenarios
- Server starts and responds to MCP requests

The result should be a complete, functional MCP server ready for testing.
