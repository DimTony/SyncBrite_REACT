const handlePostLikeUnlikeAction = async (postId) => {
  if (postLikePending[postId]) {
    return; // If like action is already pending, do nothing
  }

  setPostLikePending({ ...postLikePending, [postId]: true });

  try {
    const syncToken = cookies.SyncBriteToken;
    // Use Axios for making API calls
    const response = await axios({
      method: "patch",
      url: `https://syncbrite-server.onrender.com/api/groups/posts/like/${group.id}/${postId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${syncToken}`,
      },
      data: {
        action: postLiked[postId] ? "unlike" : "like",
        // Add any other data needed for the like/unlike action
      },
    });

    if (response.status === 200) {
      // Update state variables based on the server response
      setPostLiked({ ...postLiked, [postId]: !postLiked[postId] });
      setPostLikes({
        ...postLikes,
        [postId]: postLiked[postId]
          ? postLikes[postId] - 1
          : postLikes[postId] + 1,
      });
    } else {
      // Handle error case
      console.error("Failed to update like/unlike status");
    }
  } catch (error) {
    // Handle any Axios-related errors
    console.error("Axios error:", error.message);
  } finally {
    setPostLikePending({ ...postLikePending, [postId]: false });
  }
};
