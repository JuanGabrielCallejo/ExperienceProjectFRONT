const postVote = async (exp_id, user) => {
  console.log(user.token);
  const url = `${import.meta.env.VITE_REACT_HOST}/experience/${exp_id}/vote`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const data = await res.json();
  console.log(data.data);

  return data.data;
};

export default postVote;
