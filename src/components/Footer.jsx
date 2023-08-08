/* eslint-disable react/prop-types */

import styles from "./Footer.module.css";
export default function Footer({ children }) {
  return <footer className={styles.footer}>{children}</footer>;
}
