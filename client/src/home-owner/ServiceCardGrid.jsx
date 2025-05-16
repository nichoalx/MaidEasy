import ServiceCard from "./serviceCard"
import "./ServiceCard.css"

export default function ServiceCardGrid({ services, onViewClick, onToggleFavorite }) {
  return (
    <div className="service-card-grid">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onViewClick={onViewClick}             // ✅ make sure this is passed
          onToggleFavorite={onToggleFavorite}   // ✅ if used
        />
      ))}
    </div>
  )
}