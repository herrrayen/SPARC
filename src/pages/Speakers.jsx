function Speakers() {
  return (
    <section>
      <h1>Speakers</h1>
      <p className="subtle">Official speaker lineup will be published soon.</p>
      <div className="card-grid speaker-coming-grid">
        {Array.from({ length: 6 }).map((_, idx) => (
          <article key={idx} className="panel speaker-card">
            <div className="speaker-photo-slot" aria-hidden="true">
              <span>Coming Soon</span>
            </div>
            <h2>Coming Soon</h2>
            <p className="subtle">Speaker profile details will be announced here.</p>
            <p className="subtle speaker-slot-id">Slot {idx + 1}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Speakers;
