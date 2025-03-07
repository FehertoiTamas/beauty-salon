'use client';

import { useState } from 'react';
import { CalendarDaysIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import './styles/hero.css'; // Importáljuk a külön CSS fájlt
import AppointmentModal from '../components/AppointmentModal';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslations } from "next-intl";
import SocialMedia1 from '../components/SocialMedia1';


export default function Home() {
  const t = useTranslations("LandingPage");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      name: t('service-1'),
      description: t('service-1-description'),
      price: t('service-1-price')
    },
    {
      name: t('service-2'),
      description: t('service-2-description'),
      price: t('service-2-price')
    },
    {
      name: "Manicure & Pedicure",
      description: t('service-3-description'),
      price: t('service-3-price')
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      date: t('testimonials-1-date'),
      comment: t('testimonials-1-comment')
    },
    {
      name: "Emily Davis",
      date: t('testimonials-2-date'),
      comment: t('testimonials-2-comment')
    },
    {
      name: "Michelle Thompson",
      date: t('testimonials-3-date'),
      comment: t('testimonials-3-comment')
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className='lang-switcher'> <LanguageSwitcher className='lang-icon' /></div>

        <div className="hero-content">
          <h1 className="hero-title">{t('title')}</h1>
          <p className="hero-subtitle">{t('description')}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            {t('cta-btn')}
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="services-title">{t('services-title')}</h2>
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
                {t('cta-btn-2')}
              </button>
            </div>
          ))}
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="section-title">{t('testimonials-title')}</h2>
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
          <h2 className="contact-title">{t('contact-title')}</h2>
          <p className="contact-text">
            {t('contact-description')}
          </p>
          <div className="contact-container">
            <div className="contact-hours">
              <CalendarDaysIcon className="contact-hours-icon" />
              <span>{t('opening-hours')}</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="book-btn"
            >
              {t('cta-btn-2')}
            </button>
          </div>
        </div>
      </section>

      <SocialMedia1 />

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Elegance Beauty Salon. All rights reserved.</p>
      </footer>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </main>
  );
}