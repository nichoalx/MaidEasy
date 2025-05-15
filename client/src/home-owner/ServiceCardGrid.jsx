import ServiceCard from "./serviceCard"
import "./ServiceCard.css"

export default function ServiceCardGrid({ services }) {
  return (
    <div className="service-card-grid">
      {services.map((service, i) => (
        <ServiceCard key={i} {...service} />
      ))}
    </div>
  )
}