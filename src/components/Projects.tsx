import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Academy Website & Dashboard",
      description: "A comprehensive educational platform for a US-based academy featuring a modern frontend with an intuitive admin dashboard for content management, student tracking, and analytics.",
      tags: ["React.js", "TypeScript", "Tailwind CSS", "Dashboard"],
      link: "#",
      github: "#"
    },
    {
      title: "Real Estate E-commerce",
      description: "Full-featured real estate marketplace with property listings, advanced search filters, interactive maps, and seamless booking system for property viewings and transactions.",
      tags: ["Next.js", "React.js", "SASS", "E-commerce"],
      link: "#",
      github: "#"
    },
    {
      title: "Portfolio Showcase",
      description: "Modern portfolio website showcasing creative work with smooth animations, responsive design, and optimized performance across all devices.",
      tags: ["React.js", "Tailwind CSS", "Responsive Design"],
      link: "#",
      github: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A selection of my recent work showcasing diverse skills and technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index}
                className="group hover:shadow-2xl hover:border-primary/50 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="h-2 gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 group/btn" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:text-primary transition-colors" />
                        Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 group/btn" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2 group-hover/btn:text-primary transition-colors" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
