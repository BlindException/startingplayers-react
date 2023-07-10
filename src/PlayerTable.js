import React, { useEffect, useState } from 'react';


import axios from 'axios';
function PlayerTable() {


    const [players, setPlayers] = useState([]);
    
    
    useEffect(() => {
    
    
    axios.get('/http:://localhost:2972') // Replace '/api/players' with the actual route URL
    
    
    .then(response => {
    
    
    setPlayers(response.data.sortedByPercent);
    
    
    })
    
    
    .catch(error => {
    
    
    console.error(error);
    
    
    });
    
    
    }, []);
    
    
    return (
    
    
    <div>
    
    
    <table>
    
    
    <thead>
    
    
    <tr>
    
    
    <th>Player Name</th>
    
    
    <th>Team</th>
    
    
    <th>Position</th>
    
    
    <th>Starting %</th>
    
    
    </tr>
    
    
    </thead>
    
    
    <tbody>
    
    
    {players.map(player => (
    
    
    <tr key={player.id}>
    
    
    <td>{player.name}</td>
    
    
    <td>{player.team}</td>
    
    
    <td>{player.position}</td>
    
    
    <td>{player.percent}</td>
    
    
    </tr>
    
    
    ))}
    
    
    </tbody>
    
    
    </table>
    
    
    </div>
    
    
    );
    
    
    }
    
    
    export default PlayerTable;