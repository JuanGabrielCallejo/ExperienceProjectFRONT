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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikp1YW4iLCJpYXQiOjE3MDY1NDUwMDEsImV4cCI6MTcwNjcxNzgwMX0.0zq2x-oNuVl9rh0u0yQNVMQ4dzf-coWVkPU2zJ3Q2-I",
        },
      }
    );

    if (!result.ok) {
      throw new Error(`Error: ${result.status} - ${result.statusText}`);
    }

    const res = await result.json();
    // console.log(res);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default postReplyComment;
