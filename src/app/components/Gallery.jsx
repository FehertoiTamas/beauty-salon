import React, { useState } from "react";
import { motion } from "framer-motion";
import "../[locale]/styles/Gallery.css";

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const images = [
    { id: 1, src: "/images/gallery1.webp", alt: "Gallery Image 1" },
    { id: 2, src: "/images/gallery2.webp", alt: "Gallery Image 2" },
    { id: 3, src: "/images/gallery3.webp", alt: "Gallery Image 3" },
    { id: 4, src: "/images/gallery4.webp", alt: "Gallery Image 4" },
    { id: 5, src: "/images/gallery5.webp", alt: "Gallery Image 5" },
    { id: 6, src: "/images/gallery6.webp", alt: "Gallery Image 6" },
  ];
  const closeModal = () => setSelectedImageIndex(null);

  const showPreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <section className="gallery-section" id="gallery">
      <img src="/images/leaf.png" alt="" className="leaf" />
      <div className="gallery-container">
        <h2 className="gallery-title">Gallery</h2>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className="gallery-item"
              onClick={() => setSelectedImageIndex(index)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }} // Animáció minden egyes belépésnél
              transition={{
                duration: 0.6,
                delay: index * 0.2, // Késleltetés a képek közötti animációhoz
              }}
            >
              <img src={image.src} alt={image.alt} className="gallery-image" />
              <div className="gallery-overlay" />
            </motion.div>
          ))}
        </div>

        {selectedImageIndex !== null && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal}>
                ×
              </button>
              <button className="prev-button" onClick={showPreviousImage}>
                &lt;
              </button>
              <img
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                className="modal-image"
              />
              <button className="next-button" onClick={showNextImage}>
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
