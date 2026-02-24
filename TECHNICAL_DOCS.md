# Educational Resource Library - Technical Documentation

## 🏗️ Architecture Overview

### Application Structure

```
┌─────────────────────────────────────────┐
│          Browser / React App            │
├─────────────────────────────────────────┤
│     Routing Layer (React Router)        │
├─────────────────────────────────────────┤
│ Pages (Login, Library, AdminDashboard)  │
├─────────────────────────────────────────┤
│      Components (Cards, Forms, etc)     │
├─────────────────────────────────────────┤
│ Context (Auth) | Hooks | Services       │
├─────────────────────────────────────────┤
│   LocalStorage (Users, Resources, etc)  │
└─────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 18.2.0 |
| Language | TypeScript | 5.0+ |
| Build Tool | Vite | 4.4+ |
| Routing | React Router | 6.14+ |
| HTTP Client | Axios | 1.4+ |
| Styling | CSS3 | Native |
| Package Manager | npm | Latest |

## 📁 File Structure Explanation

### `/src` Directory

#### Root Files
- **`main.tsx`**: Application entry point, mounts React app to DOM
- **`App.tsx`**: Root component with routing logic
- **`index.css`**: Global styles and base CSS
- **`App.css`**: App-specific styles

#### `/context` - State Management
- **`AuthContext.tsx`**: Global authentication context
  - Defines `AuthContextType` interface
  - Provides user state globally
  - Methods: login, logout, register

#### `/hooks` - Custom React Hooks
- **`useAuth.ts`**: Authentication business logic
  - User state management
  - Login/registration logic
  - LocalStorage persistence
  - Demo user initialization
  
- **`useAuthContext.ts`**: Context consumption hook
  - Safe access to AuthContext
  - Error handling for missing provider

#### `/services` - API Layer
- **`api.ts`**: Mock API service
  - `Resource` interface definition
  - `Feedback` interface definition
  - CRUD operations for resources
  - Search and filter logic
  - Feedback management
  - LocalStorage operations

#### `/pages` - Full Page Components

**`Login.tsx`**
- Login and registration forms
- Form validation
- Error display
- Demo credentials hint
- Redirect to library on success

**`ResourceLibrary.tsx`**
- Main resource browsing page
- Search bar integration
- Category filtering
- Resource grid display
- Loading states

**`AdminDashboard.tsx`**
- Statistics display
- Resource upload form
- Resource management table
- Analytics calculations
- CRUD operations for resources

#### `/components` - Reusable Components

**`Navigation.tsx`**
- Top navigation bar
- User info display
- Logout functionality
- Admin link (conditional)
- Responsive mobile menu

**`ProtectedRoute.tsx`**
- Route protection wrapper
- Role-based access control
- Redirects unauthorized users
- Used with React Router

**`SearchBar.tsx`**
- Search input field
- Real-time search triggering
- Placeholder text

**`ResourceCard.tsx`**
- Individual resource display
- Download button
- Feedback toggle
- Rating display
- Stats (downloads, rating, feedback count)

**`ResourceForm.tsx`**
- Resource upload form
- Input validation
- Error handling
- Form submission
- Field reset after submission

**`ResourceList.tsx`**
- Admin resource table
- All resource metadata display
- Delete functionality
- Responsive table design

**`FeedbackSection.tsx`**
- Feedback submission form
- Rating selector (1-5 stars)
- Comment textarea
- Feedback list display
- Review rendering

## 🔄 Data Flow

### Authentication Flow

```
User Input (Email/Password)
         ↓
    useAuth Hook
         ↓
  Validate in LocalStorage
         ↓
   Set User State
         ↓
  Save to LocalStorage
         ↓
Navigate to /library
```

### Resource Search Flow

```
User Types in Search Bar
         ↓
  SearchBar Component
         ↓
  Triggers onSearch Callback
         ↓
  ResourceLibrary Component
         ↓
  Calls api.getResources()
         ↓
  Filter by Search Term
         ↓
  Filter by Category
         ↓
  Set Filtered Resources
         ↓
  Render ResourceCards
```

### Feedback Submission Flow

```
User Rates & Comments
         ↓
  FeedbackSection Form
         ↓
  Validate Input
         ↓
  Call api.addFeedback()
         ↓
  Update LocalStorage
         ↓
  Recalculate Average Rating
         ↓
  Add to Feedback List
         ↓
  Display Confirmation
```

## 🗄️ Data Schema

### User Object
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}
```

### Resource Object
```typescript
interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'textbook' | 'research_paper' | 'study_guide' | 'other';
  author: string;
  uploadedBy: string;
  uploadedAt: string;
  fileUrl: string;
  fileSize: number;
  category: string;
  tags: string[];
  downloads: number;
  rating: number;
  feedback: Feedback[];
}
```

### Feedback Object
```typescript
interface Feedback {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}
```

## 💾 LocalStorage Schema

### Users Collection
```javascript
localStorage.users = [
  {
    id: string,
    username: string,
    email: string,
    password: string,
    role: 'admin' | 'user'
  }
]
```

### Resources Collection
```javascript
localStorage.resources = [
  // Array of Resource objects
]
```

### Current User Session
```javascript
localStorage.currentUser = {
  id: string,
  username: string,
  email: string,
  role: string
}
```

