import React from 'react';
import { Reading } from '@/shared/types/reading.types';
import { checkAlerts, getDeviceDisplayName } from '@/shared/utils/alertUtils';
import styles from './AlertBanner.module.scss';

interface AlertBannerProps {
  readings: Reading[];
  className?: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ readings, className }) => {
  const alertReadings = readings.filter(reading => checkAlerts(reading).isTriggered);

  if (alertReadings.length === 0) {
    return (
      <div className={`${styles.banner} ${styles.success} ${className || ''}`}>
        <div className={styles.icon}>✓</div>
        <div className={styles.content}>
          <h3>All Systems Normal</h3>
          <p>All sensor readings are within optimal ranges.</p>
        </div>
      </div>
    );
  }

  const errorReadings = alertReadings.filter(reading => checkAlerts(reading).severity === 'error');
  const warningReadings = alertReadings.filter(reading => checkAlerts(reading).severity === 'warning');

  return (
    <div className={styles.container}>
      {errorReadings.length > 0 && (
        <div className={`${styles.banner} ${styles.error} ${className || ''}`}>
          <div className={styles.icon}>⚠</div>
          <div className={styles.content}>
            <h3>Critical Alerts ({errorReadings.length})</h3>
            <ul className={styles.alertList}>
              {errorReadings.map(reading => {
                const alert = checkAlerts(reading);
                return (
                  <li key={reading.id} className={styles.alertItem}>
                    <strong>{getDeviceDisplayName(reading.deviceId)}:</strong>
                    <ul>
                      {alert.reasons.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {warningReadings.length > 0 && (
        <div className={`${styles.banner} ${styles.warning} ${className || ''}`}>
          <div className={styles.icon}>⚡</div>
          <div className={styles.content}>
            <h3>Warnings ({warningReadings.length})</h3>
            <ul className={styles.alertList}>
              {warningReadings.map(reading => {
                const alert = checkAlerts(reading);
                return (
                  <li key={reading.id} className={styles.alertItem}>
                    <strong>{getDeviceDisplayName(reading.deviceId)}:</strong>
                    <ul>
                      {alert.reasons.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertBanner;
