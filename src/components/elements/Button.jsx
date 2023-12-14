import React from "react";

const Button = ({
  text,
  children,
  className,
  varient,
  style,
  onClick,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      style={style}
      className={`py-2 px-4 cursor-pointer  rounded-[5px] ${className} ${
        varient === "outline"
          ? "border-primary border text-primary"
          : varient === "fill"
          ? "border-primary border text-[#fff] bg-primary"
          : ""
      }`}
    >
      {text || children}
    </button>
  );
};

export default Button;
