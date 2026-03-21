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
        {aboutWidgets.map((widget) => (
          <article className="panel info-card" key={widget.title}>
            <h2>{widget.title}</h2>
            <p>{widget.description}</p>
            {widget.websiteUrl.startsWith("http") ? (
              <a
                className="info-link"
                href={widget.websiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                {widget.websiteLabel}
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export default About;
