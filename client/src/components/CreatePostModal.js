import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, useMediaQuery } from "@mui/material";
import CreatePostform from "./CreatePostform";

const CreatePostModal = ({ handleclose, opencreatepost, setOpen, user }) => {
  const isMobile = useMediaQuery("(max-width:350px)");

  return (
    <div>
      <Modal
        open={opencreatepost}
        onClose={handleclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: isMobile ? "85%" : "300px",
              bgcolor: "background.paper",
              border: "2px solid silver",
              borderRadius: "10px",
              boxShadow: 24,
              p: isMobile ? "12px" : "22px 12px",
              display: "grid",
              gap: "1rem",
            }}
          >
            <Typography style={{ textAlign: "center", fontWeight: 550 }}>
              CREATE POST
            </Typography>
            <CreatePostform user={user} setOpen={setOpen} />
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
