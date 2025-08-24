# 🎓 Gurukul 2.0 Backend - Hackathon Version

**Simple backend for a single chapter learning platform with AI features.**

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
echo "MONGO_URI=your_mongodb_connection_string" > .env

# Start server
npm run dev

# Seed database with sample data
curl http://localhost:3000/seed
```

## 📚 What's Built

### **Single Chapter Focus:**
- **Book**: Class 8 Science - Crop Production and Management
- **Language**: Hindi (Regional)
- **Content**: 5 subtopics with full content

### **Core Features:**
- ✅ **Chapter Content** - Full text with subtopics
- ✅ **MCQs** - Sample questions (no user attempts needed)
- ✅ **Flashcards** - Auto-generated from key concepts
- ✅ **Audio Summary** - Placeholder for audio features
- ✅ **AI Integration** - Placeholder for Gemini
- ✅ **Gamification** - Streaks and rewards system
- ✅ **Speech Features** - TTS/STT placeholders

## 🔗 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /seed` | Populate database with sample data |
| `GET /api/chapters` | Get chapter details |
| `GET /api/chapters/subtopics` | Get chapter subtopics |
| `GET /api/mcqs` | Get MCQs for the chapter |
| `GET /api/flashcards` | Get flashcards |
| `POST /api/ai/generate-mcqs` | Generate MCQs (placeholder) |
| `POST /api/ai/chat` | AI chat for doubts |

## 🎯 Hackathon Demo Flow

1. **Start server** → `npm run dev`
2. **Seed database** → Visit `/seed`
3. **Show chapter** → `/api/chapters`
4. **Show subtopics** → `/api/chapters/subtopics`
5. **Show MCQs** → `/api/mcqs`
6. **Show flashcards** → `/api/flashcards`
7. **Demo AI features** → Use AI endpoints

## 🔧 For Real Implementation

- Replace placeholder AI responses with Gemini API
- Add real audio processing
- Implement speech-to-text and text-to-speech
- Add real user progress tracking

## 📊 Database Schema

- **Book**: Title, state board, language, subject, grade
- **Chapter**: Content, subtopics, audio, key concepts
- **MCQ**: Questions, options, explanations
- **Flashcard**: Front, back, concept
- **User**: Progress, streaks, rewards

Perfect for hackathon demo! 🚀
