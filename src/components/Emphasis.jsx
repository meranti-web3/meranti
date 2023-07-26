import React from "react";

export default function Emphasis({ children, className }) {
  return <span className={`text-meranti-100 ${className}`}>{children}</span>;
}
