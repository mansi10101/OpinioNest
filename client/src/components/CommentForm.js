import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../stylesheets/Home.module.css";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { usePostContext } from "../hooks/usePostContext";
import Alert from "./Alert";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const noimage = require("../assets/download.jpeg");

const CommentForm = ({
  openCommentBox,
  setOpenCommentBox,
  postid,
  setPostId,
  commentloader,
  user,
}) => {
  const isMobile = useMediaQuery("(max-width:350px)");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [searchtext, setSearchText] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [loading, setloading] = useState(false);

  const { dispatch, comments } = usePostContext();
  const onchange = (e) => {
    setText(e.target.value);
  };

  const onSearchchange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const comment = { text, userId: user.userId };

    const response = await fetch(`/api/posts/${postid}/comment`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      setOpen(true);
      dispatch({ type: "CREATE_COMMENT", payload: json });
      setText("");
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    }
  };

  const handleSearchcomment = async (e) => {
    e.preventDefault();
    setloading(true);
    await fetch(`/api/posts/searchcomment/${postid}/${searchtext}`)
      .then(async (response) => {
        const parseddata = await response.json();
        dispatch({ type: "SET_COMMENTS", payload: parseddata });
        setloading(false);
      })
      .catch((error) => console.error("Unable to search comment.", error));
  };

  const closeSearch = async () => {
    setloading(true);
    setOpenSearch(false);
    setSearchText("");
    await fetch(`/api/posts/${postid}/comments`)
      .then(async (response) => {
        const parseddata = await response.json();
        dispatch({ type: "SET_COMMENTS", payload: parseddata });
        setloading(false);
      })
      .catch((error) => console.error("Unable to get comments.", error));
  };

  const handlemodalclose = () => {
    setOpenCommentBox(false);
    dispatch({ type: "EMPTY_COMMENT", payload: [] });
    setPostId(null);
  };

  return (
    <>
      <div className={styles.modal}>
        <Modal
          open={openCommentBox}
          onClose={handlemodalclose}
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
                border: "1px solid silver",
                boxShadow: 24,
                p: isMobile ? " 6px" : "12px 8px",
                display: "grid",
                gap: "0.5rem",
                borderRadius: "10px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ alignSelf: "center" }}
                  className={styles.title}
                >
                  All comments
                </Typography>
                <Button
                  sx={{
                    alignSelf: "self-end",
                    marginLeft: "auto",
                    marginRight: 0,
                    minWidth: 0,
                  }}
                >
                  {openSearch ? (
                    <CloseIcon
                      margin="0"
                      fontSize="small"
                      onClick={closeSearch}
                    />
                  ) : (
                    <SearchIcon
                      margin="0"
                      fontSize="small"
                      onClick={() => setOpenSearch(true)}
                    />
                  )}
                </Button>
              </div>

              {openSearch && (
                <form
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      border: "1px solid grey",
                      display: "flex",
                    }}
                  >
                    <input
                      className={styles.input}
                      type="text"
                      value={searchtext}
                      onChange={(e) => onSearchchange(e)}
                      placeholder="Search comment...."
                    />
                    <div>
                      <Button
                        // edge='end'
                        sx={{
                          alignSelf: "self-end",
                          marginLeft: "auto",
                          marginRight: 0,
                          minWidth: 0,
                        }}
                        type="submit"
                        onClick={handleSearchcomment}
                      >
                        <SearchIcon margin="0" fontSize="small" />
                      </Button>
                    </div>
                  </div>
                </form>
              )}
              <div className={styles.commentsection}>
                {commentloader || loading ? (
                  <Typography
                    style={{ textAlign: "center", fontSize: "0.8rem" }}
                  >
                    Loading...
                  </Typography>
                ) : comments.length === 0 ? (
                  <Typography
                    style={{ textAlign: "center", fontSize: "0.8rem" }}
                  >
                    No comments
                  </Typography>
                ) : (
                  comments.map((com) => {
                    let date = formatDistanceToNow(new Date(com.createdAt), {
                      addSuffix: true,
                      includeSeconds: false,
                    });
                    return (
                      <div
                        key={com._id}
                        style={{
                          display: "flex",
                          // justifyContent: 'center',
                          alignItems: "center",
                          gap: "8px",
                          width: "100%",
                          marginTop: "7px",
                        }}
                      >
                        <Grid item xs={1} className={styles.img_container}>
                          <img
                            src={
                              com.user.image === null ? noimage : com.user.image
                            }
                            alt="img"
                            className={styles.img}
                          />
                        </Grid>
                        <Grid width={"100%"}>
                          <Grid
                            container
                            justifyContent={"space-between"}
                            paddingRight={"4px"}
                          >
                            <Grid alignSelf={"center"}>
                              <Typography fontSize={"0.8rem"}>
                                {com.user.name}
                              </Typography>
                            </Grid>
                            <Grid alignSelf={"center"}>
                              <Typography
                                fontSize={isMobile ? "0.6rem" : "0.7rem"}
                              >
                                {date.replace("about ", "")}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid>
                            <Typography fontSize={"0.7rem"}>
                              {com.text}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    );
                  })
                )}
              </div>
              {!openSearch && (
                <form
                  style={{
                    display: "flex",
                    // justifyContent: 'center',
                    alignItems: "center",
                    gap: "6px",
                    width: "100%",
                  }}
                >
                  {/* <Grid item xs={1} className={styles.img_container}>
                  <img src={user.image} alt="img" className={styles.img} />
                </Grid> */}
                  <div
                    style={{
                      width: "100%",
                      border: "1px solid grey",
                      display: "flex",
                    }}
                  >
                    <input
                      className={styles.input}
                      type="text"
                      value={text}
                      onChange={(e) => onchange(e)}
                      placeholder="Leave a comment.."
                    />
                    <div>
                      <Button
                        // edge='end'
                        sx={{
                          alignSelf: "self-end",
                          marginLeft: "auto",
                          marginRight: 0,
                          minWidth: 0,
                        }}
                        type="submit"
                        onClick={handleSubmit}
                      >
                        <SendIcon margin="0" fontSize="small" />
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </Box>
          </div>
        </Modal>
      </div>
      {open && <Alert open={open} text="Comment Added Successfully!" />}
    </>
  );
};

export default CommentForm;
