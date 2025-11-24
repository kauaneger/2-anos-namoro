import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Carousel.module.css";

const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const perPage = 1;

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [deltaX, setDeltaX] = useState(0);

  const trackRef = useRef(null);
  const autoplayRef = useRef(null);

  // -----------------------
  // FUNÇÕES DE MOVIMENTO
  // -----------------------

  const getTranslateValue = useCallback((idx = index) => -(idx * 100), [index]);

  const applyTransform = useCallback(
    (translate) => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${translate}%)`;
        trackRef.current.style.transition = isDragging
          ? "none"
          : "transform 0.4s ease";
      }
    },
    [isDragging]
  );

  useEffect(() => {
    applyTransform(getTranslateValue());
  }, [index, getTranslateValue, applyTransform]);

  // -----------------------
  // AUTOPLAY
  // -----------------------
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(autoplayRef.current);
  }, [images.length]);

  const pauseAutoplay = () => clearInterval(autoplayRef.current);

  // -----------------------
  // NEXT / PREV
  // -----------------------
  const next = () => {
    pauseAutoplay();
    setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prev = () => {
    pauseAutoplay();
    setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  // -----------------------
  // DRAG / SWIPE
  // -----------------------
  const handleStart = (event) => {
    event.preventDefault();
    pauseAutoplay();

    setIsDragging(true);
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    setStartX(clientX);
    setCurrentTranslate(getTranslateValue());
  };

  const handleMove = (event) => {
    if (!isDragging) return;

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const newDeltaX = clientX - startX;

    setDeltaX(newDeltaX);

    const trackWidth = trackRef.current.offsetWidth;
    const percentDelta = (newDeltaX / trackWidth) * 100;

    applyTransform(currentTranslate + percentDelta);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const dragThreshold = 50;

    if (deltaX < -dragThreshold) next();
    else if (deltaX > dragThreshold) prev();
    else applyTransform(getTranslateValue());

    setDeltaX(0);
  };

  const dragProps = {
    ref: trackRef,
    onMouseDown: handleStart,
    onTouchStart: handleStart,

    onMouseMove: isDragging ? handleMove : undefined,
    onMouseUp: handleEnd,
    onMouseLeave: isDragging ? handleEnd : undefined,

    onTouchMove: handleMove,
    onTouchEnd: handleEnd,
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselTrack} {...dragProps}>
          {images.map((img, i) => (
            <div
              className={styles.carrouselItem}
              key={i}
              style={{ minWidth: "100%" }}
            >
              <img src={img} alt="" draggable={false} />
            </div>
          ))}
        </div>
      </div>

      {/* -----------------------
          INDICATORS (DOTS)
      ------------------------ */}
      <div className={styles.dots}>
        {images.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${index === i ? styles.activeDot : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
