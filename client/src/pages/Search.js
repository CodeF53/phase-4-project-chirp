import {useState, useEffect} from 'react';
import '../style/search.css';
import { Chirps } from "../components/Chirp"
import {ReactComponent as SearchSvg} from '../assets/search.svg';

export function Search () {
const [searchChirps, setSearchChirps] = useState([])
  let chirp_data=[
    {
       user_id: 1,
       text: "We are going to colonize Mars",
       attachment: "",
       reply_chirp_id: null,
       rechirp_id: null
    },
    {
       user_id: 2,
       text: "I flexed in the mirror for an hour today",
       attachment: "",
       reply_chirp_id: null,
       rechirp_id: null
    },
    {
       user_id: 3,
       text: "Make sure to order my holiday cookbook, link in bio",
       attachment: "",
       reply_chirp_id: null,
       rechirp_id: null
    },
    {
        user_id: 1,
        text: "I'm switching political parties @cristiano",
        attachment: "",
        reply_chirp_id: null,
        rechirp_id: null
     },
     {
        user_id: 2,
        text: "@LionelMessi why did you have to play during my era",
        attachment: "",
        reply_chirp_id: null,
        rechirp_id: null
     },
     {
        user_id: 3,
        text: "@elonmusk my pumpkin cookies will send you to the moon",
        attachment: "",
        reply_chirp_id: null,
        rechirp_id: null
     },
    {
       user_id: 1,
       text: "Why did I spend so much money on these rockets ugh",
       attachment: "",
       reply_chirp_id: 6,
       rechirp_id: null
    },
    {
       user_id: 2,
       text: "American politicians disgust me @elonmusk",
       attachment: "",
       reply_chirp_id: 4,
       rechirp_id: null
    },
    {
       user_id: 3,
       text: "Vote for me and VP Snoop in 2024",
       attachment: "",
       reply_chirp_id: 8,
       rechirp_id: null
    },
]

fetch("/chirps").then(r=>r.json()).then((data)=>{
  setSearchChirps(data)
})

function dropdownSuggestions() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');
  console.log("I've been activated")
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

  return (
    <div className="col">
      <div className="row">
      <SearchSvg id="searchsvg"/>
      <input type="text" id="chirpsearch" onChange={()=>dropdownSuggestions()} placeholder="Search chirps..."></input>
      </div>
      <div className="spacer"/>
      <ul id="myUL" className="unfollowed_chirps not_my_chirps">
        {searchChirps.map((chirp)=><li><a>{chirp.text}</a></li>)}
      </ul>

    </div>

  )
}