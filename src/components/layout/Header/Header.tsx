import * as motion from "framer-motion/client";
import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  const navItems = [
    { label: "브랜드 소개", href: "#brand" },
    { label: "상담사 소개", href: "#counselors" },
    { label: "후기", href: "#reviews" },
    { label: "예약하기", href: "#reservation" },
  ];

  return (
    <motion.header className={styles.header} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          로뎀숲
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className={styles.navItem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <motion.button className={styles.ctaButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          상담 예약하기
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
