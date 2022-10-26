import { Fragment, useEffect, useState } from "react";
import ClickAwayListener from 'react-click-away-listener';

import '../style/chirp.css';
import {ReactComponent as HeartFilledSvg} from '../assets/heart_filled.svg';
import {ReactComponent as HeartEmptySvg} from '../assets/heart_empty.svg';
import {ReactComponent as ReChirpSvg} from '../assets/rechirp.svg';
import {ReactComponent as ReplySvg} from '../assets/reply.svg';
import {ReactComponent as ShareSvg} from '../assets/share.svg';
import {ReactComponent as MoreControlsSvg} from '../assets/more_controls.svg';
import {ReactComponent as TrashSvg} from '../assets/trash.svg';
import {ReactComponent as FlagSvg} from '../assets/flag.svg';
import {ReactComponent as LinkSvg} from '../assets/link.svg';

import { ChirpEditorModal } from "./ChirpEditorModal";
import { TextRenderer } from "./TextRenderer";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export function Chirps({chirp_ids, current_user, removeChirp, addChirp}){
  return <div className="col chirps">
    { chirp_ids.map(chirp_id=><ChirpChain id={chirp_id} key={chirp_id} current_user={current_user} addChirp={addChirp} removeChirp={removeChirp}/>) }
  </div>
}

export function ChirpChain({ id, current_user, removeChirp, addChirp }) {
  const [chirp, setChirp] = useState({has_reply_from_self: true})

  const fetchChirp = ()=>{ fetch(`chirps/${id}`).then(r=>r.json())
  .then(data=>{ setChirp(data); })}
  // eslint-disable-next-line
  useEffect(() => { fetchChirp() }, [])

  if (chirp.has_reply_from_self) return null

  const chain = recursive_chirp_to_chirp_array(chirp).reverse()

  if (chain.length === 0) return null

  return <div className="chirpChain col">
    {chain.slice(0,-1).map(chirp=><SingleChirp key={chirp.id} id={chirp.id} chirpInput={chirp} current_user={current_user} showReplyNubbin={true} addChirp={addChirp} removeChirp={removeChirp}/>)}
    <SingleChirp id={chain.slice(-1)[0].id} chirpInput={chirp} current_user={current_user} addChirp={addChirp} removeChirp={removeChirp}/>
  </div>
}

function recursive_chirp_to_chirp_array(chirp) {
  if (!chirp.reply_chirp) return [chirp]
  return [chirp, ...recursive_chirp_to_chirp_array(chirp.reply_chirp)]
}

// takes id and chirpInput or id on its own
// if given id it fetches the needed data
export function SingleChirp({id, chirpInput, current_user, disable_reply, showReplyNubbin, removeChirp, addChirp, rechirperUserName, rechirp_id}) {
  const [chirp, setChirp] = useState(chirpInput?chirpInput:{})

  const fetchChirp = ()=>{ fetch(`/chirps/${id}`).then(r=>r.json())
  .then(data=>{ setChirp(data); })}
  // only fetch the chirp if it needs it.
  // eslint-disable-next-line
  useEffect(() => { if (!chirpInput) { fetchChirp()} }, [chirpInput])


  if (chirp.rechirp) return <SingleChirp id={chirp.rechirp.id} chirpInput={chirp.rechirp} current_user={current_user} addChirp={addChirp} rechirperUserName={chirp.user.display_name} rechirp_id={chirp.id} removeChirp={removeChirp}/>

  if (!chirp.text) return null

  return <Chirp id={id} chirp={chirp} fetchChirp={fetchChirp} current_user={current_user} disable_reply={disable_reply} showReplyNubbin={showReplyNubbin} addChirp={addChirp} rechirperUserName={rechirperUserName} rechirp_id={rechirp_id} removeChirp={removeChirp}/>
}

