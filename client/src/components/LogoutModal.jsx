// components/common/LogoutModal.jsx
import styles from "./LogoutModal.module.css"

export default function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className={styles.logoutOverlay}>
      <div className={styles.logoutContainer}>
        <div className={styles.header}>
          <div className={styles.title}>Confirm Logout</div>
        </div>
        <div className={styles.body}>
          <div className={styles.message}>Are you sure you want to logout?</div>
        </div>
        <button className={styles.logoutButtonModal} onClick={onConfirm}>Logout</button>
        <button className={styles.cancelButtonModal} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}
