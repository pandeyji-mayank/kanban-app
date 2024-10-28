import propTypes from "prop-types";

import Card from "./Card";
import "./Column.css";
import Icon from "./Icon.jsx";
import UserIcon from "./UserIcon.jsx";

import add from "../assets/add.svg";
import threeDotMenu from "../assets/3 dot menu.svg";

function Column({ title, tickets, users, icon, type }) {
	console.log(type);
	return (
		<div className="column">
			<div className="column-header">
				<div className="clm-sub">
					{type === "user" ? (
						<UserIcon user={users.find((u) => u.name === title)} />
					) : (
						<Icon icon={icon} />
					)}
					<h2>{title}</h2>
					<span className="ticket-count">{tickets.length}</span>
				</div>
				<div className="clm-sub">
					<button className="add-button">
						<Icon icon={add} />
					</button>
					<button className="more-button">
						<Icon icon={threeDotMenu} />
					</button>
				</div>
			</div>
			<div className="cards">
				{tickets.map((ticket) => (
					<Card
						key={ticket.id}
						ticket={ticket}
						user={users.find((u) => u.id === ticket.userId)}
					/>
				))}
			</div>
		</div>
	);
}

Column.propTypes = {
	title: propTypes.string.isRequired,
	tickets: propTypes.array.isRequired,
	users: propTypes.array.isRequired,
	icon: propTypes.string,
	type: propTypes.string.isRequired,
};

export default Column;
