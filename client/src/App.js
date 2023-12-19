import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import CreatePostModal from "./components/CreatePostModal";
import { Button, useMediaQuery } from "@mui/material";
import styles from "./stylesheets/Home.module.css";

function App() {
  const [user, setUser] = useState({ isLoggedIn: false });
  const [searchText, setSearchText] = useState("");
  const [loading, setloading] = useState(true);
  const [authenticated, setauthenticated] = useState(false);
  const [opencreatepost, setOpencreatepost] = useState(false);

  const isMobile = useMediaQuery("(max-width:700px)");

  useEffect(() => {
    setauthenticated(user.isLoggedIn);
  }, [user]);

  const handleclose = () => {
    setOpencreatepost(false);
  };

  console.log(user);
  console.log(authenticated);
  return (
    <div className={styles.app}>
      <Navbar user={user} setUser={setUser} authenticated={authenticated} />
      <div className={styles.pages}>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                user={user}
                setUser={setUser}
                loading={loading}
                setloading={setloading}
                authenticated={authenticated}
                searchText={searchText}
                setSearchText={setSearchText}
              />
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </div>
      {isMobile && authenticated && (
        <Footer setOpencreatepost={setOpencreatepost} />
      )}
      {/* </div> */}
      <CreatePostModal
        opencreatepost={opencreatepost}
        handleclose={handleclose}
      />
    </div>
  );
}

export default App;
