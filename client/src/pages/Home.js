import React, { useEffect, useState } from "react";
import styles from "../stylesheets/Home.module.css";
import Posts from "../components/Posts";
import Form from "../components/Form";
import { usePostContext } from "../hooks/usePostContext";
import Alert from "../components/Alert";
import CommentForm from "../components/CommentForm";
import Loading2 from "../components/Loading2";
import { Navigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import { ReactComponent as NoDataSVG } from "../assets/noData.svg";
import { Typography, useMediaQuery } from "@mui/material";

const Home = ({
  user,
  loading,
  setloading,
  authenticated,
  searchText,
  setSearchText,
}) => {
  const { posts, dispatch } = usePostContext();
  const [open, setOpen] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const [postid, setPostId] = useState(null);
  const [commentloader, setCommentloader] = useState(false);
  const isMobile = useMediaQuery("(max-width:700px)");

  useEffect(() => {
    const getPosts = async () => {
      setloading(true);
      await fetch("ttps://opinio-nest-server.vercel.app/api/posts")
        .then(async (response) => {
          const parseddata = await response.json();
          dispatch({ type: "SET_POSTS", payload: parseddata });
          setloading(false);
        })
        .catch((error) => console.error("Unable to get items.", error));
    };
    getPosts();
  }, []);

  const handleCommentModal = async (id) => {
    setOpenCommentBox(true);
    setPostId(id);
    setCommentloader(true);
    await fetch(`ttps://opinio-nest-server.vercel.app/api/posts/${id}/comments`)
      .then(async (response) => {
        const parseddata = await response.json();
        dispatch({ type: "SET_COMMENTS", payload: parseddata });
        setCommentloader(false);
      })
      .catch((error) =>
        console.error("Unable to get comments for a post.", error)
      );
  };

  if (!authenticated && !user.isLoggedIn) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <>
        <div className={styles.home_container}>
          <SearchBox
            searchText={searchText}
            setSearchText={setSearchText}
            setloading={setloading}
          />
          <div className={styles.posts_container}>
            <div className={styles.postcards}>
              {!loading ? (
                posts.length === 0 ? (
                  <div style={{ display: "grid", justifyContent: "center" }}>
                    <Typography style={{ textAlign: "center", color: "grey" }}>
                      No Posts to show
                    </Typography>
                    <NoDataSVG width="300px" height="300px" />
                  </div>
                ) : (
                  posts?.map((post) => {
                    return (
                      <div key={post._id} className={styles.cards}>
                        <Posts
                          post={post}
                          handleCommentModal={handleCommentModal}
                        />
                      </div>
                    );
                  })
                )
              ) : (
                <Loading2 />
              )}
            </div>
            {!isMobile && <Form user={user} setOpen={setOpen} />}
          </div>
        </div>
        ){/* <CommentForm /> */}
        {open && <Alert open={open} text="Post Added Successfully!" />}
        {openCommentBox && (
          <CommentForm
            openCommentBox={openCommentBox}
            setOpenCommentBox={setOpenCommentBox}
            postid={postid}
            setPostId={setPostId}
            commentloader={commentloader}
            user={user}
          />
        )}
      </>
    );
  }
};

export default Home;
