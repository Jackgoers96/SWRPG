import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Planet = (props) => (
 <tr>
   <td>{props.planet.name}</td>
   <td>{props.planet.position}</td>
   <td>{props.planet.level}</td>
   <td>
   <Link className="btn btn-link" to={`/edit/${props.planet._id}`}>Edit</Link>
     <button className="btn btn-link"
       onClick={() => {
         props.deletePlanet(props.planet._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function PlanetList() {
 const [planets, setPlanets] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getPlanets() {
     const response = await fetch(`api/Planets/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const planets = await response.json();
     setPlanets(planets);
   }
 
   getPlanets();
 }, [planets.length]);
 
 // This method will delete a record
 async function deletePlanet(id) {
   await fetch(`http://localhost:3000/${id}`, {
     method: "DELETE"
   });
 
   const newPlanets = [planets].filter((el) => el._id !== id);
   setPlanets(newPlanets);
 }
 
 // This method will map out the records on the table
 function planetList() {
   return planets.map((planet) => {
     return (
       <Planet
         planet={planet}
         deletePlanet={() => deletePlanet(Planet._id)}
         key={planet._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Planet List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Position</th>
           <th>Level</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{planetList()}</tbody>
     </table>
   </div>
 );
}