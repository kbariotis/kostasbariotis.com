import React from 'react';
import GatsbyLink from 'gatsby-link';

const Menu = props =>
  <nav className="navbar navbar-default">
    <div className="image-placeholder" />
    <div className="container">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#main-menu"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>
      <div className="collapse navbar-collapse" id="main-menu">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <GatsbyLink to="/">Home</GatsbyLink>
          </li>
          <li>
            <GatsbyLink to="/about">About</GatsbyLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>;

export default Menu;
