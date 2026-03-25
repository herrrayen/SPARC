import { useState } from "react";
import { ambassadorProfiles } from "../data/placeholders";

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function AmbassadorCard({ ambassador }) {
  const [photoError, setPhotoError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <article className="ambassador-card">
      <div className="speaker-photo-slot ambassador-photo-slot">
        {!photoError ? (
          <img
            src={ambassador.photo}
            alt={ambassador.name}
            className="speaker-photo-img"
            onError={() => setPhotoError(true)}
          />
        ) : (
          <span>{getInitials(ambassador.name)}</span>
        )}

        <div className="ambassador-logo-badge" aria-hidden="true">
          {!logoError ? (
            <img
              src={ambassador.logo}
              alt=""
              className="ambassador-logo-img"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span>SB</span>
          )}
        </div>
      </div>
      <h3>{ambassador.name}</h3>
      <p className="subtle ambassador-branch">Region: {ambassador.region}</p>
    </article>
  );
}

function Outreach() {
  const ambassadors = [...ambassadorProfiles].sort((a, b) => a.order - b.order);
  const internationalAmbassadors = ambassadors.filter(
    (ambassador) => ambassador.region.toLowerCase() === "international"
  );
  const localAmbassadors = ambassadors.filter(
    (ambassador) => ambassador.region.toLowerCase() === "local"
  );

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

      {ambassadors.length > 0 ? (
        <article className="panel">
          <h2>Meet Our Ambassadors</h2>
          {internationalAmbassadors.length > 0 ? (
            <div className="ambassador-group">
              <h3 className="ambassador-group-title">International Ambassadors</h3>
              <div className="card-grid ambassador-grid">
                {internationalAmbassadors.map((ambassador) => (
                  <AmbassadorCard key={ambassador.order} ambassador={ambassador} />
                ))}
              </div>
            </div>
          ) : null}

          {localAmbassadors.length > 0 ? (
            <div className="ambassador-group">
              <h3 className="ambassador-group-title">Local Ambassadors</h3>
              <div className="card-grid ambassador-grid">
                {localAmbassadors.map((ambassador) => (
                  <AmbassadorCard key={ambassador.order} ambassador={ambassador} />
                ))}
              </div>
            </div>
          ) : null}
        </article>
      ) : null}
    </section>
  );
}

export default Outreach;
