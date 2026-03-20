import {
  collaborators,
  innovationTracks,
  ieeePartners,
  organizingCommittee,
  sitePlaceholders,
  sponsorPlaceholders,
} from "../data/placeholders";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

const EVENT_DATE = new Date("2026-04-11T00:00:00");

function countdownRenderer({ completed, days, hours, minutes, seconds }) {
  if (completed) {
    return <p className="countdown-display">LIVE NOW</p>;
  }

  const dd = String(days).padStart(2, "0");
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return (
    <>
      <p className="countdown-display" role="timer" aria-live="polite">
        {dd}:{hh}:{mm}:{ss}
      </p>
      <p className="countdown-legend">DD : HH : MM : SS</p>
    </>
  );
}

function Home() {
  return (
    <section className="home-page">
        <div className="hero-home-visual hero-countdown-focus">
          <p className="countdown-title">Countdown To Launch</p>
          <Countdown date={EVENT_DATE} renderer={countdownRenderer} />
          <p className="subtle countdown-date">Event date: April 11, 2026</p>
        </div>

      <article className="hero-home-copy hero-home-copy-plain">
        <p className="eyebrow">IEEE ISTIC Congress and Innovation Challenge 2026</p>
        <h1>Directive Earth: A WALL-E Inspired Challenge for a Sustainable Future</h1>
        <p>{sitePlaceholders.congressTagline}</p>
        <div className="hero-meta hero-meta-strong">
          <span>{sitePlaceholders.congressDate}</span>
          <span>{sitePlaceholders.congressLocation}</span>
          <span>{sitePlaceholders.registrationStatus}</span>
        </div>
        <div className="hero-cta-row">
          <Link to="/program" className="hero-cta primary">
            Explore Program
          </Link>
          <Link to="/contact" className="hero-cta ghost">
            Become a Partner
          </Link>
        </div>
      </article>

      <div className="grid two-col home-intro-grid">
        <article className="panel home-intro-panel">
          <h2>What Is It?</h2>
          <p>{sitePlaceholders.whatIsIt}</p>
          <p>
            Hosted by {sitePlaceholders.host}, this endurance challenge prioritizes
            quality and depth over rushed prototyping by giving teams early
            access to a detailed specifications book.
          </p>
        </article>
        <article className="panel tracks-panel" id="tracks">
          <h2>Innovation Tracks</h2>
          <div className="track-chip-grid">
            {innovationTracks.map((track, index) => (
              <article key={track.title} className="track-chip">
                <span className="track-index">0{index + 1}</span>
                <p>{track.title}</p>
              </article>
            ))}
          </div>
        </article>
      </div>

      <article className="panel support-panel">
        <p className="eyebrow">Support Network</p>
        <h2>Powering This Mission</h2>
        <div className="support-group-grid">
          <section>
            <h3>IEEE Partners</h3>
            <div className="card-grid logo-slot-grid">
              {ieeePartners.map((partner) => (
                <div key={partner} className="logo-slot-card">
                  <div className="logo-slot" aria-hidden="true">
                    Logo Slot
                  </div>
                  <p>{partner}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3>Collaborative Allies</h3>
            <div className="card-grid logo-slot-grid">
              {collaborators.map((collaborator) => (
                <div key={collaborator} className="logo-slot-card">
                  <div className="logo-slot" aria-hidden="true">
                    Logo Slot
                  </div>
                  <p>{collaborator}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3>Strategic Backers</h3>
            <div className="card-grid logo-slot-grid">
              {sponsorPlaceholders.map((sponsor) => (
                <div key={sponsor} className="logo-slot-card">
                  <div className="logo-slot" aria-hidden="true">
                    Partner Logo
                  </div>
                  <p>{sponsor}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>

      <article className="panel why-panel">
        <h2>Why Join SPARC 2026</h2>
        <p className="subtle">
          Participants gain practical exposure, direct mentorship, and meaningful
          visibility while building solutions that target real sustainability challenges.
        </p>
        <div className="benefits-grid">
          <article className="benefit-card">
            <div className="benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path d="M4 15l5-5 4 4 7-7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M18 7h2v2" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3>Practical Skill Growth</h3>
            <p className="subtle">
              Build applied experience across AI, IoT, software engineering, and hardware integration.
            </p>
          </article>

          <article className="benefit-card">
            <div className="benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="16" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M3 19c1.2-2.6 3-4 5-4s3.8 1.4 5 4" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M11 19c1.1-2.4 2.8-3.6 5-3.6 1.9 0 3.6 1.2 5 3.6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3>Meaningful Network Access</h3>
            <p className="subtle">
              Connect with IEEE communities, mentors, technical juries, and like-minded builders.
            </p>
          </article>

          <article className="benefit-card">
            <div className="benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M8 11h8M8 15h5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3>Portfolio and Pitch Value</h3>
            <p className="subtle">
              Showcase refined prototypes and strengthen your profile with real pitch-stage delivery.
            </p>
          </article>

          <article className="benefit-card">
            <div className="benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path d="M12 3l2.7 5.5L21 9.3l-4.5 4.3 1.1 6.4L12 17l-5.6 3 1.1-6.4L3 9.3l6.3-.8z" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3>Beyond-Event Opportunities</h3>
            <p className="subtle">
              Turn event momentum into ongoing collaborations, future projects, and wider visibility.
            </p>
          </article>
        </div>
      </article>

      <article className="panel team-panel">
        <h2>Our Team - Organizing Committee</h2>
        <p className="subtle">
          Committee members and portraits will be revealed progressively as the organization timeline advances.
        </p>
        <div className="card-grid">
          {organizingCommittee.map((member, idx) => (
            <div key={`${member.role}-${idx}`} className="team-card">
              <div className="team-photo-slot" aria-hidden="true">
                Coming Soon
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export default Home;
