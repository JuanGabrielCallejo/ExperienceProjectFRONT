const postVote = async (exp_id) => {
  console.log(exp_id);
  const url = `${import.meta.env.VITE_REACT_HOST}/experience/${exp_id}/vote`;
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikp1YW4iLCJpYXQiOjE3MDY2MzczNDUsImV4cCI6MTcwNjgxMDE0NX0.FUDox1D9uoRYZ4Tc5HrQaFI-zxjRylMWUfg4qa2u50Q";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
  });

  const data = await res.json();
  console.log(data.data);

  return data.data;
};

export default postVote;
