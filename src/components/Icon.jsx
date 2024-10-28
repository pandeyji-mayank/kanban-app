import propTypes from "prop-types";

function Icon({ icon }) {
	  return (
	<img src={icon} alt="icon" className="icon" />
	  );
}

Icon.propTypes = {
	icon: propTypes.string.isRequired
};

export default Icon;
