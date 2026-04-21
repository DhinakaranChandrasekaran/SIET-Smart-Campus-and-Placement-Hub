import React, { useEffect, useState } from "react";
import galleryData from "../../data/galleryData";

const PlacementGallery = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % galleryData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* No title - just carousel */}
      <div className="gallery-carousel-container">
        {galleryData.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Placement ${index + 1}`}
            className={`gallery-carousel-image ${index === current ? "active" : ""}`}
          />
        ))}

        <div className="gallery-indicators">
          {galleryData.map((_, index) => (
            <span
              key={index}
              className={`gallery-dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .gallery-carousel-container {
          position: relative;
          width: 100%;
          height: 80vh;
          overflow: hidden;
        }

        .gallery-carousel-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1s ease;
        }

        .gallery-carousel-image.active {
          opacity: 1;
        }

        .gallery-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }

        .gallery-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .gallery-dot.active {
          background: rgba(255, 255, 255, 0.95);
        }

        @media (max-width: 768px) {
          .gallery-carousel-container {
            height: 40vh;
          }
        }
      `}</style>
    </>
  );
};

export default PlacementGallery;
