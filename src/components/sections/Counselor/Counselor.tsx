"use client";

import * as motion from "framer-motion/client";
import { useState, useEffect } from "react";
import styles from "./Counselor.module.css";

const careerHistory = [
  { year: "2024", description: "로뎀숲 심리상담센터 대표" },
  { year: "2023", description: "한국심리학회 상담심리사 1급" },
  { year: "2022", description: "서울대학교 심리상담학과 박사" },
  { year: "2020", description: "국제심리상담센터 수석상담사" },
  { year: "2018", description: "한국상담학회 전문상담사 자격 취득" },
  { year: "2017", description: "연세대학교 심리학과 석사" },
];

const specialties = [
  "가족관계 회복",
  "부부상담 전문",
  "청소년 심리상담",
  "우울증/불안장애",
  "트라우마 치료",
  "자존감 회복",
];

const Counselor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

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
    if (typeof window === "undefined") return { x: 0, y: 0 };

    return {
      x: (mousePosition.x - window.innerWidth / 2) * 0.02 * factor,
      y: (mousePosition.y - window.innerHeight / 2) * 0.02 * factor,
    };
  };

  return (
    <section className={styles.counselor} id="counselor">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>전문 상담사 소개</h2>
          <p className={styles.subtitle}>따뜻한 마음으로 여러분의 이야기에 귀 기울이겠습니다</p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.profileSection}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              transform: `translate(${calculateMovement(0.5)?.x}px, ${calculateMovement(0.5)?.y}px)`,
            }}
          >
            <motion.div className={styles.imageWrapper} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <div className={styles.profileImage} />
              <div
                className={styles.imageOverlay}
                style={{
                  transform: `translate(${calculateMovement(-1)?.x}px, ${calculateMovement(-1)?.y}px)`,
                }}
              />
            </motion.div>
            <motion.div
              className={styles.profileInfo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className={styles.name}>김로뎀 상담사</h3>
              <p className={styles.role}>로뎀숲 심리상담센터 대표</p>
              <div className={styles.specialties}>
                <h4>전문 분야</h4>
                <ul className={styles.specialtyList}>
                  {specialties.map((specialty, index) => (
                    <motion.li
                      key={index}
                      className={styles.specialtyItem}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {specialty}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.careerSection}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              transform: `translate(${calculateMovement(-0.5)?.x}px, ${calculateMovement(-0.5)?.y}px)`,
            }}
          >
            <h4 className={styles.careerTitle}>주요 경력</h4>
            <div className={styles.timeline}>
              {careerHistory.map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.timelineItem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <span className={styles.year}>{item.year}</span>
                  <span className={styles.description}>{item.description}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Counselor;
