import React from "react";

export default function Title({ title, className }) {
  return <h1 className={`text-3xl font-bold text-center ${className}`}>{title}</h1>;
}
