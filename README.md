# Images by Gemini

A powerful web application for AI-powered image editing and generation using Google's Gemini model.

![Images by Gemini Logo](frontend/public/images-by-gemini-high-resolution-logo.png)

## 🚀 Features

- **AI Image Generation**: Create stunning images from text prompts using Gemini's advanced AI capabilities
- **Image Editing**: Transform and enhance existing images with AI assistance
- **Intuitive Interface**: User-friendly design with responsive controls for both novice and professional users
- **Prompt Suggestions**: Get helpful suggestions to craft effective prompts for better results
- **Before/After Comparison**: Easily compare your original and edited images
- **Download Options**: Save your creations in high quality

## 🛠️ Tech Stack

### Frontend
- **Next.js**: React framework with server-side rendering and optimized performance
- **TypeScript**: Type-safe JavaScript for improved development experience
- **Tailwind CSS**: Utility-first CSS framework for modern designs
- **Shadcn UI**: High-quality UI components built on Radix UI

### Backend
- **FastAPI**: Modern, fast Python web framework for building APIs
- **Google Gemini API**: Advanced AI model from Google for image generation and editing

## 📋 Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- Google AI Studio API key (for Gemini access)

## ⚙️ Installation

### Clone the repository
```bash
git clone https://github.com/siddhantparadox/images-by-gemini.git
cd images-by-gemini
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create a .env file in the backend directory with your API key
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Start the backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install

# Create a .env.local file with the backend URL
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000" > .env.local

npm run dev
```

The application will be available at http://localhost:3000

## 🔑 API Key Configuration

This application requires a Google Gemini API key to function:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey) to create an API key
2. Add the key to your backend `.env` file
3. **User API Key Feature**: The application includes a convenient dialog that allows users to enter their Gemini API key directly in the frontend interface:
   - Click on the API key icon in the header
   - Enter your API key in the dialog box
   - The key will be securely stored in the browser's local storage
   - This feature is perfect for end users who want to use their own API keys without modifying server files

## 🚢 Deployment

### Frontend Deployment
The Next.js frontend can be deployed on:
- Vercel (recommended)
- Netlify
- GitHub Pages

### Backend Deployment
The FastAPI backend can be deployed on:
- Railway
- Render
- Fly.io
- Heroku

## 📝 Usage

1. **Image Generation**:
   - Navigate to the Image Generator tab
   - Enter a detailed prompt describing your desired image
   - Adjust settings if needed
   - Click "Generate" and wait for the Gemini model to create your image

2. **Image Editing**:
   - Upload an existing image
   - Specify editing instructions in the prompt field
   - Click "Edit" to apply AI-powered transformations
   - Download your edited image or compare it with the original

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0) - see the LICENSE file for details.

## 🙏 Acknowledgements

- Google's Gemini AI model for the powerful image generation and editing capabilities
- The Next.js and FastAPI communities for their excellent documentation and tools
