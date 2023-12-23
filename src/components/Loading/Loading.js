import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Loading({ loading }) {
  return (
    <ClipLoader
      color={"#ff4500"}
      loading={loading}
      size={75}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Loading;
