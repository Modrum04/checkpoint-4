import { NavLink } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const paths = ["/", "/reports", "/activity-monitoring"];
  const labels = ["Accueil", "Rapports commerciaux", "Pilotage d'activité"];

  return (
    <div className="navbar">
      <ul>
        {paths.map((path, index) => (
          <li key={path}>
            <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
              {labels[index]}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Navbar;
