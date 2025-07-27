import React from "react";

const Button = React.forwardRef(function Button({ className = "", children, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={`bg-blue-600 text-white px-4 py-2 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export { Button };
