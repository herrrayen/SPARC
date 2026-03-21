import { speakerProfiles } from "../data/placeholders";

function Speakers() {
  return (
    <section>
      <h1>Speakers</h1>
      <p className="subtle">Meet the confirmed speakers for SPARC 2026.</p>
      <div className="card-grid speaker-coming-grid">
        {speakerProfiles.map((speaker) => (
          <article key={speaker.name} className="panel speaker-card">
            <div className="speaker-photo-slot">
              <img src={speaker.photo} alt={speaker.name} className="speaker-photo-img" />
            </div>
            <h2>{speaker.name}</h2>
            <p className="subtle">{speaker.role}</p>
            <p className="subtle">{speaker.organization}</p>
            <div className="speaker-links">
              <a href={`mailto:${speaker.email}`}>Email</a>
              <a href={speaker.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Speakers;
