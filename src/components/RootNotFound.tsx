import React, { CSSProperties } from 'react';

const style: CSSProperties = {
  paddingTop: '100px',
  textAlign: 'center'
};

export const RootNotFound = () => (
  <div className="NotFound" style={style}>
    <h3>Sorry, page not found</h3>
  </div>
);
