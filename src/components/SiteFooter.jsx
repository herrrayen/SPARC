import { socialLinks } from "../data/placeholders";

const iconMap = {
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M13.5 8.5V6.8c0-.7.4-1.2 1.3-1.2H16V3h-2.2C11.2 3 10 4.5 10 6.5v2H8v2.8h2V21h3.5v-9.7h2.3l.4-2.8h-2.7z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9zm9.8 1.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7.3A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3zm0 1.8A2.9 2.9 0 1 0 14.9 12 2.9 2.9 0 0 0 12 9.1z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6.1 8.2A2.1 2.1 0 1 1 6 4a2.1 2.1 0 0 1 .1 4.2zM4.4 9.8h3.4V21H4.4zM10 9.8h3.2v1.5h.1c.4-.8 1.5-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.9V21h-3.4v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21H10z" />
    </svg>
  ),
};

function SiteFooter() {
  const socialEntries = Object.entries(socialLinks);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <h2>IEEE ISTIC Congress and Innovation Challenge 2026</h2>
          <p>
            Student-led mission dedicated to sustainable technology, energy
            innovation, and practical deployment impact.
          </p>
        </div>

        <div className="footer-block">
          <h3>SPARC Social Media</h3>
          <div className="social-links" aria-label="SPARC social media links">
            {socialEntries.map(([network, url]) => {
              const isReady = url.startsWith("http");

              return isReady ? (
                <a
                  key={network}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                  aria-label={`SPARC ${network}`}
                  title={`Open SPARC ${network}`}
                >
                  {iconMap[network]}
                </a>
              ) : (
                <span
                  key={network}
                  className="social-icon disabled"
                  aria-label={`${network} link pending`}
                  title={`${network} link pending`}
                >
                  {iconMap[network]}
                </span>
              );
            })}
          </div>
          <p className="subtle footer-note">Official SPARC pages</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="subtle">Copyright {year} SPARC - IEEE ISTIC Congress and Innovation Challenge.</p>
      </div>
    </footer>
  );
}

export default SiteFooter;
