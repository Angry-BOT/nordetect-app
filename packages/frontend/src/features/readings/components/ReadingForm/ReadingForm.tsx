import React from 'react';
import { useForm } from 'react-hook-form';
import { CreateReadingDto } from '@/shared/types/reading.types';
import { VALIDATION_RANGES, DEVICE_ID_PATTERN } from '@/shared/constants/validation.constants';
import { useCreateReading } from '../../hooks/useReadings';
import styles from './ReadingForm.module.scss';

interface ReadingFormProps {
  onSuccess?: () => void;
  className?: string;
}

interface FormData extends CreateReadingDto {
  timestamp?: string;
}

export const ReadingForm: React.FC<ReadingFormProps> = ({ onSuccess, className }) => {
  const createReadingMutation = useCreateReading();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      deviceId: '',
      nitrogen: 0,
      phosphorus: 0,
      ph: 7.0,
      timestamp: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const submitData: CreateReadingDto = {
        deviceId: data.deviceId,
        nitrogen: Number(data.nitrogen),
        phosphorus: Number(data.phosphorus),
        ph: Number(data.ph),
        timestamp: data.timestamp || undefined,
      };

      await createReadingMutation.mutateAsync(submitData);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create reading:', error);
    }
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <h2 className={styles.title}>Add New Reading</h2>

      {createReadingMutation.isSuccess && (
        <div className={styles.success}>
          Reading added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="deviceId" className={styles.label}>
              Device ID <span className={styles.required}>*</span>
            </label>
            <input
              id="deviceId"
              type="text"
              placeholder="e.g., GH001"
              className={`${styles.input} ${errors.deviceId ? styles.inputError : ''}`}
              {...register('deviceId', {
                required: 'Device ID is required',
                pattern: {
                  value: DEVICE_ID_PATTERN,
                  message: 'Device ID must be in format XX000 (e.g., GH001)',
                },
              })}
            />
            {errors.deviceId && (
              <span className={styles.errorMessage}>{errors.deviceId.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="timestamp" className={styles.label}>
              Timestamp (optional)
            </label>
            <input
              id="timestamp"
              type="datetime-local"
              className={`${styles.input} ${errors.timestamp ? styles.inputError : ''}`}
              {...register('timestamp')}
            />
            {errors.timestamp && (
              <span className={styles.errorMessage}>{errors.timestamp.message}</span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="nitrogen" className={styles.label}>
              Nitrogen (ppm) <span className={styles.required}>*</span>
            </label>
            <input
              id="nitrogen"
              type="number"
              step="0.1"
              placeholder="0.0"
              className={`${styles.input} ${errors.nitrogen ? styles.inputError : ''}`}
              {...register('nitrogen', {
                required: 'Nitrogen level is required',
                min: {
                  value: VALIDATION_RANGES.NITROGEN.MIN,
                  message: `Nitrogen must be at least ${VALIDATION_RANGES.NITROGEN.MIN} ppm`,
                },
                max: {
                  value: VALIDATION_RANGES.NITROGEN.MAX,
                  message: `Nitrogen must be at most ${VALIDATION_RANGES.NITROGEN.MAX} ppm`,
                },
                valueAsNumber: true,
              })}
            />
            {errors.nitrogen && (
              <span className={styles.errorMessage}>{errors.nitrogen.message}</span>
            )}
            <span className={styles.hint}>
              Range: {VALIDATION_RANGES.NITROGEN.MIN}-{VALIDATION_RANGES.NITROGEN.MAX} ppm
            </span>
          </div>

          <div className={styles.field}>
            <label htmlFor="phosphorus" className={styles.label}>
              Phosphorus (ppm) <span className={styles.required}>*</span>
            </label>
            <input
              id="phosphorus"
              type="number"
              step="0.1"
              placeholder="0.0"
              className={`${styles.input} ${errors.phosphorus ? styles.inputError : ''}`}
              {...register('phosphorus', {
                required: 'Phosphorus level is required',
                min: {
                  value: VALIDATION_RANGES.PHOSPHORUS.MIN,
                  message: `Phosphorus must be at least ${VALIDATION_RANGES.PHOSPHORUS.MIN} ppm`,
                },
                max: {
                  value: VALIDATION_RANGES.PHOSPHORUS.MAX,
                  message: `Phosphorus must be at most ${VALIDATION_RANGES.PHOSPHORUS.MAX} ppm`,
                },
                valueAsNumber: true,
              })}
            />
            {errors.phosphorus && (
              <span className={styles.errorMessage}>{errors.phosphorus.message}</span>
            )}
            <span className={styles.hint}>
              Range: {VALIDATION_RANGES.PHOSPHORUS.MIN}-{VALIDATION_RANGES.PHOSPHORUS.MAX} ppm
            </span>
          </div>

          <div className={styles.field}>
            <label htmlFor="ph" className={styles.label}>
              pH Level <span className={styles.required}>*</span>
            </label>
            <input
              id="ph"
              type="number"
              step="0.1"
              placeholder="7.0"
              className={`${styles.input} ${errors.ph ? styles.inputError : ''}`}
              {...register('ph', {
                required: 'pH level is required',
                min: {
                  value: VALIDATION_RANGES.PH.MIN,
                  message: `pH must be at least ${VALIDATION_RANGES.PH.MIN}`,
                },
                max: {
                  value: VALIDATION_RANGES.PH.MAX,
                  message: `pH must be at most ${VALIDATION_RANGES.PH.MAX}`,
                },
                valueAsNumber: true,
              })}
            />
            {errors.ph && (
              <span className={styles.errorMessage}>{errors.ph.message}</span>
            )}
            <span className={styles.hint}>
              Range: {VALIDATION_RANGES.PH.MIN}-{VALIDATION_RANGES.PH.MAX}
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => reset()}
            className={styles.resetButton}
            disabled={isSubmitting || createReadingMutation.isLoading}
          >
            Reset
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || createReadingMutation.isLoading}
          >
            {isSubmitting || createReadingMutation.isLoading ? (
              <>
                <span className={styles.spinner} />
                Adding...
              </>
            ) : (
              'Add Reading'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReadingForm;
