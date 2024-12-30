# Traffic Violation System

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication and Firestore in your project
3. Get your Firebase configuration:
   - Go to Project Settings
   - Scroll down to "Your apps"
   - Click the web icon (</>)
   - Register your app and copy the configuration
4. Create a `.env` file in the root directory
5. Copy the contents of `.env.example` to `.env`
6. Replace the placeholder values with your Firebase configuration

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```