import React from "react";
import { useNavigate } from "react-router-dom";
import { gapi, loadAuth2 } from "gapi-script";
import { Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import RegisterForm from "./RegisterForm";

const clientId =
  "635499527876-uqq1oidqrqqt70o4b6immvir4olu4oht.apps.googleusercontent.com";
const scopes = "https://www.googleapis.com/auth/userinfo.profile";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const updateUser = async (currentUser) => {
    const name = currentUser.getBasicProfile().getName();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    const email = currentUser.getBasicProfile().getEmail();
    try {
      const login = { email, name, image: profileImg };

      const response = await fetch("/api/posts/google-login", {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (!response.ok) {
        console.log(json.error);
      } else {
        setUser({
          name: json.name,
          image: json.image,
          userId: json._id,
          token: currentUser.xc.access_token,
          isLoggedIn: true,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const attachSignin = async (element, auth2) => {
    auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        updateUser(googleUser);
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  };
  const setAuth2 = async () => {
    const auth2 = await loadAuth2(gapi, clientId, scopes);

    if (auth2.isSignedIn.get()) {
      updateUser(auth2.currentUser.get());
    } else {
      attachSignin(document.getElementById("loginBtn"), auth2);
    }
  };

  React.useEffect(() => {
    setAuth2();
  }, []);

  return (
    <div style={{ marginTop: "1rem" }}>
      {" "}
      {/* <Typography
        style={{
          fontSize: "1.5rem",
          textAlign: "center",
          color: "#fff",
        }}
      >
        {" "}
        Welcome to OpinioNest
      </Typography>
      <Typography
        style={{
          fontSize: "2rem",
          fontWeight: 600,
          fontFamily: "serif",
          textAlign: "center",
          color: "silver",
        }}
      >
        {" "}
        Where Every Opinion Finds a Home
      </Typography> */}
      <RegisterForm setUser={setUser} />
      <Typography
        style={{
          fontSize: "1.2rem",
          textAlign: "center",
          color: "black",
        }}
      >
        {" "}
        --------- or ---------
      </Typography>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <Button
          startIcon={<GoogleIcon />}
          style={{
            textAlign: "center",
            fontSize: "0.8rem",
            background: "#fff",
            color: "black",
            marginTop: "1rem",
          }}
          variant="contained"
          id="loginBtn"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
