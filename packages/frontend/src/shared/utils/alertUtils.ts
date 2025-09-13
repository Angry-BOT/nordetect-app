import { Reading } from '@/shared/types/reading.types';
import { ALERT_THRESHOLDS } from '@/shared/constants/validation.constants';

export interface AlertInfo {
  isTriggered: boolean;
  reasons: string[];
  severity: 'warning' | 'error';
}

export const checkAlerts = (reading: Reading): AlertInfo => {
  const reasons: string[] = [];
  let severity: 'warning' | 'error' = 'warning';

  // Check nitrogen levels
  if (reading.nitrogen > ALERT_THRESHOLDS.NITROGEN.MAX) {
    reasons.push(`Nitrogen level (${reading.nitrogen} ppm) exceeds maximum threshold of ${ALERT_THRESHOLDS.NITROGEN.MAX} ppm`);
    severity = 'error';
  }

  // Check pH levels
  if (reading.ph < ALERT_THRESHOLDS.PH.MIN || reading.ph > ALERT_THRESHOLDS.PH.MAX) {
    reasons.push(
      `pH level (${reading.ph}) is outside optimal range of ${ALERT_THRESHOLDS.PH.MIN}-${ALERT_THRESHOLDS.PH.MAX}`
    );
    if (severity !== 'error') severity = 'warning';
  }

  return {
    isTriggered: reasons.length > 0,
    reasons,
    severity,
  };
};

export const formatValue = (value: number, unit: string, decimals: number = 1): string => {
  return `${value.toFixed(decimals)} ${unit}`;
};

export const getStatusColor = (reading: Reading): string => {
  const alert = checkAlerts(reading);
  
  if (!alert.isTriggered) return 'success';
  if (alert.severity === 'error') return 'error';
  return 'warning';
};

export const getDeviceDisplayName = (deviceId: string): string => {
  const deviceTypes: Record<string, string> = {
    'GH': 'Greenhouse',
    'FD': 'Field',
    'TB': 'Tunnel',
    'PH': 'Polyhouse',
  };

  const prefix = deviceId.substring(0, 2);
  const number = deviceId.substring(2);
  
  return `${deviceTypes[prefix] || 'Device'} ${number}`;
};
