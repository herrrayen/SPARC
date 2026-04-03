import { useEffect, useMemo, useState } from "react";

const REGISTRATION_URL = "https://forms.gle/EbA8zLV1EBEjgvAQA";
const REGISTRATION_DEADLINE = new Date("2026-04-09T23:59:59");

function getCountdownParts(deadline) {
  const now = Date.now();
  const remainingMs = Math.max(0, deadline.getTime() - now);

  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return {
    isOpen: remainingMs > 0,
    days,
    hours,
    minutes,
  };
}

function RegistrationPopup() {
  const [countdown, setCountdown] = useState(() =>
    getCountdownParts(REGISTRATION_DEADLINE)
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts(REGISTRATION_DEADLINE));
    }, 60000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const timerText = useMemo(() => {
    const dd = String(countdown.days).padStart(2, "0");
    const hh = String(countdown.hours).padStart(2, "0");
    const mm = String(countdown.minutes).padStart(2, "0");

    return `${dd}:${hh}:${mm}`;
  }, [countdown.days, countdown.hours, countdown.minutes]);

  return (
    <aside className="registration-popup" aria-live="polite">
      <p className="registration-popup-eyebrow">Registration Is Open</p>
      <p className="registration-popup-copy">Deadline: April 9th</p>
      {countdown.isOpen ? (
        <p className="registration-popup-timer">{timerText}</p>
      ) : (
        <p className="registration-popup-timer closed">Registration Closed</p>
      )}
      <a
        href={REGISTRATION_URL}
        target="_blank"
        rel="noreferrer"
        className="registration-popup-link"
      >
        Register
      </a>
    </aside>
  );
}

export default RegistrationPopup;