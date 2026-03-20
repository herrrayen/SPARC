import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/program", label: "Program" },
  { to: "/speakers", label: "Speakers" },
  { to: "/awards", label: "Awards" },
  { to: "/venue", label: "Venue" },
  { to: "/outreach", label: "Outreach" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
          {logoVisible && (
            <img
              className="brand-logo"
              src="/assets/brand/sparc-logo-white.png"
              alt="SPARC logo"
              onError={() => setLogoVisible(false)}
            />
          )}
        </NavLink>

        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          Menu
        </button>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              onClick={() => setMenuOpen(false)}
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
