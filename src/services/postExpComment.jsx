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
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
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
