import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.branding}>
            <Link href="/" className={styles.logo}>
              로뎀숲
            </Link>
            <p className={styles.description}>
              마음의 평안과 성장을 함께하는
              <br />
              로뎀숲 심리상담센터
            </p>
          </div>

          <div className={styles.sections}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>상담 문의</h3>
              <ul className={styles.contactList}>
                <li>
                  <strong>강남점</strong>
                  <p>02-1234-5678</p>
                </li>
                <li>
                  <strong>분당점</strong>
                  <p>031-987-6543</p>
                </li>
                <li>
                  <strong>상담시간</strong>
                  <p>평일 10:00 - 20:00</p>
                  <p>토요일 10:00 - 17:00</p>
                </li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>바로가기</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link href="#services">상담 프로그램</Link>
                </li>
                <li>
                  <Link href="#counselor">상담사 소개</Link>
                </li>
                <li>
                  <Link href="#reviews">상담 후기</Link>
                </li>
                <li>
                  <Link href="#reservation">상담 예약</Link>
                </li>
                <li>
                  <Link href="#location">오시는 길</Link>
                </li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>SNS</h3>
              <ul className={styles.socialList}>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© {currentYear} 로뎀숲 심리상담센터. All rights reserved.</p>
          <div className={styles.legal}>
            <Link href="/privacy">개인정보처리방침</Link>
            <span className={styles.divider}>|</span>
            <Link href="/terms">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
