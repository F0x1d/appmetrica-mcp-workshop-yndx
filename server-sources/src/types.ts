/**
 * TypeScript interfaces for AppMetrica API data structures
 */

/**
 * Crash data interface containing all 30 crash fields from AppMetrica API
 * All fields are strings as returned by the AppMetrica API
 */
export interface CrashData {
  crash: string;
  crash_datetime: string;
  crash_group_id: string;
  crash_id: string;
  crash_name: string;
  crash_receive_datetime: string;
  crash_receive_timestamp: string;
  crash_timestamp: string;
  appmetrica_device_id: string;
  city: string;
  connection_type: string;
  country_iso_code: string;
  device_ipv6: string;
  device_locale: string;
  device_manufacturer: string;
  device_model: string;
  device_type: string;
  google_aid: string;
  ios_ifa: string;
  ios_ifv: string;
  mcc: string;
  mnc: string;
  operator_name: string;
  os_name: string;
  os_version: string;
  profile_id: string;
  windows_aid: string;
  app_package_name: string;
  app_version_name: string;
  application_id: string;
}

/**
 * Event data interface containing all 32 event fields from AppMetrica API
 * All fields are strings as returned by the AppMetrica API
 */
export interface EventData {
  event_datetime: string;
  event_json: string;
  event_name: string;
  event_receive_datetime: string;
  event_receive_timestamp: string;
  event_timestamp: string;
  session_id: string;
  installation_id: string;
  appmetrica_device_id: string;
  city: string;
  connection_type: string;
  country_iso_code: string;
  device_ipv6: string;
  device_locale: string;
  device_manufacturer: string;
  device_model: string;
  device_type: string;
  google_aid: string;
  ios_ifa: string;
  ios_ifv: string;
  mcc: string;
  mnc: string;
  operator_name: string;
  original_device_model: string;
  os_name: string;
  os_version: string;
  profile_id: string;
  windows_aid: string;
  app_build_number: string;
  app_package_name: string;
  app_version_name: string;
  application_id: string;
}

/**
 * Generic AppMetrica API response structure
 * @template T - The type of data contained in the response
 */
export interface AppMetricaResponse<T> {
  data: T[];
}

/**
 * Async response interface for long-running operations
 */
export interface AsyncResponse {
  message?: string;
  progress?: string;
}

/**
 * Parameters for getting crash data from AppMetrica API
 */
export interface GetCrashesParams {
  /** Start date in YYYY-MM-DD format */
  date_since: string;
  /** End date in YYYY-MM-DD format */
  date_until: string;
  /** Specific crash group ID to filter by (optional) */
  crash_group_id?: string;
  /** Comma-separated list of fields to include (optional) */
  fields?: string;
  /** Maximum number of records to return (optional) */
  limit?: string;
}

/**
 * Parameters for getting event data from AppMetrica API
 */
export interface GetEventsParams {
  /** Start date in YYYY-MM-DD format */
  date_since: string;
  /** End date in YYYY-MM-DD format */
  date_until: string;
  /** Specific device ID to filter by (optional) */
  appmetrica_device_id?: string;
  /** Specific event name to filter by (optional) */
  event_name?: string;
  /** Comma-separated list of fields to include (optional) */
  fields?: string;
  /** Maximum number of records to return (optional) */
  limit?: string;
}