// Internal Chirp
function Chirp({id, chirp, fetchChirp, current_user, disable_reply, showReplyNubbin, addChirp, removeChirp, rechirperUserName, rechirp_id}) {
  const navigate = useNavigate()

  const [moreControlPopup, setMoreControlPopup] = useState(false)

  const ownsChirp = chirp.user.id === current_user.id

  return <div className={`col chirpID_${id}`} onClick={()=>navigate(`/chirp/${id}`)}>
    {rechirperUserName? <div className="rechirp_header row"><ReChirpSvg/> {rechirperUserName} Rechirped</div>:null}
    <div className="row">
      <div className="chirp_icon_container col">
        <Link to={`/${chirp.user.username}`}>
          <img src={chirp.user.icon} alt={`${chirp.user.display_name}'s icon`}/>
        </Link>
        {showReplyNubbin?<div className="chirpChainNubbin"/>:null}
      </div>
      <div className="chirp_content_container col">
        <div className="chirp_header row">
          <Link to={`/${chirp.user.username}`} className="row">
            <span className="chirp_display_name">{chirp.user.display_name}</span>
            <span className="chirp_username">{"@" + chirp.user.username}</span>
          </Link>
          <span className="chirp_spacer">·</span>
          <span className="chirp_time">{ dayjs(chirp.unix_created).fromNow() }</span>
          <div className="spacer"/>
          <button className="chirp_extra_controls_button" onClick={(e)=>{e.stopPropagation();setMoreControlPopup(true)}}><MoreControlsSvg/></button>
          {moreControlPopup && <MoreControlPopup disable_self={(e)=>{e.stopPropagation();setMoreControlPopup(false)}} ownsChirp={ownsChirp} deleteThing={()=>fetch(`chirps/${id}`, { method: "DELETE" }).then(r=>{if(r.ok){fetchChirp(); removeChirp(id)}})}/>}
        </div>
        <TextRenderer className="chirp_text" value={chirp.text}/>
        <ChirpImages image_urls={chirp.image_urls}/>
        <ChirpControlFooter chirp={chirp} disable_reply={disable_reply} current_user={current_user} id={id} addChirp={addChirp} fetchChirp={fetchChirp} removeChirp={removeChirp} rechirp_id={rechirp_id} showCounts={true}/>
      </div>
    </div>
  </div>
}

export function LargeChirp({id, chirp, fetchChirp, current_user, addChirp, removeChirp, rechirperUserName}) {
  const [moreControlPopup, setMoreControlPopup] = useState(false)

  const ownsChirp = chirp.user.id === current_user.id

  return <div className={`col chirpID_${id} bigChirp`}>
    <div className="large_chirp_head row">
      <div className="chirp_icon_container col">
        <Link to={`/${chirp.user.username}`}>
          <img src={chirp.user.icon} alt={`${chirp.user.display_name}'s icon`}/>
        </Link>
      </div>
      <div className="large_chirp_user_info col">
        <span className="chirp_display_name">{chirp.user.display_name}</span>
        <span className="chirp_username">{"@" + chirp.user.username}</span>
      </div>
      <div className="spacer"/>
      <button className="chirp_extra_controls_button" onClick={()=>setMoreControlPopup(true)}><MoreControlsSvg/></button>
      {moreControlPopup && <MoreControlPopup disable_self={()=>setMoreControlPopup(false)} ownsChirp={ownsChirp} deleteThing={()=>fetch(`chirps/${id}`, { method: "DELETE" }).then(r=>{if(r.ok){fetchChirp(); removeChirp(id)}})}/>}
    </div>

    <TextRenderer className="chirp_text large" value={chirp.text}/>

    <ChirpImages image_urls={chirp.image_urls}/>

    <div className="date_stats row">
      <span>{ dayjs(chirp.unix_created).fromNow() }</span>
      <span className="chirp_spacer">·</span>
      <span>{chirp.user.display_name}</span>
    </div>

    <div className="interaction_stats row">
      <span className="stat row">
        <span className="statNum">{chirp.rechirp_user_ids.length}</span>
        <span>Rechirps</span>
      </span>

      <span className="stat row">
        <span className="statNum">{chirp.like_user_ids.length}</span>
        <span>Likes</span>
      </span>
    </div>

    <ChirpControlFooter chirp={chirp} disable_reply={true} current_user={current_user} id={id} addChirp={addChirp} fetchChirp={fetchChirp} removeChirp={removeChirp} showCounts={false} extraSpacers={true}/>
  </div>
}

