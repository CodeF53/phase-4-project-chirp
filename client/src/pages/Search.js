import {useState, useEffect} from 'react';
import '../style/search.css';
import { Chirps, SingleChirp } from "../components/Chirp"
import {ReactComponent as SearchSvg} from '../assets/search.svg';

export function Search ({ current_user }) {
const [chirps, setChirps] = useState([])
const [searchTerm, setSearchTerm] = useState("")
  useEffect(() => {fetch("/search").then(r=>r.json())
    .then((data)=>{ setChirps(data) })}, [])

  const filteredChirps = chirps.filter((entry) => entry.text && entry.text.includes(searchTerm))

  return (
    <div className="col">
      <div className="row">
        <SearchSvg id="searchsvg"/>
        <input type="text" id="chirpsearch" onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search chirps..."></input>
      </div>

      <div className="spacer"/>

      <ul id="myUL" className="unfollowed_chirps not_my_chirps">
        {filteredChirps.map((chirp)=><SingleChirp chirpInput={chirp} current_user={current_user}/>)}
      </ul>
    </div>
  )
}