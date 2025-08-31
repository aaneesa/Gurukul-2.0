# Gurukul 2.0

> **Reimagining regional education** — Personalized, gamified learning based on state-board chapters with AI-powered MCQs, flashcards, audio summaries, and motivational nudges.

---

## 🚀 Overview
Gurukul 2.0 is an AI-powered learning platform built to make **state-board education** interactive, accessible, and fun — especially in regional languages. It focuses on **personalized learning** with chapter-wise MCQs, flashcards, summaries, and adaptive revision suggestions.

This MVP starts with **5 chapters** from a state board book in a regional language and builds features around **practice, revision, and motivation**.

---

## ✨ Features

- 📖 **Chapter-wise Learning**  
  - Users select a chapter from available state-board content (PDF or pre-loaded text).  
  - All subtopics are listed before starting.  

- 🧩 **Dynamic MCQs**  
  - Generate MCQs per subtopic.  
  - Generate final practice MCQs for the entire book (without subtopic hints).  

- 🧠 **Adaptive Revision**  
  - Learns user strengths & weaknesses.  
  - Suggests what to revise next.  

- 🃏 **Auto Flashcards**  
  - Converts key concepts into flashcards for quick revision.  

- 🎧 **Audio Summaries**  
  - Chapter summaries available as repeatable audio.  

- 💬 **Local Motivational Nudges**  
  - Encouragement in regional idioms and sayings.  

- 🔥 **Gamification**  
  - Daily streaks + reward system to build consistency.  

- 🗣 **Speech-to-Text & Text-to-Speech**  
  - Voice-based doubt asking via LLM.  
  - Spoken explanations for better accessibility.  

---

## 🛠 Tech Stack (MVP-Friendly)

| Category           | Suggested Technology             |
|--------------------|-----------------------------------|
| Frontend           | React / Next.js + Tailwind CSS    |
| Backend            | Node.js / Express.js              |
| Database           | MongoDB (NoSQL, flexible for user data) |
| AI / LLM           | Gemini API (Google) or OpenAI API |
| Speech & Audio     | Google Text-to-Speech / Whisper / Web Speech API |
| Authentication     | Clerk / Firebase Auth / Auth0     |
| File Handling (PDF)| PDF.js or PyMuPDF (backend processing) |
| Deployment         | Vercel / Render / Netlify         |

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/gurukul-2.0.git
   cd gurukul-2.0
