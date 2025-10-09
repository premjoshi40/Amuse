# Portfolio Website API Contracts

## Overview
This document outlines the API contracts for converting the frontend-only portfolio website to a full-stack application with backend integration.

## Current Mock Data in `/frontend/src/mock.js`
- Personal information (name, title, contact details)
- About section (summary, highlights)
- Skills (categorized by frontend, backend, database, devops)
- Projects (3 featured projects with details)
- Work experience (3 positions with achievements)
- Contact form submission handler (currently mocked)

## Backend Implementation Plan

### 1. Database Models

#### Portfolio Model
```python
class Portfolio(BaseModel):
    id: str
    personal: PersonalInfo
    about: AboutInfo
    skills: List[SkillCategory]
    projects: List[Project]
    experience: List[Experience]
    created_at: datetime
    updated_at: datetime

class PersonalInfo(BaseModel):
    name: str
    title: str
    tagline: str
    location: str
    email: str
    phone: str
    linkedin: str
    github: str
    portfolio: str

class AboutInfo(BaseModel):
    summary: str
    highlights: List[str]

class SkillCategory(BaseModel):
    category: str
    technologies: List[str]

class Project(BaseModel):
    id: int
    title: str
    description: str
    technologies: List[str]
    features: List[str]
    github_url: str
    live_url: str
    status: str

class Experience(BaseModel):
    id: int
    company: str
    position: str
    duration: str
    location: str
    description: str
    achievements: List[str]
```

#### Contact Model
```python
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, read, replied

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str
```

### 2. API Endpoints

#### Portfolio Management
- `GET /api/portfolio` - Get portfolio data
- `PUT /api/portfolio` - Update portfolio data (admin only)

#### Contact Management  
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - Get contact messages (admin only)
- `PUT /api/contact/{message_id}` - Update message status (admin only)

#### Health Check
- `GET /api/health` - Health check endpoint

### 3. Frontend Integration Changes

#### Remove Mock Data Dependencies
1. Remove import of `mockHandlers` from `mock.js`
2. Replace mock API calls with actual HTTP requests using axios
3. Update contact form submission to use real API endpoint

#### API Service Layer
Create `/frontend/src/services/api.js`:
```javascript
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const portfolioAPI = {
  getPortfolio: () => axios.get(`${API_BASE}/portfolio`),
  
  submitContact: (contactData) => 
    axios.post(`${API_BASE}/contact`, contactData),
};
```

#### Component Updates
1. **Home.jsx**: Replace `portfolioData` import with API call to fetch data
2. **Contact Form**: Replace `mockHandlers.submitContactForm` with `portfolioAPI.submitContact`
3. Add loading states for API calls
4. Add error handling for failed API requests

### 4. Environment Variables
- Backend: No new environment variables needed (using existing MONGO_URL)
- Frontend: Using existing REACT_APP_BACKEND_URL

### 5. Database Collections
- `portfolios` - Store portfolio data (single document initially)
- `contact_messages` - Store contact form submissions

### 6. Error Handling
- Backend: Proper HTTP status codes and error messages
- Frontend: Toast notifications for success/error states
- Network error handling with retry logic

### 7. Data Migration
- Initialize database with current mock data as default portfolio
- Provide admin endpoint to update portfolio content

## Implementation Order
1. Create backend models and database setup
2. Implement portfolio API endpoints with mock data
3. Implement contact form API endpoint
4. Update frontend to use real APIs
5. Test all functionality
6. Add proper error handling and loading states

## Testing Checklist
- [ ] Portfolio data loads from backend
- [ ] Contact form submits to backend
- [ ] Contact messages stored in database
- [ ] Error handling works correctly
- [ ] Loading states display properly
- [ ] All navigation and interactions work
- [ ] Toast notifications work for form submission