# Educational Resource Library - User Guide

## 📖 Table of Contents
1. [Getting Started](#getting-started)
2. [Login & Registration](#login--registration)
3. [Student/Educator Guide](#studenteducator-guide)
4. [Admin Guide](#admin-guide)
5. [Features Overview](#features-overview)
6. [Troubleshooting](#troubleshooting)

## Getting Started

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js 14+ (for development)
- npm or yarn package manager

### Installation Steps

1. **Navigate to Project Directory**:
   ```bash
   cd c:\Users\jyasa\OneDrive\Documents\Desktop\FullStackProject
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Access Application**:
   - Open browser to `http://localhost:3000`
   - You'll be redirected to the login page

## Login & Registration

### Demo Accounts

#### Admin Account
- **Email**: admin@example.com
- **Password**: admin123
- **Role**: Administrator with full access

#### Student Account
- **Email**: student@example.com
- **Password**: student123
- **Role**: User with library access

### Creating New Account

1. Click "Register" link on login page
2. Enter username, email, and password
3. Click "Register" button
4. You'll be automatically logged in and redirected to library

## Student/Educator Guide

### Accessing the Library

After logging in, you'll see the main Resource Library page with:
- Navigation bar at the top
- Search bar for finding materials
- Category filter on the left
- Grid of resource cards

### Searching for Resources

1. **Search Bar**:
   - Click on search box with 🔍 icon
   - Type keywords (title, author, topic, tags)
   - Results update in real-time

2. **Category Filter**:
   - Select category from left sidebar
   - Choose from available categories
   - Combine with search for refined results

### Resource Cards

Each resource card displays:
- 📖/📄/📝 Type icon
- Resource title
- Description
- Author name
- Category
- Upload date
- File size
- Tags (hashtags)
- ⭐ Average rating
- 📥 Download count
- 💬 Number of reviews

### Downloading Resources

1. Find desired resource
2. Click "⬇️ Download" button
3. Resource downloads start automatically
4. Download counter increments

### Providing Feedback

1. Click "💭 Feedback" button on resource card
2. **Add Your Review**:
   - Select rating (1-5 stars)
   - Write your comment
   - Click "Submit Feedback"

3. **View Feedback**:
   - See all previous reviews
   - Check ratings from other users
   - Read helpful comments

### Resource Information

On each card you can see:
- Resource Type (Textbook, Research Paper, Study Guide, Other)
- Complete metadata (author, category, date)
- File size for download planning
- Quality metrics (rating, downloads)
- Relevance tags

## Admin Guide

### Accessing Admin Dashboard

1. Login with admin credentials
2. Click "Admin Dashboard" in navigation bar
3. You'll see dashboard with statistics and management tools

### Admin Dashboard Components

#### Statistics Section
Shows 4 key metrics:
- **Total Resources**: Number of materials in library
- **Total Downloads**: Sum of all downloads
- **Average Rating**: Mean rating across all resources
- **Feedback Count**: Total reviews in system

#### Upload New Resource

1. Click "+ Upload Resource" button
2. Fill in resource information:
   - **Title**: Resource name
   - **Description**: Detailed description
   - **Type**: Choose from dropdown
     - Textbook
     - Research Paper
     - Study Guide
     - Other
   - **Author**: Original author name
   - **Category**: Subject area (e.g., Computer Science, Mathematics)
   - **Tags**: Comma-separated keywords (e.g., "python, programming, beginner")

3. Click "Upload Resource" button
4. Resource appears in library immediately

#### Managing Resources

In the "Manage Resources" section:
- Table shows all resources with details
- View: Title, Type, Author, Category, Size, Downloads, Rating, Feedback
- Actions:
  - **🗑️ Delete**: Remove resource from library
  - Confirmation required before deletion

### Analytics

Monitor library usage:
- Track total uploads
- See which resources are most popular
- Monitor user engagement through ratings
- Review feedback to improve collection

## Features Overview

### 1. Search & Discovery
- **Real-time Search**: Instant results as you type
- **Multi-field Search**: Search across titles, authors, descriptions, tags
- **Combined Filtering**: Search + category filter together

### 2. Resource Management
- **Upload**: Admins can add new materials
- **Delete**: Remove outdated or inappropriate content
- **Organize**: Categorize by subject
- **Tag**: Add searchable keywords

### 3. Feedback System
- **Rating**: 1-5 star rating system
- **Comments**: Detailed user reviews
- **Display**: Average ratings on cards
- **Automatic Calculation**: Average updates with new ratings

### 4. User Management
- **Authentication**: Secure login/registration
- **Roles**: Admin and User roles
- **Access Control**: Protected pages by role
- **Session Management**: Safe logout

### 5. Responsive Design
- **Mobile**: Works on phones
- **Tablet**: Optimized for tablets
- **Desktop**: Full-featured desktop experience
- **All Devices**: Same functionality everywhere

### 6. User Interface
- **Navigation**: Easy page switching
- **Sorting**: View resources by popularity, rating, date
- **Filtering**: Category and search filters
- **Feedback**: Clear status messages

## Troubleshooting

### Can't Log In

**Problem**: Login fails with error
- **Solution**: Check email and password are correct
- **Solution**: Use demo accounts if you forgot password
- **Solution**: Register new account

### Can't Find Resources

**Problem**: No search results
- **Solution**: Try different search terms
- **Solution**: Clear filters and search again
- **Solution**: Browse all categories

### Download Not Working

**Problem**: Download button doesn't work
- **Solution**: Check browser download settings
- **Solution**: Ensure JavaScript is enabled
- **Solution**: Try different browser

### Can't Upload Resource (Admin)

**Problem**: Upload button disabled
- **Solution**: Fill all required fields (marked with *)
- **Solution**: Check you're logged in as admin
- **Solution**: Try again with valid data

### Page Not Loading

**Problem**: Page appears blank or broken
- **Solution**: Refresh the page (F5 or Cmd+R)
- **Solution**: Clear browser cache
- **Solution**: Try incognito/private mode
- **Solution**: Check internet connection

### Feedback Not Submitting

**Problem**: Feedback submission fails
- **Solution**: Ensure you're logged in
- **Solution**: Fill in rating and comment
- **Solution**: Check comment isn't empty

## Data Storage

All data is stored locally in your browser:
- User accounts
- Resources and metadata
- Feedback and ratings
- Download history

**Note**: Data persists between sessions but is device-specific

## Tips & Best Practices

### For Students
1. Use specific keywords in searches
2. Check resource ratings before downloading
3. Read feedback from other users
4. Add helpful reviews for others
5. Organize by category for easier browsing

### For Educators
1. Keep resource descriptions detailed
2. Use relevant tags for discoverability
3. Organize resources by curriculum
4. Monitor ratings for quality feedback
5. Update materials regularly

### For Admins
1. Review new resource uploads regularly
2. Monitor rating trends
3. Remove outdated materials
4. Organize resources logically
5. Encourage user feedback

## Keyboard Shortcuts

- `Tab`: Navigate between elements
- `Enter`: Submit forms or buttons
- `Escape`: Close dialogs/modals

## Browser Compatibility

- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Support

For technical issues or questions:
1. Check this guide
2. Review PROJECT_SUMMARY.md for technical details
3. Check browser console (F12) for errors

## Feedback

To improve this application:
1. Use the feedback system for resource reviews
2. Provide suggestions through reviews
3. Report issues through feedback comments

---

**Version**: 1.0.0
**Last Updated**: February 24, 2026
**Status**: Production Ready
