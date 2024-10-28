import React from 'react';
import './Card.css';

function Card({ ticket, user }) {
    return (
        <div className="card">
            <div className="card-header">
                <span className="ticket-id">{ticket.id}</span>
                <div className="user-avatar">
                    <img src={`/api/placeholder/32/32`} alt={user?.name} />
                    <span className={`status-dot ${user?.available ? 'available' : 'unavailable'}`} />
                </div>
            </div>
            <div className="card-title">
                {ticket.title}
            </div>
            <div className="card-tags">
                <span className="priority-tag">
                    {ticket.priority === 4 && '⚡'}
                    {ticket.priority === 3 && '🔥'}
                    {ticket.priority === 2 && '⚠️'}
                    {ticket.priority === 1 && '↓'}
                    {ticket.priority === 0 && '•'}
                </span>
                {ticket.tag.map((tag, index) => (
                    <span key={index} className="feature-tag">
                        ○ {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Card;