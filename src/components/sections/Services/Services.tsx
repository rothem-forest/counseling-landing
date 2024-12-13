"use client";

import * as motion from "framer-motion/client";
import styles from "./Services.module.css";
import Image from "next/image";

interface ServiceCard {
  title: string;
  description: string;
  image: string;
}

const serviceCards: ServiceCard[] = [
  {
    title: "가족상담",
    description: "가족 간의 갈등과 문제를 해결하고 건강한 가족관계를 회복합니다",
    image: "/images/가족상담.jpg",
  },
  {
    title: "기업상담",
    description: "직장 내 스트레스와 갈등 관리를 통해 건강한 조직문화를 만듭니다",
    image: "/images/기업상담.jpg",
  },
  {
    title: "부부상담",
    description: "부부간의 소통을 개선하고 친밀한 관계를 회복하도록 돕습니다",
    image: "/images/부부상담.jpg",
  },
  {
    title: "커플상담",
    description: "연인 관계의 갈등을 해결하고 더 깊은 이해와 신뢰를 형성합니다",
    image: "/images/커플상담.jpg",
  },
  {
    title: "청소년 아동상담",
    description: "성장기 청소년과 아동의 심리적 어려움을 함께 해결합니다",
    image: "/images/아동상담.jpg",
  },
  {
    title: "프로그램상담",
    description: "가족 구성원 간의 이해를 높이고 화목한 가정을 만듭니다",
    image: "/images/가족상담.jpg",
  },
];

const Services = () => {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.title}>로뎀숲만의 서비스</h2>
            <p className={styles.subtitle}>당신의 마음에 가장 필요한 상담을 제공합니다.</p>
          </motion.div>
        </div>

        <div className={styles.cardGrid}>
          {serviceCards.map((card, index) => (
            <motion.div
              key={card.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={card.image}
                  alt={card.title}
                  className={styles.cardImage}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
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
