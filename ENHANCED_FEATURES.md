# Enhanced Features Documentation

## New Features Added

### 1. Separate Authentication for Students and Teachers

- **Role Selection**: During signup, users can choose between "Student" and "Teacher" roles
- **Role Display**: User roles are displayed in the dashboard with appropriate icons
- **Role Persistence**: User roles are stored in both Firestore and localStorage
- **UI Consistency**: Maintains the existing pixelated game design and color scheme

### 2. Enhanced Quiz Section with AI-Generated Questions

- **Topic Selection**: Students can choose from 6 environmental topics:
  - Climate Change
  - Renewable Energy
  - Ocean Conservation
  - Biodiversity
  - Water Conservation
  - Waste Management

- **Difficulty Levels**: Three difficulty options (Easy, Medium, Hard)
- **Question Count**: Flexible question count (3, 5, 10, or 15 questions)
- **AI Integration**: Uses Google Gemini AI to generate personalized quiz questions
- **Fallback System**: Includes comprehensive mock questions if AI is unavailable

### 3. AI Service Integration

- **Google Gemini AI**: Integrated with Google's Generative AI for question generation
- **Smart Fallback**: Comprehensive question bank for offline/demo use
- **Error Handling**: Graceful degradation when AI service is unavailable
- **Environment Configuration**: Easy setup with environment variables

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the project root with:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

### 2. Features Overview

#### Authentication Flow
1. User clicks "Login" or "Sign Up"
2. For signup, user selects role (Student/Teacher)
3. User completes registration with email/password or Google OAuth
4. Role is stored and displayed throughout the application

#### Quiz Flow
1. User navigates to Quiz section
2. Selects topic, difficulty, and question count
3. AI generates personalized questions (or uses fallback questions)
4. User completes quiz with real-time scoring
5. Results are saved to user profile

### 3. Technical Implementation

#### Components Added/Modified
- `EnhancedQuiz.jsx` - New comprehensive quiz component
- `AuthModal.jsx` - Updated with role selection
- `AuthContext.jsx` - Enhanced with role management
- `aiService.js` - New AI integration service
- `Dashboard.jsx` - Updated to display user roles

#### Services Enhanced
- `firestore.js` - Added role field support
- `localStorage.js` - Added role field support

#### Styling
- `GameComponents.css` - Added enhanced quiz styles
- `AuthModal.css` - Added role selection styles
- `Dashboard.css` - Added user role display styles

## Usage

### For Students
1. Sign up with "Student" role
2. Navigate to Quiz section
3. Select preferred topic and settings
4. Take AI-generated quizzes
5. Track progress in Dashboard

### For Teachers
1. Sign up with "Teacher" role
2. Access same features as students
3. Can monitor student progress (future enhancement)
4. Create custom quizzes (future enhancement)

## Future Enhancements

- Teacher dashboard for monitoring student progress
- Custom quiz creation tools for teachers
- Advanced analytics and reporting
- Multiplayer quiz competitions
- Integration with learning management systems

## Troubleshooting

### AI Questions Not Generating
- Check if `VITE_GEMINI_API_KEY` is set correctly
- Verify API key has proper permissions
- Check browser console for error messages
- System will automatically fall back to mock questions

### Role Not Displaying
- Clear browser localStorage and re-register
- Check Firestore rules for user document access
- Verify role field is being saved correctly

## Support

For issues or questions about these enhanced features, please check the console logs and ensure all environment variables are properly configured.
