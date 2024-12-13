"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "./page.module.css";
import { FaRegSmile, FaRegMeh, FaRegFrown, FaRegDizzy } from "react-icons/fa";

export default function SelfDiagnosisPage() {
  const [activeTab, setActiveTab] = useState("anxiety");
  const [answers, setAnswers] = useState<number[]>(new Array(21).fill(-1)); // -1로 초기화하여 아무것도 선택되지 않은 상태로 시작
  const [, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const tabs = [
    { id: "anxiety", label: "불안증 자가진단" },
    { id: "depression", label: "우울증 자가진단" },
    { id: "adhd", label: "ADHD 자가진단" },
    { id: "social", label: "사회성 자가진단" },
  ];

  const handleAnswerChange = (questionIndex: number, score: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = score;
    setAnswers(newAnswers);
  };

  const calculateResult = () => {
    const sum = answers.reduce((acc, curr) => acc + (curr === -1 ? 0 : curr), 0); // -1인 경우 0으로 처리
    setTotalScore(sum);
    setShowResult(true);
    setShowModal(true);
  };

  const getResultIcon = (score: number) => {
    if (score <= 21) return <FaRegSmile size={48} color="#27ae60" />;
    if (score <= 42) return <FaRegMeh size={48} color="#f1c40f" />;
    if (score <= 63) return <FaRegFrown size={48} color="#e67e22" />;
    return <FaRegDizzy size={48} color="#e74c3c" />;
  };

  const getResultMessage = (score: number) => {
    if (score <= 21) return "정상 범위입니다.";
    if (score <= 42) return "경미한 수준입니다. 전문가와 상담을 고려해보세요.";
    if (score <= 63) return "중등도 수준입니다. 전문가의 상담이 필요합니다.";
    return "심각한 수준입니다. 즉시 전문가의 도움을 받으시기 바랍니다.";
  };

  const anxietyQuestions = [
    "가끔씩 몸이 저리고 쑤시며 감각이 마비된 느낌을 받는다.",
    "흥분된 느낌을 받는다.",
    "가끔씩 다리가 떨리곤 한다.",
    "편안하게 쉴 수가 없다.",
    "매우 나쁜 일이 일어날 것 같은 두려움을 느낀다.",
    "어지러움(현기증)을 느낀다.",
    "가끔씩 심장이 두근거리고 빨리 뛴다.",
    "침착하지 못하다.",
    "자주 겁을 먹고 무서움을 느낀다.",
    "신경이 과민되어 왔다.",
    "가끔씩 숨이 막히고 질식할 것 같다.",
    "자주 손이 떨린다.",
    "안절부절 못해 한다.",
    "미칠 것 같은 두려움을 느낀다.",
    "가끔씩 숨쉬기 곤란할 때가 있다.",
    "죽을 것 같은 두려움을 느낀다.",
    "불안한 상태에 있다.",
    "자주 소화가 안 되고 뱃속이 불편하다.",
    "가끔씩 기절할 것 같다.",
    "자주 얼굴이 붉어지곤 한다.",
    "땀을 많이 흘린다.(더위로 인한 것은 제외)",
  ];

  const depressionQuestions = [
    "일상적인 활동에 흥미를 잃었다.",
    "우울하거나 절망적인 기분이 든다.",
    "잠들기 어렵거나 너무 많이 잔다.",
    "피곤하고 기운이 없다.",
    "식욕이 없거나 과식을 한다.",
  ];

  const adhdQuestions = [
    "일을 끝내기 전에 다른 일로 넘어간다.",
    "집중하기 어렵다.",
    "가만히 앉아있기 힘들다.",
    "물건을 자주 잃어버린다.",
    "충동적으로 행동한다.",
  ];

  const socialQuestions = [
    "다른 사람들과 어울리는 것이 불편하다.",
    "새로운 사람을 만나는 것이 두렵다.",
    "대화를 시작하거나 이어가기 어렵다.",
    "사회적 상황에서 불안을 느낀다.",
    "다른 사람들의 시선이 신경 쓰인다.",
  ];

  const renderQuestions = (questions: string[]) => {
    return questions.map((question, index) => (
      <motion.div
        key={index}
        className={styles.questionBox}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <h3>{`${index + 1}. ${question}`}</h3>
        <div className={styles.options}>
          {["전혀 느끼지 않았다.", "조금 느꼈다.", "상당히 느꼈다.", "심하게 느꼈다."].map((option, score) => (
            <label key={score} className={`${styles.radioLabel} ${answers[index] === score ? styles.checked : ""}`}>
              <input
                type="radio"
                name={`question-${index}`}
                value={score}
                checked={answers[index] === score}
                onChange={() => handleAnswerChange(index, score)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </motion.div>
    ));
  };

  const ResultModal = () => {
    if (!showModal) return null;

    return (
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.modalContent}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
        >
          <div className={styles.modalHeader}>
            <h2>진단 결과</h2>
            <button className={styles.closeButton} onClick={() => setShowModal(false)}>
              ✕
            </button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.resultIcon}>{getResultIcon(totalScore)}</div>
            <p className={styles.resultScore}>총점: {totalScore}점</p>
            <p className={styles.resultMessage}>{getResultMessage(totalScore)}</p>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "anxiety":
        return (
          <motion.div
            key="anxiety"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderQuestions(anxietyQuestions)}
            <motion.button
              className={styles.submitButton}
              onClick={calculateResult}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              결과 보기
            </motion.button>
            <AnimatePresence>
              <ResultModal />
            </AnimatePresence>
          </motion.div>
        );
      case "depression":
        return (
          <motion.div
            key="depression"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderQuestions(depressionQuestions)}
            <motion.button
              className={styles.submitButton}
              onClick={calculateResult}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              결과 보기
            </motion.button>
            <AnimatePresence>
              <ResultModal />
            </AnimatePresence>
          </motion.div>
        );
      case "adhd":
        return (
          <motion.div
            key="adhd"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderQuestions(adhdQuestions)}
            <motion.button
              className={styles.submitButton}
              onClick={calculateResult}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              결과 보기
            </motion.button>
            <AnimatePresence>
              <ResultModal />
            </AnimatePresence>
          </motion.div>
        );
      case "social":
        return (
          <motion.div
            key="social"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderQuestions(socialQuestions)}
            <motion.button
              className={styles.submitButton}
              onClick={calculateResult}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              결과 보기
            </motion.button>
            <AnimatePresence>
              <ResultModal />
            </AnimatePresence>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.title}>자가진단 테스트</h1>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ""}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setAnswers(new Array(21).fill(-1)); // 탭 변경 시에도 -1로 초기화
                  setShowResult(false);
                  setShowModal(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
