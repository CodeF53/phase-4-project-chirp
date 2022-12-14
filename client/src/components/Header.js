import { Link } from "react-router-dom";
import { useState } from 'react';

import '../style/header.css';

import {ReactComponent as HomeSvg} from '../assets/header/home.svg';
import {ReactComponent as SearchSvg} from '../assets/header/search.svg';
import {ReactComponent as ProfileSvg} from '../assets/header/profile.svg';
import {ReactComponent as HomeFilledSvg} from '../assets/header/homefilled.svg';
import {ReactComponent as SearchFilledSvg} from '../assets/header/searchfilled.svg';
import {ReactComponent as ProfileFilledSvg} from '../assets/header/profilefilled.svg';
import ClickAwayListener from "react-click-away-listener";

export function Header({user, logOut}) {
  const [path, setPath] = useState("")
  const [LogoutPopup, setLogoutPopup] = useState(false)

  return <header className="header col" onClick={()=>setPath(window.location.href.split('/').slice(3)[0])}>
    <Link to="/"><button aria-label="home" >{path[0]? <HomeSvg/>:<HomeFilledSvg/>}</button></Link>
    <Link to="/search"><button aria-label="search">{path === "search" ? <SearchFilledSvg/>:<SearchSvg/>}</button></Link>
    {/* <button aria-label="notifications"></button> */}
    {/* <button aria-label="messages"></button> */}
    <Link to={user.username}><button aria-label="profile">{path !== "" && path !== "search" && path !== "chirp" ? <ProfileFilledSvg/>:<ProfileSvg/>}</button></Link>
    <div className="spacer"/>
    <button onClick={()=>{setLogoutPopup(true)}}><img src={user.icon} alt="your icon"/></button>

    {LogoutPopup && <ClickAwayListener onClickAway={()=>setLogoutPopup(false)}>
      <div className="userControl popup col" onClick={()=>fetch('/logout', {method:"DELETE"}).then(r=>{if(r.ok){logOut()}})}>
        <button>Log Out @{user.username}</button>
      </div>
    </ClickAwayListener>}
  </header>
}