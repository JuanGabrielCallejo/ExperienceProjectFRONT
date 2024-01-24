const postExpComment = async (exp_id, text) => {
  try {
    console.log(exp_id);

    const formData = new FormData();

    formData.append("text", text);

    const result = await fetch(
      `${import.meta.env.VITE_REACT_HOST}/experience/${exp_id}/comment/`,
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

export default postExpComment;
