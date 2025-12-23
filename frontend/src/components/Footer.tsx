import { Building2, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">CCL Ranchi</span>
            </div>
            <p className="text-sm text-secondary-foreground/80">
              Central Coalfields Limited - Empowering future mining professionals through quality internship programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/internships" className="hover:text-primary transition-colors">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/application-guide" className="hover:text-primary transition-colors">
                  Application Guide
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="font-semibold mb-4">Departments</h3>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>Mining Operations</li>
              <li>Environmental Engineering</li>
              <li>Safety Management</li>
              <li>Information Technology</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-secondary-foreground/80">
                  Darbhanga House, Ranchi, Jharkhand - 834029
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-secondary-foreground/80">+91-651-2460145</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-secondary-foreground/80">internship@cclranchi.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-8 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>© 2025 Central Coalfields Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
