import { useEffect, useRef, useState } from "react";
import { venueGalleryImages } from "../data/placeholders";

function Venue() {
  const [images, setImages] = useState(venueGalleryImages);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [images.length, isPaused]);

  const goToIndex = (index) => {
    setActiveIndex(index);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handleImageError = (brokenSrc) => {
    const filtered = images.filter((src) => src !== brokenSrc);
    setImages(filtered);
    setActiveIndex((prev) =>
      filtered.length === 0 ? 0 : Math.min(prev, filtered.length - 1)
    );
  };

  const onTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchStartX.current === null || images.length <= 1) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(delta) > 45) {
      if (delta > 0) goPrev();
      else goNext();
    }

    touchStartX.current = null;
  };

  return (
    <section>
      <h1>Venue</h1>
      <div className="grid two-col">
        <article className="panel">
          <h2>Location</h2>
          <p>Youth Cultural and Sports Center of Ben Arous</p>
          <p>Ben Arous, Tunisia</p>
          <p className="subtle">Official venue gallery is shown below.</p>
        </article>
        <article className="panel">
          <h2>Travel and Stay</h2>
          <ul>
            <li>Airport and public transport guidance will be published with the final attendee pack.</li>
            <li>Recommended accommodation options will be shared before event week.</li>
            <li>Local logistics notes for attendees and teams will be provided in the participant guide.</li>
          </ul>
        </article>
      </div>
      <article className="panel">
        <h2>CCSJ Ben Arous Gallery</h2>
        {images.length > 0 ? (
          <div
            className="venue-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="venue-image-wrap venue-carousel-viewport"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="venue-carousel-track"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {images.map((src, index) => (
                  <div key={src} className="venue-slide">
                    <img
                      className="venue-image"
                      src={src}
                      alt={`Youth Cultural and Sports Center of Ben Arous photo ${index + 1}`}
                      loading="lazy"
                      onError={() => handleImageError(src)}
                    />
                  </div>
                ))}
              </div>
              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    className="venue-arrow venue-arrow-left"
                    onClick={goPrev}
                    aria-label="Show previous venue image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="venue-arrow venue-arrow-right"
                    onClick={goNext}
                    aria-label="Show next venue image"
                  >
                    ›
                  </button>
                </>
              ) : null}
            </div>
            {images.length > 1 ? (
              <div className="venue-carousel-dots" aria-label="Venue gallery navigation">
                {images.map((src, index) => (
                  <button
                    key={`${src}-dot`}
                    type="button"
                    className={`venue-dot ${index === activeIndex ? "active" : ""}`}
                    onClick={() => goToIndex(index)}
                    aria-label={`Show venue image ${index + 1}`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="subtle">
            Venue gallery assets are currently unavailable.
          </p>
        )}
        <p className="subtle">
          Interactive map and directional guidance will be added in a following
          update.
        </p>
      </article>
    </section>
  );
}

export default Venue;
