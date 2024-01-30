import Heart from "react-animated-heart";
import PropTypes from "prop-types";
import Votes from "./Votes";
import { useEffect, useState } from "react";
import postVote from "./postVote";

const LikeHeart = ({ exp_id }) => {
  const [isClick, setClick] = useState(false);
  const [votesData, setVotesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Votes(exp_id);

        if (data.length > 0) {
          setClick(true);
        } else {
          setClick(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [exp_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedVotes = await postVote(exp_id);
      setVotesData(updatedVotes);

      setClick(!isClick);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (votesData.length > 0) {
      setClick(false);
    } else {
      setClick(true);
    }
  }, [votesData, setClick]);

  return (
    <div>
      <Heart isClick={isClick} onClick={handleSubmit} />
    </div>
  );
};

LikeHeart.propTypes = {
  exp_id: PropTypes.any,
  isClick: PropTypes.any,
  setClick: PropTypes.any,
};

export default LikeHeart;
