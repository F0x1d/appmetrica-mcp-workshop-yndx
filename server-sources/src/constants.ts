/**
 * AppMetrica API constants and field definitions
 */

/** Base URL for AppMetrica API */
export const APPMETRICA_API_BASE = 'https://api.appmetrica.yandex.ru/logs/v1/export';

/** All available crash fields from AppMetrica API */
export const CRASH_FIELDS = [
  'crash',
  'crash_datetime',
  'crash_group_id',
  'crash_id',
  'crash_name',
  'crash_receive_datetime',
  'crash_receive_timestamp',
  'crash_timestamp',
  'appmetrica_device_id',
  'city',
  'connection_type',
  'country_iso_code',
  'device_ipv6',
  'device_locale',
  'device_manufacturer',
  'device_model',
  'device_type',
  'google_aid',
  'ios_ifa',
  'ios_ifv',
  'mcc',
  'mnc',
  'operator_name',
  'os_name',
  'os_version',
  'profile_id',
  'windows_aid',
  'app_package_name',
  'app_version_name',
  'application_id'
] as const;

/** All available event fields from AppMetrica API */
export const EVENT_FIELDS = [
  'event_datetime',
  'event_json',
  'event_name',
  'event_receive_datetime',
  'event_receive_timestamp',
  'event_timestamp',
  'session_id',
  'installation_id',
  'appmetrica_device_id',
  'city',
  'connection_type',
  'country_iso_code',
  'device_ipv6',
  'device_locale',
  'device_manufacturer',
  'device_model',
  'device_type',
  'google_aid',
  'ios_ifa',
  'ios_ifv',
  'mcc',
  'mnc',
  'operator_name',
  'original_device_model',
  'os_name',
  'os_version',
  'profile_id',
  'windows_aid',
  'app_build_number',
  'app_package_name',
  'app_version_name',
  'application_id'
] as const;

/** Default fields for crash data requests */
export const DEFAULT_CRASH_FIELDS = 'crash_datetime,crash_name,crash_group_id,crash_id,device_model,os_name,os_version';

/** Default fields for event data requests */
export const DEFAULT_EVENT_FIELDS = 'event_datetime,event_name,event_json,appmetrica_device_id,device_model,os_name';

/** Maximum number of retries for API requests */
export const DEFAULT_MAX_RETRIES = 100;

/** Delay between retries in milliseconds (10 seconds) */
export const DEFAULT_RETRY_DELAY = 10000;