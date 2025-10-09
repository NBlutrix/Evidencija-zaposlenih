import React from "react";

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
  >
    {children}
  </button>
);

export default Button;
