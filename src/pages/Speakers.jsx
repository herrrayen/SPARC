import { speakerProfiles } from "../data/placeholders";

function Speakers() {
  const fallbackSpeakerImage = "/assets/brand/sparc-logo-white.png";

  return (
    <section>
      <h1>Speakers</h1>
      <p className="subtle">Meet the confirmed speakers for SPARC 2026.</p>
      <div className="card-grid speaker-coming-grid">
        {speakerProfiles.map((speaker) => (
          <article key={speaker.name} className="panel speaker-card">
            <div className="speaker-photo-slot">
              <img
                src={speaker.photo || fallbackSpeakerImage}
                alt={speaker.name}
                className="speaker-photo-img"
                onError={(event) => {
                  event.currentTarget.src = fallbackSpeakerImage;
                }}
              />
            </div>
            <h2>{speaker.name}</h2>
            <p className="subtle">{speaker.role}</p>
            <p className="subtle">{speaker.organization}</p>
            {speaker.email || speaker.linkedin ? (
              <div className="speaker-links">
                {speaker.email ? <a href={`mailto:${speaker.email}`}>Email</a> : null}
                {speaker.linkedin ? (
                  <a href={speaker.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                ) : null}
              </div>
            ) : (
              <p className="subtle speaker-slot-id">Profile details coming soon.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Speakers;
