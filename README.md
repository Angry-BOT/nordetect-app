# 🌱 Nordetect - Agricultural IoT Monitoring Dashboard

A full-stack web application for monitoring sensor readings from agricultural IoT devices, built with modern technologies and following best practices.

<img width="2556" height="1293" alt="Screenshot 2025-09-13 at 9 17 55 PM" src="https://github.com/user-attachments/assets/fcfcd995-19c9-4c05-ba42-34c638cdb3f3" />

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
- **UIDesign** used material ui theme from react

### Key Functionality

- ✅ View latest readings from all devices in card format
- ✅ Interactive nitrogen level chart showing trends over time
- ✅ Alert banner highlighting threshold violations (nitrogen > 200 ppm, pH outside 6.0-7.0)
- ✅ Form to manually add new sensor readings with validation
- ✅ Responsive design working on desktop and mobile
- ✅ Real-time updates when new readings are added

### Time Taken (Split)
- Developing the implentation plan using AI, design decisions - ~40mins
- Implementing the Backend - ~30mins
- Implementing the Frontend - ~20mins
- Testing the Backend & Frontend, Fixing Bugs, Self Code Review - ~1hr 
- Total time taken from Ideation -> Final - ~2.5 - 3hrs

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

## 🎯 Future Enhancements based on broader scope and more time

- Real-time WebSocket updates (for realtime feedback from devices)
- User authentication and authorization
- Data export functionality
- Advanced analytics and reporting
- Mobile app with React Native
- Multi-tenant support
- Advanced alerting with email/SMS notifications
- Better decision for caches of data coming from endpoints (caching data)
- There might be minor sync issues sometimes, for that you can refresh the page and it will be synced

## For support

- Feel free to email me at **shailo199925@gmail.com** 🚀.

## AI Usage
**Tools Used**:

- **Chatgpt** for detailed implementation plan

- Gave the project spec to chatgpt, it gave a awesome implementation plan
- Then gave the plan to Cursor for quick implementation of the boilerplate code & make the project structure

- **Cursor AI** for react components:

- Used cursor to quickly implement react components
- Faced hiccups in implementing Chart Js, cursor fixed the issues quickly
- Any bugs and race conditions


**Helpful Prompt**:

- The main prompt that I gave to chatgpt:
```
Hi chatgpt, 

You are a senior software developer of around 5+ years of experience is developing scalable and full stack products. You are having good amount of experience in Typescript, React Js, Nest Js, SQL.
You design and implement systems as per given project requirements.

Please give me a detailed implementation plan for the below given project specifications.

Overview:
Build a simple sensor data dashboard that demonstrates your full-stack development skills.

The Challenge:
Create a web application for monitoring sensor readings from agricultural IoT devices.

Core Requirements:

Backend (REST API)

1. Endpoints to implement:
    - `POST /api/readings` - Submit a new sensor reading
    - `GET /api/readings` - Get all readings (last 24 hours)
    - `GET /api/readings/latest` - Get the most recent reading for each device

2. Simplified Data Model:
    
    ```json
    {  "deviceId": "GH001",  "timestamp": "2024-03-15T10:30:00Z",  "nitrogen": 150.5,  "phosphorus": 45.2,  "ph": 6.5}
    ```
    
3. Requirements:
    - Basic input validation (reasonable ranges for values)
    - Error handling with appropriate status codes
    - Use any database (SQLite is fine)
    - No authentication needed

4. Stack to use:
     - Use Nest Js for endpoints (Typescript language)
     - SQLite for DB (SQL language)

Frontend (Dashboard)

1. Components to build:
    - Dashboard showing latest reading from each device in a table or cards
    - Simple line chart showing nitrogen levels over time (last 24 hours)
    - Form to manually add a new reading
    - Alert banner when nitrogen exceeds 200 or ph is outside 6.0-7.0 range

2. Requirements:
    - Use React, React query for fetching apis, 
    - Basic styling (use scss)
    - Show loading states
    - Display API errors to user

3. React conventions to follow:
    1. **Structure**: Feature-based folders (`/features/readings/...`), keep files small.
    2. **Naming**: PascalCase for components, camelCase for vars/functions, CONSTANT\_CASE for constants.
    3. **Components**: Small, reusable, functional. Split UI (dumb) vs logic (container).
    4. **State**: Use React Query for server state, custom hooks for shared logic.
    5. **UI States**: Always handle loading, error, empty explicitly.
    6. **Styling**: Stick to one system (Tailwind / CSS Modules / Styled). Be consistent.
    7. **TypeScript**: Strong typing, no `any`, define prop interfaces.
    8. **API**: Centralize API calls in `/api`, handle errors globally.
    9. **Testing**: Use Jest + React Testing Library, test critical flows.
    10. **Quality**: ESLint + Prettier + strict TS, absolute imports, use git hooks.
    11. **Performance**: Use keys in lists, React.memo for pure UI, lazy loading for big chunks.

Sample Data Creation
    - Include at least 5-10 sample readings in your database/seed file
    - Cover at least 2 different device IDs

Evaluate proposed plan based on the following criteria:
1. Functionality
    - Does it meet the requirements?
    - Do frontend and backend work together?

2. Code Quality
    - Clean, readable code
    - Appropriate patterns for the scope
    - Error handling

4. Documentation
    - Can we run your project easily?
    - Clear about decisions and trade-offs

Please give me a detailed plan of implementation for it.
    1. I want to have the frontend and backend in a monorepo which is easy to start and test.
    2. Stack for development -  
         - Frontend -> ReactJs, React Query
         - Backend -> NestJs, NodeJs, SQL
         - Language -> Typescript.
    3. Plan a folder structure and for building the project will have Lerna.  
    4. Make sure to follow react and typescript coding standards. 

```
**AI Fix**:
- Css issues: Design issues, padding, width heights of the components
- Endpoint objective: Some endpoints were not behaving as expected, which need manual intervention
- for ex, /readings api was having a bad exception error due to endpoint parameters we having conflicting types
- Component names: Renamed some components for better understanding
- Had to fix some Lerna dependency issues, package.json config issues

---

Built with ❤️ by Shailesh Das for Nordetect
