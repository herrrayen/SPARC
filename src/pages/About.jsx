import { aboutWidgets } from "../data/placeholders";

function About() {
  return (
    <section>
      <h1>About Us</h1>
      <article className="panel">
        <h2>Mission</h2>
        <p>
          IEEE ISTIC Congress and Innovation Challenge 2026 is designed to turn
          student creativity into deployable sustainability solutions through
          software, hardware, data science, and robotics collaboration.
        </p>
        <p>
          The event is not a rushed overnight format. Teams receive the
          challenge specifications in advance to build, test, and refine
          high-quality prototypes before pitching.
        </p>
      </article>

      <div className="card-grid about-widget-grid">
        {aboutWidgets.map((widget) => {
          const hasLogo = Boolean(widget.logo);
          const hasLogoBg = Boolean(widget.logoBg);
          const hasWebsiteUrl = widget.websiteUrl.startsWith("http");
          const cardClassName = hasLogo
            ? "panel info-card info-card-with-hover-logo"
            : "panel info-card";
          const cardStyle = hasLogo
            ? {
                "--about-logo-url": `url("${widget.logo}")`,
                ...(hasLogoBg ? { "--about-logo-bg-url": `url("${widget.logoBg}")` } : {}),
              }
            : undefined;

          return (
            <article className={cardClassName} style={cardStyle} key={widget.title}>
              {hasLogoBg ? <span className="about-hover-logo-mark" aria-hidden="true" /> : null}
              <h2>{widget.title}</h2>
              <p>{widget.description}</p>
              {hasWebsiteUrl ? (
                <a
                  className="info-link"
                  href={widget.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {widget.websiteLabel}
                </a>
              ) : (
                <span className="info-link disabled" aria-disabled="true">
                  {widget.websiteLabel}
                </span>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default About;
