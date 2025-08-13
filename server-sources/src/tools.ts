/**
 * MCP tools for AppMetrica API integration
 */

import axios from 'axios';
import { AppMetricaClient } from './api-client.js';
import { 
  CRASH_FIELDS, 
  EVENT_FIELDS, 
  DEFAULT_CRASH_FIELDS, 
  DEFAULT_EVENT_FIELDS 
} from './constants.js';

/**
 * AppMetrica MCP Tools implementation
 */
export class AppMetricaTools {
  private client: AppMetricaClient;

  /**
   * Creates a new AppMetrica tools instance
   * 
   * @param client - AppMetrica API client
   */
  constructor(client: AppMetricaClient) {
    this.client = client;
  }

  /**
   * Gets MCP tool definitions
   * 
   * @returns Array of tool definitions for MCP
   */
  getToolDefinitions() {
    return [
      {
        name: "get_crashes",
        description: "Get crashes from AppMetrica by time interval or crash group ID",
        inputSchema: {
          type: "object",
          properties: {
            date_since: {
              type: "string",
              description: "Start date in YYYY-MM-DD format"
            },
            date_until: {
              type: "string",
              description: "End date in YYYY-MM-DD format"
            },
            crash_group_id: {
              type: "string",
              description: "Specific crash group ID to filter by (optional)"
            },
            fields: {
              type: "string",
              description: `Comma-separated list of fields to include. Available: ${CRASH_FIELDS.join(', ')}`,
              default: DEFAULT_CRASH_FIELDS
            },
            limit: {
              type: "string",
              description: "Maximum number of records to return (optional)"
            }
          },
          required: ["date_since", "date_until"]
        }
      },
      {
        name: "get_events",
        description: "Get user session events from AppMetrica by time interval and optionally device ID",
        inputSchema: {
          type: "object",
          properties: {
            date_since: {
              type: "string",
              description: "Start date in YYYY-MM-DD format"
            },
            date_until: {
              type: "string",
              description: "End date in YYYY-MM-DD format"
            },
            appmetrica_device_id: {
              type: "string",
              description: "Specific device ID to filter by (optional)"
            },
            event_name: {
              type: "string",
              description: "Specific event name to filter by (optional)"
            },
            fields: {
              type: "string",
              description: `Comma-separated list of fields to include. Available: ${EVENT_FIELDS.join(', ')}`,
              default: DEFAULT_EVENT_FIELDS
            },
            limit: {
              type: "string",
              description: "Maximum number of records to return (optional)"
            }
          },
          required: ["date_since", "date_until"]
        }
      }
    ];
  }

  /**
   * Handles get_crashes tool calls
   * 
   * @param args - Tool arguments
   * @returns MCP response format
   */
  async handleGetCrashes(args: any) {
    try {
      // Extract parameters with defaults
      const {
        date_since,
        date_until,
        crash_group_id,
        fields = DEFAULT_CRASH_FIELDS,
        limit
      } = args;

      // Validate required parameters
      if (!date_since) {
        return {
          content: [{
            type: "text",
            text: "Error: date_since parameter is required"
          }],
          isError: true
        };
      }

      if (!date_until) {
        return {
          content: [{
            type: "text",
            text: "Error: date_until parameter is required"
          }],
          isError: true
        };
      }

      // Call API client
      const response = await this.client.getCrashes({
        date_since,
        date_until,
        crash_group_id,
        fields,
        limit
      });

      return {
        content: [{
          type: "text",
          text: `Retrieved ${response.data.length} crash records:\n\n${JSON.stringify(response.data, null, 2)}`
        }]
      };

    } catch (error) {
      console.error('Error in handleGetCrashes:', error);
      
      if (axios.isAxiosError(error)) {
        return {
          content: [{
            type: "text",
            text: `API Error: ${error.message}${error.response ? ` (Status: ${error.response.status})` : ''}`
          }],
          isError: true
        };
      }

      return {
        content: [{
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }],
        isError: true
      };
    }
  }

  /**
   * Handles get_events tool calls
   * 
   * @param args - Tool arguments
   * @returns MCP response format
   */
  async handleGetEvents(args: any) {
    try {
      // Extract parameters with defaults
      const {
        date_since,
        date_until,
        appmetrica_device_id,
        event_name,
        fields = DEFAULT_EVENT_FIELDS,
        limit
      } = args;

      // Validate required parameters
      if (!date_since) {
        return {
          content: [{
            type: "text",
            text: "Error: date_since parameter is required"
          }],
          isError: true
        };
      }

      if (!date_until) {
        return {
          content: [{
            type: "text",
            text: "Error: date_until parameter is required"
          }],
          isError: true
        };
      }

      // Call API client
      const response = await this.client.getEvents({
        date_since,
        date_until,
        appmetrica_device_id,
        event_name,
        fields,
        limit
      });

      return {
        content: [{
          type: "text",
          text: `Retrieved ${response.data.length} event records:\n\n${JSON.stringify(response.data, null, 2)}`
        }]
      };

    } catch (error) {
      console.error('Error in handleGetEvents:', error);
      
      if (axios.isAxiosError(error)) {
        return {
          content: [{
            type: "text",
            text: `API Error: ${error.message}${error.response ? ` (Status: ${error.response.status})` : ''}`
          }],
          isError: true
        };
      }

      return {
        content: [{
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }],
        isError: true
      };
    }
  }

  /**
   * Handles tool calls by routing to appropriate handler
   * 
   * @param toolName - Name of the tool to call
   * @param args - Tool arguments
   * @returns MCP response format
   */
  async handleToolCall(toolName: string, args: any) {
    switch (toolName) {
      case 'get_crashes':
        return this.handleGetCrashes(args);
      case 'get_events':
        return this.handleGetEvents(args);
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }
}