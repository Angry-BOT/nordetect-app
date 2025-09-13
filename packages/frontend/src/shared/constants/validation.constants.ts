export const VALIDATION_RANGES = {
  NITROGEN: {
    MIN: 0,
    MAX: 500,
  },
  PHOSPHORUS: {
    MIN: 0,
    MAX: 200,
  },
  PH: {
    MIN: 0,
    MAX: 14,
  },
} as const;

export const ALERT_THRESHOLDS = {
  NITROGEN: {
    MAX: 200,
    MIN: 0,
  },
  PHOSPHORUS: {
    MAX: 200,
    MIN: 0,
  },
  PH: {
    MAX: 7.0,
    MIN: 6.0,
  },
} as const;

export const API_ENDPOINTS = {
  READINGS: '/api/readings',
  READINGS_LATEST: '/api/readings/latest',
} as const;

export const DEVICE_ID_PATTERN = /^[A-Z]{2}\d{3}$/; // e.g., GH001

export const ERROR_MESSAGES = {
  DEVICE_ID_INVALID: 'Device ID must be in format XX000 (e.g., GH001)',
  NITROGEN_OUT_OF_RANGE: `Nitrogen must be between ${VALIDATION_RANGES.NITROGEN.MIN} and ${VALIDATION_RANGES.NITROGEN.MAX} ppm`,
  PHOSPHORUS_OUT_OF_RANGE: `Phosphorus must be between ${VALIDATION_RANGES.PHOSPHORUS.MIN} and ${VALIDATION_RANGES.PHOSPHORUS.MAX} ppm`,
  PH_OUT_OF_RANGE: `pH must be between ${VALIDATION_RANGES.PH.MIN} and ${VALIDATION_RANGES.PH.MAX}`,
  TIMESTAMP_INVALID: 'Timestamp must be a valid ISO 8601 date string',
  REQUIRED_FIELD: 'This field is required',
} as const;
