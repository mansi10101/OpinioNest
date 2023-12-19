import { Box } from "@mui/material";
import React from "react";

const gif = require("../assets/loader.gif");

const Loading2 = () => {
  return (
    <Box
      sx={{
        height: "80vh",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <div className="d-flex justify-content-center align-items-center"> */}
      {/* <div className='spinner-border text-success' role='status'>
          <span className='sr-only'></span>
        </div> */}
      <img src={gif} style={{ width: "50px" }} />
      {/* </div> */}
    </Box>
  );
};

export default Loading2;
