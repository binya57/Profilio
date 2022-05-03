import React, { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";

const MemoryLink = forwardRef(({ to, children, ...otherProps }, ref) => {
  const { pathname } = useLocation();
  return (
    <Link to={to} state={{ pathname }} {...otherProps} ref={ref}>
      {children}
    </Link>
  );
});

export default MemoryLink;
