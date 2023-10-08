import React from "react";

const NetworkError = ({error}) => {
  return (
  <div className="Error-container">
    <h1>Ops!</h1>
    <h4>{error}</h4>
  </div>
  )
};

export default NetworkError;
