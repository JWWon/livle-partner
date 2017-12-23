import React from 'react';

export default ({ title, children }) => {
  return (
    <div className="_content-container _row-direction">
      <div className="_title-container">
        <p className="_white _fw-semi-bold _fs_36">{title}</p>
      </div>
      <div className="_flex_1" id="content">
        {children}
      </div>
    </div>
  );
};
