import React from 'react';
import Column from './Column';
import './Board.css';

function Board({ tickets, users, grouping, ordering }) {
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
            const groups = {};
            tickets.forEach(ticket => {
                if (!groups[ticket.status]) {
                    groups[ticket.status] = [];
                }
                groups[ticket.status].push(ticket);
            });
            return Object.entries(groups).map(([status, statusTickets]) => ({
                title: status,
                tickets: orderTickets(statusTickets)
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
            return Object.values(groups).map(group => ({
                ...group,
                tickets: orderTickets(group.tickets)
            }));
        }

        if (grouping === 'priority') {
            const groups = {};
            tickets.forEach(ticket => {
                const priority = getPriorityName(ticket.priority);
                if (!groups[priority]) {
                    groups[priority] = [];
                }
                groups[priority].push(ticket);
            });
            return Object.entries(groups).map(([priority, priorityTickets]) => ({
                title: priority,
                tickets: orderTickets(priorityTickets)
            }));
        }
    };

    const columns = groupTickets();

    return (
        <div className="board">
            {columns?.map((column) => (
                <Column
                    key={column.title}
                    title={column.title}
                    tickets={column.tickets}
                    users={users}
                />
            ))}
        </div>
    );
}

export default Board;