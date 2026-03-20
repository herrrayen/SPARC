import { ambassadorPlaceholders } from "../data/placeholders";

function Outreach() {
  return (
    <section>
      <h1>Outreach</h1>
      <p className="subtle">
        The outreach strategy bridges students, mentors, and industry around a
        shared directive: build sustainable tech that can be used in the real world.
      </p>
      <div className="grid two-col">
        <article className="panel">
          <h2>Community Initiatives</h2>
          <ul>
            <li>EVE technical bootcamp before the congress mission.</li>
            <li>Hands-on skills transfer in deep learning, IoT, and robotics logic.</li>
            <li>Mentored student project refinement before pitch days.</li>
          </ul>
        </article>
        <article className="panel">
          <h2>Partnerships</h2>
          <ul>
            <li>Academic and student-branch collaboration network.</li>
            <li>Engineering mentors from software, hardware, and data domains.</li>
            <li>Jury and professional experts for deployment-oriented feedback.</li>
          </ul>
        </article>
      </div>

      <article className="panel">
        <h2>Meet Our Ambassadors</h2>
        <p className="subtle">
          This space will feature the ambassadors promoting SPARC 2026 across IEEE student branches.
        </p>
        <div className="card-grid ambassador-grid">
          {[...ambassadorPlaceholders]
            .sort((a, b) => a.order - b.order)
            .map((ambassador) => (
            <article key={ambassador.order} className="ambassador-card">
              <div className="speaker-photo-slot ambassador-photo-slot" aria-hidden="true">
                <span>Coming Soon</span>
                <div className="ambassador-logo-badge">SB Logo</div>
              </div>
              <p className="ambassador-order">Ambassador #{ambassador.order}</p>
              <h3>{ambassador.name}</h3>
              <p className="subtle ambassador-branch">Student Branch: {ambassador.studentBranch}</p>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

export default Outreach;
