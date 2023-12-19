import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setUser }) => {
  const navigate = useNavigate();

  const [activeForm, setActiveForm] = useState(0);
  const [error, setError] = useState("");
  const [loginemail, setloginEmail] = useState("");
  const [loginpassword, setloginPassword] = useState("");
  const [signupemail, setsignupEmail] = useState("");
  const [signuppassword, setsignupPassword] = useState("");
  const [signupname, setsignupName] = useState("");

  const switchForm = (index) => {
    setActiveForm(index);

    setError("");
    setsignupEmail("");
    setsignupPassword("");
    setsignupName("");
    setloginEmail("");
    setloginPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = { email: loginemail, password: loginpassword };

      const response = await fetch(`/api/posts/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      } else {
        setUser({
          name: json.name,
          userId: json._id,
          isLoggedIn: true,
          token: json._id,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlesignup = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email: signupemail,
        password: signuppassword,
        name: signupname,
      };

      const response = await fetch(`/api/posts/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      } else {
        setUser({
          name: json.name,
          userId: json._id,
          isLoggedIn: true,
          token: json._id,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="forms-section">
      <div className="forms">
        <div className={`form-wrapper ${activeForm === 0 ? "is-active" : ""}`}>
          <button
            type="button"
            className="switcher switcher-login"
            onClick={() => switchForm(0)}
          >
            Login
            <span className="underline"></span>
          </button>
          <form className="form form-login" onSubmit={handleLogin}>
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label for="login-email">E-mail</label>
                <input
                  value={loginemail}
                  // id="login-email"
                  type="email"
                  onChange={(e) => setloginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-block">
                <label for="login-password">Password</label>
                <input
                  value={loginpassword}
                  // id="login-password"
                  type="password"
                  onChange={(e) => setloginPassword(e.target.value)}
                  required
                />
                {error && <p style={{ color: "red" }}> {error} </p>}
              </div>
            </fieldset>
            <button type="submit" className="btn-login">
              Login
            </button>
          </form>
        </div>
        <div className={`form-wrapper ${activeForm === 1 ? "is-active" : ""}`}>
          <button
            type="button"
            className="switcher switcher-signup"
            onClick={() => switchForm(1)}
          >
            Sign Up
            <span className="underline"></span>
          </button>
          <form className="form form-signup" onSubmit={handlesignup}>
            <fieldset>
              <legend>
                Please, enter your email, password and password confirmation for
                sign up.
              </legend>
              <div className="input-block">
                <label for="signup-username">Full Name</label>
                <input
                  value={signupname}
                  // id="signup-email"
                  type="text"
                  onChange={(e) => setsignupName(e.target.value)}
                  required
                />
              </div>
              <div className="input-block">
                <label for="signup-email">E-mail</label>
                <input
                  value={signupemail}
                  // id="signup-email"
                  type="email"
                  onChange={(e) => setsignupEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-block">
                <label for="signup-password">Password</label>
                <input
                  value={signuppassword}
                  // id="signup-password"
                  type="password"
                  onChange={(e) => setsignupPassword(e.target.value)}
                  required
                />
                {error && <p style={{ color: "red" }}> {error} </p>}
              </div>
            </fieldset>
            <button type="submit" className="btn-signup">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
