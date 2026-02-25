# Educational Resource Library

A comprehensive web-based platform for organizing and accessing educational materials including textbooks, research papers, and study guides.

## Features

### User Features
- **Search & Discovery**: Powerful search functionality to find resources by title, author, tags, and category
- **Resource Access**: Browse and download educational materials
- **Feedback System**: Rate resources and provide feedback to improve the library
- **Category Filtering**: Filter resources by academic categories
- **User Authentication**: Secure login and registration

### Admin Features
- **Upload Management**: Upload and organize educational resources
- **User Access Control**: Manage student and educator access
- **Resource Management**: Edit, delete, and organize resources
- **Analytics Dashboard**: View statistics on downloads, ratings, and feedback
- **Category Management**: Organize resources by subject/category

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3 with responsive design

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resource-library
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Demo Credentials

For testing purposes, use these credentials:
- **Email**: admin@example.com
- **Password**: admin123

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navigation.tsx   # Navigation bar
│   ├── ProtectedRoute.tsx
│   ├── ResourceCard.tsx # Resource display card
│   ├── ResourceForm.tsx # Upload form
│   ├── ResourceList.tsx # Admin resource list
│   ├── SearchBar.tsx    # Search component
│   └── FeedbackSection.tsx
├── pages/              # Page components
│   ├── Login.tsx       # Authentication page
│   ├── AdminDashboard.tsx # Admin panel
│   └── ResourceLibrary.tsx # Main library
├── context/            # React context
│   └── AuthContext.tsx # Authentication context
├── hooks/              # Custom hooks
│   ├── useAuth.ts      # Auth logic
│   └── useAuthContext.ts
├── services/           # API services
│   └── api.ts          # Mock API service
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Usage

### For Students/Educators

1. Register a new account or log in
2. Browse the resource library
3. Search for specific materials using keywords
4. Filter by category if needed
5. Download resources
6. Leave feedback and ratings

### For Administrators

1. Log in with admin credentials
2. Access the Admin Dashboard
3. Upload new resources with:
   - Title and description
   - Resource type (textbook, research paper, study guide)
   - Author information
   - Category and tags
4. View analytics on resource usage
5. Manage existing resources (view, delete)

## Features in Detail

### Search & Filter
- Real-time search across resource titles, descriptions, and tags
- Category-based filtering
- Combined search and filter functionality

### Feedback System
- Rate resources from 1-5 stars
- Add detailed comments and reviews
- View average ratings and user feedback
- Resource ratings update automatically

### Admin Statistics
- Total resources in library
- Total downloads across all resources
- Average rating across library
- Total feedback count

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Build

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Data Storage

Currently, the application uses localStorage for:
- User accounts and authentication
- Resources and metadata
- Feedback and ratings

For a production deployment, integrate with a real backend API.

## Future Enhancements

- Backend integration with database
- Advanced user permission system
- Resource versioning
- Recommendation engine
- Discussion forums
- File upload and storage
- Email notifications
- Advanced analytics

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions, please contact the development team.
