import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 gradient-hero z-0" />
      
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Frontend Developer
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Crafting Beautiful
            <span className="text-gradient block mt-2">Web Experiences</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            3 years of experience building modern, responsive, and user-friendly web applications with React, Next.js, and cutting-edge technologies.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button size="lg" className="gradient-primary group" asChild>
              <a href="#projects">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
          
          <div className="flex gap-4 justify-center pt-8">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-full bg-card hover:bg-primary/20 transition-colors border border-border hover:border-primary group">
              <Github className="h-5 w-5 group-hover:text-primary transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-full bg-card hover:bg-primary/20 transition-colors border border-border hover:border-primary group">
              <Linkedin className="h-5 w-5 group-hover:text-primary transition-colors" />
            </a>
            <a href="mailto:your.email@example.com"
               className="p-3 rounded-full bg-card hover:bg-primary/20 transition-colors border border-border hover:border-primary group">
              <Mail className="h-5 w-5 group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
