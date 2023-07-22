import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NFLDropDown from './NFLDropDown';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useCollapse } from 'react-collapsed';
function App() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
const [players, setPlayers] = useState([]);
const [leagueType, setLeagueType] = useState('');
const [week, setWeek] = useState('');
const [team, setTeam] = useState('');
const [position, setPosition] = useState('');
const [searchValue, setSearchValue] = useState('');
const [searchTimeout, setSearchTimeout] = useState(null);
const [sortedBy, setSortedBy] = useState('starter_count');
const [sortOrder, setSortOrder] = useState('desc');
useEffect(() => {
fetchData();
}, [leagueType, week, team, position, searchValue, sortedBy, sortOrder]);
useEffect(() => {
fetchData();
}, []);
const fetchData = async () => {
try {
const response = await axios.get('https://startingplayers-express-0dc55200c0a4.herokuapp.com/', {
mode: "cors",
params: {
leagueType: leagueType,
week: week,
team: team,
position: position,
search: searchValue,
sortedBy: sortedBy,
sortOrder: sortOrder,
},
});
const data = response.data;
if (data.length === 0) {
setPlayers([
{
id: 'NoData',
name: 'No player data available.',
},
]);
} else {
setPlayers(data['results']);
}
} catch (error) {
console.error(error);
}
};
const handleTeamChange = (selectedTeam) => {
setTeam(selectedTeam);
};
const handleSearchChange = (e) => {
const value = e.target.value;
setSearchValue(value);
if (searchTimeout) {
clearTimeout(searchTimeout);
}
setSearchTimeout(
setTimeout(() => {
fetchData();
}, 3000)
);
};
const getPositionClassName = (position) => {
    if (position == "QB" || position == "WR" || position == "RB" || position == "TE") {
       return position;
    } else {
    return "default";
     }
}
const handleSort = (column) => {
    if (sortedBy === column) {
 
       setSortOrder(sortOrder === 'desc' ? 'asc' : 'asc');
    
       } else {
    
    
    setSortedBy(column);
    
    
    setSortOrder('desc');
    
    
    }
    
    
    };


