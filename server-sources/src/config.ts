/**
 * Configuration management for AppMetrica MCP Server
 */

/**
 * AppMetrica configuration interface
 */
export interface AppMetricaConfig {
  /** OAuth token for AppMetrica API authentication */
  oauthToken: string;
  /** Application ID for AppMetrica API requests */
  applicationId: string;
}

/**
 * Loads AppMetrica configuration from environment variables
 * 
 * @returns AppMetricaConfig object with OAuth token and application ID
 * @throws Error if required environment variables are missing
 */
export function loadConfig(): AppMetricaConfig {
  const oauthToken = process.env.APPMETRICA_OAUTH_TOKEN;
  const applicationId = process.env.APPMETRICA_APPLICATION_ID;

  if (!oauthToken) {
    throw new Error(
      'APPMETRICA_OAUTH_TOKEN environment variable is required. ' +
      'Please set it to your AppMetrica OAuth token.'
    );
  }

  if (!applicationId) {
    throw new Error(
      'APPMETRICA_APPLICATION_ID environment variable is required. ' +
      'Please set it to your AppMetrica application ID.'
    );
  }

  return {
    oauthToken,
    applicationId
  };
}