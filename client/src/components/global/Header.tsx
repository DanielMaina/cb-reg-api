import React from 'react'
import { Link } from 'react-router-dom'
// import Search from './Search'
import Menu from './Menu'
import LogoName from '../../assets/icons/Logo.svg'

const Header = () => {

  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-light p-3">
        <div className="logo-container d-flex align-items-center">
          <Link className="navbar-brand" to="/" title="Crewbite">
            <img src={LogoName} alt="logo" />
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* <Search /> */}
          <Menu />
        </div>
      </nav>
    </header>

  )
}

export default Header