"use client";

import * as motion from "framer-motion/client";
import styles from "./Center.module.css";
import Image from "next/image";

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
];

const Center = () => {
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
          <h2 className={styles.title}>상담실 안내</h2>
          <p className={styles.subtitle}>편안한 분위기에서 마음의 휴식을 찾으세요</p>
        </motion.div>

        <div className={styles.galleryGrid}>
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className={styles.galleryItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                className={styles.galleryImage}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Center;
