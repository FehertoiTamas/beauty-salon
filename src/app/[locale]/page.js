'use client';

import { useState } from 'react';
import { CalendarDaysIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import './styles/hero.css'; // Importáljuk a külön CSS fájlt
import AppointmentModal from '../components/AppointmentModal';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslations } from "next-intl";


export default function Home() {
  const t = useTranslations("LandingPage");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t('title')}</h1>
          <p className="hero-subtitle">{t('description')}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            Book Appointment
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <LanguageSwitcher />
        <h2 className="services-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <SparklesIcon className="icon" />
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p className="service-price">{service.price}</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="avatar">
                    <UserGroupIcon className="avatar-icon" />
                  </div>
                  <div className="testimonial-info">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <p className="testimonial-date">{testimonial.date}</p>
                  </div>
                </div>
                <p className="testimonial-comment">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-content">
          <h2 className="contact-title">Book Your Appointment</h2>
          <p className="contact-text">
            Transform your look with our expert beauty services. Book your appointment today!
          </p>
          <div className="contact-container">
            <div className="contact-hours">
              <CalendarDaysIcon className="contact-hours-icon" />
              <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="book-btn"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2023 Elegance Beauty Salon. All rights reserved.</p>
      </footer>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </main>
  );
}

const services = [
  {
    name: "Luxury Facial Treatment",
    description: "Revitalize your skin with our signature facial treatment using premium products.",
    price: "$120"
  },
  {
    name: "Hair Styling & Coloring",
    description: "Transform your look with cutting-edge styling and premium hair coloring services.",
    price: "From $80"
  },
  {
    name: "Manicure & Pedicure",
    description: "Pamper your hands and feet with our luxurious nail care treatments.",
    price: "$65"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    date: "August 2023",
    comment: "Absolutely amazing experience! The staff is professional and the results exceeded my expectations."
  },
  {
    name: "Emily Davis",
    date: "July 2023",
    comment: "Best salon in town! I love how they transformed my hair and their attention to detail."
  },
  {
    name: "Michelle Thompson",
    date: "June 2023",
    comment: "Such a relaxing atmosphere and fantastic service. I'll definitely be coming back!"
  }
];
