# Next.js Analytics Dashboard

A modern, responsive analytics dashboard built with Next.js 14+ featuring real-time data visualization, role-based authentication, and interactive data tables.

## 🚀 Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **State Management:** Redux Toolkit with Redux Persist
- **Data Fetching:** React Query (TanStack Query)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Tables:** TanStack Table v8
- **Form Validation:** Zod with React Hook Form
- **Authentication:** Mock auth with Redux (simulated)

## 🛠️ Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/aman-eth/nextjs-analytics-dashboard.git
   cd nextjs-analytics-dashboard
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open Application**
   - Navigate to [http://localhost:3000](http://localhost:3000). You will be redirected to `/dashboard`
   - Login with test credentials or register new account
   - For admin access, use email: `admin@gmail.com` with any password

## 🏗️ Project Structure

```
src/
├── app/ # Next.js App Router pages
│ ├── auth/ # Authentication pages
│ │ ├── login/
│ │ └── register/
│ ├── dashboard/ # Dashboard and analytics pages
│ └── profile/ # User profile page
├── components/ # Reusable components
│ ├── auth/ # Authentication components
│ ├── charts/ # Chart components
│ ├── dashboard/ # Dashboard-specific components
│ ├── layout/ # Layout components
│ ├── table/ # Table components
│ └── ui/ # Common UI components
├── hooks/ # Custom hooks
├── lib/ # Utilities and configurations
│ ├── api/ # API functions
│ ├── guards/ # Auth guards
│ └── validation/ # Zod schemas
├── store/ # Redux store configuration
└── data/ # Mock data (JSON files)
```

## 🎯 Features Implemented

### 1. Authentication

- ✅ Login and Register pages with form validation
- ✅ Role-based authorization (Admin/User)
- ✅ Protected routes using Guards
- ✅ Persistent authentication with Redux Persist
- ✅ User profile management

### 2. Dashboard Analytics

- ✅ Interactive charts using Recharts:
  - Line Chart (Visitors Over Time)
  - Bar Chart (Sales Breakdown)
  - Area Chart (Revenue Growth)
  - Pie Chart (Bounce Rate)
- ✅ CSV data export functionality
- ✅ Responsive grid layout
- ✅ Dynamic data loading states

### 3. Data Tables

- ✅ Sortable and filterable columns
- ✅ Client-side pagination
- ✅ Global search functionality
- ✅ Date range filtering
- ✅ Custom table hooks for state management

### 4. UI/UX Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ Loading skeletons
- ✅ Error boundaries
- ✅ Empty states
- ✅ Smooth transitions and animations

## 🔧 Custom Hooks

1. `useAnalytics` - Data fetching and caching for analytics
2. `useAnalyticsTable` - Table state management
3. `useAuth` - Authentication state and methods
4. `useRedux` - Typed Redux hooks
5. `useRoleGuard` - Role-based access control

## 🏢 Component Architecture

### Server Components

- Loading states (Skeleton, ChartLoading)
- Static UI elements (Card, ErrorMessage)
- Layout components (PageHeader)

### Client Components

- Interactive charts
- Data tables
- Form components
- Authentication forms

## 💾 State Management

### Redux Store

- Authentication state
- User preferences
- Role management

### React Query

- Analytics data caching
- Automatic background updates
- Loading/error states

## 🛡️ Type Safety

- Zod schemas for form validation
- TypeScript interfaces for data models
- Proper prop typing
- Redux state typing

## 🎨 UI Components

### Base Components

- Button
- Card
- Input
- Skeleton
- LoadingSpinner

### Compound Components

- Table with filters
- Date range picker
- Chart cards with loading states

## 🔐 Security Features

- Protected routes
- Role-based access control
- Authentication persistence
- Secure routing guards

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation
- Adaptive chart layouts
- Flexible table views

## ⚡ Performance Optimizations

- Server Components for static content
- Dynamic imports for heavy components
- React Suspense for loading states
- Efficient state management
- Proper code splitting

## 🧪 Mock Data Implementation

- JSON files for analytics data
- Simulated API delays
- Realistic data structures
- Type-safe mock data

## 🚶‍♂️ Walkthrough

1. **Authentication Protection**

   - All pages (`/dashboard`, `/dashboard/analytics-table`, `/profile`) are protected except auth pages (`/auth/login`, `/auth/register`)
   - You must login or register before accessing protected pages
   - Attempting to access protected pages while logged out will redirect to login

2. **Role-Based Access**

   - `/dashboard` and `/profile` pages are accessible by users with "user" role
   - `/dashboard/analytics-table` is restricted to users with "admin" role only
   - Non-admin users attempting to access admin pages will be redirected

3. **Login Credentials**
   - Regular User Login:
     - Use any email address
     - Use any password
   - Admin Login:
     - Email: `admin@gmail.com`
     - Password: any password
4. **Admin Registration**
   - Alternative way to get admin access:
     - Navigate to `/auth/register`
     - Fill in registration details
     - Select "admin" from role dropdown
     - Submit to create admin account
