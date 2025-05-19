import redHeart from "../assets/RedHeart.svg"
import noHeart from "../assets/NoHeart.svg"
import menuIcon from "../assets/menu.svg"
import styles from "./ServiceCard.module.css"

export default function ServiceCard({ service, onViewClick, onToggleFavorite }) {
  const {
    id,
    serviceName,
    category,
    price,
    cleanerName,
    joinedDate,
    isFavorite = false
  } = service

  return (
    <div className={styles.serviceCard}>
      {/* Top Section */}
      <div className={styles.topSection}>
        <div className={styles.serviceDetails}>
          <div className={styles.label}>Service Name:</div>
          <div className={styles.value}>{serviceName || "Unnamed Service"}</div>
          <div className={styles.label}>Category:</div>
          <div className={styles.value}>{category || "Uncategorized"}</div>
          <div className={styles.label}>Price:</div>
          <div className={styles.value}>$ {price?.toLocaleString() || "0"}</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        <div className={styles.provider}>
          <div className={styles.avatar}>
            {cleanerName?.charAt(0) || "?"}
          </div>
          <div>
            <div className={styles.cleanerName}>{cleanerName || "Unknown Cleaner"}</div>
            <div className={styles.providerJoined}>Joined from {joinedDate || "?"}</div>
          </div>
        </div>

        <div className={styles.cardActions}>
          <button className={styles.viewButton} onClick={() => onViewClick(service)}>
            <img src={menuIcon} alt="view" />
          </button>

          <button className={styles.favoriteButton} onClick={() => onToggleFavorite(service.id)}>
            <img src={isFavorite ? redHeart : noHeart} alt="favorite icon" />
          </button>
        </div>
      </div>
    </div>
  )
}
