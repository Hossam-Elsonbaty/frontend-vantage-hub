import { Code2, Palette, Zap } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable code following best practices"
    },
    {
      icon: Palette,
      title: "UI/UX Focus",
      description: "Creating intuitive and beautiful user interfaces"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing applications for speed and efficiency"
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A passionate frontend developer dedicated to creating exceptional digital experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
              <p className="text-lg leading-relaxed">
                With <strong className="text-primary">3 years of experience</strong> in frontend development, 
                I specialize in building modern, responsive web applications that deliver outstanding user experiences.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                My expertise spans across the latest technologies including React.js, Next.js, and Angular, 
                combined with a strong foundation in modern CSS frameworks and responsive design principles.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I've successfully delivered projects ranging from educational platforms to e-commerce solutions, 
                always focusing on code quality, performance, and user satisfaction.
              </p>
            </div>

            <div className="grid gap-6 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
