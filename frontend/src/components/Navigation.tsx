import { Link, useLocation, useNavigate } from "react-router-dom";
import { Building2, Menu, X, LogIn, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const name = localStorage.getItem('userName');
    setIsUserLoggedIn(!!token);
    setUserName(name || '');
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsUserLoggedIn(false);
    setUserName('');
    navigate('/user-login');
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/internships", label: "Internships" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <Building2 className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">CCL Ranchi</span>
              <span className="text-xs text-muted-foreground">Internship Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isUserLoggedIn ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="gap-2" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
                <div className="flex items-center gap-2 px-3 py-1 bg-accent rounded-md">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{userName}</span>
                </div>
              </>
            ) : (
              <>
                <Link to="/user-login">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/user-register">
                  <Button className="bg-primary hover:bg-primary/90 gap-2">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            <Link to="/login">
              <Button variant="outline" size="sm" className="gap-2">
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-in slide-in-from-top duration-200">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start transition-all duration-200",
                    isActive(item.path) &&
                      "bg-accent text-accent-foreground font-semibold"
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="border-t pt-2 space-y-2">
              {isUserLoggedIn ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { setIsOpen(false); handleLogout(); }}>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                  <div className="px-3 py-2 bg-accent rounded-md flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{userName}</span>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/user-login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/user-register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-start bg-primary hover:bg-primary/90">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full justify-start gap-2">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
