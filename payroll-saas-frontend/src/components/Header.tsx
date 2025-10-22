import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Logo = () => <div className="text-xl font-bold">Moroccan Payroll SaaS</div>;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if a path is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo + Nav */}
        <div className="flex items-center space-x-6">
          <Logo />
          <nav className="hidden md:flex items-center space-x-4">
            <Button 
              variant="link" 
              onClick={() => navigate("/dashboard")}
              className={`font-semibold p-0 h-auto ${
                isActive("/dashboard") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Home
            </Button>
            <Button 
              variant="link" 
              onClick={() => navigate("/employees")}
              className={`p-0 h-auto ${
                isActive("/employees") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Employees
            </Button>
            <Button 
              variant="link" 
              onClick={() => navigate("/payroll")}
              className={`p-0 h-auto ${
                isActive("/payroll") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Payroll
            </Button>
          </nav>
        </div>

        {/* Right: Icons + User */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-transparent hover:text-primary">
            <Globe className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full w-8 h-8 font-bold">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
