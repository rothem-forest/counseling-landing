"use client";

import * as motion from "framer-motion/client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
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

const Location = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "600px",
  };

  const defaultCenter = {
    lat: 37.4457,
    lng: 127.0698,
  };

  return (
    <section className={styles.location} id="location">
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
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
              <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={11}>
                {branches.map((branch) => (
                  <Marker key={branch.id} position={branch.location} title={branch.name} />
                ))}
              </GoogleMap>
            </LoadScript>
          </motion.div>

          <motion.div
            className={styles.branchList}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {branches.map((branch) => (
              <div key={branch.id} className={styles.branchCard}>
                <h3 className={styles.branchName}>{branch.name}</h3>
                <ul className={styles.branchInfo}>
                  <li>
                    <strong>주소</strong>
                    <p>{branch.address}</p>
                  </li>
                  <li>
                    <strong>연락처</strong>
                    <p>{branch.tel}</p>
                  </li>
                  <li>
                    <strong>운영시간</strong>
                    <p>{branch.hours}</p>
                  </li>
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
