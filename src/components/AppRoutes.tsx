import React from 'react';
import { Switch, Route } from 'react-router';
import { RootNotFound } from './RootNotFound';
import { Login } from './Login';
import { AppliedRoute } from './AppliedRoute';
import { HomePage } from './HomePage';
import { NewNote } from './NewNote';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import { UnauthenticatedRoute } from './UnauthenticatedRoute';

export interface ChildProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (isAuthenticated: boolean) => void;
}

interface Props {
  childProps: ChildProps;
}

export enum Paths {
  login = '/login',
  signup = '/signup',
  home = '/',
  notes_new = '/notes/new',
  notes_details = '/notes/:id'
}

export const AppRoutes = ({ childProps }: Props) => (
  <Switch>
    <AuthenticatedRoute props={childProps} path={Paths.home} exact component={HomePage} />
    <UnauthenticatedRoute props={childProps} path={Paths.login} exact component={Login} />
    <AuthenticatedRoute props={childProps} path={Paths.notes_new} exact component={NewNote} />
    <Route component={RootNotFound} />
  </Switch>
);
