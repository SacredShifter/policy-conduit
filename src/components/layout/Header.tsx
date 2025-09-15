import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User, FileText, Users, BarChart3 } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: BarChart3 },
    { name: "Start Consultation", href: "/start-consultation", icon: FileText },
    { name: "Active Consultations", href: "/consultations", icon: FileText },
    { name: "Groups", href: "/groups", icon: Users },
    { name: "Feedback", href: "/feedback", icon: FileText },
  ];

  return (
    <header className="bg-background border-b border-border shadow-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Consultation Hub</h1>
              <p className="text-sm text-muted-foreground">Clinical Policy Management</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
            </Button>
            
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-2 pl-3 border-l border-border">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">Kerry Elevsen</p>
                <p className="text-xs text-muted-foreground">Clinical Lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;