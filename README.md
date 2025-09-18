# 🌱 EcoGame - Gamified Environment App

A beautiful, environmentally-themed React application that gamifies environmental awareness and sustainability practices. Built with React, Vite, Firebase Authentication, and Lucide React icons.

## ✨ Features

- **Beautiful Eco-Friendly UI**: Modern, environmentally-themed design with green color palette
- **Firebase Authentication**: Secure login/signup with email/password and Google authentication
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Floating animations, hover effects, and smooth transitions
- **Environmental Statistics**: Display of environmental impact metrics
- **Feature Showcase**: Highlighting different environmental activities

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Firebase project (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sih-ecogame
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Enable Authentication and add Email/Password and Google sign-in methods
   - Get your Firebase configuration

4. **Configure Firebase**
   - Open `src/firebase/config.js`
   - Replace the placeholder values with your actual Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-actual-api-key",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-actual-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "your-actual-sender-id",
     appId: "your-actual-app-id"
   };
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - You should see the beautiful EcoGame homepage!

## 🎨 Design Features

### Color Palette
- **Primary Green**: #2d5a27 (Forest green)
- **Secondary Green**: #4a7c59 (Medium green)
- **Light Green**: #7fb069 (Bright green)
- **Accent Green**: #a8d5a8 (Light accent)
- **Earth Brown**: #8b4513 (Natural brown)
- **Sky Blue**: #87ceeb (Sky blue)

### UI Components
- **Eco Cards**: Glass-morphism effect with subtle shadows
- **Floating Icons**: Animated environmental icons
- **Gradient Buttons**: Beautiful gradient effects with hover animations
- **Responsive Grid**: Adaptive layout for all screen sizes

## 🔐 Authentication Features

- **Email/Password Authentication**: Traditional signup and login
- **Google Authentication**: One-click sign-in with Google
- **Form Validation**: Real-time validation with error messages
- **Password Visibility Toggle**: User-friendly password input
- **Responsive Modal**: Beautiful authentication modal design

## 📱 Responsive Design

The app is fully responsive and optimized for:
- **Desktop**: Full-featured experience with side-by-side layouts
- **Tablet**: Adapted layouts with touch-friendly interactions
- **Mobile**: Stacked layouts with mobile-optimized navigation

## 🛠️ Tech Stack

- **React 19**: Latest React with modern features
- **Vite**: Fast build tool and development server
- **Firebase**: Authentication and database services
- **Lucide React**: Beautiful, customizable icons
- **CSS3**: Modern CSS with custom properties and animations

## 📁 Project Structure

```
sih-ecogame/
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx      # Authentication modal component
│   │   └── AuthModal.css      # Authentication modal styles
│   ├── contexts/
│   │   └── AuthContext.jsx    # Firebase authentication context
│   ├── firebase/
│   │   └── config.js          # Firebase configuration
│   ├── App.jsx                # Main application component
│   ├── App.css                # Main application styles
│   ├── index.css              # Global styles and CSS variables
│   └── main.jsx               # Application entry point
├── public/
├── package.json
└── README.md
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features Implemented

1. **Environmentally-Themed Homepage**: Beautiful landing page with eco-friendly design
2. **Firebase Authentication**: Complete authentication system with multiple sign-in methods
3. **Responsive UI**: Mobile-first design that works on all devices
4. **Interactive Elements**: Smooth animations and hover effects
5. **Modern Icons**: Beautiful environmental icons from Lucide React
6. **Glass-morphism Design**: Modern UI with backdrop blur effects

## 🔧 Customization

### Adding New Features
- Add new components in the `src/components/` directory
- Update the main App.jsx to include new sections
- Use the established color palette for consistency

### Styling
- Modify CSS variables in `src/index.css` for global color changes
- Add new utility classes following the `.eco-*` naming convention
- Use the existing component structure for consistency

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel, Netlify, Firebase Hosting, or any static hosting service
   - Make sure to configure your Firebase project for production

## 📝 Notes

- The Firebase configuration is currently set to placeholder values
- Make sure to replace them with your actual Firebase project configuration
- The app includes both email/password and Google authentication
- All authentication state is managed through React Context

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with 🌱 for a greener future!**