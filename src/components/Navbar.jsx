import { useState } from 'react';
import propTypes from 'prop-types';

import './Navbar.css';

import display from '../assets/Display.svg';
import down from '../assets/down.svg';
import Icon from './Icon.jsx';

function Navbar({ grouping, setGrouping, ordering, setOrdering }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="display-button" onClick={() => setIsOpen(!isOpen)}>
                <span className="icon"><Icon icon={display} /></span>
                <span>Display</span>
                <span className="icon"><Icon icon={down} /></span>
            </div>

            {isOpen && (
                <div className="dropdown-menu">
                    <div className="menu-item">
                        <span>Grouping</span>
                        <select
                            value={grouping}
                            onChange={(e) => setGrouping(e.target.value)}
                        >
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                    <div className="menu-item">
                        <span>Ordering</span>
                        <select
                            value={ordering}
                            onChange={(e) => setOrdering(e.target.value)}
                        >
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>
            )}
        </nav>
    );
}

Navbar.propTypes = {
	grouping: propTypes.string.isRequired,
	setGrouping: propTypes.func.isRequired,
	ordering: propTypes.string.isRequired,
	setOrdering: propTypes.func.isRequired,
};

export default Navbar;