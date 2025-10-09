import React from 'react';
import { portfolioData } from '../mock';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Github, ExternalLink, Code2 } from 'lucide-react';

const Projects = () => {
  return (
    <section className="py-24 px-8" id="projects" style={{ backgroundColor: '#302f2c' }}>
      <div className="max-w-7xl mx-auto">
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
            Featured Projects
          </h2>
          <p style={{
               fontFamily: 'Inter, Arial, sans-serif',
               fontSize: '1.2rem',
               color: '#888680'
             }}>
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {portfolioData.projects.map((project) => (
            <Card key={project.id} 
                  className="border-0 h-full transition-all duration-300 hover:transform hover:scale-105"
                  style={{ backgroundColor: '#1a1c1b' }}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Code2 className="h-6 w-6" style={{ color: '#d9fb06' }} />
                  <Badge variant="secondary"
                         style={{ 
                           backgroundColor: 'rgba(217, 251, 6, 0.1)',
                           color: '#d9fb06',
                           border: '1px solid rgba(217, 251, 6, 0.3)'
                         }}>
                    {project.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2" style={{ color: '#d9fb06' }}>
                  {project.title}
                </CardTitle>
                <CardDescription style={{ color: '#dfddd6', lineHeight: '1.6' }}>
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-6">
                  <h4 className="font-semibold mb-3" style={{ color: '#d9fb06' }}>
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} 
                          className="flex items-start gap-2 text-sm"
                          style={{ color: '#dfddd6' }}>
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                             style={{ backgroundColor: '#d9fb06' }}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3" style={{ color: '#d9fb06' }}>
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} 
                             variant="outline"
                             style={{ 
                               backgroundColor: 'transparent',
                               color: '#888680',
                               border: '1px solid #888680',
                               fontSize: '0.75rem'
                             }}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex gap-3">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    style={{
                      background: 'transparent',
                      color: '#d9fb06',
                      border: '1px solid #d9fb06',
                      borderRadius: '10rem',
                      fontWeight: 600,
                      fontSize: '0.875rem'
                    }}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    style={{
                      background: '#d9fb06',
                      color: '#1a1c1b',
                      border: 'none',
                      borderRadius: '10rem',
                      fontWeight: 600,
                      fontSize: '0.875rem'
                    }}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            onClick={() => window.open(portfolioData.personal.github, '_blank')}
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
              textTransform: 'uppercase'
            }}
          >
            <Github className="mr-2 h-5 w-5" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;