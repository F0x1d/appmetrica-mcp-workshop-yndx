You have a configured TypeScript project foundation. Now create the core data structures and constants for the AppMetrica MCP Server. This includes API field definitions, endpoints, and TypeScript interfaces.

REQUIREMENTS:
Create constants.ts and types.ts files with complete AppMetrica API definitions.

SPECIFIC TASKS:

1. CREATE src/constants.ts with:
   - APPMETRICA_API_BASE constant: 'https://api.appmetrica.yandex.ru/logs/v1/export'
   - CRASH_FIELDS array with exactly these 30 fields:
     'crash', 'crash_datetime', 'crash_group_id', 'crash_id', 'crash_name', 'crash_receive_datetime', 'crash_receive_timestamp', 'crash_timestamp', 'appmetrica_device_id', 'city', 'connection_type', 'country_iso_code', 'device_ipv6', 'device_locale', 'device_manufacturer', 'device_model', 'device_type', 'google_aid', 'ios_ifa', 'ios_ifv', 'mcc', 'mnc', 'operator_name', 'os_name', 'os_version', 'profile_id', 'windows_aid', 'app_package_name', 'app_version_name', 'application_id'
   - EVENT_FIELDS array with exactly these 32 fields:
     'event_datetime', 'event_json', 'event_name', 'event_receive_datetime', 'event_receive_timestamp', 'event_timestamp', 'session_id', 'installation_id', 'appmetrica_device_id', 'city', 'connection_type', 'country_iso_code', 'device_ipv6', 'device_locale', 'device_manufacturer', 'device_model', 'device_type', 'google_aid', 'ios_ifa', 'ios_ifv', 'mcc', 'mnc', 'operator_name', 'original_device_model', 'os_name', 'os_version', 'profile_id', 'windows_aid', 'app_build_number', 'app_package_name', 'app_version_name', 'application_id'
   - DEFAULT_CRASH_FIELDS: 'crash_datetime,crash_name,crash_group_id,crash_id,device_model,os_name,os_version'
   - DEFAULT_EVENT_FIELDS: 'event_datetime,event_name,event_json,appmetrica_device_id,device_model,os_name'
   - DEFAULT_MAX_RETRIES: 100
   - DEFAULT_RETRY_DELAY: 10000 (10 seconds)
   - Use 'as const' for field arrays to ensure type safety

2. CREATE src/types.ts with complete TypeScript interfaces:
   - CrashData interface with all 30 crash fields as string properties
   - EventData interface with all 32 event fields as string properties
   - AppMetricaResponse<T> generic interface with data: T[] property
   - AsyncResponse interface with optional message and progress string properties
   - GetCrashesParams interface with:
     * date_since: string (required)
     * date_until: string (required)
     * crash_group_id?: string (optional)
     * fields?: string (optional)
     * limit?: string (optional)
   - GetEventsParams interface with:
     * date_since: string (required)
     * date_until: string (required)
     * appmetrica_device_id?: string (optional)
     * event_name?: string (optional)
     * fields?: string (optional)
     * limit?: string (optional)

CRITICAL REQUIREMENTS:
- All field names must match exactly with AppMetrica API documentation
- Use proper TypeScript typing with interfaces
- Include proper JSDoc comments for all interfaces
- Ensure type safety with 'as const' for field arrays
- All string fields in data interfaces (AppMetrica returns strings)

VALIDATION:
- TypeScript compilation must succeed
- All interfaces properly exported
- Field arrays contain exact number of fields specified
- No typos in field names

The result should be complete type definitions and constants ready for API integration.
