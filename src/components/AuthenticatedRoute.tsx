import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router';
import { ChildProps } from './AppRoutes';

interface Props extends RouteProps {
  props: ChildProps;
  component: any;
}

export const AuthenticatedRoute = ({ component: C, props: cProps, ...rest }: Props) => (
  <Route
    {...rest}
    render={props =>
      cProps.isAuthenticated ? (
        <C {...props} {...cProps} />
      ) : (
        <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`} />
      )
    }
  />
);
