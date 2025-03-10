import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Gallery.css";
import Image1 from "../../assets/Images/image1.webp";
import Image2 from "../../assets/Images/Gallery/image2.webp";
import Image3 from "../../assets/Images/Gallery/image3.webp";
import Image4 from "../../assets/Images/Gallery/image4.webp";
import Image5 from "../../assets/Images/Gallery/image5.webp";
import Image6 from "../../assets/Images/Gallery/image6.webp";

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const images = [
    { id: 1, src: Image1, alt: "Gallery Image 1" },
    { id: 2, src: Image2, alt: "Gallery Image 2" },
    { id: 3, src: Image3, alt: "Gallery Image 3" },
    { id: 4, src: Image4, alt: "Gallery Image 4" },
    { id: 5, src: Image5, alt: "Gallery Image 5" },
    { id: 6, src: Image6, alt: "Gallery Image 6" },
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
