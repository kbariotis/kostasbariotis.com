import React from 'react';
import GatsbyLink from 'gatsby-link';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpened: false,
    };
  }

  handleClick() {
    this.setState({
      menuOpened: !this.state.menuOpened,
    });
  }
  render() {
    return (
      <nav className="navbar navbar-default">
        {/* <div className="image-placeholder" /> */}
        <div className="container">
          <div className="medium-8 medium-offset-2 large-10 large-offset-1">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                onClick={this.handleClick.bind(this)}
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>
            <div
              className={`collapse navbar-collapse ${this.state.menuOpened
                ? 'in'
                : ''}`}
              id="main-menu"
            >
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <GatsbyLink exact activeStyle={{
                    color: '#e52f45'
                  }} to="/">Home</GatsbyLink>
                </li>
                <li>
                  <GatsbyLink exact activeStyle={{
                    color: '#e52f45'
                  }} to="/about">About</GatsbyLink>
                </li>
                <li>
                  <GatsbyLink exact activeStyle={{
                    color: '#e52f45'
                  }} to="/contact">Contact</GatsbyLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
export default Menu;
