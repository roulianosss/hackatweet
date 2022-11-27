import React from "react";
import styles from "../styles/RightSideBar.module.css";

export default function RightSideBar({ hashtagsToComponents }) {
  return (
    <div className={styles.rightContainer}>
      <h3>Trends</h3>
      <div className={styles.trendsContainer}>{hashtagsToComponents}</div>
    </div>
  );
}
