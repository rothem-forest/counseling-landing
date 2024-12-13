"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./page.module.css";

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    maritalStatus: "",
    occupation: "",
    religion: "",
    referralSource: "",
    phone: "",
    email: "",
    hasPreviousCounseling: false,
    previousCounselingDetails: "",
    preferredDate: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 폼 제출 로직 구현
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
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
          <h1 className={styles.title}>상담 예약하기</h1>
          <p className={styles.description}>전문 상담사와 함께하는 맞춤형 상담을 예약하세요</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="성함을 입력해주세요"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="number"
                  name="age"
                  placeholder="나이"
                  value={formData.age}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <select name="gender" value={formData.gender} onChange={handleChange} className={styles.input} required>
                  <option value="">성별 선택</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className={styles.input}
                  required
                >
                  <option value="">결혼여부 선택</option>
                  <option value="single">미혼</option>
                  <option value="married">기혼</option>
                  <option value="divorced">이혼</option>
                  <option value="widowed">사별</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="occupation"
                  placeholder="직업"
                  value={formData.occupation}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="religion"
                  placeholder="종교"
                  value={formData.religion}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <select
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleChange}
                  className={styles.input}
                  required
                >
                  <option value="">상담 신청경로 선택</option>
                  <option value="internet">인터넷 검색</option>
                  <option value="recommendation">지인 추천</option>
                  <option value="advertisement">광고</option>
                  <option value="other">기타</option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="연락처"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="이메일"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="hasPreviousCounseling"
                  checked={formData.hasPreviousCounseling}
                  onChange={handleChange}
                />
                <span>이전 상담 경험이 있습니다</span>
              </label>
            </div>

            {formData.hasPreviousCounseling && (
              <div className={styles.formGroup}>
                <textarea
                  name="previousCounselingDetails"
                  placeholder="이전 상담 경험에 대해 간단히 설명해주세요"
                  value={formData.previousCounselingDetails}
                  onChange={handleChange}
                  className={styles.textarea}
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <input
                type="datetime-local"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="상담하시고자 하는 내용을 자유롭게 작성해주세요"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                required
              />
            </div>

            <div className={styles.termsGroup}>
              <label className={styles.checkbox}>
                <input type="checkbox" required />
                <span>개인정보 수집 및 이용에 동의합니다</span>
              </label>
            </div>

            <motion.button
              type="submit"
              className={styles.submitButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              예약하기
            </motion.button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
