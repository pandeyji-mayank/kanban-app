
import propTypes from 'prop-types';

import './Card.css';
import PriorityIcon from './PriorityIcon.jsx';
import UserIcon from './UserIcon.jsx';

import ImgHighPriority from '../assets/Img - High Priority.svg';
import ImgLowPriority from '../assets/Img - Low Priority.svg';
import ImgMediumPriority from '../assets/Img - Medium Priority.svg';
import NoPriority from '../assets/No-priority.svg';
import SVGUrgentPriorityColour from '../assets/SVG - Urgent Priority colour.svg';
import SVGUrgentPriorityGrey from '../assets/SVG - Urgent Priority grey.svg';


function Card({ ticket, user }) {
  // Map the SVG components to the corresponding ticket properties
  const priorityIcons = {
    4: ImgHighPriority,
    3: ImgHighPriority,
    2: ImgMediumPriority,
    1: ImgLowPriority,
    0: NoPriority
  };

  const tagIcons = {
    'Urgent Priority colour': SVGUrgentPriorityColour,
    'Urgent Priority grey': SVGUrgentPriorityGrey
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-avatar">
          <UserIcon user={user} />
          <span className={`status-dot ${user?.available ? 'available' : 'unavailable'}`} />
        </div>
      </div>
      <div className="card-title">{ticket.title}</div>
      <div className="card-tags">
        <span className="priority-tag">
          {priorityIcons[ticket.priority] && <PriorityIcon priority={ticket.priority} />}
        </span>
        {ticket.tag?.map((tag, index) => (
          <span key={index} className="feature-tag">
            {tagIcons[tag] && tagIcons[tag]} {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

Card.propTypes = {
  ticket: propTypes.object.isRequired,
  user: propTypes.object.isRequired
};

export default Card;