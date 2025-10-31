# IntelliTicketAI - AI-Powered Support Ticket Automation  
  
IntelliTicketAI is a full-stack support ticket management system that automates support operations through AI-powered classification, intelligent agent assignment, and automated troubleshooting generation.  
  
## Features  
  
- **AI-Powered Ticket Classification**: Automatically categorizes tickets by type (billing, technical, account, general), priority level, and customer sentiment using Google Gemini API  
- **Intelligent Agent Assignment**: Matches tickets to the most qualified support agents based on skills and workload  
- **Automated Troubleshooting**: Generates step-by-step resolution guidance for common issues  
- **Role-Based Access Control**: Three-tier system (Admin, Sales, Skilled) with distinct permissions  
- **User Approval Workflow**: Admin approval process for new user registrations  
- **Real-Time Dashboard**: Live statistics and AI system status monitoring  
  
## Tech Stack  
  
### Frontend  
- **React 19.1.1** with TypeScript 5.9.3  
- **Vite 7.1.7** for fast development and optimized builds  
- **Tailwind CSS 4.1.15** for styling  
- **Lucide React** for icons  
  
### Backend  
- **Express 5.1.0** web framework  
- **MongoDB Atlas** with Mongoose 8.19.2 ODM  
- **Google Gemini API** for AI capabilities  
  
## Getting Started  
  
### Prerequisites  
- Node.js (v16 or higher)  
- MongoDB Atlas account  
- Google Gemini API key  
  
### Installation  
  
1. Clone the repository  
2. Install frontend dependencies:  
   ```bash  
   npm install
Install backend dependencies:
cd server  
npm install
Configuration
Create .env file in the server directory:

MONGO_URI=your_mongodb_connection_string  
GEMINI_API_KEY=your_gemini_api_key  
USE_GEMINI=true  
PORT=5000  
Running the Application
Development mode:

Frontend: npm run dev (runs on port 3000)
Backend: cd server && npm run dev (runs on port 5000)
Production build:

npm run build
Architecture
The application follows a three-tier architecture with React frontend, Express REST API, and MongoDB database. AI processing is integrated into the ticket creation pipeline, automatically classifying tickets, generating troubleshooting steps, and assigning to appropriate agents based on skills.

  
## Notes  [header-1](#header-1)
  
This is the raw markdown content for a README.md file based on the previous response, with all citations and wiki links removed as requested.<cite />

