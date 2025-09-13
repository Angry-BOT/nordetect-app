# 🌱 Nordetect - Agricultural IoT Monitoring Dashboard

A full-stack web application for monitoring sensor readings from agricultural IoT devices, built with modern technologies and following best practices.

## 🚀 Features

### Backend (NestJS + TypeScript)

- **RESTful API** with comprehensive endpoints for sensor readings
- **SQLite Database** with TypeORM for data persistence
- **Data Validation** using class-validator with proper error handling
- **Swagger Documentation** for API endpoints
- **Seeded Sample Data** with 5 devices and multiple readings
- **Health Check** endpoints for monitoring
- **CORS Support** for frontend integration

### Frontend (React + TypeScript)

- **Modern React Dashboard** with responsive design
- **Real-time Data Visualization** using Chart.js
- **Form Validation** with React Hook Form
- **State Management** using React Query (TanStack Query)
- **Alert System** for threshold violations
- **SCSS Modules** for component-scoped styling
- **Loading & Error States** with proper UX handling

### Key Functionality

- ✅ View latest readings from all devices in card format
- ✅ Interactive nitrogen level chart showing trends over time
- ✅ Alert banner highlighting threshold violations (nitrogen > 200 ppm, pH outside 6.0-7.0)
- ✅ Form to manually add new sensor readings with validation
- ✅ Responsive design working on desktop and mobile
- ✅ Real-time updates when new readings are added

## 📁 Project Structure

```
nordetect-app/
├── packages/
│   ├── backend/          # NestJS API
│   │   ├── src/
│   │   │   ├── modules/readings/    # Readings module
│   │   │   ├── database/            # Database config & seeds
│   │   │   └── common/              # Shared utilities
│   │   └── dev.sqlite               # SQLite database
│   ├── frontend/         # React Dashboard
│   │   ├── src/
│   │   │   ├── features/readings/   # Reading components & hooks
│   │   │   ├── shared/              # Shared components & utils
│   │   │   └── styles/              # SCSS styles
│   │   └── public/
│   └── shared/           # Shared TypeScript types
│       └── src/
├── package.json          # Root package.json with Lerna
├── lerna.json           # Lerna configuration
└── README.md
```

## 🛠️ Technology Stack

### Backend

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **TypeORM** - Object-Relational Mapping
- **SQLite** - Lightweight database
- **Class Validator** - Validation decorators
- **Swagger** - API documentation

### Frontend

- **React 18** - Modern React with hooks
- **TypeScript** - Static typing
- **Vite** - Fast build tool
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Chart.js** - Data visualization
- **SCSS Modules** - Scoped styling

### Development Tools

- **Lerna** - Monorepo management
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

**Note:** SQLite is included as a dependency and will be installed automatically - no separate installation required.

### Installation & Setup

1. **Clone and install dependencies:**

```bash
git clone <repository-url>
cd nordetect-app
npm install
```

2. **Seed the database:**

```bash
cd packages/backend
npm run seed
```

3. **Start both frontend and backend:**

```bash
# From root directory
npm run dev
```

This will start:

- Backend API at `http://localhost:5011`
- Frontend dashboard at `http://localhost:5010`
- API documentation at `http://localhost:5011/api/docs`

### Alternative: Start Services Individually

**Backend:**

```bash
cd packages/backend
npm run dev
```

**Frontend:**

```bash
cd packages/frontend
npm run dev
```

## 📊 Sample Data

The application comes with pre-seeded sample data:

- **5 Devices**: GH001, GH002, GH003, GH004, GH005
- **12 Readings** with varying nitrogen, phosphorus, and pH levels
- **Alert Triggers**: Some readings exceed thresholds to demonstrate alert functionality

### Assumed Device Types:

- **GH**: Greenhouse sensors
- **FD**: Field sensors
- **TB**: Tunnel sensors
- **PH**: Polyhouse sensors

## 🔧 API Endpoints

### Readings

- `POST /api/readings` - Submit a new sensor reading
- `GET /api/readings` - Get all readings (last 24 hours by default)
- `GET /api/readings/latest` - Get the most recent reading for each device
- `GET /api/readings/stats` - Get basic statistics

### Health

- `GET /` - Basic health check
- `GET /health` - Detailed health information

### Documentation

- `GET /api/docs` - Swagger API documentation

## 📱 UI Components

### Dashboard Features

