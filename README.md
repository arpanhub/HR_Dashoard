# HR Dashboard

A modern, feature-rich HR management dashboard built with Next.js, featuring a custom-built mock API server for realistic employee data simulation.

## 🌟 Key Highlights

### Custom Mock API Server
This project features a **custom-built mock API server** specifically designed for this HR dashboard, providing realistic employee data and API interactions:

- **GitHub Repository:** [arpanhub/MockAPI_HrDashboard](https://github.com/arpanhub/MockAPI_HrDashboard)
- **Live API Endpoint:** [https://mockapi-hrdashboard.onrender.com/api/employees](https://mockapi-hrdashboard.onrender.com/api/employees)

The mock API server was built from scratch to simulate real-world HR data scenarios, demonstrating full-stack development capabilities and API design skills.

---

## 🔗 Links

- **Live Demo:** [https://hr-dashboard-arpanhub.vercel.app/](https://hr-dashboard-arpanhub.vercel.app/)
- **Mock API Server:** [https://mockapi-hrdashboard.onrender.com/api/employees](https://mockapi-hrdashboard.onrender.com/api/employees)
- **API Source Code:** [https://github.com/arpanhub/MockAPI_HrDashboard](https://github.com/arpanhub/MockAPI_HrDashboard)
---

## 🚀 Tech Stack & Libraries

- **Framework:** Next.js 14 (App Router)
- **UI Components:** [Aceternity UI](https://ui.aceternity.com/) - Modern, accessible React components
- **State Management:** Zustand - Lightweight state management
- **Styling:** Tailwind CSS with custom CSS variables
- **Authentication:** 
  - Google OAuth integration
  - GitHub OAuth integration
- **API Handling:** Axios for HTTP requests
- **Backend Technologies:** 
  - Mongoose (MongoDB integration)
  - bcryptjs (Password hashing)
  - jsonwebtoken (JWT authentication)
- **Icons:** Lucide React, Tabler Icons
- **Animations:** Framer Motion
- **Notifications:** react-hot-toast
- **Type Safety:** TypeScript support

---

## ✨ Features

### Core Functionality
- **Employee Dashboard:** Comprehensive view, search, and filter employees
- **Bookmarks System:** Save and quickly access favorite employees
- **Analytics Page:** Data visualization and insights
- **Profile Management:** User profile with authentication status

### Technical Features
- **App Router Navigation:** Seamless routing between Dashboard, Bookmarks, Analytics, and Profile pages
- **Responsive Design:** Mobile-first approach with modern UI/UX
- **Authentication System:** Secure login/signup with OAuth providers
- **Real-time Data:** Dynamic employee data fetching from custom API
- **State Persistence:** Bookmark and user preferences saved across sessions

---

## 🔐 Authentication

Secure authentication system supporting:

- **Google OAuth:** Quick sign-in with Google accounts
- **GitHub OAuth:** Developer-friendly GitHub integration
- **Session Management:** Persistent login sessions
- **Protected Routes:** Secure access to dashboard features
---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set up Environment Variables
Copy `.env.example` to `.env` and fill in the required values:

```env


# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Database (if using local MongoDB)
MONGODB_URI=your-mongodb-connection-string

# API Configuration
API_BASE_URL=https://mockapi-hrdashboard.onrender.com/api
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

### 5. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── bookmarks/         # Bookmarks
│   ├── analytics/         # Analytics
│   └── api/               # API routes
├── components/            # Reusable React components
│   ├── ui/               # Aceternity UI components
│   ├── dashboard/        # Dashboard-specific components
│   └── auth/             # Authentication components
├── lib/                  # Utility functions and configurations
├── store/                # Zustand state management
├── styles/               # Global styles and Tailwind config
└── public/               # Static assets
```

---

## 🔧 API Integration

The project integrates with a custom-built mock API server that provides:

- **Employee Data:** Comprehensive employee information
- **Search & Filter:** Advanced querying capabilities
- **RESTful Endpoints:** Standard HTTP methods for CRUD operations
- **Realistic Data:** Mock data that simulates real HR scenarios

### API Endpoints
- `GET /api/employees` - Fetch all employees
- `GET /api/employees/:id` - Fetch specific employee
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

---

## 🎨 UI Components

This project leverages **Aceternity UI** components for a modern, professional interface:

- Consistent design system
- Accessible components
- Smooth animations and transitions
- Responsive layouts
- Dark/light mode support

Visit [Aceternity UI](https://ui.aceternity.com/) for component documentation.

---

---

## 📱 Responsive Design

- **Mobile-First:** Optimized for mobile devices
- **Tablet Support:** Seamless tablet experience
- **Desktop Enhanced:** Rich desktop interface
- **Cross-Browser:** Compatible with modern browsers

-
## 📄 License

This project is for educational and portfolio demonstration purposes.

---


---

## 📧 Contact

For questions or feedback regarding this project, please reach out through GitHub issues or contact information in the profile.

---

*This project demonstrates full-stack development capabilities with modern web technologies, custom API development, and professional UI/UX design principles.*