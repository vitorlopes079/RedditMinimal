import React from "react";
import ClipLoader from "react-spinners/ClipLoader";


function Loading({loading}){
    return(
        <ClipLoader
          color={"#36d7b7"}
          loading={loading}
          size={75}
          aria-label="Loading Spinner"
          data-testid="loader"
          
        />
    )
}

export default Loading;