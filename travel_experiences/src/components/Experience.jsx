import PropTypes from "prop-types";

const Experience = ({ exp }) => {
  return (
    <>
      <div>
        <img src={exp.user_photo} alt="foto de usuario" />
        <p>{exp.user_name}</p>
      </div>
      <div>
        <h1>{exp.title}</h1>
        <h2>{exp.subTitle}</h2>
        <div>{exp.category_name}</div>
        <p>{exp.place}</p>
        <p>{exp.text}</p>
      </div>
    </>
  );
};

Experience.propTypes = {
  exp: PropTypes.object,
};

export default Experience;
