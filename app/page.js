import Image from 'next/image'
import styles from './page.module.css'

export default function home() {
  return (
    <>
      <div className={styles.main}>
       <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <p>Home</p>
        </li>
        <li className={styles.menuItem}>
          <p>Services</p>
        </li>
        <li className={styles.menuItem}>
          <p>Checkout</p>
        </li>
        <li className={styles.menuItem}>
          <p>Contact Us</p>
        </li>
       </ul>
      </div>
    </>
  )
}