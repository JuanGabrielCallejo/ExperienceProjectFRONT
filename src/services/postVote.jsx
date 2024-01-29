const postVote = async (exp_id) => {
  console.log(exp_id);
  const url = `${import.meta.env.VITE_REACT_HOST}/experience/${exp_id}/vote`;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikp1YW4iLCJpYXQiOjE3MDY1NDUwMDEsImV4cCI6MTcwNjcxNzgwMX0.0zq2x-oNuVl9rh0u0yQNVMQ4dzf-coWVkPU2zJ3Q2-I";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log(data.data);

  return data.data;
};

export default postVote;
