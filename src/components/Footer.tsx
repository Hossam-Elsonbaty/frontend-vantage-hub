import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-gradient mb-2">Let's Build Something Great</h3>
              <p className="text-muted-foreground text-sm">
                © {currentYear} All rights reserved.
              </p>
            </div>

            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary/20 transition-colors border border-border hover:border-primary group"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary/20 transition-colors border border-border hover:border-primary group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="mailto:your.email@example.com"
                className="p-3 rounded-full bg-muted hover:bg-primary/20 transition-colors border border-border hover:border-primary group"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
