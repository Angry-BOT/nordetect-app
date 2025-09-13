import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Reading } from '@/shared/types/reading.types';
import { ALERT_THRESHOLDS } from '@/shared/constants/validation.constants';
import styles from './ReadingChart.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface ReadingChartProps {
  readings: Reading[];
  className?: string;
}

export const ReadingChart: React.FC<ReadingChartProps> = ({ readings, className }) => {
  const chartData = useMemo(() => {
    // Group readings by device
    const deviceReadings = readings.reduce((acc, reading) => {
      if (!acc[reading.deviceId]) {
        acc[reading.deviceId] = [];
      }
      acc[reading.deviceId].push(reading);
      return acc;
    }, {} as Record<string, Reading[]>);

    // Sort readings by timestamp for each device
    Object.keys(deviceReadings).forEach(deviceId => {
      deviceReadings[deviceId].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    });

    // Create datasets for each device
    const colors = [
      'rgb(59, 130, 246)', // blue
      'rgb(16, 185, 129)', // green
      'rgb(245, 158, 11)', // amber
      'rgb(239, 68, 68)', // red
      'rgb(139, 92, 246)', // purple
    ];

    const datasets = Object.entries(deviceReadings).map(([deviceId, deviceData], index) => ({
      label: deviceId,
      data: deviceData.map(reading => ({
        x: reading.timestamp,
        y: reading.nitrogen,
      })),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length] + '20',
      tension: 0.1,
      pointRadius: 4,
      pointHoverRadius: 6,
    }));

    return {
      datasets,
    };
  }, [readings]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Nitrogen Levels Over Time (Last 24 Hours)',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            const date = new Date(context[0].parsed.x);
            return new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }).format(date);
          },
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)} ppm`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          displayFormats: {
            hour: 'MMM dd HH:mm',
          },
        },
        title: {
          display: true,
          text: 'Time',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Nitrogen (ppm)',
        },
        min: 0,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: 'white',
        hoverBorderWidth: 2,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const hasData = readings.length > 0;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {!hasData ? (
        <div className={styles.noData}>
          <div className={styles.noDataIcon}>📊</div>
          <h3>No Data Available</h3>
          <p>No readings found for the last 24 hours. Add some readings to see the chart.</p>
        </div>
      ) : (
        <>
          <div className={styles.chartWrapper}>
            <Line data={chartData} options={options} />
          </div>
          
          <div className={styles.thresholdInfo}>
            <div className={styles.threshold}>
              <span className={styles.thresholdLabel}>Alert Threshold:</span>
              <span className={styles.thresholdValue}>
                {ALERT_THRESHOLDS.NITROGEN.MAX} ppm
              </span>
            </div>
            <div className={styles.legend}>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ backgroundColor: 'rgb(239, 68, 68)' }} />
                Above threshold
              </span>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ backgroundColor: 'rgb(16, 185, 129)' }} />
                Normal range
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReadingChart;
