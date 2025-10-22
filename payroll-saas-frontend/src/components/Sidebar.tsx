import { useState } from "react";
import { Home, Users, DollarSign, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Employees", path: "/employees", icon: Users },
  { name: "Payroll", path: "/payroll", icon: DollarSign },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={clsx(
        "h-screen border-r bg-background transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Collapse Toggle */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <span className="font-bold text-lg">HR SaaS</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.name} to={item.path}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={clsx(
                  "w-full flex items-center justify-start gap-3",
                  collapsed && "justify-center"
                )}
              >
                <Icon className="h-4 w-4" />
                {!collapsed && <span>{item.name}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