return (
            <div className="container">
        <header>
     
        
        <h1 className="text-center mt-5">2022 Safe League Rosters</h1>
     
        
        </header>
        <div className="filteringContent container">
            <div className="row">
        
        
        <div className="col-md-6">
        
        
        <label htmlFor="leagueType">Safe League Type:</label>
        
        
        <select
        
        
        id="leagueType"
        
        
        value={leagueType}
        
        
        onChange={(e) => setLeagueType(e.target.value)}
        
        
        className="form-control"
        
        
        >
        
        
        <option value="">ALL</option>
        
        
        <option value="Basic">Basic</option>
        
        
        <option value="Deluxe">Deluxe</option>
        
        
        <option value="Premium">Premium</option>
        
        
        </select>
        
        
        </div>
        
        
        <div className="col-md-6">
        
        
        <label htmlFor="week">Week:</label>
        
        
        <select
        
        
        id="week"
        
        
        value={week}
        
        
        onChange={(e) => setWeek(e.target.value)}
        
        
        className="form-control"
        
        
        >
        
        
        <option value="">ALL</option>
        
        
        {Array.from({ length: 18 }, (_, i) => i + 1).map((week) => (
        
        
        <option key={week} value={week}>
        
        
        {week}
        
        
        </option>
        
        
        ))}
        
        
        </select>
        
        
        </div>
        
        
        </div>
        
        
        <div className="row">
        
        
        <div className="col-md-6">
        
        
        <label htmlFor="team">Team:</label>
        
        
        <NFLDropDown onChange={handleTeamChange} />
        
        
        </div>
        
        
        <div className="col-md-6">
        
        
        <label htmlFor="position">Position:</label>
        
        
        <select
        
        
        id="position"
        
        
        value={position}
        
        
        onChange={(e) => setPosition(e.target.value)}
        
        
        className="form-control"
        
        
        >
        
        
        <option value="">ALL</option>
        
        
        <option value="QB">QB</option>
        
        
        <option value="RB">RB</option>
        
        
        <option value="WR">WR</option>
        
        
        <option value="TE">TE</option>
        
        
        </select>
        
        
        </div>
        
        
        </div>
        
        
        <div className="row">
        
        
        <div className="col-md-6">
        
        
        <label htmlFor="search">Search for player name:</label>
        
        
        <input
        
        
        type="search"
        
        
        id="search"
        
        
        value={searchValue}
        
        
        onChange={handleSearchChange}
        
        
        className="form-control"
        
        
        />
        
        
        </div>
        </div>
</div>        
        <div className="collapsible">
        <div className="menuHeader" {...getToggleProps()}>
            {isExpanded ? 'Done' : 'Filters'}
        </div>
        <div {...getCollapseProps()}>
            <div className="content">

                <div className="container">
            <div className="row">
        
        
        <div className="col-md-6">
        
        
        <label htmlFor="leagueType">Safe League Type:</label>
        
        
        <select
        
        
        id="leagueType"
        
        
        value={leagueType}
        
        
        onChange={(e) => setLeagueType(e.target.value)}
        
        
        className="form-control"
        
        
        >
        
        
        <option value="">ALL</option>
        
        
        <option value="Basic">Basic</option>
        
        
        <option value="Deluxe">Deluxe</option>
        
        
        <option value="Premium">Premium</option>
        
        
        </select>
        
        
        </div>
        
        
        <div className="col-md-6">
        
        
        <label htmlFor="week">Week:</label>
        
        
        <select
        
        
        id="week"
        
        
        value={week}
        
        
        onChange={(e) => setWeek(e.target.value)}
        
        
        className="form-control"
        
        
        >
        
        
        <option value="">ALL</option>
        
        
        {Array.from({ length: 18 }, (_, i) => i + 1).map((week) => (
        
        
        <option key={week} value={week}>
        
        
        {week}
        
        
        </option>
        
        
        ))}
        
        
        </select>
        
        
        </div>
        
        
        </div>
        
        
        <div className="row">
        
        
        <div className="col-md-6">
        
        
        <label htmlFor="team">Team:</label>
        
        
        <NFLDropDown onChange={handleTeamChange} />
        
        
        </div>
        
        
        <div className="col-md-6">
        
        
        <label htmlFor="position">Position:</label>
        
        
        <select
        
        
        id="position"
        
        
        value={position}
        
        
        onChange={(e) => setPosition(e.target.value)}
        
        
        className="form-control"
        
        
        >
        
        
        <option value="">ALL</option>
        
        
        <option value="QB">QB</option>
        
        
        <option value="RB">RB</option>
        
        
        <option value="WR">WR</option>
        
        
        <option value="TE">TE</option>
        
        
        </select>
        
        
        </div>
        
        
        </div>
        
        
        <div className="row">
        
        
        <div className="col-md-6">
        
        
        <label htmlFor="search">Search for player name:</label>
        
        
        <input
        
        
        type="search"
        
        
        id="search"
        
        
        value={searchValue}
        
        
        onChange={handleSearchChange}
        
        
        className="form-control"
        
        
        />
        
        
        </div>
        
        
        </div>
        

                
            </div>
        </div>
</div>    
</div>                
        <div className="row">
        
        
        <div className="col-md-12">
        
        
        <table className="table table-responsive">
        
        
        <thead>
        
        
        <tr>
        
        
        <th>
        
        
        <button className="btn btn-link" onClick={() => handleSort('name')}>
        
        
        Player Name
        
        
        </button>
        
        
        </th>
        
        
        <th>
        
        
        <button className="btn btn-link" onClick={() => handleSort('team')}>
        
        
        Team
        
        
        </button>
        
        
        </th>
        
        
        <th>
        
        
        <button className="btn btn-link" onClick={() => handleSort('position')}>
        
        
        Position
        
        
        </button>
        
        
        </th>
        
        
        <th>
        
        
        <button className="btn btn-link" onClick={() => handleSort('starter_count')}>
        
        
        Starts
        
        
        </button>
        
        
        </th>
        
        
        <th>
        
        
        <button className="btn btn-link" onClick={() => handleSort('nonstarter_count')}>
        
        
        Non-Starts
        
        
        </button>
        
        
        </th>
        
        
        <th>
        
        
        <button className="btn btn-link" onClick={() => handleSort('starting_percent')}>
        
        
        Starting %
        
        
        </button>
        
        
        </th>
        
        
        </tr>
        
        
        </thead>
        
        
        <tbody>
        
        
        {players.length === 0 ? (
        
        
        <tr>
        
        
        <td>Loading data...Please wait...</td>
        
        
        </tr>
        
        
        ) : (
        
        
        players.map((player) => {
        
        
        const positionClass = getPositionClassName(player.position);
        
        
        return (
        
        
        <tr key={player.id} className={positionClass}>
        
        
        <td className={positionClass}>
        
        
        <span className="tableText">{player.name}</span>
        
        
        </td>
        
        
        <td className={positionClass}>
        
        
        <span className="tableText">{player.team}</span>
        
        
        </td>
        
        
        <td className={positionClass}>
        
        
        <span className="tableText">{player.position}</span>
        
        
        </td>
        
        
        <td className={positionClass}>
        
        
        <span className="tableText">{player.starter_count}</span>
        
        
        </td>
        
        
        <td className={positionClass}>
        
        
        <span className="tableText">{player.nonstarter_count}</span>
        
        
        </td>
        
        
        <td className={positionClass}>
        
        
        <span className="tableText">{player.starting_percent}%</span>
        
        
        </td>
        
        
        </tr>
        
        
        );
        
        
        })
        
        
        )}
        
        
        </tbody>
        
        
        </table>
        
        
        </div>
        
        
        </div>


</div>


);


}


export default App;