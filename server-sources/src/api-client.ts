/**
 * AppMetrica API client with intelligent retry logic
 */

import axios, { AxiosInstance } from 'axios';
import { 
  APPMETRICA_API_BASE, 
  DEFAULT_MAX_RETRIES, 
  DEFAULT_RETRY_DELAY 
} from './constants.js';
import type {
  AppMetricaResponse,
  CrashData,
  EventData,
  GetCrashesParams,
  GetEventsParams
} from './types.js';

/**
 * AppMetrica API client with retry logic for async operations
 */
export class AppMetricaClient {
  private api: AxiosInstance;
  private applicationId: string;

  /**
   * Creates a new AppMetrica API client
   * 
   * @param oauthToken - OAuth token for API authentication
   * @param applicationId - Application ID for API requests
   */
  constructor(oauthToken: string, applicationId: string) {
    this.applicationId = applicationId;
    
    this.api = axios.create({
      baseURL: APPMETRICA_API_BASE,
      timeout: 30000, // 30 seconds
      headers: {
        'Authorization': `OAuth ${oauthToken}`
      }
    });
  }

  /**
   * Handles async requests with intelligent retry logic
   * 
   * @param requestFn - Function that makes the HTTP request
   * @param maxRetries - Maximum number of retries
   * @param retryDelay - Delay between retries in milliseconds
   * @returns Promise resolving to the response data
   * @throws Error after max retries exceeded
   */
  private async handleAsyncRequest<T>(
    requestFn: () => Promise<any>,
    maxRetries: number = DEFAULT_MAX_RETRIES,
    retryDelay: number = DEFAULT_RETRY_DELAY
  ): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await requestFn();
        
        // Check if response indicates async processing
        const isAsyncProcessing = 
          response.status === 202 ||
          (typeof response.data === 'string' && (
            response.data.includes('Wait for result') ||
            response.data.includes('Progress is') ||
            response.data.includes('queue')
          ));

        if (isAsyncProcessing) {
          console.error(`Attempt ${attempt}/${maxRetries}: Request is being processed asynchronously, retrying in ${retryDelay}ms...`);
          
          if (attempt === maxRetries) {
            throw new Error(`Request failed after ${maxRetries} attempts: Still processing asynchronously`);
          }
          
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          continue;
        }

        // Success - return the data
        return response.data;
        
      } catch (error) {
        console.error(`Attempt ${attempt}/${maxRetries} failed:`, error);
        
        if (attempt === maxRetries) {
          if (axios.isAxiosError(error)) {
            throw new Error(`API request failed after ${maxRetries} attempts: ${error.message}`);
          }
          throw new Error(`Request failed after ${maxRetries} attempts: ${error}`);
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
    
    throw new Error(`Request failed after ${maxRetries} attempts`);
  }

  /**
   * Gets crash data from AppMetrica API
   * 
   * @param params - Parameters for crash data request
   * @returns Promise resolving to crash data response
   */
  public async getCrashes(params: GetCrashesParams): Promise<AppMetricaResponse<CrashData>> {
    const queryParams = new URLSearchParams({
      application_id: this.applicationId,
      date_since: params.date_since,
      date_until: params.date_until,
      fields: params.fields || 'crash_datetime,crash_name,crash_group_id,crash_id,device_model,os_name,os_version'
    });

    // Add optional parameters
    if (params.crash_group_id) {
      queryParams.append('crash_group_id', params.crash_group_id);
    }
    if (params.limit) {
      queryParams.append('limit', params.limit);
    }

    return this.handleAsyncRequest<AppMetricaResponse<CrashData>>(
      () => this.api.get(`/crashes.json?${queryParams.toString()}`)
    );
  }

  /**
   * Gets event data from AppMetrica API
   * 
   * @param params - Parameters for event data request
   * @returns Promise resolving to event data response
   */
  public async getEvents(params: GetEventsParams): Promise<AppMetricaResponse<EventData>> {
    const queryParams = new URLSearchParams({
      application_id: this.applicationId,
      date_since: params.date_since,
      date_until: params.date_until,
      fields: params.fields || 'event_datetime,event_name,event_json,appmetrica_device_id,device_model,os_name'
    });

    // Add optional parameters
    if (params.appmetrica_device_id) {
      queryParams.append('appmetrica_device_id', params.appmetrica_device_id);
    }
    if (params.event_name) {
      queryParams.append('event_name', params.event_name);
    }
    if (params.limit) {
      queryParams.append('limit', params.limit);
    }

    return this.handleAsyncRequest<AppMetricaResponse<EventData>>(
      () => this.api.get(`/events.json?${queryParams.toString()}`)
    );
  }
}