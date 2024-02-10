import Heart from "react-animated-heart";
import PropTypes from "prop-types";
import Votes from "./Votes";
import { useContext, useEffect, useState } from "react";
import PostVote from "./postVote";
import { AuthContext } from "../components/providers/AuthProvider";

const LikeHeart = ({ exp_id, setLike }) => {
  const [isClick, setClick] = useState(false);
  const [votesData, setVotesData] = useState([]);

  const [user] = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Votes(exp_id, user);

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
  }, [exp_id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedVotes = await PostVote(exp_id, user);
      setVotesData(updatedVotes);
      setLike((prevLike) => (isClick ? prevLike - 1 : prevLike + 1));
      setClick(!isClick);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // console.log("VotesData", votesData);
    if (votesData.length > 0) {
      setClick(false);
    } else {
      setClick(true);
    }
  }, [votesData, setClick]);

  return (
    <div className="">
      <Heart isClick={isClick} onClick={handleSubmit} />
    </div>
  );
};

LikeHeart.propTypes = {
  exp_id: PropTypes.number.isRequired,
  like: PropTypes.number,
  setLike: PropTypes.func,
  isClick: PropTypes.bool,
  setClick: PropTypes.func,
};

export default LikeHeart;
