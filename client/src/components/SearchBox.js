import React, { useState } from "react";
import { usePostContext } from "../hooks/usePostContext";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import inputstyles from "../stylesheets/Home.module.css";
import { Button, Tooltip, Typography } from "@mui/material";

const SearchBox = ({ searchText, setSearchText, setloading }) => {
  const { dispatch } = usePostContext();
  const [output, setOutput] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const text = searchText;
    await fetch(
      `https://opinio-nest-server.vercel.app/api/posts/searchpost/${text}`
    )
      .then(async (response) => {
        const parseddata = await response.json();
        dispatch({ type: "SET_POSTS", payload: parseddata });
        setloading(false);
        setOutput(true);
      })
      .catch((error) => console.error("Unable to get posts.", error));
  };

  const closeSearch = async () => {
    setSearchText("");
    setloading(true);
    await fetch("https://opinio-nest-server.vercel.app/api/posts")
      .then(async (response) => {
        const parseddata = await response.json();
        dispatch({ type: "SET_POSTS", payload: parseddata });
        setOutput(false);
        setloading(false);
      })
      .catch((error) => console.error("Unable to get items.", error));
  };

  const onchange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className={inputstyles.search_container}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            border: "1px solid ",
            display: "flex",
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        >
          <Tooltip title="Search">
            <Button
              sx={{
                alignSelf: "self-end",
                marginLeft: "auto",
                marginRight: 0,
                minWidth: 0,
                paddingRight: 0,
              }}
              disabled={searchText === ""}
              type="submit"
            >
              <SearchIcon margin="0" />
            </Button>
          </Tooltip>
          <input
            className={inputstyles.input}
            type="text"
            value={searchText}
            onChange={(e) => onchange(e)}
            placeholder="Search Posts.."
            style={{ borderRadius: "20px", marginLeft: "10px" }}
          />
          <div style={{ display: "flex" }}>
            <Button
              sx={{
                alignSelf: "self-end",
                marginLeft: "auto",
                marginRight: 0,
                minWidth: 0,
                paddingRight: 0,
                color: "black",
              }}
              onClick={() => setSearchText("")}
            >
              <CloseIcon margin="0" />
            </Button>
            <Tooltip title="Refresh posts">
              <Button
                sx={{
                  alignSelf: "self-end",
                  marginLeft: "auto",
                  marginRight: 0,
                  minWidth: 0,

                  color: "black",
                }}
                onClick={closeSearch}
              >
                <RefreshIcon margin="0" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </form>
      {output && (
        <Typography
          style={{ fontWeight: 550, fontSize: "1.3rem", marginTop: "1rem" }}
        >
          Search Results :{" "}
        </Typography>
      )}
    </div>
  );
};

export default SearchBox;
