import React from 'react';
import GatsbyLink from 'gatsby-link';

import { slide as BurgerMenu } from 'react-burger-menu';
import Variables from './variables';

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px',
  },
  bmBurgerBars: {
    background: Variables.lightblue,
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

const Menu = () => (
  <BurgerMenu styles={styles}>
    <GatsbyLink
      exact
      activeStyle={{
        color: '#e52f45',
      }}
      to="/"
    >
      Home
    </GatsbyLink>
    <GatsbyLink
      exact
      activeStyle={{
        color: '#e52f45',
      }}
      to="/about/"
    >
      About
    </GatsbyLink>
    <GatsbyLink
      exact
      activeStyle={{
        color: '#e52f45',
      }}
      to="/contact/"
    >
      Contact
    </GatsbyLink>
    <GatsbyLink
      exact
      activeStyle={{
        color: '#e52f45',
      }}
      to="/resume/"
    >
      Resume
    </GatsbyLink>
  </BurgerMenu>
);

export default Menu;
