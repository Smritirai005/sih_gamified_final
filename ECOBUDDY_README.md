# EcoBuddy AI Assistant Integration

## 🌱 EcoBuddy Features

EcoBuddy is an AI-powered chat assistant integrated into your EcoGame platform that helps users:

- Learn about environmental topics
- Understand game features and mechanics
- Get tips for eco-friendly living
- Answer questions about sustainability
- Provide educational content in a fun, engaging way

## 🚀 Setup Instructions

### 1. Get Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and replace `your_api_key_here` with your actual API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Restart Development Server

After adding the API key, restart your development server:
```bash
npm run dev
```

## 🎮 How to Use EcoBuddy

1. **Access EcoBuddy**: Look for the floating green chat button in the bottom-right corner
2. **Click to Open**: Click the chat button to open the EcoBuddy interface
3. **Start Chatting**: Type your questions about:
   - Environmental topics (pollution, climate change, etc.)
   - Game features and mechanics
   - Eco-friendly tips and advice
   - General environmental questions

## 🔧 Features

- **Real-time AI Responses**: Powered by Google Gemini AI
- **Environmental Focus**: Specialized knowledge about eco-topics
- **Game Integration**: Understands your platform's features
- **Mobile Responsive**: Works on all devices
- **Fallback System**: Uses mock responses if API is unavailable

## 🎨 Customization

The EcoBuddy component can be customized by modifying:
- `src/components/EcoBuddy.jsx` - Main component logic
- `src/components/EcoBuddy.css` - Styling and appearance
- System instruction in the component for AI behavior

## 🛠️ Technical Details

- **AI Model**: Google Gemini 1.5 Flash
- **Framework**: React with hooks
- **Styling**: Custom CSS with pixelated theme
- **API**: Google Generative AI SDK
- **Fallback**: Mock responses for offline/demo mode

## 📝 Notes

- The AI is configured to respond only to environmental and platform-related questions
- Responses are formatted as bullet points for better readability
- The system includes safety measures and content filtering
- EcoBuddy maintains context throughout the conversation

Enjoy your new AI-powered environmental learning assistant! 🌍✨

