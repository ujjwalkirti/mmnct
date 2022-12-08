import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/Match.module.css";
import Footer from "../components/Footer";

function PointsTable() {
  return (
        <div>
      <Head>
        <title>Points-Table</title>
      </Head>
      <Navbar />
      <div className={styles.pointtablemain}>
        <nav className={styles.navbar1}>
          <div>
            <button
            className={styles.btn_group__item}
            >
              Male PointsTable
            </button>
            <button
            className={styles.btn_group__item}
            >
              Female PointsTable
            </button>
          </div>
        </nav>
        <h1 className={styles.cs}>Coming Soon....</h1>
      </div>
<Footer />
    </div>
  );
}

export default PointsTable;
