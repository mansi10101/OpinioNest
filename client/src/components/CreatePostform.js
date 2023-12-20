import React, { useState } from "react";
import styles from "../stylesheets/Form.module.css";
import { usePostContext } from "../hooks/usePostContext";
import { Button, TextField } from "@mui/material";

const CreatePostform = ({ user, setOpen }) => {
  const { dispatch } = usePostContext();
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = { text, userId: user.userId };

    const response = await fetch(
      "https://opinio-nest-server.vercel.app/api/posts",
      {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setOpen(true);
      setError(null);
      setText("");
      dispatch({ type: "CREATE_POST", payload: json });
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div
        // className='user-details'
        style={{
          justifyContent: "flex-start",
          backgroundColor: "#f0f0f0",
          borderLeft: 0,
          marginTop: "1.2rem",
        }}
      >
        <TextField
          rows={6}
          onChange={(e) => onChange(e)}
          sx={{
            width: "100%",
            color: "black",
            background: "white",
            input: { color: "black" },
            "& .MuiInputLabel-root": {
              color: "grey",
            },
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": {
                " borderColor": "black",
              },
            },
            "& label.Mui-focused": {
              color: "black",
            },
            "& .MuiInputBase-input": {
              padding: "0px",
            },
            resize: "vertical",
            fontSize: "0.8rem !important",
      
          }}
          multiline
          name="description"
          label="Share you thoughts here..."
          value={text}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.btn_cont}>
        <Button type="submit" className={styles.btn} variant="contained">
          Post
        </Button>
      </div>
    </form>
  );
};

export default CreatePostform;