## 🔐 Security Considerations

### Current Implementation (Development)
- ⚠️ Passwords stored in plaintext in localStorage
- ⚠️ No encryption
- ⚠️ Data visible in browser dev tools

### For Production, Add:
1. **Backend Authentication**
   - JWT tokens
   - Secure password hashing (bcrypt)
   - Refresh token mechanism
   - Session management

2. **HTTPS**
   - All communications encrypted
   - Secure cookies
   - SameSite cookie attributes

3. **API Security**
   - CORS policy
   - Rate limiting
   - Input validation
   - SQL injection prevention
   - XSS protection

4. **Data Protection**
   - Encrypt sensitive data at rest
   - Secure file storage
   - Data access logs
   - Regular backups

## 🎨 CSS Architecture

### Style Organization
- Component-specific CSS files
- Global styles in `index.css`
- Responsive design with media queries
- CSS Variables (for colors, spacing)

### Color Scheme
```css
Primary: #667eea (Purple)
Secondary: #764ba2 (Dark Purple)
Accent: #ff6b6b (Red/Delete)
Background: #f5f5f5 (Light Gray)
Text: #333 (Dark Gray)
Border: #ddd (Light Gray)
```

### Responsive Breakpoints
```css
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

## 📦 Dependencies

### Production Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.14.0",
  "axios": "^1.4.0"
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^4.0.3",
  "typescript": "^5.0.2",
  "vite": "^4.4.5"
}
```

## 🚀 Build & Deployment

### Development Server
```bash
npm run dev
# Runs on http://localhost:3000
# Auto-reload on file changes
# Source maps for debugging
```

### Production Build
```bash
npm run build
# Creates optimized build
# Output: dist/ directory
# Ready for deployment
```

### Preview Production Build
```bash
npm run preview
# Serves dist/ locally
# Tests production build
```

## 🧪 Testing Considerations

### Unit Tests (To Implement)
- Hook tests (useAuth, useAuthContext)
- Component tests (ResourceCard, SearchBar)
- Service tests (api.ts functions)
- Context tests (AuthContext)

### Integration Tests (To Implement)
- Login flow
- Resource upload flow
- Search and filter flow
- Feedback submission

### E2E Tests (To Implement)
- Full user journey
- Admin workflow
- Search functionality
- Download process

## 📊 Performance Optimizations

### Current Optimizations
- React lazy loading ready
- CSS minified in production
- Vite bundle optimization

### Further Optimizations
1. Code splitting by route
2. Lazy loading components
3. Image optimization
4. Caching strategies
5. Virtual scrolling for large lists

## 🔍 Debugging

### Browser DevTools
```javascript
// View stored users
JSON.parse(localStorage.getItem('users'))

// View stored resources
JSON.parse(localStorage.getItem('resources'))

// View current user
JSON.parse(localStorage.getItem('currentUser'))

// Clear all data
localStorage.clear()
```

### React Developer Tools
- View component hierarchy
- Inspect component props/state
- Trace re-renders
- Monitor performance

## 🌐 API Integration Guide

### Replacing Mock API with Real Backend

1. **Update api.ts**:
   ```typescript
   // Before (Mock)
   export const api = {
     getResources: async () => { ... }
   }
   
   // After (Real API)
   export const api = {
     getResources: async (search?, category?) => {
       return axios.get('/api/resources', {
         params: { search, category }
       })
     }
   }
   ```

2. **Environment Variables**:
   ```
   VITE_API_URL=https://api.example.com
   VITE_API_KEY=your_key
   ```

3. **Axios Configuration**:
   ```typescript
   axios.defaults.baseURL = import.meta.env.VITE_API_URL
   axios.interceptors.request.use(/* add auth header */)
   ```

## 📝 Code Standards

### TypeScript
- Strict mode enabled
- All functions typed
- Interface for data structures
- No `any` types

### React Best Practices
- Functional components
- Hooks for state management
- Props drilling avoided (Context API used)
- Proper key usage in lists

### File Naming
- Components: PascalCase
- Functions/hooks: camelCase
- CSS files: match component name
- Types/interfaces: PascalCase

## 🔗 Environment Setup

### Required Environment Variables
```
VITE_API_URL=http://localhost:3001
VITE_DEBUG=false
VITE_APP_NAME="Resource Library"
```

### Optional Configuration
```
VITE_DISABLE_MOCK_DATA=false
VITE_SESSION_TIMEOUT=3600000
VITE_MAX_UPLOAD_SIZE=52428800
```

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Project overview and features |
| USER_GUIDE.md | End-user instructions |
| PROJECT_SUMMARY.md | Implementation details |
| TECHNICAL_DOCS.md | This file - Architecture & code |

## 🚦 Status & Roadmap

### Current Status: ✅ Complete
- All core features implemented
- Mock API functional
- UI responsive and styled
- Documentation comprehensive

### Future Enhancements
- [ ] Backend API integration
- [ ] Database persistence
- [ ] Advanced authentication
- [ ] File upload/download
- [ ] Email notifications
- [ ] Search analytics
- [ ] User permissions
- [ ] Resource versioning
- [ ] Discussion forums
- [ ] Recommendations engine

---

**Version**: 1.0.0
**Last Updated**: February 24, 2026
**Maintainer**: Development Team
