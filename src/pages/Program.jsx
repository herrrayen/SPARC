const dayQueues = [
  {
    title: "Day 1",
    label: "April 11, 2026",
    items: [
      "Opening and registration flow",
      "Keynote and congress blocks",
      "Workshop and networking run",
      "Challenge checkpoint sessions",
    ],
  },
  {
    title: "Day 2",
    label: "April 12, 2026",
    items: [
      "Final technical sessions",
      "Pitch queue and jury reviews",
      "Awards and closing segment",
      "Post-event networking window",
    ],
  },
];

function Program() {
  return (
    <section>
      <h1>Program</h1>
      <p className="subtle">
        The final agenda is being locked with speakers, mentors, and jury
        coordination. Until release, each day queue is shown as staged blocks.
      </p>
      <div className="program-queue-grid">
        {dayQueues.map((day) => (
          <article className="panel program-day-queue" key={day.title}>
            <div className="program-day-head">
              <h2>{day.title}</h2>
              <p className="subtle">{day.label}</p>
            </div>
            <ol className="program-queue-list">
              {day.items.map((item) => (
                <li key={item}>
                  <div>
                    <p>{item}</p>
                    <p className="subtle">Coming soon</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>

      <article className="panel">
        <h2>Release Window</h2>
        <p className="subtle">
          Full hour-by-hour scheduling will replace these placeholders once all
          confirmations are finalized.
        </p>
      </article>
    </section>
  );
}

export default Program;
