"use client";

import * as motion from "framer-motion/client";
import { useState, useEffect } from "react";
import styles from "./Counselor.module.css";
import Image from "next/image";

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
        <div className={styles.content}>
          <motion.div
            className={styles.profileSection}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.imageWrapper}>
              <Image
                src="https://modo-phinf.pstatic.net/20230130_140/1675026430046r176A_PNG/mosaIMyw4d.png?type=f530_353"
                alt="상담사 프로필"
                className={styles.profileImage}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <motion.div
            className={styles.infoSection}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.title}>심리상담이란?</h2>
            <p className={styles.description}>
              Psychological counseling 심리적 문제로 인한 정신적 고통, 대인관계에서의 갈등, 사회생활에서의 부적응 등
              일상생활에서 겪고 있는 다양한 문제에서 벗어나, 보다 적응적이고 만족한 삶을 누리기 위하여 상담자와 내담자가
              협력하여 문제를 풀어나가는 과정입니다.
            </p>

            <div className={styles.serviceTypes}>
              <motion.div
                className={styles.serviceType}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3>개인상담</h3>
                <p>모델놀이치료</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Counselor;
