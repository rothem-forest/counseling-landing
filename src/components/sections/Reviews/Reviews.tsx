"use client";

import * as motion from "framer-motion/client";
import { useState, useEffect, useRef } from "react";
import StarRating from "@/components/common/StarRating/StarRating";
import styles from "./Reviews.module.css";

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  program: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "김*진",
    rating: 5,
    text: "상담사님의 따뜻한 이해와 공감으로 마음의 위로를 받았습니다. 제가 미처 깨닫지 못했던 내면의 이야기를 찾아갈 수 있도록 도와주셔서 감사합니다.",
    date: "2024.03",
    program: "개인상담",
  },
  {
    id: 2,
    name: "이*수",
    rating: 5,
    text: "부부관계의 어려움으로 찾아갔는데, 서로를 이해하고 소통하는 방법을 배울 수 있었습니다. 덕분에 관계가 많이 개선되었어요.",
    date: "2024.02",
    program: "부부상담",
  },
  {
    id: 3,
    name: "박*연",
    rating: 5,
    text: "청소년 자녀와의 갈등으로 힘들었는데, 상담을 통해 서로를 이해하고 대화하는 방법을 배웠습니다. 가족 관계가 많이 좋아졌어요.",
    date: "2024.01",
    program: "가족상담",
  },
  {
    id: 4,
    name: "최*우",
    rating: 5,
    text: "업무 스트레스로 힘들었는데, 상담을 통해 스트레스 관리 방법을 배웠습니다. 일상이 많이 나아졌어요.",
    date: "2024.01",
    program: "개인상담",
  },
  {
    id: 5,
    name: "정*아",
    rating: 5,
    text: "가족 문제로 오랫동안 고민했는데, 상담을 통해 해결 방법을 찾았습니다. 많은 도움이 되었어요.",
    date: "2024.02",
    program: "가족상담",
  },
  {
    id: 6,
    name: "강*현",
    rating: 5,
    text: "부부 갈등으로 힘들었는데, 상담을 통해 서로를 이해하게 되었습니다. 관계가 많이 좋아졌어요.",
    date: "2024.03",
    program: "부부상담",
  },
  {
    id: 7,
    name: "윤*서",
    rating: 5,
    text: "자존감 회복에 큰 도움을 받았습니다. 상담사님의 따뜻한 조언 덕분에 새로운 시작을 할 수 있었어요.",
    date: "2024.03",
    program: "개인상담",
  },
  {
    id: 8,
    name: "임*준",
    rating: 5,
    text: "회사생활의 어려움을 상담사님과 함께 해결할 수 있었습니다. 진심으로 감사드립니다.",
    date: "2024.02",
    program: "개인상담",
  },
];

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const constraintsRef = useRef(null);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, totalPages]);

  const getCurrentPageItems = () => {
    const start = currentPage * itemsPerPage;
    return reviews.slice(start, start + itemsPerPage);
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50; // 드래그 임계값
    if (info.offset.x < -threshold && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (info.offset.x > threshold && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePrevClick = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  return (
    <section className={styles.reviews} id="reviews">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>상담 후기</h2>
          <p className={styles.subtitle}>로뎀숲과 함께한 분들의 이야기</p>
        </motion.div>

        <div
          className={styles.carouselContainer}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          ref={constraintsRef}
        >
          <motion.button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={handlePrevClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>

          <motion.div
            className={styles.reviewGrid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            drag="x"
            dragConstraints={constraintsRef}
            onDragEnd={handleDragEnd}
          >
            {getCurrentPageItems().map((review, index) => (
              <motion.div
                key={review.id}
                className={styles.reviewCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={styles.reviewHeader}>
                  <StarRating rating={review.rating} />
                  <span className={styles.program}>{review.program}</span>
                </div>
                <p className={styles.reviewText}>{review.text}</p>
                <div className={styles.reviewFooter}>
                  <span className={styles.name}>{review.name}</span>
                  <span className={styles.date}>{review.date}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={handleNextClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>

          <div className={styles.indicators}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${
                  index === currentPage ? styles.active : ""
                }`}
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
