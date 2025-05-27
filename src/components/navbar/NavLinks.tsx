
import { Link, useLocation } from "react-router-dom";

export function NavLinks() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {links.map((link) => (
        <Link 
          key={link.path}
          to={link.path} 
          className={`text-sm font-medium transition-colors ${
            isActive(link.path) ? "text-white font-bold" : "text-white/90 hover:text-white"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
