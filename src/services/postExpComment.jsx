const postExpComment = async (exp_id, text) => {
  try {
    const formData = new FormData();

    formData.append("text", text);

    const result = await fetch(
      `${import.meta.env.VITE_REACT_HOST}/experience/${exp_id}/comment/`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJKdWFuIiwiaWF0IjoxNzA2MjA3MDY1LCJleHAiOjE3MDYzNzk4NjV9.e2U4UOiNjA7njm1E1EnHUldW-L53bBDoc8ph5g2zwJ4",
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

export default postExpComment;
