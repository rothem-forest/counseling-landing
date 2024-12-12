"use client";

import * as motion from "framer-motion/client";
import Image from "next/image";
import styles from "./Center.module.css";
import { useState, useEffect } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "https://modo-phinf.pstatic.net/20230126_198/1674699238131jfKiY_PNG/mosa7Bk9Cx.png?type=f353_353",
    alt: "상담실 입구",
  },
  {
    src: "https://modo-phinf.pstatic.net/20230126_36/1674699239372J142M_PNG/mosaXOw3lU.png?type=f353_353",
    alt: "상담실 내부",
  },
  {
    src: "https://modo-phinf.pstatic.net/20230126_280/16746992422848hMvn_PNG/mosaHY6h2k.png?type=f353_353",
    alt: "상담실 공간",
  },
  {
    src: "https://modo-phinf.pstatic.net/20230126_280/16746992422848hMvn_PNG/mosaHY6h2k.png?type=f353_353",
    alt: "상담실 공간",
  },
  {
    src: "https://modo-phinf.pstatic.net/20230126_280/16746992422848hMvn_PNG/mosaHY6h2k.png?type=f353_353",
    alt: "상담실 공간",
  },
  {
    src: "https://modo-phinf.pstatic.net/20230126_280/16746992422848hMvn_PNG/mosaHY6h2k.png?type=f353_353",
    alt: "상담실 공간",
  },
  {
    src: "https://modo-phinf.pstatic.net/20230126_280/16746992422848hMvn_PNG/mosaHY6h2k.png?type=f353_353",
    alt: "상담실 공간",
  },
  {
    src: "https://modo-phinf.pstatic.net/20230126_280/16746992422848hMvn_PNG/mosaHY6h2k.png?type=f353_353",
    alt: "상담실 공간",
  },
];

const Center = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.center} id="center">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>쉼터 소개</h2>
          <p className={styles.subtitle}>편안한 분위기에서 마음의 휴식을 찾으세요</p>
        </motion.div>

        <div className={styles.galleryWrapper}>
          <div className={styles.galleryContainer}>
            <motion.div
              className={styles.gallerySlide}
              animate={{
                transform: isMobile
                  ? `translateX(-${currentIndex * 100}%)` // 모바일에서는 단순히 100% 단위로 이동
                  : `translateX(calc(-${currentIndex} * (33.333% + 2rem)))`,
              }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className={styles.galleryItem}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className={styles.galleryImage}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className={styles.controlsContainer}>
            <motion.button
              className={`${styles.controlButton} ${currentIndex === 0 ? styles.disabled : ""}`}
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={currentIndex === 0}
            >
              ←
            </motion.button>
            <motion.button
              className={`${styles.controlButton} ${
                currentIndex === (isMobile ? galleryImages.length - 1 : galleryImages.length - 3) ? styles.disabled : ""
              }`}
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={currentIndex === (isMobile ? galleryImages.length - 1 : galleryImages.length - 3)}
            >
              →
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Center;
