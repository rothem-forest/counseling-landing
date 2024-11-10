"use client";

import * as motion from "framer-motion/client";
import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./Reservation.module.css";

interface FormData {
  name: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
}

const Reservation = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "연락처를 입력해주세요";
    } else if (!/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(formData.phone)) {
      newErrors.phone = "000-0000-0000 형식으로 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 에러 메시지 초기화
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // TODO: 실제 예약 처리 로직 구현
      console.log(formData);
      // 폼 초기화
      setFormData({
        name: "",
        phone: "",
        message: "",
      });
      alert("상담 예약이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
    }
  };

  return (
    <section className={styles.reservation} id="reservation">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>상담 예약</h2>
          <p className={styles.subtitle}>따뜻한 위로와 함께 시작하는 새로운 이야기</p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.formWrapper}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  이름
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={styles.input}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력해주세요"
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  연락처
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={styles.input}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="000-0000-0000"
                />
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  상담 내용 (선택)
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="상담 받고 싶으신 내용을 간단히 적어주세요"
                  rows={4}
                />
              </div>

              <motion.button
                type="submit"
                className={styles.submitButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                상담 예약하기
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>상담 예약 안내</h3>
              <ul className={styles.infoList}>
                <li>예약 접수 후 24시간 이내에 연락드립니다</li>
                <li>상담 시간은 50분 기준입니다</li>
                <li>첫 상담은 무료로 진행됩니다</li>
                <li>야간 및 주말 상담도 가능합니다</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
