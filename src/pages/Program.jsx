import { useEffect, useRef, useState } from "react";

const dayQueues = [
  {
    title: "Day 1",
    label: "April 11, 2026",
    items: [
      {
        time: "10:00",
        activity: "Opening Ceremony",
        poster: "",
      },
      {
        time: "11:00",
        activity: "Industrial Visits / Expo Booths",
        poster: "",
      },
      { time: "13:00", activity: "Lunch", poster: "" },
      {
        time: "14:00",
        activity: "Distinguished Lecture (DL)",
        poster: "",
      },
      {
        time: "15:30",
        activity: "Panel Discussion / Workshops (Part 1)",
        poster: "",
      },
      { time: "17:00", activity: "Coffee Break", poster: "" },
      { time: "17:30", activity: "Workshops (Part 2)", poster: "" },
      { time: "19:30", activity: "Dinner", poster: "" },
      { time: "22:00", activity: "Social Activities", poster: "" },
      { time: "00:00", activity: "Ideathon Begins", poster: "" },
    ],
  },
  {
    title: "Day 2",
    label: "April 12, 2026",
    items: [
      { time: "09:00", activity: "Breakfast", poster: "" },
      { time: "10:00", activity: "Project Pitching", poster: "" },
      { time: "12:30", activity: "Closing Ceremony + Awards", poster: "" },
    ],
  },
];

const bootcampTracks = [
  {
    topic: "AI in Smart Grids",
    speaker: "Dr Manef Bourogaoui",
    poster: "/assets/bootcamp/manef.png",
  },
  {
    topic: "AI for Predictive Maintenance in Renewable Energy",
    speaker: "Ayoub Madyouni",
    poster: "/assets/bootcamp/ayoub.png",
  },
  {
    topic: "AI for Energy Optimization",
    speaker: "Hamza Mellouli",
    poster: "/assets/bootcamp/hamza.png",
  },
  {
    topic: "Sensors and Smart Monitoring for Energy Systems (IoT)",
    speaker: "Molka Weslati",
    poster: "/assets/bootcamp/molka.png",
  },
  {
    topic: "From Weather to Energy (Renewable Energy)",
    speaker: "Ibtihel Trabelsi",
    poster: "/assets/bootcamp/ibtihel.png",
  },
];

const defaultSessionPoster = "/assets/brand/sparc-logo-white.png";

function SessionPoster({ src, alt }) {
  return (
    <div className="session-poster">
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = defaultSessionPoster;
          }}
        />
      ) : (
        <p className="subtle">Add session poster</p>
      )}
    </div>
  );
}

function Program() {
  const [activeBootcampPoster, setActiveBootcampPoster] = useState(null);
  const [isClosingPoster, setIsClosingPoster] = useState(false);
  const closeTimerRef = useRef(null);

  const openPoster = (track) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setIsClosingPoster(false);
    setActiveBootcampPoster(track);
  };

  const closePoster = () => {
    if (!activeBootcampPoster || isClosingPoster) {
      return;
    }

    setIsClosingPoster(true);
    closeTimerRef.current = window.setTimeout(() => {
      setActiveBootcampPoster(null);
      setIsClosingPoster(false);
      closeTimerRef.current = null;
    }, 180);
  };

  useEffect(() => {
    if (!activeBootcampPoster) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePoster();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeBootcampPoster, isClosingPoster]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <section>
      <h1>Program</h1>
      <p className="subtle">
        Official SPARC 2026 schedule for Day 1 and Day 2.
      </p>

      <article className="panel bootcamp-panel">
        <div className="bootcamp-head">
          <p className="bootcamp-tag">Online Pre-Event | 5-9 April 2026</p>
          <h2>SPARC Bootcamp</h2>
          <p className="subtle">
            Intensive online sessions from 5 to 9 April 2026 before the congress to prepare teams with applied AI and IoT energy skills.
          </p>
        </div>
        <div className="bootcamp-track-grid">
          {bootcampTracks.map((track) => (
            <button
              type="button"
              className="bootcamp-track"
              key={track.topic}
              onClick={() => openPoster(track)}
            >
              <span className="bootcamp-track-dot" aria-hidden="true" />
              <div className="bootcamp-track-content">
                <p className="bootcamp-topic-title">{track.topic}</p>
                <p className="subtle bootcamp-track-meta">Speaker: {track.speaker}</p>
              </div>
            </button>
          ))}
        </div>
      </article>

      <div className="program-queue-grid">
        {dayQueues.map((day) => (
          <article className="panel program-day-queue" key={day.title}>
            <div className="program-day-head">
              <h2>{day.title}</h2>
              <p className="subtle">{day.label}</p>
            </div>
            <ol className="program-queue-list">
              {day.items.map((item) => (
                <li key={`${day.title}-${item.time}-${item.activity}`}>
                  <div
                    className={`program-session-row${item.poster ? " with-poster" : ""}`}
                  >
                    <p>
                      <strong>{item.time}</strong> - {item.activity}
                    </p>
                    {item.poster ? (
                      <SessionPoster
                        src={item.poster}
                        alt={`${item.activity} session poster`}
                      />
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>

      <article className="panel">
        <h2>Program Note</h2>
        <p className="subtle">
          Session timing is now published and will be updated here if operational changes are required.
        </p>
      </article>

      {activeBootcampPoster ? (
        <div
          className={`poster-lightbox${isClosingPoster ? " is-closing" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeBootcampPoster.topic} poster preview`}
          onClick={closePoster}
        >
          <article
            className={`poster-lightbox-card${isClosingPoster ? " is-closing" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="poster-lightbox-close"
              onClick={closePoster}
            >
              Close
            </button>
            <h2>{activeBootcampPoster.topic}</h2>
            <p className="subtle">Speaker: {activeBootcampPoster.speaker}</p>
            <img
              src={activeBootcampPoster.poster || defaultSessionPoster}
              alt={`${activeBootcampPoster.topic} poster`}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = defaultSessionPoster;
              }}
            />
          </article>
        </div>
      ) : null}
    </section>
  );
}

export default Program;
