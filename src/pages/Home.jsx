import {
  collaborators,
  innovationTracks,
  ieeePartners,
  organizingCommittee,
  socialLinks,
  sitePlaceholders,
  sponsorPlaceholders,
} from "../data/placeholders";
import { useState } from "react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

const EVENT_DATE = new Date("2026-04-11T00:00:00");

const rolePriority = {
  "Event Chair": 1,
  "Event Vice Chair": 2,
  "Event Secretary": 3,
  "Event Treasurer": 4,
  "Technical Program Lead": 5,
  "Logistics Lead": 5,
  "Logistics Manager": 5,
  "Social Media Lead": 5,
  "Decoration Lead": 5,
  "Technical Program Manager": 6,
  "Sponsoring Manager": 7,
  "Social Media Manager": 8,
  "Media Manager": 8,
  "Ambassadors Coordinator": 9,
  "Participants Manager": 10,
  "HR Manager": 10,
  "Industrial Visits Coordinator": 11,
  "Transportation Manager": 12,
  "Decoration Manager": 13,
};

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

function slugifyMemberName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getMemberPhotoPath(member) {
  if (member.photo) {
    return member.photo;
  }
  return `/assets/oc/${slugifyMemberName(member.name)}.jpg`;
}

function TeamPhoto({ member }) {
  const [hasImageError, setHasImageError] = useState(false);
  const shouldAttemptImage = true;

  return (
    <>
      {shouldAttemptImage && !hasImageError ? (
        <img
          src={getMemberPhotoPath(member)}
          alt={member.name}
          className="team-photo-img"
          onError={() => setHasImageError(true)}
        />
      ) : null}
      {(!shouldAttemptImage || hasImageError) && (
        <span className="team-photo-label">Photo unavailable</span>
      )}
    </>
  );
}

function CollaboratorLogo({ collaborator }) {
  const [hasImageError, setHasImageError] = useState(false);
  const hasLogo = Boolean(collaborator.logo);

  if (hasLogo && !hasImageError) {
    return (
      <img
        src={collaborator.logo}
        alt={`${collaborator.name} logo`}
        className="logo-slot-img"
        onError={() => setHasImageError(true)}
      />
    );
  }

  return <span>Brand</span>;
}

function SupportLogo({ item, fallbackLabel }) {
  const [hasImageError, setHasImageError] = useState(false);
  const hasLogo = Boolean(item.logo);

  if (hasLogo && !hasImageError) {
    return (
      <img
        src={item.logo}
        alt={`${item.name} logo`}
        className="logo-slot-img"
        onError={() => setHasImageError(true)}
      />
    );
  }

  return <span>{fallbackLabel}</span>;
}

