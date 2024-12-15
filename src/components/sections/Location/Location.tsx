"use client";
import { useEffect, useRef } from "react";
import * as motion from "framer-motion/client";
import styles from "./Location.module.css";

interface Branch {
  id: number;
  name: string;
  address: string;
  tel: string;
  hours: string;
  location: {
    lat: number;
    lng: number;
  };
}

const branches: Branch[] = [
  {
    id: 1,
    name: "로뎀숲 강남점",
    address: "서울특별시 강남구 테헤란로 123 로뎀빌딩 5층",
    tel: "02-1234-5678",
    hours: "평일 10:00 - 20:00 / 토요일 10:00 - 17:00 / 일요일 휴무",
    location: {
      lat: 37.4967,
      lng: 127.0276,
    },
  },
  {
    id: 2,
    name: "로뎀숲 분당점",
    address: "경기도 성남시 분당구 판교역로 456 로뎀타워 8층",
    tel: "031-987-6543",
    hours: "평일 10:00 - 20:00 / 토요일 10:00 - 17:00 / 일요일 휴무",
    location: {
      lat: 37.3947,
      lng: 127.1119,
    },
  },
];

export default function Location() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current && window.naver && window.naver.maps) {
      // 지도 생성
      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(37.4967, 127.0276), // 강남점 기준
        zoom: 12,
      });

      // 각 지점에 마커와 InfoWindow 생성
      branches.forEach((branch) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(branch.location.lat, branch.location.lng),
          map: map,
        });

        const contentString = [
          '<div class="iw_inner" style="padding: 15px;">',
          `   <h3 style="margin: 0 0 10px 0;">${branch.name}</h3>`,
          `   <p style="margin: 5px 0;">${branch.address}</p>`,
          "</div>",
        ].join("");

        const infoWindow = new window.naver.maps.InfoWindow({
          content: contentString,
          maxWidth: 300,
          backgroundColor: "#fff",
          borderColor: "#ddd",
          borderWidth: 1,
          anchorSize: new window.naver.maps.Size(20, 20),
          anchorSkew: true,
          anchorColor: "#fff",
        });

        window.naver.maps.Event.addListener(marker, "click", function () {
          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);
          }
        });
      });
    }
  }, []);

  return (
    <section className={styles.location}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>오시는 길</h2>
          <p className={styles.subtitle}>편안한 상담을 위한 로뎀숲 상담센터 위치를 안내해드립니다</p>
        </motion.div>

        <div className={styles.content}>
          <div className={styles.mapContainer}>
            <div
              ref={mapRef}
              style={{
                width: "100%",
                height: "600px",
              }}
            />
          </div>

          <motion.div
            className={styles.branchList}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            {branches.map((branch) => (
              <motion.div
                key={branch.id}
                className={styles.branchCard}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>{branch.name}</h3>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>주소:</strong> {branch.address}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>전화:</strong> {branch.tel}
                </p>
                <p>
                  <strong>영업시간:</strong>
                  <br />
                  {branch.hours}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
