const getAnswers = async (id) => {
  try {
    // console.log(id);
    const result = await fetch(
      `${import.meta.env.VITE_REACT_HOST}/comment/${id}/answer`
    );

    if (!result.ok) {
      throw new Error(`Error: ${result.status} - ${result.statusText}`);
    }

    const res = await result.json();
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAnswers;
