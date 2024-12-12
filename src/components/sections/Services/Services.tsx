"use client";

import * as motion from "framer-motion/client";
import { useState, useEffect } from "react";
import styles from "./Services.module.css";

interface ServiceCard {
  title: string;
  description: string;
  image: string;
}

const serviceCards: ServiceCard[] = [
  {
    title: "Standard",
    description: "Amazing view in Imerovigli",
    image: "/images/image.jpg",
  },
  {
    title: "Deluxe",
    description: "Light & Spacious Garden Flat London",
    image: "/images/image.jpg",
  },
  {
    title: "Premium",
    description: "TREEhouse/casaBARTHEL",
    image: "/images/image.jpg",
  },
  {
    title: "Premium Deluxe",
    description: "Luxury Pool Villa with Ocean View",
    image: "/images/image.jpg",
  },
  {
    title: "Premium Deluxe2",
    description: "Luxury Pool Villa with Ocean View",
    image: "/images/image.jpg",
  },
  {
    title: "Premium Deluxe3",
    description: "Luxury Pool Villa with Ocean View",
    image: "/images/image.jpg",
  },
];

const Services = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateCardMovement = (index: number) => {
    if (activeCard !== index) return {};
    const moveX = (mousePosition.x - window.innerWidth / 2) * 0.02;
    const moveY = (mousePosition.y - window.innerHeight / 2) * 0.02;
    return {
      x: moveX,
      y: moveY,
      rotateX: moveY * 0.5,
      rotateY: -moveX * 0.5,
    };
  };

  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>맞춤형 상담 서비스</h2>
          <p className={styles.subtitle}>당신의 상황에 맞는 전문적인 상담 서비스를 제공합니다</p>
        </motion.div>

        <div className={styles.cardGrid}>
          {serviceCards.map((card, index) => (
            <motion.div
              key={card.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}
            >
              <div className={styles.imageWrapper}>
                <img src={card.image} alt={card.title} className={styles.cardImage} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
