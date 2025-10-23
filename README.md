# MP3 Download

Modern web application to download audio from YouTube, SoundCloud, Vimeo and other platforms.

## Features

- Download audio in MP3 format
- **Multi-language support** (Portuguese and English)
- **Light and dark theme** with automatic detection
- Modern interface with Tailwind CSS
- Animated progress bar
- Automatic cleanup of temporary files
- Responsive design
- No permanent server storage
- Preferences saved in localStorage

## Project Structure

```
node-mp3-download/
├── src/                               # TypeScript code
│   ├── config/
│   │   ├── app.ts                     # App class (Express)
│   │   ├── constants.ts               # Application constants
│   │   └── paths.ts                   # Project paths
│   ├── controllers/
│   │   └── download-controller.ts     # DownloadController class
│   ├── routes/
│   │   └── download-routes.ts         # API routes definition
│   ├── utils/
│   │   └── file-manager.ts            # FileManager class
│   └── server.ts                      # Server class (entry point)
├── dist/                              # Compiled JavaScript (generated)
├── public/
│   ├── css/
│   │   └── styles.css                 # Custom styles
│   ├── js/
│   │   └── app.js                     # Frontend logic
│   └── index.html                     # Web interface
├── temp/                              # Temporary files (auto-cleaned)
├── index.mjs                          # CLI for terminal download
├── tsconfig.json                      # TypeScript configuration
└── package.json
```

## How to Use

### Install dependencies

```bash
yarn install
# or
npm install
```

### Development (TypeScript with hot reload)

```bash
yarn dev
# or
npm run dev
```

### Build and Production

```bash
# Compile TypeScript to JavaScript
yarn build
# or
npm run build

# Start server in production
yarn start
# or
npm start
```

The server will be available at `http://localhost:3000`

### Use via CLI

```bash
yarn cli
# or
npm run cli
```

## Technologies

### Backend

- **TypeScript** - Static typing and safety
- **Express** - Web framework
- **yt-dlp-exec** - Video download
- **CORS** - Access control
- **tsx** - TypeScript execution in development

### Frontend

- **Tailwind CSS** - CSS framework
- **Lucide Icons** - SVG icons
- **Inter Font** - Modern typography
- **i18n** - Custom internationalization system

## TypeScript

The project uses **TypeScript** for greater safety and productivity:

- **Static typing** - Errors detected at development time
- **IntelliSense** - Autocomplete and inline documentation
- **Safe refactoring** - Changes with confidence
- **Interfaces and types** - Clear contracts between components
- **Strict mode** - Maximum type safety

### Available scripts:

- `yarn dev` - Development with hot reload (tsx)
- `yarn build` - Compile TypeScript to JavaScript
- `yarn start` - Run compiled version
- `yarn type-check` - Check types without compiling

## Theme System

The project supports light and dark themes with smooth transitions:

### **Available Themes:**

- **Light Mode** - Vibrant light theme
- **Dark Mode** - Elegant dark theme

### **Features:**

- **Automatic detection** - Uses system preference
- **Toggle button** - Sun/moon icon in header
- **Persistence** - Preference saved in localStorage
- **Smooth transitions** - 300ms CSS animations
- **CSS Variables** - Dynamic and reusable colors

### **How it works:**

```javascript
// Toggle theme
themeManager.toggleTheme()

// Apply specific theme
themeManager.applyTheme('dark')
```

### **CSS Variables:**

- Background gradients
- Card colors
- Text colors (primary/secondary)
- Border colors
- Input styles

## Internationalization (i18n)

The project supports multiple languages with a custom system:

### **Available Languages:**

- **Portuguese** (pt)
- **English** (en)

### **Features:**

- **Automatic detection** - Uses browser language
- **Visual selector** - Language switch in header
- **Persistence** - Preference saved in localStorage
- **Dynamic update** - Interface updates without reload

### **How it works:**

```javascript
// Use translation
i18n.t('downloadButton') // "Baixar Áudio" or "Download Audio"

// Change language
i18n.setLanguage('en')
```

### **Add new language:**

1. Edit `public/js/i18n.js`
2. Add translations object
3. Add option in HTML selector

## Architecture

### OOP Architecture (Object-Oriented Programming)

**`Server` Class** - Orchestrates the entire application:

- Initializes components
- Configures routes
- Manages lifecycle

**`App` Class** - Configures Express:

- `setupMiddlewares()` - Configures CORS, JSON, static files
- `useRoutes()` - Adds routes
- `listen()` - Starts server

**`DownloadController` Class** - Business logic:

- `downloadAudio()` - Processes audio download
- `serveAndDeleteFile()` - Serves file and deletes after download

**`FileManager` Class** - File management:

- `clean()` - Cleans temporary files
- `ensure()` - Ensures temp folder exists

### Routes

Defines API endpoints:

- `POST /api/download` - Starts download
- `GET /api/download/:filename` - Serves file

## How It Works

1. User pastes video URL
2. Frontend sends request to `/api/download`
3. Backend downloads and converts audio to MP3
4. File is temporarily saved in `/temp`
5. Frontend receives download link
6. User clicks to download
7. File is automatically deleted after download

## Automatic Cleanup

The `temp` folder is automatically cleaned:

- When starting the server
- When stopping the server (Ctrl+C)
- After each successful download
