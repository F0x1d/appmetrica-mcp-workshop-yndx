You have a TypeScript project with constants and types defined. Now create the configuration management and API client for the AppMetrica MCP Server. This includes environment variable handling and HTTP client with intelligent retry logic.

REQUIREMENTS:
Create config.ts and api-client.ts files with secure configuration and robust API communication.

SPECIFIC TASKS:

1. CREATE src/config.ts with:
   - AppMetricaConfig interface with:
     * oauthToken: string
     * applicationId: string
   - loadConfig() function that:
     * Reads APPMETRICA_OAUTH_TOKEN from process.env
     * Reads APPMETRICA_APPLICATION_ID from process.env
     * Throws descriptive Error if APPMETRICA_OAUTH_TOKEN is missing
     * Throws descriptive Error if APPMETRICA_APPLICATION_ID is missing
     * Returns AppMetricaConfig object with both values
   - Include proper JSDoc comments
   - Export both interface and function

2. CREATE src/api-client.ts with:
   - Import axios, AxiosInstance from 'axios'
   - Import constants: APPMETRICA_API_BASE, DEFAULT_MAX_RETRIES, DEFAULT_RETRY_DELAY
   - Import types: AppMetricaResponse, CrashData, EventData, GetCrashesParams, GetEventsParams
   - AppMetricaClient class with:
     * Private api: AxiosInstance property
     * Private applicationId: string property
     * Constructor(oauthToken: string, applicationId: string) that:
       - Sets this.applicationId
       - Creates axios instance with baseURL: APPMETRICA_API_BASE
       - Sets Authorization header: `OAuth ${oauthToken}`
       - Sets timeout: 30000 (30 seconds)
     * Private async handleAsyncRequest<T>() method with parameters:
       - requestFn: () => Promise<any>
       - maxRetries: number = DEFAULT_MAX_RETRIES
       - retryDelay: number = DEFAULT_RETRY_DELAY
       - Returns Promise<T>
       - Implements retry logic that:
         * Loops up to maxRetries times
         * Calls requestFn() and checks response
         * Detects async processing by checking if response.data is string containing "Wait for result", "Progress is", or "queue"
         * Handles HTTP 202 status code as async processing
         * Waits retryDelay milliseconds between retries
         * Returns response.data on success
         * Throws error after max retries exceeded
     * Public async getCrashes(params: GetCrashesParams) method that:
       - Builds query parameters with application_id, date_since, date_until, fields
       - Adds optional crash_group_id and limit if provided
       - Calls handleAsyncRequest with GET request to '/crashes.json'
       - Returns AppMetricaResponse<CrashData>
     * Public async getEvents(params: GetEventsParams) method that:
       - Builds query parameters with application_id, date_since, date_until, fields
       - Adds optional appmetrica_device_id, event_name, and limit if provided
       - Calls handleAsyncRequest with GET request to '/events.json'
       - Returns AppMetricaResponse<EventData>

CRITICAL IMPLEMENTATION DETAILS:
- Use proper async/await patterns throughout
- Handle both string responses and HTTP status codes in retry logic
- Include comprehensive error handling for axios errors
- Use console.error for retry progress messages
- Proper TypeScript typing for all methods and parameters
- Import statements must use .ts extensions for TypeScript modules

VALIDATION:
- All imports resolve correctly with .ts extensions
- Retry logic handles both async detection methods
- Error handling covers all edge cases
- No hardcoded credentials in source code

The result should be robust configuration management and API client ready for MCP integration.
