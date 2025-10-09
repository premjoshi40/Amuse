import React from 'react';
import { portfolioData } from '../mock';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const Experience = () => {
  return (
    <section className="py-24 px-8" id="experience" style={{ backgroundColor: '#1a1c1b' }}>
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
            Work Experience
          </h2>
          <p style={{
               fontFamily: 'Inter, Arial, sans-serif',
               fontSize: '1.2rem',
               color: '#888680'
             }}>
            My professional journey and key contributions
          </p>
        </div>

        <div className="space-y-8">
          {portfolioData.experience.map((exp, index) => (
            <Card key={exp.id} 
                  className="border-0 transition-all duration-300 hover:transform hover:scale-[1.02]"
                  style={{ backgroundColor: '#302f2c' }}>
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2" style={{ color: '#d9fb06' }}>
                      {exp.position}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4" style={{ color: '#888680' }} />
                      <span style={{ color: '#dfddd6', fontSize: '1.1rem', fontWeight: 600 }}>
                        {exp.company}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1" style={{ color: '#888680' }}>
                        <Calendar className="h-4 w-4" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-1" style={{ color: '#888680' }}>
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline"
                         style={{ 
                           backgroundColor: 'rgba(217, 251, 6, 0.1)',
                           color: '#d9fb06',
                           border: '1px solid rgba(217, 251, 6, 0.3)',
                           alignSelf: 'flex-start'
                         }}>
                    {index === 0 ? 'Current' : 'Previous'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="mb-6"
                   style={{
                     color: '#dfddd6',
                     lineHeight: '1.6',
                     fontSize: '1rem'
                   }}>
                  {exp.description}
                </p>

                <div>
                  <h4 className="font-semibold mb-4" style={{ color: '#d9fb06' }}>
                    Key Achievements:
                  </h4>
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} 
                          className="flex items-start gap-3"
                          style={{ color: '#dfddd6' }}>
                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                             style={{ backgroundColor: '#d9fb06' }}></div>
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16 p-12 rounded-2xl"
             style={{ backgroundColor: '#302f2c' }}>
          <h3 className="mb-4"
              style={{
                fontFamily: 'Inter, Arial, sans-serif',
                fontWeight: 600,
                fontSize: '2rem',
                color: '#d9fb06'
              }}>
            Ready to Work Together?
          </h3>
          <p className="mb-8"
             style={{
               color: '#dfddd6',
               fontSize: '1.1rem',
               maxWidth: '600px',
               margin: '0 auto'
             }}>
            I'm always interested in hearing about new opportunities and exciting projects.
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
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
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experience;