function SocialIconLinks({ instagram, linkedin, label }) {
  const instagramUrl = instagram || socialLinks.instagram;
  const linkedinUrl = linkedin || socialLinks.linkedin;

  return (
    <div className="logo-social-row" aria-label={`${label} social links`}>
      <a
        className="logo-social-link"
        href={instagramUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${label} Instagram`}
      >
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path
            d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 2A2.5 2.5 0 0 0 5 7.5v9A2.5 2.5 0 0 0 7.5 19h9a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 16.5 5h-9Zm10.25 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
            fill="currentColor"
          />
        </svg>
      </a>

      <a
        className="logo-social-link"
        href={linkedinUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${label} LinkedIn`}
      >
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path
            d="M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12ZM5.6 18.5h2.68V9.9H5.6v8.6Zm4.3-8.6v8.6h2.67v-4.27c0-1.12.21-2.2 1.6-2.2 1.37 0 1.39 1.29 1.39 2.28v4.19h2.68v-4.73c0-2.32-.5-4.1-3.2-4.1-1.3 0-2.18.72-2.54 1.4h-.03V9.9H9.9Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}

function Home() {
  const [copiedMemberKey, setCopiedMemberKey] = useState(null);
  const visiblePartners = ieeePartners.filter((partner) => !partner.name.includes("[TBD]"));
  const visibleCollaborators = collaborators.filter(
    (collaborator) => !collaborator.name.includes("[TBD]")
  );
  const visibleSponsors = sponsorPlaceholders.filter((sponsor) => !sponsor.name.includes("[TBD]"));

  const sortedCommittee = organizingCommittee
    .map((member, sourceIndex) => ({
      ...member,
      sourceIndex,
      priority: rolePriority[member.role] ?? 999,
    }))
    .sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return a.name.localeCompare(b.name);
    });

  const copyEmail = async (email, memberKey) => {
    if (!email) {
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setCopiedMemberKey(memberKey);
      window.setTimeout(() => {
        setCopiedMemberKey((activeMemberKey) =>
          activeMemberKey === memberKey ? null : activeMemberKey
        );
      }, 1800);
    } catch {
      setCopiedMemberKey(null);
    }
  };

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
          {visiblePartners.length > 0 ? (
          <section>
            <h3>IEEE Partners</h3>
            <div className="card-grid logo-slot-grid">
              {visiblePartners.map((partner) => (
                <div key={partner.name} className="logo-slot-card">
                  <div className="logo-slot">
                    <SupportLogo item={partner} fallbackLabel="Brand" />
                    <SocialIconLinks
                      instagram={partner.instagram}
                      linkedin={partner.linkedin}
                      label={partner.name}
                    />
                  </div>
                  <p>{partner.name}</p>
                </div>
              ))}
            </div>
          </section>
          ) : null}

          {visibleCollaborators.length > 0 ? (
          <section>
            <h3>Collaborative Allies</h3>
            <div className="card-grid logo-slot-grid">
              {visibleCollaborators.map((collaborator) => (
                <div key={collaborator.name} className="logo-slot-card">
                  <div className="logo-slot">
                    <CollaboratorLogo collaborator={collaborator} />
                    <SocialIconLinks
                      instagram={collaborator.instagram}
                      linkedin={collaborator.linkedin}
                      label={collaborator.name}
                    />
                  </div>
                  <p>{collaborator.name}</p>
                </div>
              ))}
            </div>
          </section>
          ) : null}

          {visibleSponsors.length > 0 ? (
          <section>
            <h3>Strategic Backers</h3>
            <div className="card-grid logo-slot-grid">
              {visibleSponsors.map((sponsor) => (
                <div key={sponsor.name} className="logo-slot-card">
                  <div className="logo-slot">
                    <SupportLogo item={sponsor} fallbackLabel="Brand" />
                    <SocialIconLinks
                      instagram={sponsor.instagram}
                      linkedin={sponsor.linkedin}
                      label={sponsor.name}
                    />
                  </div>
                  <p>{sponsor.name}</p>
                </div>
              ))}
            </div>
          </section>
          ) : null}
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
        <div className="card-grid">
          {sortedCommittee.map((member) => {
            const memberKey = `${member.role}-${member.sourceIndex}`;

            return (
              <div key={memberKey} className="team-card">
                <div className="team-photo-slot">
                  <TeamPhoto member={member} />
                  <div className="team-contact-overlay">
                    {member.linkedin?.trim() ? (
                      <a
                        className="team-contact-link"
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${member.name} LinkedIn profile`}
                      >
                        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                          <path
                            d="M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12ZM5.6 18.5h2.68V9.9H5.6v8.6Zm4.3-8.6v8.6h2.67v-4.27c0-1.12.21-2.2 1.6-2.2 1.37 0 1.39 1.29 1.39 2.28v4.19h2.68v-4.73c0-2.32-.5-4.1-3.2-4.1-1.3 0-2.18.72-2.54 1.4h-.03V9.9H9.9Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    ) : null}
                    <button
                      type="button"
                      className="team-contact-copy"
                      aria-label={`Copy ${member.name} email`}
                      disabled={!member.email && !sitePlaceholders.contactEmail}
                      onClick={() =>
                        copyEmail(member.email || sitePlaceholders.contactEmail, memberKey)
                      }
                    >
                      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                        <path
                          d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.5-.5a.5.5 0 0 0-.5.5v.33l6 4.11 6-4.11V6.5a.5.5 0 0 0-.5-.5h-11Zm11.5 3.26-4.9 3.35a2 2 0 0 1-2.2 0L6 9.26v8.24c0 .28.22.5.5.5h11a.5.5 0 0 0 .5-.5V9.26Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                  {copiedMemberKey === memberKey && (
                    <p className="team-contact-toast" role="status" aria-live="polite">
                      Email copied
                    </p>
                  )}
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
}

export default Home;
