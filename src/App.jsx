import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Board from './components/Board';
import './App.css';

function App() {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [grouping, setGrouping] = useState(() => {
        const saved = localStorage.getItem('grouping');
        return saved || 'status';
    });
    const [ordering, setOrdering] = useState(() => {
        const saved = localStorage.getItem('ordering');
        return saved || 'priority';
    });

    useEffect(() => {
        fetchData();
        localStorage.setItem('grouping', grouping);
        localStorage.setItem('ordering', ordering);
    }, [grouping, ordering]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
            const data = await response.json();
            setTickets(data.tickets);
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="app">
            <Navbar
                grouping={grouping}
                setGrouping={setGrouping}
                ordering={ordering}
                setOrdering={setOrdering}
            />
            <Board
                tickets={tickets}
                users={users}
                grouping={grouping}
                ordering={ordering}
            />
        </div>
    );
}

export default App;
