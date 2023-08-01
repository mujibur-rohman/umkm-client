import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      type="submit"
      className={`${className} transition-all px-4 py-2 rounded font-medium`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
