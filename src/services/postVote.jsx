const PostVote = async (exp_id, user) => {
  console.log(user.token);
  console.log(exp_id);
  const url = `${import.meta.env.VITE_REACT_HOST}/experience/${exp_id}/vote`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const data = await res.json();
  console.log(data);


  return data.data;
};

export default PostVote;
