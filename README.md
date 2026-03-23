# LMS_System

A comprehensive web-based management system for an English coaching center with multi-role dashboards, lead management, payment tracking, AI practice features, and course delivery system.

A comprehensive web-based management system for an English coaching center with multi-role dashboards, lead management, payment tracking, AI practice features, and course delivery system.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **API Client**: Axios + Supabase JS
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router v6

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Header, Sidebar, etc.)
│   ├── admin/          # Admin-specific components
│   ├── teacher/        # Teacher-specific components
│   └── student/        # Student-specific components
├── pages/              # Page components
│   ├── admin/          # Admin pages
│   ├── teacher/        # Teacher pages
│   └── student/        # Student pages
├── layouts/            # Layout components
├── hooks/              # Custom React hooks
├── store/              # Zustand stores
├── services/           # API service layer
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
├── constants/          # Constants and enums
└── utils/              # Helper functions
```

## Setup Instructions

### 1. Environment Setup

Create a `.env.local` file with Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 2. Database Setup

1. Create a new Supabase project
2. Go to SQL Editor and run the SQL from `docs/DATABASE_SCHEMA.sql`
3. Enable authentication (Email/Password method)

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## User Roles & Access

1. **Super Admin**: Full system control
2. **Admin Staff**: Can manage students, courses, batches, payments
3. **Teacher/Instructor**: Can manage attendance, marks, worksheets for assigned batches
4. **Student**: Can view their course, schedule, progress, AI practice
5. **Guardian**: Can monitor student progress and payments

## Features by Phase

### Phase 1: Authentication & Role System
- [ ] User authentication (Email/Password)
- [ ] Role-based access control
- [ ] Basic dashboard for each role

### Phase 2: Students & Courses
- [ ] Student management
- [ ] Course creation and management
- [ ] Batch system

### Phase 3: Payment System
- [ ] Payment tracking
- [ ] Due date management
- [ ] Invoice generation

### Phase 4: AI Practice
- [ ] Worksheet upload
- [ ] AI conversation (English/Bangla)
- [ ] Voice practice
- [ ] Scoring system

### Phase 5: Certificates
- [ ] Certificate template management
- [ ] Auto-generation
- [ ] Download & sharing

### Phase 6: Notifications
- [ ] Notice system
- [ ] Email notifications
- [ ] Dashboard notifications

### Phase 7: Analytics
- [ ] Dashboard analytics
- [ ] Revenue reports
- [ ] Student performance tracking

## API Endpoints (To be implemented)

### Auth
- POST `/auth/signup` - User registration
- POST `/auth/login` - User login
- POST `/auth/logout` - User logout

### Users
- GET `/users` - List all users
- GET `/users/:id` - Get user details
- POST `/users` - Create user
- PUT `/users/:id` - Update user

### Students
- GET `/students` - List students
- POST `/students` - Add student
- GET `/students/:id` - Get student details

### Courses
- GET `/courses` - List courses
- POST `/courses` - Create course
- GET `/courses/:id` - Get course details

### Batches
- GET `/batches` - List batches
- POST `/batches` - Create batch
- GET `/batches/:id` - Get batch details

### Payments
- GET `/payments` - List payments
- POST `/payments` - Record payment
- GET `/payments/due` - Get due payments

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint rules
- Use meaningful variable names
- Add JSDoc comments for functions

### Component Structure
```typescript
import React from 'react';

interface Props {
  // Define props
}

export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // Implementation
  return <div>Component</div>;
};
```

### State Management with Zustand
- Create stores in `src/store/`
- Use store for global state
- Local state for component-specific data

### Services Layer
- Create service files for each major entity
- Handle API calls in services
- Keep components clean

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Alternative: Netlify
1. Push to GitHub
2. Connect to Netlify
3. Set build command: `npm run build`
4. Deploy

## Testing

- Unit tests (to be added): Jest
- Integration tests: React Testing Library
- E2E tests: Playwright

## Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Submit PR

## Security Notes

- Never commit `.env.local`
- Validate all user inputs
- Use Supabase Row Level Security (RLS)
- Implement rate limiting for APIs
- Keep dependencies updated

## Support & Documentation

- Supabase docs: https://supabase.com/docs
- React docs: https://react.dev
- Tailwind docs: https://tailwindcss.com/docs
- API documentation: See `/docs/API.md` (to be created)

## License

MIT

## Contact

For support, contact the development team.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
>>>>>>> 472d7a8 (Initial commit)
