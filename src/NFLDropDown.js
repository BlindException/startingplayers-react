import React, { useState, useEffect } from 'react';
import axios from 'axios';
const NFLDropDown = ({ onChange }) => {
const [teams, setTeams] = useState([]);
const [team, setTeam] = useState('');
useEffect(() => {
const fetchData = async () => {
try {
const response = await axios.get('https://robertprockjr.com/mfl/teams/', {
mode: "cors"
});
setTeams(response.data);

} catch (error) {


console.error(error);


}


};


fetchData();


}, []);


const handleTeamChange = (e) => {


const selectedTeam = e.target.value;


setTeam(selectedTeam);


onChange(selectedTeam);


};


return (


<select id="team" value={team} onChange={handleTeamChange}>


<option value="">ALL</option>


{teams.map((team) => (


<option key={team.id} value={team.id}>


{team.id}


</option>


))}


</select>


);


};


export default NFLDropDown;