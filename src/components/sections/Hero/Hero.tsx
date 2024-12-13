"use client";

import * as motion from "framer-motion/client";
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const calculateMovement = (factor: number = 1) => {
    if (!isClient) return { x: 0, y: 0 };

    return {
      x: (mousePosition.x - window.innerWidth / 2) * 0.02 * factor,
      y: (mousePosition.y - window.innerHeight / 2) * 0.02 * factor,
    };
  };

  const content = (
    <div className={styles.content}>
      <h1 className={styles.title}>
        마음이 쉬어가는 곳,
        <br />
        <span className={styles.highlight}>로뎀숲</span>
      </h1>
      <p className={styles.description}>
        로뎀숲과 함께
        <br />
        마음의 안정과 성장을 경험하세요
      </p>
      <button className={styles.ctaButton}>상담 예약하기</button>
    </div>
  );

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <video autoPlay muted loop playsInline className={styles.backgroundVideo}>
          <source src="/background/background.mp4" type="video/mp4" />
        </video>
        <div
          className={styles.overlay}
          style={isClient ? { transform: `translateY(${scrollY * 0.5}px)` } : undefined}
        />
      </div>
      <div className={styles.container}>
        {isClient ? (
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              transform: `translate(${calculateMovement(0.5).x}px, ${calculateMovement(0.5).y}px)`,
            }}
          >
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              마음이 쉬어가는 곳,
              <br />
              <motion.span
                className={styles.highlight}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                로뎀숲
              </motion.span>
            </motion.h1>

            <motion.p
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              로뎀숲과 함께
              <br />
              마음의 안정과 성장을 경험하세요
            </motion.p>

            <motion.button
              className={styles.ctaButton}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              상담 예약하기
            </motion.button>
          </motion.div>
        ) : (
          content
        )}
      </div>
    </section>
  );
};

export default Hero;
