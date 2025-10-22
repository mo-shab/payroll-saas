import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between h-16 px-4">
        {/* Left: Brand and Copyright */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            Moroccan Payroll SaaS
          </span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>

        {/* Right: Social / Contact Links */}
        <div className="flex items-center space-x-3 mt-2 md:mt-0">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-muted-foreground hover:text-primary"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-muted-foreground hover:text-primary"
          >
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-muted-foreground hover:text-primary"
          >
            <a href="mailto:support@moroccanpayroll.com">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
