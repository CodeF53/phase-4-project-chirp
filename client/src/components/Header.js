import { Link } from "react-router-dom";

import '../style/header.css';

import {ReactComponent as HomeSvg} from '../assets/header/home.svg';
import {ReactComponent as SearchSvg} from '../assets/header/search.svg';
import {ReactComponent as ProfileSvg} from '../assets/header/profile.svg';
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";


export function Header({user, logOut}) {
  const [LogoutPopup, setLogoutPopup] = useState(false)

  return <header className="header col">
    <Link to="/"><button aria-label="home"><HomeSvg/></button></Link>
    <Link to="/search"><button aria-label="search"><SearchSvg/></button></Link>
    {/* <button aria-label="notifications"></button> */}
    {/* <button aria-label="messages"></button> */}
    <Link to={user.username}><button aria-label="profile"><ProfileSvg/></button></Link>
    <div className="spacer"/>
    <button onClick={()=>{setLogoutPopup(true)}}><img src={user.icon} alt="your icon"/></button>

    {LogoutPopup && <ClickAwayListener onClickAway={()=>setLogoutPopup(false)}>
      <div className="userControl popup col" onClick={()=>fetch('/logout', {method:"DELETE"}).then(r=>{if(r.ok){logOut()}})}>
        <button>Log Out @{user.username}</button>
      </div>
    </ClickAwayListener>}
  </header>
}