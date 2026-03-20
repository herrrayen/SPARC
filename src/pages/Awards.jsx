function Awards() {
  return (
    <section>
      <h1>Awards</h1>
      <p className="subtle">
        The congress concludes with a recognition ceremony for the strongest
        teams and the most deployable sustainability-focused prototypes.
      </p>
      <div className="grid two-col">
        <article className="panel">
          <h2>Categories</h2>
          <ul>
            <li>Best Prototype Deployment Readiness</li>
            <li>Best Technical Excellence</li>
            <li>Highest Sustainability Impact</li>
          </ul>
        </article>
        <article className="panel">
          <h2>Evaluation Focus</h2>
          <ul>
            <li>Clarity and feasibility of the final prototype.</li>
            <li>Technical depth across software, hardware, or data systems.</li>
            <li>Potential to improve energy sustainability outcomes.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Awards;
