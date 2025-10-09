import React, { useState } from 'react';
import { portfolioData, mockHandlers } from '../mock';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import Projects from './Projects';
import Experience from './Experience';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Download,
  ArrowRight,
  Code2,
  Briefcase,
  User,
  Send
} from 'lucide-react';

const Home = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await mockHandlers.submitContactForm(contactForm);
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message,
        });
        setContactForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setContactForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1c1b' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6" 
           style={{ backgroundColor: 'rgba(26, 28, 27, 0.95)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold" style={{ color: '#d9fb06' }}>
            {portfolioData.personal.name}
          </div>
          <div className="hidden md:flex space-x-8">
            {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="nav-link transition-colors duration-300 hover:text-opacity-80"
                style={{ color: '#d9fb06' }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-8 pt-20" id="hero">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            <h1 className="mb-6" 
                style={{ 
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  lineHeight: '0.9',
                  color: '#d9fb06',
                  textTransform: 'uppercase'
                }}>
              {portfolioData.personal.name}
            </h1>
            <h2 className="mb-8" 
                style={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  lineHeight: '1.2',
                  color: '#888680'
                }}>
              {portfolioData.personal.title}
            </h2>
            <p className="mb-12 max-w-2xl" 
               style={{
                 fontFamily: 'Inter, Arial, sans-serif',
                 fontSize: '1.25rem',
                 lineHeight: '1.6',
                 color: '#dfddd6'
               }}>
              {portfolioData.personal.tagline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => scrollToSection('projects')}
                className="btn-primary"
                style={{
                  background: '#d9fb06',
                  color: '#1a1c1b',
                  border: 'none',
                  borderRadius: '10rem',
                  padding: '1rem 2rem',
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  minHeight: '48px'
                }}
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                onClick={mockHandlers.downloadResume}
                variant="outline"
                style={{
                  background: 'transparent',
                  color: '#d9fb06',
                  border: '1px solid #d9fb06',
                  borderRadius: '10rem',
                  padding: '1rem 2rem',
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  minHeight: '48px'
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-8" id="about" style={{ backgroundColor: '#302f2c' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="mb-8"
                  style={{
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    lineHeight: '0.9',
                    color: '#d9fb06',
                    textTransform: 'uppercase'
                  }}>
                About Me
              </h2>
              <p className="mb-8"
                 style={{
                   fontFamily: 'Inter, Arial, sans-serif',
                   fontSize: '1.1rem',
                   lineHeight: '1.7',
                   color: '#dfddd6'
                 }}>
                {portfolioData.about.summary}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2" style={{ color: '#888680' }}>
                  <MapPin className="h-4 w-4" />
                  {portfolioData.personal.location}
                </div>
                <div className="flex items-center gap-2" style={{ color: '#888680' }}>
                  <Mail className="h-4 w-4" />
                  {portfolioData.personal.email}
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-6"
                  style={{
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    color: '#d9fb06'
                  }}>
                Key Achievements
              </h3>
              <ul className="space-y-4">
                {portfolioData.about.highlights.map((highlight, index) => (
                  <li key={index} 
                      className="flex items-start gap-3"
                      style={{ color: '#dfddd6' }}>
                    <div className="w-2 h-2 rounded-full mt-2"
                         style={{ backgroundColor: '#d9fb06' }}></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-8" style={{ backgroundColor: '#1a1c1b' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-16 text-center"
              style={{
                fontFamily: 'Inter, Arial, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: '0.9',
                color: '#d9fb06',
                textTransform: 'uppercase'
              }}>
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioData.skills.map((skillGroup, index) => (
              <Card key={index} className="border-0" style={{ backgroundColor: '#302f2c' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#d9fb06', fontSize: '1.2rem' }}>
                    {skillGroup.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} 
                             variant="secondary"
                             style={{ 
                               backgroundColor: 'rgba(217, 251, 6, 0.1)',
                               color: '#d9fb06',
                               border: '1px solid rgba(217, 251, 6, 0.3)'
                             }}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <Projects />

      {/* Experience Section */}
      <Experience />

      {/* Contact Section */}
      <section className="py-24 px-8" id="contact" style={{ backgroundColor: '#302f2c' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4"
                style={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: '0.9',
                  color: '#d9fb06',
                  textTransform: 'uppercase'
                }}>
              Get In Touch
            </h2>
            <p style={{
                 fontFamily: 'Inter, Arial, sans-serif',
                 fontSize: '1.2rem',
                 color: '#888680'
               }}>
              Ready to discuss your next project? Let's connect!
            </p>
          </div>

          <Card className="border-0" style={{ backgroundColor: '#1a1c1b' }}>
            <CardContent className="p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium" style={{ color: '#d9fb06' }}>
                      Name *
                    </label>
                    <Input
                      required
                      value={contactForm.name}
                      onChange={handleInputChange('name')}
                      placeholder="Your full name"
                      style={{
                        backgroundColor: '#302f2c',
                        border: '1px solid #888680',
                        color: '#dfddd6'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium" style={{ color: '#d9fb06' }}>
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={handleInputChange('email')}
                      placeholder="your.email@example.com"
                      style={{
                        backgroundColor: '#302f2c',
                        border: '1px solid #888680',
                        color: '#dfddd6'
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-medium" style={{ color: '#d9fb06' }}>
                    Subject *
                  </label>
                  <Input
                    required
                    value={contactForm.subject}
                    onChange={handleInputChange('subject')}
                    placeholder="Project discussion, collaboration opportunity, etc."
                    style={{
                      backgroundColor: '#302f2c',
                      border: '1px solid #888680',
                      color: '#dfddd6'
                    }}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium" style={{ color: '#d9fb06' }}>
                    Message *
                  </label>
                  <Textarea
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={handleInputChange('message')}
                    placeholder="Tell me about your project, timeline, and how I can help..."
                    style={{
                      backgroundColor: '#302f2c',
                      border: '1px solid #888680',
                      color: '#dfddd6',
                      minHeight: '120px'
                    }}
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  style={{
                    background: '#d9fb06',
                    color: '#1a1c1b',
                    border: 'none',
                    borderRadius: '10rem',
                    padding: '1rem 2rem',
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    minHeight: '48px'
                  }}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <div className="flex justify-center space-x-8 mb-6">
              <a href={`mailto:${portfolioData.personal.email}`}
                 className="flex items-center gap-2 transition-opacity hover:opacity-70"
                 style={{ color: '#d9fb06' }}>
                <Mail className="h-5 w-5" />
                <span>{portfolioData.personal.email}</span>
              </a>
              <a href={portfolioData.personal.linkedin}
                 className="flex items-center gap-2 transition-opacity hover:opacity-70"
                 style={{ color: '#d9fb06' }}>
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8" style={{ backgroundColor: '#302f2c' }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a href={portfolioData.personal.github} 
               className="transition-opacity hover:opacity-70"
               style={{ color: '#d9fb06' }}>
              <Github className="h-6 w-6" />
            </a>
            <a href={portfolioData.personal.linkedin}
               className="transition-opacity hover:opacity-70" 
               style={{ color: '#d9fb06' }}>
              <Linkedin className="h-6 w-6" />
            </a>
            <a href={`mailto:${portfolioData.personal.email}`}
               className="transition-opacity hover:opacity-70"
               style={{ color: '#d9fb06' }}>
              <Mail className="h-6 w-6" />
            </a>
          </div>
          <p style={{ color: '#888680' }}>
            © 2024 {portfolioData.personal.name}. Built with React & FastAPI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;