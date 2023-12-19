import { Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import styles from "../stylesheets/Post.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ShareIcon from "@mui/icons-material/Share";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const noimage = require("../assets/download.jpeg");

const Posts = ({ post, handleCommentModal }) => {
  const isMobile = useMediaQuery("(max-width:650px)");

  const {
    _id,
    text: postText,
    commentcount: commentcount,
    createdAt,
    user: { name: postedBy, image: postedByImg },
  } = post;

  let date = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    includeSeconds: true,
  });

  return (
    <>
      <div className={styles.post_container}>
        <div className={styles.img_container}>
          <img
            src={postedByImg === null ? noimage : postedByImg}
            alt="img"
            className={styles.img}
          />
        </div>

        <div className={styles.details_container}>
          <div className={styles.descrips}>
            <div alignSelf={"center"}>
              <Typography className={styles.name}>{postedBy}</Typography>
            </div>
            <div alignSelf={"center"}>
              <Typography className={styles.date}>
                {" "}
                {date.replace("about ", "")}
              </Typography>
            </div>
          </div>

          <div className={styles.post}>
            <Typography className={styles.post_text}>{postText}</Typography>
          </div>
          <Divider />
          <Typography
            style={{ fontSize: "0.8rem", textAlign: "right", marginTop: "5px" }}
          >
            {commentcount} Comment{commentcount > 1 ? "s" : ""}
          </Typography>
          <div className={styles.product_warranty}>
            <div className={styles.product_details}>
              <FavoriteIcon fontSize={!isMobile ? "small" : "medium"} />
              <p>Like</p>
            </div>
            <div className={styles.product_details}>
              <AddCommentIcon
                fontSize={!isMobile ? "small" : "medium"}
                onClick={() => handleCommentModal(_id)}
              />

              <p> Comment</p>
            </div>
            <div className={styles.product_details}>
              <ShareIcon fontSize={!isMobile ? "small" : "medium"} />
              <p>Share</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
