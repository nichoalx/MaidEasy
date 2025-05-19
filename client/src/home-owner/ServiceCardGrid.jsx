import ServiceCard from "./ServiceCard"
import styles from "./ServiceCard.module.css"

export default function ServiceCardGrid({ services, onViewClick, onToggleFavorite }) {
  return (
    <div className={styles.serviceCardGrid}>
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onViewClick={onViewClick}             
          onToggleFavorite={onToggleFavorite}   
        />
      ))}
    </div>
  )
}