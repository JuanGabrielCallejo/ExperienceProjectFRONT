const Votes = async (exp_id) => {
  console.log(exp_id);
  const url = `${import.meta.env.VITE_REACT_HOST}/experience/${exp_id}/vote`;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ikp1YW4iLCJpYXQiOjE3MDY2MzU3NDYsImV4cCI6MTcwNjgwODU0Nn0.oKhQPHeW63OJB4ykPJvnYDS643I3xNPrZXKzQBymhLc";

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log(data.data);

  return data.data;
};

export default Votes;
