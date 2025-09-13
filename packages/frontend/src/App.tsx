import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLatestReadings, useReadings } from '@/features/readings/hooks/useReadings';
import Header from '@/shared/components/Layout/Header';
import LoadingSpinner from '@/shared/components/UI/LoadingSpinner';
import ErrorMessage from '@/shared/components/UI/ErrorMessage';
import AlertBanner from '@/features/readings/components/AlertBanner';
import ReadingCard from '@/features/readings/components/ReadingCard';
import ReadingChart from '@/features/readings/components/ReadingChart';
import ReadingForm from '@/features/readings/components/ReadingForm';
import styles from './App.module.scss';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 30 * 1000, // 30 seconds
    },
  },
});

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  
  // Fetch latest readings for each device
  const {
    data: latestReadings = [],
    isLoading: latestLoading,
    error: latestError,
    refetch: refetchLatest,
  } = useLatestReadings();

  // Fetch all readings for the chart (last 24 hours)
  const {
    data: allReadings = [],
    isLoading: allLoading,
    error: allError,
    refetch: refetchAll,
  } = useReadings();

  const isLoading = latestLoading || allLoading;
  const error = latestError || allError;

  const handleFormSuccess = () => {
    setShowForm(false);
    // Queries will auto-refetch due to invalidation in the mutation
  };

  const handleRetry = () => {
    refetchLatest();
    refetchAll();
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="lg" text="Loading sensor data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <ErrorMessage
          message={'Failed to load sensor data'}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <main className={styles.main}>
        {/* Alert Banner */}
        <AlertBanner readings={latestReadings} className={styles.alerts} />

        {/* Latest Readings Grid */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Latest Device Readings</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className={styles.addButton}
            >
              {showForm ? 'Cancel' : '+ Add Reading'}
            </button>
          </div>

          {showForm && (
            <ReadingForm
              onSuccess={handleFormSuccess}
              className={styles.form}
            />
          )}

          {latestLoading ? (
            <div className={styles.loadingSection}>
              <LoadingSpinner size="md" text="Loading device readings..." />
            </div>
          ) : latestReadings.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📊</div>
              <h3>No Devices Found</h3>
              <p>No sensor readings available. Add your first reading to get started.</p>
              <button
                onClick={() => setShowForm(true)}
                className={styles.emptyButton}
              >
                Add First Reading
              </button>
            </div>
          ) : (
            <div className={styles.readingsGrid}>
              {latestReadings.map(reading => (
                <ReadingCard
                  key={reading.id}
                  reading={reading}
                  className={styles.readingCard}
                />
              ))}
            </div>
          )}
        </section>

        {/* Nitrogen Chart */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Nitrogen Levels Trend</h2>
          {allLoading ? (
            <div className={styles.loadingSection}>
              <LoadingSpinner size="md" text="Loading chart data..." />
            </div>
          ) : allReadings.length > 0 ? (
            <ReadingChart readings={allReadings} />
          ) : (
            <div className={styles.emptyChart}>
              <div className={styles.emptyIcon}>📈</div>
              <h3>No Chart Data</h3>
              <p>No readings from the last 24 hours to display in chart.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.app}>
        <Header />
        <Dashboard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
