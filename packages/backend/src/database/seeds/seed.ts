import { DataSource } from 'typeorm';
import { Reading } from '../../modules/readings/entities/reading.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'dev.sqlite',
  entities: [Reading],
  synchronize: true,
});

// Generate timestamps for the last few hours to ensure they appear in "last 24 hours" queries
const now = new Date();
const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 60 * 60 * 1000);

const seedData: Partial<Reading>[] = [
  {
    deviceId: 'GH001',
    timestamp: hoursAgo(3),
    nitrogen: 145.5,
    phosphorus: 42.1,
    ph: 6.8,
  },
  {
    deviceId: 'GH001',
    timestamp: hoursAgo(2),
    nitrogen: 152.3,
    phosphorus: 44.7,
    ph: 6.7,
  },
  {
    deviceId: 'GH001',
    timestamp: hoursAgo(1),
    nitrogen: 148.9,
    phosphorus: 43.2,
    ph: 6.9,
  },
  {
    deviceId: 'GH002',
    timestamp: hoursAgo(3.5),
    nitrogen: 167.2,
    phosphorus: 38.5,
    ph: 6.4,
  },
  {
    deviceId: 'GH002',
    timestamp: hoursAgo(2.5),
    nitrogen: 172.8,
    phosphorus: 41.3,
    ph: 6.3,
  },
  {
    deviceId: 'GH002',
    timestamp: hoursAgo(1.5),
    nitrogen: 169.5,
    phosphorus: 39.8,
    ph: 6.5,
  },
  {
    deviceId: 'GH003',
    timestamp: hoursAgo(4),
    nitrogen: 220.5, // Above threshold to trigger alert
    phosphorus: 52.3,
    ph: 5.8, // Below threshold to trigger alert
  },
  {
    deviceId: 'GH003',
    timestamp: hoursAgo(2),
    nitrogen: 215.8, // Above threshold
    phosphorus: 48.7,
    ph: 5.9, // Below threshold
  },
  {
    deviceId: 'GH004',
    timestamp: hoursAgo(5),
    nitrogen: 134.2,
    phosphorus: 35.8,
    ph: 7.2, // Above threshold
  },
  {
    deviceId: 'GH004',
    timestamp: hoursAgo(3),
    nitrogen: 138.7,
    phosphorus: 37.1,
    ph: 7.1, // Above threshold
  },
  {
    deviceId: 'GH005',
    timestamp: hoursAgo(6),
    nitrogen: 156.3,
    phosphorus: 46.9,
    ph: 6.6,
  },
  {
    deviceId: 'GH005',
    timestamp: hoursAgo(4),
    nitrogen: 159.1,
    phosphorus: 48.2,
    ph: 6.5,
  },
];

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');

    const readingRepository = AppDataSource.getRepository(Reading);

    // Clear existing data
    await readingRepository.clear();
    console.log('Cleared existing readings');

    // Insert seed data
    const readings = readingRepository.create(seedData);
    await readingRepository.save(readings);
    
    console.log(`Successfully seeded ${seedData.length} readings`);
    
    // Log summary
    const deviceCounts = await readingRepository
      .createQueryBuilder('reading')
      .select('reading.deviceId', 'deviceId')
      .addSelect('COUNT(*)', 'count')
      .groupBy('reading.deviceId')
      .getRawMany();
    
    console.log('Seeded data summary:');
    deviceCounts.forEach(({ deviceId, count }) => {
      console.log(`  ${deviceId}: ${count} readings`);
    });

  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

if (require.main === module) {
  seed();
}

export { seed };
