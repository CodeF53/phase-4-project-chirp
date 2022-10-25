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

import { ChirpEditorModal } from "./ChirpEditorModal";

export function Chirps({chirp_ids, current_user, removeChirp, addChirp}){
  return <div className="col chirps">
    { chirp_ids.map(chirp_id=><ChirpChain id={chirp_id} key={chirp_id} current_user={current_user} addChirp={addChirp} removeChirp={removeChirp}/>) }
  </div>
}

const fixTextarea = (id)=>{
  let chirpTextNode = document.querySelector(`.chirpID_${id} > div > .chirp_content_container > textarea.chirp_text`)
  chirpTextNode.style.height = chirpTextNode.scrollHeight + 10 + "px"
  chirpTextNode.style.width = chirpTextNode.parentNode.width
}

export function ChirpChain({ id, current_user, removeChirp, addChirp }) {
  const [chirp, setChirp] = useState({has_reply_from_self: true})

  const fetchChirp = ()=>{ fetch(`chirps/${id}`).then(r=>r.json())
  .then(data=>{ setChirp(data); })}
  useEffect(() => { fetchChirp() }, [])

  if (chirp.has_reply_from_self) return null

  const chain = recursive_chirp_to_chirp_array(chirp).reverse()

  // return <div className="chirpChain col"><RecursiveChirp chirp={chirp} current_user={current_user}/></div>
  return <div className="chirpChain col">
    {chain.slice(0,-1).map(chirp=><SingleChirp id={chirp.id} chirpInput={chirp} current_user={current_user} showReplyNubbin={true} addChirp={addChirp} removeChirp={removeChirp}/>)}
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
  const [chirp, setChirp] = useState(chirpInput?chirpInput:{ text:"", like_user_ids: [], attachment:"", unix_timestamp:0, user: { display_name:"", username:"", icon:"" }})

  const fetchChirp = ()=>{ fetch(`chirps/${id}`).then(r=>r.json())
  .then(data=>{ setChirp(data); })}
  // only fetch the chirp if it needs it.
  useEffect(() => { if (!chirpInput) { fetchChirp()} }, [chirpInput])

  if (chirp.rechirp) return <SingleChirp id={chirp.rechirp.id} chirpInput={chirp.rechirp} current_user={current_user} addChirp={addChirp} rechirperUserName={chirp.user.display_name} rechirp_id={chirp.id} removeChirp={removeChirp}/>

  return <Chirp id={id} chirp={chirp} fetchChirp={fetchChirp} current_user={current_user} disable_reply={disable_reply} showReplyNubbin={showReplyNubbin} addChirp={addChirp} rechirperUserName={rechirperUserName} rechirp_id={rechirp_id} removeChirp={removeChirp}/>
}

// Internal Chirp
function Chirp({id, chirp, fetchChirp, current_user, disable_reply, showReplyNubbin, addChirp, removeChirp, rechirperUserName, rechirp_id}) {
  const [showReplyEditor, setShowReplyEditor] = useState(false)
  const [moreControlPopup, setMoreControlPopup] = useState(false)

  // event listener for fixing the text area size
  useEffect(() => {
    function handleResize(e) { setTimeout(()=>{fixTextarea(id)}, 10) }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => { window.removeEventListener("resize", handleResize) }
  }, [id])

  const isChirpLiked = chirp.like_user_ids.includes(current_user.id)
  const isChirpRechirped = chirp.rechirp_user_ids.includes(current_user.id)
  const ownsChirp = chirp.user.id === current_user.id

  // TODO: delete controls in chirp_extra_controls_button
  return <div className={`col chirpID_${id}`}>
    {rechirperUserName? <div className="rechirp_header row"><ReChirpSvg/> {rechirperUserName} Rechirped</div>:null}
    <div className="row">
      <div className="chirp_icon_container col">
        <img src={chirp.user.icon} alt={`${chirp.user.display_name}'s icon`}/>
        {showReplyNubbin?<div className="chirpChainNubbin"/>:null}
      </div>
      <div className="chirp_content_container col">
        <div className="chirp_header row">
          <span className="chirp_display_name">{chirp.user.display_name}</span>
          <span className="chirp_username">{"@" + chirp.user.username}</span>
          <span className="chirp_spacer">·</span>
          {/* TODO: PARSE DATE TIME */}
          <span className="chirp_time">{chirp.unix_timestamp}</span>
          <div className="spacer"/>
          <button className="chirp_extra_controls_button" onClick={()=>setMoreControlPopup(true)}><MoreControlsSvg/></button>
          {moreControlPopup && <ClickAwayListener onClickAway={()=>setMoreControlPopup(false)}>
              <div className="chirpControl popup col">
                {ownsChirp && <button className="delete" onClick={()=>fetch(`chirps/${id}`, { method: "DELETE" }).then(r=>{if(r.ok){fetchChirp(); removeChirp(id)}})}><TrashSvg/>Delete</button>}
                <button><FlagSvg/>Report</button>
              </div>
          </ClickAwayListener>}
        </div>
        <textarea className="chirp_text" value={chirp.text} readOnly disabled autoCorrect="off"/>
        <div className="chirp_attachment">

        </div>
        <div className="chirp_controls_footer row">
          {disable_reply?null:<Fragment>
            <button onClick={()=>setShowReplyEditor(true)}><ReplySvg/>{chirp.reply_ids.length}</button>
            <div className="spacer"/>
          </Fragment>}

          {isChirpRechirped?
            <button onClick={()=>fetch(`rechirp/${id}`, { method: "DELETE" }).then(r=>{if(r.ok){fetchChirp(); removeChirp(rechirp_id)}else{fetchChirp()}})}><ReChirpSvg className="filledRechirp"/> {chirp.rechirp_user_ids.length}</button>:
            <button onClick={()=>fetch(`rechirp/${id}`, { method: "POST"   }).then(r=>{if(r.ok){fetchChirp(); r.json().then(data=>{addChirp(data.id)})}else{fetchChirp()}})}><ReChirpSvg/> {chirp.rechirp_user_ids.length}</button>}


          <div className="spacer"/>

          {isChirpLiked?
            <button onClick={()=>fetch(`likes/${id}`, { method: "DELETE" }).then(r=>{if(r.ok){fetchChirp()}})}><HeartFilledSvg/> {chirp.like_user_ids.length}</button>:
            <button onClick={()=>fetch(`likes/${id}`, { method: "POST"   }).then(r=>{if(r.ok){fetchChirp()}})}><HeartEmptySvg/> {chirp.like_user_ids.length}</button>}

          <div className="spacer"/>
          <button><ShareSvg/></button>
          <div className="spacer"/>
        </div>
      </div>
    </div>

    {showReplyEditor?<ChirpEditorModal current_user={current_user} reply_chirp_id={id} exit={()=>{setShowReplyEditor(false)}} addChirp={addChirp}/>:null}
  </div>
}