function ChirpControlFooter({chirp, disable_reply, current_user, id, addChirp, fetchChirp, removeChirp, rechirp_id, showCounts, extraSpacers}) {
  const [showReplyEditor, setShowReplyEditor] = useState(false)
  const [copyLinkPopup, setCopyLinkPopup] = useState(false)

  const isChirpLiked = chirp.like_user_ids.includes(current_user.id)
  const isChirpRechirped = chirp.rechirp_user_ids.includes(current_user.id)

  function handleRechirpClick(e) {
    e.stopPropagation();
    fetch(`/rechirp/${id}`, { method: isChirpRechirped?"DELETE":"POST" }).then(r=>{
      fetchChirp();
      if(r.ok) {
        if (isChirpRechirped) { removeChirp(rechirp_id) }
        else { r.json().then(data=>{addChirp(data.id)}) }
      }})
  }

  function handleLikeClick(e) {
    e.stopPropagation();
    fetch(`/likes/${id}`, { method: isChirpLiked?"DELETE":"POST" }).then(r=>
      { fetchChirp() })
  }

  return <div className="chirp_controls_footer row">
    {extraSpacers && <div className="spacer"/>}


    {disable_reply?null:<Fragment>
      <button onClick={e=>{e.stopPropagation();setShowReplyEditor(true)}}><ReplySvg/>{chirp.reply_ids.length}</button>
      <div className="spacer"/>
    </Fragment>}

    <button onClick={handleRechirpClick}>
      <ReChirpSvg className={isChirpRechirped? "filledRechirp":""}/>
      {showCounts && chirp.rechirp_user_ids.length}
    </button>

    <div className="spacer"/>

    <button onClick={handleLikeClick}>
      { isChirpLiked? <HeartFilledSvg/> : <HeartEmptySvg/> }
      {showCounts && chirp.like_user_ids.length}
    </button>

    <div className="spacer"/>
    <button onClick={(e)=>{e.stopPropagation();setCopyLinkPopup(true);}}>
      <ShareSvg/>
      {copyLinkPopup && <CopyLinkPopup disable_self={()=>setCopyLinkPopup(false)} id={id}/>}
    </button>
    <div className="spacer"/>

    {showReplyEditor?<ChirpEditorModal current_user={current_user} reply_chirp_id={id} exit={()=>{setShowReplyEditor(false)}} addChirp={addChirp}/>:null}
  </div>
}

function MoreControlPopup({disable_self, ownsChirp, deleteThing}) {
  return <ClickAwayListener onClickAway={disable_self}>
    <div className="chirpControl popup col">
      {ownsChirp && <button className="delete" onClick={deleteThing}><TrashSvg/>Delete</button>}
      <button><FlagSvg/>Report</button>
    </div>
  </ClickAwayListener>
}

function CopyLinkPopup({disable_self, id}) {
  return <ClickAwayListener onClickAway={disable_self}>
    <div className="chirpControl popup col">
      <button onClick={(e)=>{e.stopPropagation(); navigator.clipboard.writeText(window.location.href.split("/").slice(0,3).join("/")+"/chirp/"+id)}}><LinkSvg/>Copy link to Chirp</button>
    </div>
  </ClickAwayListener>
}

function ChirpImages({ image_urls }) {
  switch (image_urls.length) {
    case 1:
      return <div className="chirp_images chirp_images_1">
        <img src={image_urls[0]} alt="eat my meaningful text"/>
      </div>
    case 2:
      return <div className="chirp_images chirp_images_2 row">
        <img src={image_urls[0]} alt="eat my meaningful text"/>
        <img src={image_urls[1]} alt="eat my meaningful text"/>
      </div>
    case 3:
      return <div className="chirp_images chirp_images_3 col">
        <div className="row">
          <img src={image_urls[0]} alt="eat my meaningful text"/>
          <img src={image_urls[1]} alt="eat my meaningful text"/>
        </div>
        <div className="row">
          <img src={image_urls[2]} alt="eat my meaningful text"/>
        </div>
      </div>
    case 4:
      return <div className="chirp_images chirp_images_4">
        <div className="row">
          <img src={image_urls[0]} alt="eat my meaningful text"/>
          <img src={image_urls[1]} alt="eat my meaningful text"/>
        </div>
        <div className="row">
          <img src={image_urls[2]} alt="eat my meaningful text"/>
          <img src={image_urls[3]} alt="eat my meaningful text"/>
        </div>
      </div>
    default:
      return null
  }
}