import React from 'react';

export const Logo = (prop) => {
  return (
    <div>
      <img
        className={prop.className}
        src="https://groomingmfb.com/wp-content/uploads/2021/10/GMFB-Logo.png"
        alt="Your Company"
        width="160px"
      />
    </div>
  );
};
