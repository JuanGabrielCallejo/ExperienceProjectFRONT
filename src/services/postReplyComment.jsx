const postReplyComment = async (comment_id, text) => {
  try {
    const getId = await fetch(
      `${import.meta.env.VITE_REACT_HOST}/comments/${comment_id}`
    );

    const resId = await getId.json();

    const id = resId.data[0].exp_id;

    const formData = new FormData();

    formData.append("text", text);

    const result = await fetch(
      `${
        import.meta.env.VITE_REACT_HOST
      }/experience/${id}/comment/${comment_id}/answer`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiJKdWFuIiwiaWF0IjoxNzA2MDI2NzcwLCJleHAiOjE3MDYxOTk1NzB9.TJAjhEui72UYBipDRTFFkAmo3-zhR5ZaxWtBbHwPzU8",
        },
      }
    );

    if (!result.ok) {
      throw new Error(`Error: ${result.status} - ${result.statusText}`);
    }

    const res = await result.json();
    return res.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default postReplyComment;