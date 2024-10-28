import propTypes from "prop-types";

import ImgHighPriority from "../assets/Img - High Priority.svg";
import ImgMediumPriority from "../assets/Img - Medium Priority.svg";
import ImgLowPriority from "../assets/Img - Low Priority.svg";
import NoPriority from "../assets/No-priority.svg";
import urgent from "../assets/SVG - Urgent Priority grey.svg";

const priorityIcons = {
	4: urgent,
	3: ImgHighPriority,
	2: ImgMediumPriority,
	1: ImgLowPriority,
	0: NoPriority,
};

function PriorityIcon({ priority }) {
	const PriorityComponent = priorityIcons[priority];
	return PriorityComponent ? (
		<img src={PriorityComponent} alt={`Priority ${priority}`} />
	) : null;
}

PriorityIcon.propTypes = {
	priority: propTypes.number.isRequired,
};

export default PriorityIcon;
