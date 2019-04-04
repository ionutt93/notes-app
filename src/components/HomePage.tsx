import React from 'react';
import { ChildProps } from './AppRoutes';
import { RouteComponentProps } from 'react-router';

interface Props extends ChildProps, RouteComponentProps {}

export const HomePage = (props: Props) => <div>Home</div>;
