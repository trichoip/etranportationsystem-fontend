import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styles from "../../Dashboard/dashboard.module.css";
function Pagination({ value, onChange, range }) {
  let pattern = null;
  switch (true) {
    case range < 7:
      pattern = [...new Array(range)].map((_, i) => i + 1);
      break;
    case value < 4:
      pattern = [1, 2, 3, 4, 5, "...", range];
      break;
    case value > range - 4:
      pattern = [1, "...", range - 4, range - 3, range - 2, range - 1, range];
      break;
    default:
      pattern = [1, "...", value - 1, value, value + 1, "...", range];
  }

  function changeNumber(n) {
    if (typeof n === "number" && n > 0 && n <= range) {
      onChange(n);
    }
  }
  return (
    <div className={styles.pagination}>
      <ul>
        <li className={styles.btn}>
          <span disabled={value <= 1} onClick={() => changeNumber(value - 1)}>
            <MdKeyboardArrowLeft /> Prev
          </span>
        </li>
        {pattern.map((label, index) => (
          <li
            className={value === label ? `${styles.active}` : `${styles.numb}`}
            key={index}
          >
            <span onClick={() => changeNumber(label)}>{label}</span>
          </li>
        ))}
        <li className={styles.btn}>
          <span
            disabled={value >= range}
            onClick={() => changeNumber(value + 1)}
          >
            Next <MdKeyboardArrowRight />
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