- **Header**: Shows system status, device count, and total readings
- **Alert Banner**: Displays critical alerts and warnings
- **Device Cards**: Latest readings with status indicators
- **Nitrogen Chart**: Time-series visualization of nitrogen levels
- **Add Reading Form**: Manual data entry with validation

### Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for various screen sizes

## 🚨 Alert System

The application monitors sensor readings and triggers alerts when:

- **Critical (Red)**: Nitrogen > 200 ppm
- **Warning (Yellow)**: pH outside 6.0-7.0 range

Alerts are displayed in:

- Alert banner at the top of dashboard
- Individual device cards
- Status indicators and badges

## 🧪 Data Validation

### Backend Validation

- Device ID format: `XX000` (e.g., GH001)
- Nitrogen: 0-500 ppm
- Phosphorus: 0-200 ppm
- pH: 0-14 scale
- Timestamp: Valid ISO 8601 format

### Frontend Validation

- Real-time form validation
- User-friendly error messages
- Input constraints and hints
- Proper TypeScript typing

## 🔄 Development Workflow

### Available Scripts

**Root level:**

```bash
npm run dev          # Start all services in development
npm run build        # Build all packages
npm run test         # Run tests for all packages
npm run lint         # Lint all packages
npm run lint:fix     # Fix linting issues
```

**Backend specific:**

```bash
npm run dev          # Start with hot reload
npm run build        # Build for production
npm run seed         # Seed database with sample data
npm run test         # Run unit tests
```

**Frontend specific:**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run component tests
```

## 📈 Performance Considerations

### Frontend Optimizations

- React Query caching with appropriate stale times
- Component memoization for pure components
- Lazy loading for chart components
- Optimized bundle splitting with Vite

### Backend Optimizations

- Database indexing on deviceId and timestamp
- Query optimization for latest readings
- Proper error handling and logging
- Request validation and sanitization

## 🐳 Docker Support

The project includes Docker configuration for easy deployment:

```bash
docker-compose up
```

This will start both frontend and backend services with proper networking.

## 🧪 Testing Strategy

### Backend Testing

- Unit tests for services and utilities
- Integration tests for API endpoints
- E2E tests for critical user flows

### Frontend Testing

- Component tests with React Testing Library
- Custom hook testing
- User interaction testing

## 📝 Code Quality

### Standards Followed

- **TypeScript strict mode** for type safety
- **ESLint + Prettier** for consistent formatting
- **Conventional commits** for clear git history
- **Feature-based folder structure** for scalability
- **Component composition** over inheritance
- **Custom hooks** for reusable logic

### React Best Practices

- Functional components with hooks
- Proper prop typing with interfaces
- Error boundaries for error handling
- Memoization for performance
- Absolute imports for clean code

## 🚀 Deployment

Was planning to host this in Netlify, but did not do because of time constraint & db hosting.

### Production Build

```bash
npm run build
```

### Environment Variables

Create `.env` files for different environments:

**Backend (.env):**

```
NODE_ENV=production
PORT=3001
DATABASE_PATH=production.sqlite
FRONTEND_URL=https://your-frontend-url.com
```

**Frontend (.env):**

```
VITE_API_URL=https://your-api-url.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements based on broader scope and more time

- Real-time WebSocket updates (for realtime feedback from devices)
- User authentication and authorization
- Data export functionality
- Advanced analytics and reporting
- Mobile app with React Native
- Multi-tenant support
- Advanced alerting with email/SMS notifications
- Better decision for caches of data coming from endpoints (caching data)

## For support

- Feel free to email me at shailo199925@gmail.com.

## AI Usage

- Tools Used: - Cursor AI for react components - Used cursor to quickly implement react components - Faced hiccups in implementing Chart Js, cursor fixed the issues quickly - Any bugs and race conditions - Chatgpt for detailed implementation plan - Gave the project spec to chatgpt, it gave a awesome implementation plan - Then gave the plan to Cursor for quick implementation of the boilerplate code & make the project structure
- Helpful Prompt: - The main prompt that I gave to chatgpt:
- AI Fix: - Css issues: Design issues, padding, width heights of the components - Endpoint objective: Some endpoints were not behaving as expected, which need manual intervention - for ex, /readings api was having a bad exception error due to endpoint parameters we having conflicting types - Component names: Renamed some components for better understanding - Had to fix some Lerna dependency issues, package.json config issues

---

Built with ❤️ by Shailesh Das for Nordetect
