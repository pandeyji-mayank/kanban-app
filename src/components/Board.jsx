import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import Column from './Column';
import './Board.css';
import urgent from '../assets/SVG - Urgent Priority colour.svg';
import high from '../assets/Img - High Priority.svg';
import medium from '../assets/Img - Medium Priority.svg';
import low from '../assets/Img - Low Priority.svg';
import noPriority from '../assets/No-priority.svg';

import todo from '../assets/To-do.svg';
import inProgress from '../assets/in-progress.svg';
import done from '../assets/Done.svg';
import backlog from '../assets/Backlog.svg';
import cancelled from '../assets/Cancelled.svg';

const priorityIcons = {
	'Urgent': urgent,
	'High': high,
	'Medium': medium,
	'Low': low,
	'No priority': noPriority,
};

const statusIcons = {
	'Todo': todo,
	'In progress': inProgress,
	'Done': done,
	'Backlog': backlog,
	'Cancelled': cancelled,
};

function Board({ tickets, users, grouping, ordering }) {

	const [type, setType] = React.useState(grouping);
	useEffect(() => {
		setType(grouping);
	}, [grouping]);

	console.log(type);

    const getPriorityName = (priority) => {
        const priorities = {
            4: 'Urgent',
            3: 'High',
            2: 'Medium',
            1: 'Low',
            0: 'No priority'
        };
        return priorities[priority];
    };

    const orderTickets = (ticketsToOrder) => {
        return ticketsToOrder.sort((a, b) => {
            if (ordering === 'priority') {
                return b.priority - a.priority;
            }
            return a.title.localeCompare(b.title);
        });
    };

    const groupTickets = () => {
        if (grouping === 'status') {
            const groups = {
				'Backlog': [],
				'Todo': [],
				'In progress': [],
				'Done': [],
				'Cancelled': []
			};

			// setType('status');

            tickets.forEach(ticket => {
                if (!groups[ticket.status]) {
                    groups[ticket.status] = [];
                }
                groups[ticket.status].push(ticket);
            });
            return Object.entries(groups).map(([status, statusTickets]) => ({
                title: status,
                tickets: orderTickets(statusTickets),
				icon: statusIcons[status],
            }));
        }

        if (grouping === 'user') {
            const groups = {};
            tickets.forEach(ticket => {
                const user = users.find(u => u.id === ticket.userId);
                if (!groups[user.id]) {
                    groups[user.id] = {
                        title: user.name,
                        tickets: []
                    };
                }
                groups[user.id].tickets.push(ticket);
            });

			// setType('user');

            return Object.values(groups).map(group => ({
                ...group,
                tickets: orderTickets(group.tickets)
            }));
        }

        if (grouping === 'priority') {
            const groups = { 
				'No priority': [],
				'Low': [],
				'Medium': [],
				'High': [],
				'Urgent': []
			};

            tickets.forEach(ticket => {
                const priority = getPriorityName(ticket.priority);
                groups[priority].push(ticket);
            });

			// setType('priority');

            return Object.entries(groups).map(([priority, priorityTickets]) => ({
                title: priority,
                tickets: orderTickets(priorityTickets),
				icon: priorityIcons[priority]
            }));
        }
    };

    const columns = groupTickets();

    return (
        <div className="board">
            {columns?.map((column) => (
                <Column
                    key={column.title}
					icon={column.icon}
                    title={column.title}
                    tickets={column.tickets}
                    users={users}
					type={type}
                />
            ))}
        </div>
    );
}

Board.propTypes = {
	tickets: propTypes.array.isRequired,
	users: propTypes.array.isRequired,
	grouping: propTypes.string.isRequired,
	ordering: propTypes.string.isRequired,
};

export default Board;