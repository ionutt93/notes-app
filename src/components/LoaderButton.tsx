import React from 'react';
import { Button } from 'react-bootstrap';

interface Props {
  isLoading: boolean;
  text: string;
  loadingText: string;
  className?: string;
  disabled: boolean;
  type: 'button' | 'reset' | 'submit';
}

export const LoaderButton = ({ type, isLoading, text, loadingText, className, disabled }: Props) => (
  <Button type={type} className={`LoaderButton ${className}`} disabled={disabled || isLoading}>
    {isLoading ? loadingText : text}
  </Button>
);
