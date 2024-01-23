const getAllExperiences = async () => {
  try {

    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token no encontrado en localStorage')
      
    }
    
    const result = await fetch(
      `${import.meta.env.VITE_REACT_HOST}/experiences`,
        { 
          headers: {
          Authorization: `Bearer ${token}`
        }
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

export default getAllExperiences;
