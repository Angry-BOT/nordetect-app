export interface Reading {
  id: string;
  deviceId: string;
  timestamp: string; // ISO 8601 string
  nitrogen: number;
  phosphorus: number;
  ph: number;
}

export interface CreateReadingDto {
  deviceId: string;
  timestamp?: string; // Optional, defaults to current time
  nitrogen: number;
  phosphorus: number;
  ph: number;
}

export interface ReadingQueryParams {
  deviceId?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  details?: unknown;
}

export interface AlertThresholds {
  nitrogen: {
    max: number;
    min: number;
  };
  phosphorus: {
    max: number;
    min: number;
  };
  ph: {
    max: number;
    min: number;
  };
}

export interface DeviceReading extends Reading {
  isAlertTriggered: boolean;
  alertReasons: string[];
}
