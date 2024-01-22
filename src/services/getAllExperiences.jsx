const getAllExperiences = async () => {
  try {
    const result = await fetch(
      `${import.meta.env.VITE_REACT_HOST}/experiences`
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

export default getAllExperiences;