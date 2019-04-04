import React, { Component } from 'react';
import { Route } from 'react-router';
import { ChildProps } from './AppRoutes';

interface Props {
  props?: ChildProps;
  component?: any;
  path: string;
  exact: boolean;
  render?: (props: any) => any;
}

export const AppliedRoute = ({ props: childProps, component: Component, ...rest }: Props) => {
  return <Route {...rest} render={(props: any) => <Component {...props} {...childProps} />} />;
};
