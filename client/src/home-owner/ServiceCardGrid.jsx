import ServiceCard from "./serviceCard"
import "./ServiceCard.css"

export default function ServiceCardGrid({ services, onViewClick }) {
  return (
    <div className="service-card-grid">
      {services.map((service, i) => (
        <ServiceCard
          key={i}
          {...service}
          service={service}
          onViewClick={onViewClick}
        />
      ))}
    </div>
  )
}