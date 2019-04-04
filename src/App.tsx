import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link, NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { AppRoutes, ChildProps, Paths } from './components/AppRoutes';
import { Auth } from 'aws-amplify';

interface State {
  isAuthenticated: boolean;
  authenticating: boolean;
}

interface Props extends RouteComponentProps {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      authenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      console.log(e);
    }

    this.setState({ authenticating: false });
  }

  userHasAuthenticated = (authenticated: boolean) => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = async () => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push(Paths.login);
  };

  render() {
    const childProps: ChildProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    const buttons = this.state.isAuthenticated ? (
      <NavItem onClick={this.handleLogout}>Logout</NavItem>
    ) : (
      <div className="logged-out">
        <NavLink to="/sign-up">Sign up</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    );

    return (
      !this.state.authenticating && (
        <div>
          <div className="navbar">
            <div className="logo">Scratch</div>
            {buttons}
          </div>
          <AppRoutes childProps={childProps} />
        </div>
      )
    );
  }
}

export default withRouter(App);
