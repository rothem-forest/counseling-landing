"use client";

import { useState, useEffect } from "react";
import * as motion from "framer-motion/client";
import styles from "./Header.module.css";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      // reservation 페이지에서는 스크롤 효과 적용하지 않음
      if (pathname === "/reservation") {
        setIsScrolled(true);
        return;
      }
      setIsScrolled(window.scrollY > 0);
    };

    checkMobile();
    handleScroll(); // 초기 로드 시 상태 설정
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const navItems = [
    { label: "서비스", href: "#services" },
    { label: "상담사", href: "#counselor" },
    { label: "쉼터", href: "#center" },
    { label: "블로그", href: "#blog" },
    { label: "오시는길", href: "#location" },
    { label: "FAQ", href: "#faq" },
  ];

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const hamburgerVariants = {
    open: {
      scale: 1.1,
    },
    closed: {
      scale: 1,
    },
  };

  return (
    <motion.header
      className={`${styles.header} ${isScrolled || pathname === "/reservation" ? styles.scrolled : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          로뎀숲
        </Link>

        {!isMobile ? (
          <>
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

            <motion.button
              onClick={() => router.push("/reservation")}
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              상담 예약하기
            </motion.button>
          </>
        ) : (
          <>
            <motion.button
              className={styles.hamburger}
              onClick={() => setIsOpen(!isOpen)}
              variants={hamburgerVariants}
              animate={isOpen ? "open" : "closed"}
              whileTap={{ scale: 0.9 }}
            >
              <span className={`${styles.hamburgerLine} ${isOpen ? styles.open : ""}`}></span>
              <span className={`${styles.hamburgerLine} ${isOpen ? styles.open : ""}`}></span>
              <span className={`${styles.hamburgerLine} ${isOpen ? styles.open : ""}`}></span>
            </motion.button>

            <motion.div
              className={styles.mobileMenu}
              variants={menuVariants}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
            >
              <nav className={styles.mobileNav}>
                {navItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={styles.mobileNavItem}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <motion.button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/reservation");
                }}
                className={styles.mobileCta}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                상담 예약하기
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
