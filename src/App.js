import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NFLDropDown from './NFLDropDown';
function App() {
const [players, setPlayers] = useState([]);
const [leagueType, setLeagueType] = useState('');
const [week, setWeek] = useState('');
const [team, setTeam] = useState('');
const [position, setPosition] = useState('');
const [searchValue, setSearchValue] = useState('');
const [searchTimeout, setSearchTimeout] = useState(null);
const [totalPlayers, setTotalPlayers] = useState(0);
const [totalStartsByQuery, setTotalStartsByQuery] = useState(0);
useEffect(() => {
fetchData();
}, [leagueType, week, team, position, searchValue]);
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
},
});
const data = response.data;
setTotalPlayers(data.totalPlayers);
setTotalStartsByQuery(data.totalStartsByQuery);
if (data[0].length === 0) {
setPlayers([
{
id: 'NoData',
name: 'No player data available.',
}
]);
} else {
setPlayers(data.sortedByPercent);
for(var i = 0;i<players.length;i++)
{
    players[i].percentofPlayers=Math.round(((1/totalPlayers)*100),2);
    players[i].percentOfStarts=Math.round(((players[i].percent/totalStartsByQuery)*100),2);
            };

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
setSearchTimeout(setTimeout(() => {
fetchData();
}, 3000));
};
return (
<div>
<h1>Starting Players</h1>
<div>
<label htmlFor="leagueType">League Type:</label>
<select
id="leagueType"
value={leagueType}
onChange={(e) => setLeagueType(e.target.value)}
>
<option value="">ALL</option>
<option value="Basic">Basic</option>
<option value="Deluxe">Deluxe</option>
<option value="Premium">Premium</option>
</select>
</div>
<div>
<label htmlFor="week">Week:</label>
<select
id="week"
value={week}
onChange={(e) => setWeek(e.target.value)}
>
<option value="">ALL</option>
{Array.from({ length: 18 }, (_, i) => i + 1).map((week) => (
<option key={week} value={week}>
{week}
</option>
))}
</select>
</div>
<div>
<label htmlFor="team">Team:</label>
<NFLDropDown onChange={handleTeamChange} />
</div>
<div>
<label htmlFor="position">Position:</label>
<select
id="position"
value={position}
onChange={(e) => setPosition(e.target.value)}
>
<option value="">ALL</option>
<option value="QB">QB</option>
<option value="RB">RB</option>
<option value="WR">WR</option>
<option value="TE">TE</option>
</select>
</div>
<div>
<label htmlFor="search">Search for player name:</label>
<input
type="search"
id="search"
value={searchValue}
onChange={handleSearchChange}
/>
</div>
<div>
<p>Total Players: {totalPlayers}</p>
<p>Total Starts: {totalStartsByQuery}</p>
</div>
<table>
<thead>
<tr>
<th>Player Name</th>
<th>Team</th>
<th>Position</th>
<th>Starts</th>
<th>% of players</th>
<th>% of starts</th>
</tr>
</thead>
<tbody>
{players.length === 0 ? (
<tr>
<td>Loading data...</td>
</tr>
) : (
players.map((player) => (
<tr key={player.id}>
<td>{player.name}</td>
<td>{player.team}</td>
<td>{player.position}</td>
<td>{player.percent}</td>
<td>{Math.round((player.percent/totalPlayers)*100)}%</td>
<td>
{Math.round((player.percent / totalStartsByQuery) * 100)}%
</td>


</tr>


))


)}


</tbody>


</table>


</div>


);


}


export default App;