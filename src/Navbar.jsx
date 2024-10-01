import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary">
      <ul className="nav">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/compose-salad"
          >
            Skapa en sallad
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/view-order"
          >
            Visa beställning
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
