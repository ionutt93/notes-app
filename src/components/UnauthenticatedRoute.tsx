import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router';
import { ChildProps, Paths } from './AppRoutes';

interface Props extends RouteProps {
  props: ChildProps;
  component: any;
}

const querystring = (name: string, url: string = window.location.href) => {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const UnauthenticatedRoute = ({ component: C, props: cProps, ...rest }: Props) => {
  const redirect = querystring('redirect');
  const to = redirect === '' || redirect === null ? Paths.home : redirect;
  return (
    <Route
      {...rest}
      render={props => (!cProps.isAuthenticated ? <C {...props} {...cProps} /> : <Redirect to={to} />)}
    />
  );
};
