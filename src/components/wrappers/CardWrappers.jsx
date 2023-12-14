import React, { memo } from "react";
import PropTypes from "prop-types";

const CardWrappers = ({ children, className, style }) => {
  return (
    <div className={className ? className : "p-4"} style={style}>
      {children}
    </div>
  );
};

export default memo(CardWrappers);

CardWrappers.prototype = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.object.isRequired,
};
