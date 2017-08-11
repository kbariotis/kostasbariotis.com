import React from "react"
import GatsbyLink from 'gatsby-link';

const avatarImage = require('./../assets/images/avatar.jpg');

const MenuWithLogo = (props) => (
  <nav className="navbar navbar-default">
    <div className="image-placeholder"></div>
    <div className="container">
      <div className="navbar-header hidden-xs">
        <GatsbyLink to="/" className="navbar-brand header-logo" itemProp="name">
          <img className="header-avatar" src={avatarImage} alt="Kostas Bariotis" />
        </GatsbyLink>
        <h1>Kostas Bariotis</h1>
        <p>
          I'm Kostas Bariotis, a web developer, a proud wanderer and a passionate doer. My mission is to write clean
          and efficient code, to solve problems on the web and to learn something more.
        </p>
      </div>

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

      <div className="navbar-header visible-xs">
        <GatsbyLink to="/" className="navbar-brand header-logo" itemProp="name">
          <img className="header-avatar" src={avatarImage} alt="Kostas Bariotis" />
        </GatsbyLink>
        <h1>Kostas Bariotis</h1>
        <p>
          I'm Kostas Bariotis, a web developer, a proud wanderer and a passionate doer. My mission is to write clean
          and efficient code, to solve problems on the web and to learn something more.
        </p>
      </div>
    </div>
  </nav>
)

export default MenuWithLogo
