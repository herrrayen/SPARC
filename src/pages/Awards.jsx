import { useState } from "react";

const awardHighlights = [
  {
    key: "prize-pool",
    title: "Prize Pool",
    amount: "15,000 DT",
    details: "In course vouchers",
    poster: "/assets/awards/prize-pool.png",
    posterAlt: "SPARC Prize Pool poster",
  },
  {
    key: "best-ambassador-award",
    title: "Best Ambassador Award",
    amount: "100 DT",
    details: "Special recognition for the top ambassador contribution",
    poster: "/assets/awards/best-ambassador-award.png",
    posterAlt: "SPARC Best Ambassador Award poster",
  },
];

function Awards() {
  const [hiddenPosters, setHiddenPosters] = useState({});

  const handlePosterError = (key) => {
    setHiddenPosters((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <section className="awards-page">
      <h1>Awards</h1>
      <p className="subtle awards-intro">
        SPARC 2026 celebrates both team performance and ambassador impact with
        dedicated rewards.
      </p>

      <div className="grid two-col awards-grid">
        {awardHighlights.map((award) => (
          <article className="panel award-card" key={award.key}>
            {!hiddenPosters[award.key] ? (
              <img
                src={award.poster}
                alt={award.posterAlt}
                className="award-poster"
                loading="lazy"
                onError={() => handlePosterError(award.key)}
              />
            ) : (
              <div className="award-poster-fallback" aria-hidden="true">
                {award.title} poster will appear here after upload.
              </div>
            )}

            <h2>{award.title}</h2>
            <p className="award-amount">{award.amount}</p>
            <p className="subtle award-details">{award.details}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Awards;
