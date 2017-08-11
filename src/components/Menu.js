import React from "react"
import GatsbyLink from 'gatsby-link';

const Menu = (props) => (
  <nav className="navbar navbar-default">
    <div className="image-placeholder"></div>
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-menu">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="main-menu">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <GatsbyLink to="/">HOME</GatsbyLink>
          </li>
          <li>
            <GatsbyLink to="/about">ABOUT</GatsbyLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

export default Menu
