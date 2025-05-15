// pages/DemoPage.jsx
import PlatformLayout from "./components/platform_layout"
import personIcon from "./assets/circle_person.png"
import categoryIcon from "./assets/category.png"
import reportIcon from "./assets/report.png"

export default function DemoPage() {
  const user = {
    name: "Platform123",
    email: "plat123@gmail.com"
  }

  const navItems = [
    { path: "/demoPage", label: "demoPage", icon: personIcon },
    { path: "/platform-management", label: "Categories", icon: categoryIcon },
    { path: "/report", label: "Report", icon: reportIcon }
  ]

  return (
    <PlatformLayout user={user} navItems={navItems}>
      <h1 className="platform-title">Welcome to the Demo Page</h1>
      <p>This is a demonstration of the shared sidebar and header layout.</p>
    </PlatformLayout>
  )
}