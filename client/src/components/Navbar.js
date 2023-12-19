import React from "react";
import styles from "../stylesheets/Navbar.module.css";
import { Button, Typography, useMediaQuery } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

const noimage = require("../assets/download.jpeg");

const Navbar = ({ user, authenticated, setUser }) => {
  const isMobile = useMediaQuery("(max-width:400px)");
  const navigate = useNavigate();

  const username = user.name?.split(" ")[0];

  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setUser({ isAuth: false });
      setUser({ isLoggedIn: false });
      navigate("/login");
      console.log("User signed out.");
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>OpinioNest</p>
      </div>

      {authenticated && (
        <div style={{ display: "flex", gap: "1rem" }}>
          <Typography
            style={{ alignSelf: "center", color: "white", fontSize: "1.2rem" }}
          >
            Hii {username} !{" "}
          </Typography>
          <div className={styles.img_container}>
            <img
              src={user.image ? user.image : noimage}
              alt="img"
              className={styles.img}
            />
          </div>
          <Button
            startIcon={!isMobile && <LogoutIcon fontSize="small" />}
            variant="outlined"
            onClick={signOut}
            type="submit"
            sx={{
              color: "white",
              fontSize: isMobile ? "0.7rem" : "0.8rem",
              textTransform: "capitalize",
              borderColor: "white",
              padding: isMobile ? " 0 0.2rem" : "0 1.5rem",
              "&:hover": {
                border: "1px solid #686868",
                backgroundColor: "#686868",
                color: "white",
              },
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
