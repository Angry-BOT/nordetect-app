import React from 'react';
import { useStats, useHealthCheck } from '@/features/readings/hooks/useReadings';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { data: stats } = useStats();
  const { data: health } = useHealthCheck();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h1 className={styles.title}>🌱 Nordetect</h1>
          <span className={styles.subtitle}>Agricultural IoT Monitoring</span>
        </div>
        
        <div className={styles.stats}>
          {stats && (
            <>
              <div className={styles.stat}>
                <span className={styles.statValue}>{stats.deviceCount}</span>
                <span className={styles.statLabel}>Devices</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{stats.totalReadings}</span>
                <span className={styles.statLabel}>Readings</span>
              </div>
            </>
          )}
          
          <div className={styles.status}>
            <span 
              className={`${styles.statusDot} ${health ? styles.online : styles.offline}`}
              title={health ? 'System Online' : 'System Offline'}
            />
            <span className={styles.statusText}>
              {health ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
