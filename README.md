# AI Math Canvas Solver

An AI-powered math canvas solver built with Next.js and Google Gemini. Draw math expressions on a canvas and let AI solve them for you!

## Features

- 🎨 Full-screen drawing canvas for math expressions
- 🌈 Color palette with 5 colors for drawing
- 🤖 Powered by Google Gemini 2.5 Flash AI model
- ✨ Beautiful UI with Radix UI and Tailwind CSS
- 🚀 Built with Next.js 15 and React 18

## Quick Start

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:9002](http://localhost:9002) in your browser.

## Complete Setup Guide for Another Laptop 🐳

### Step 1: Install Docker Desktop

#### For Windows:
1. Go to [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
2. Click "Download for Windows"
3. Run the installer `Docker Desktop Installer.exe`
4. Follow the installation wizard (accept defaults)
5. Restart your computer when prompted
6. Launch Docker Desktop from Start menu
7. Wait for Docker to start (you'll see a whale icon in system tray)
8. Open PowerShell and verify installation:
```powershell
docker --version
docker-compose --version
```

#### For Mac:
1. Go to [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
2. Download for your chip (Apple Silicon or Intel)
3. Open the `.dmg` file and drag Docker to Applications
4. Launch Docker from Applications
5. Grant permissions when prompted
6. Verify in Terminal:
```bash
docker --version
docker-compose --version
```

#### For Linux (Ubuntu/Debian):
```bash
# Update package index
sudo apt-get update

# Install dependencies
sudo apt-get install ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Verify installation
docker --version
docker compose version
```

### Step 2: Transfer Project Files

#### Option A: Using Git (Recommended)
```bash
# Clone the repository
git clone <your-repository-url>
cd AI-Calculator-master
```

#### Option B: Manual Transfer
Copy the entire `AI-Calculator-master` folder to your new laptop using:
- USB drive
- Cloud storage (Google Drive, Dropbox, OneDrive)
- Network transfer
- Email (if project is small)

### Step 3: Run the Application

1. **Open terminal/PowerShell** in the project folder:
```bash
cd path/to/AI-Calculator-master
```

2. **Build and start the container**:
```bash
docker-compose up -d
```

First time will take 5-10 minutes to build. Subsequent starts are instant.

3. **Check if it's running**:
```bash
docker-compose ps
```

4. **Open your browser** and go to:
```
http://localhost:9002
```

5. **Done!** The app is now running with the API key already configured.

### Step 4: Managing the Application

**View logs:**
```bash
docker-compose logs -f
```

**Stop the application:**
```bash
docker-compose down
```

**Restart the application:**
```bash
docker-compose restart
```

**Rebuild after code changes:**
```bash
docker-compose up -d --build
```

**Remove everything (including images):**
```bash
docker-compose down --rmi all
```

### Prerequisites
- Docker Desktop installed (see Step 1)
- At least 2GB free disk space
- Internet connection (only for first build)

### Troubleshooting

**"Cannot connect to Docker daemon":**
- Make sure Docker Desktop is running
- Windows: Check system tray for whale icon
- Mac: Check menu bar for whale icon

**"Port 9002 is already in use":**
```bash
# Windows PowerShell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 9002).OwningProcess -Force

# Mac/Linux
lsof -ti:9002 | xargs kill -9
```

**"Permission denied" (Linux only):**
```bash
sudo usermod -aG docker $USER
# Log out and log back in
```

**Build fails or takes too long:**
- Check your internet connection
- Make sure you have enough disk space
- Try: `docker-compose down && docker-compose up -d --build`

**App not responding:**
```bash
# Check container status
docker-compose ps

# View logs for errors
docker-compose logs -f

# Restart
docker-compose restart
```

### What's Included in the Docker Image?

✅ All source code  
✅ API key (already configured)  
✅ All dependencies installed  
✅ Production-optimized build  
✅ Ready to run immediately  

You don't need Node.js, npm, or any other tools installed - just Docker!

## Tech Stack

- **Framework**: Next.js 15.3.3 with Turbopack
- **AI**: Google Genkit with Gemini 2.5 Flash
- **UI**: Radix UI + Tailwind CSS
- **Language**: TypeScript
- **Fonts**: Space Grotesk + Inter

## API Key

Get your free Gemini API key from [Google AI Studio](https://ai.google.dev/).

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
npm run typecheck    # Run TypeScript type checking
```

## Project Structure

```
src/
├── ai/                          # AI configuration and flows
│   ├── genkit.ts               # Genkit AI setup
│   └── flows/
│       └── solve-math-expression.ts
├── app/                        # Next.js app directory
│   ├── page.tsx               # Main canvas page
│   └── layout.tsx             # Root layout
├── components/                 # React components
│   ├── math-canvas-solver/    # Canvas-specific components
│   └── ui/                    # Reusable UI components
├── hooks/                      # Custom React hooks
└── lib/                        # Utility functions
```

## License

MIT
