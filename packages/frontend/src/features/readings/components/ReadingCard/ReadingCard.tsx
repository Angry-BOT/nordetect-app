import React from 'react';
import { Reading } from '@/shared/types/reading.types';
import { checkAlerts, formatValue, getDeviceDisplayName, getStatusColor } from '@/shared/utils/alertUtils';
import styles from './ReadingCard.module.scss';

interface ReadingCardProps {
  reading: Reading;
  className?: string;
}

export const ReadingCard: React.FC<ReadingCardProps> = ({ reading, className }) => {
  const alert = checkAlerts(reading);
  const statusColor = getStatusColor(reading);
  const deviceName = getDeviceDisplayName(reading.deviceId);
  const timestamp = new Date(reading.timestamp);

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  return (
    <div className={`${styles.card} ${styles[statusColor]} ${className || ''}`}>
      <div className={styles.header}>
        <div className={styles.deviceInfo}>
          <h3 className={styles.deviceName}>{deviceName}</h3>
          <span className={styles.deviceId}>{reading.deviceId}</span>
        </div>
        <div className={styles.status}>
          <span className={`${styles.statusBadge} ${styles[statusColor]}`}>
            {alert.isTriggered ? (alert.severity === 'error' ? 'Critical' : 'Warning') : 'Normal'}
          </span>
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.label}>Nitrogen</span>
          <span className={styles.value}>{formatValue(reading.nitrogen, 'ppm')}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Phosphorus</span>
          <span className={styles.value}>{formatValue(reading.phosphorus, 'ppm')}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>pH</span>
          <span className={styles.value}>{formatValue(reading.ph, '', 1)}</span>
        </div>
      </div>

      {alert.isTriggered && (
        <div className={styles.alerts}>
          <h4 className={styles.alertTitle}>Alerts:</h4>
          <ul className={styles.alertList}>
            {alert.reasons.map((reason, index) => (
              <li key={index} className={styles.alertReason}>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.footer}>
        <span className={styles.timestamp}>
          Last updated: {formatTimestamp(timestamp)}
        </span>
      </div>
    </div>
  );
};

export default ReadingCard;
