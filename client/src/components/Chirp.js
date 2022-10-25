import { Fragment, useEffect, useState } from "react";

import '../style/chirp.css';
import {ReactComponent as HeartFilledSvg} from '../assets/heart_filled.svg';
import {ReactComponent as HeartEmptySvg} from '../assets/heart_empty.svg';
import {ReactComponent as ReChirpSvg} from '../assets/rechirp.svg';
import {ReactComponent as ReplySvg} from '../assets/reply.svg';
import {ReactComponent as ShareSvg} from '../assets/share.svg';
import { ChirpEditorModal } from "./ChirpEditorModal";

export function Chirps({chirp_ids, current_user}){
  return <div className="col chirps">
    { chirp_ids.map(chirp_id=><Chirp id={chirp_id} key={chirp_id} current_user={current_user}/>) }
  </div>
}

const fixTextarea = (id)=>{
  let chirpTextNode = document.querySelector(`.chirpID_${id} > .chirp_content_container > textarea.chirp_text`)
  chirpTextNode.style.height = chirpTextNode.scrollHeight - 4 + "px"
  chirpTextNode.style.width = chirpTextNode.parentNode.width
}

export function Chirp({id, current_user, disable_reply, noOutline}) {
  const [chirp, setChirp] = useState({ text:"", attachment:"", reply_chirp_id:null, unix_timestamp:0, user: { display_name:"", username:"", icon:"" }, like_user_ids: [] })
  const [showReplyEditor, setShowReplyEditor] = useState(false)
 
  const fetchChirp = ()=>{ fetch(`chirps/${id}`).then(r=>r.json()).then(data=>{
    setChirp(data)
    setTimeout(()=>{fixTextarea(id)}, 10)
  })}

  useEffect(() => {
    fetchChirp()
    function handleResize(e) { setTimeout(()=>{fixTextarea(id)}, 10) }
    window.addEventListener("resize", handleResize)
    return () => { window.removeEventListener("resize", handleResize) }
  }, [id])

  // TODO: re-chirp, re-chirp count, reply
  const rechirp = () => {
    fetch(`chirps/${id}`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text: chirp.text, reply_chirp_id: chirp.reply_chirp_id})
    }).then(r=>{if (r.ok) { r.json().then(data=>{console.log(data)
    })}})
  }
  // TODO: delete controls in chirp_extra_controls_button

  // TODO: render reply chains and shit

  const isChirpLiked = chirp.like_user_ids.includes(current_user.id)

  return <div className={`chirp row chirpID_${id} ${noOutline?"noOutline":""}`}>
    <div className="chirp_icon_container col">
      <img src={chirp.user.icon} alt={`${chirp.user.display_name}'s icon`}/>
    </div>
    <div className="chirp_content_container col">
      <div className="chirp_header row">
        <span className="chirp_display_name">{chirp.user.display_name}</span>
        <span className="chirp_username">{"@" + chirp.user.username}</span>
        <span className="chirp_spacer">·</span>
        {/* TODO: PARSE DATE TIME */}
        <span className="chirp_time">{chirp.unix_timestamp}</span>
        <div className="spacer"/>
        <button className="chirp_extra_controls_button">
          <svg viewBox="0 0 24 24"><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
        </button>
      </div>
      <textarea className="chirp_text" value={chirp.text} readOnly disabled autoCorrect="off"/>
      <div className="chirp_attachment">

      </div>
      <div className="chirp_controls_footer row">
        {disable_reply?null:<Fragment>
          <button onClick={()=>setShowReplyEditor(true)}><ReplySvg/></button>
          <div className="spacer"/>
        </Fragment>}

        <button className="chirpID_${id}" onClick={()=>rechirp()}><ReChirpSvg/></button>
        <div className="spacer"/>

        {isChirpLiked?
          <button onClick={()=>{fetch(`likes/${id}`, { method: "DELETE" }).then(r=>{if(r.ok){fetchChirp()}})}}><HeartFilledSvg/> {chirp.like_user_ids.length}</button>:
          <button onClick={()=>{fetch(`likes/${id}`, { method: "POST"   }).then(r=>{if(r.ok){fetchChirp()}})}}><HeartEmptySvg/> {chirp.like_user_ids.length}</button>}

        <div className="spacer"/>
        <button><ShareSvg/></button>
        <div className="spacer"/>
      </div>
    </div>

    {showReplyEditor?<ChirpEditorModal current_user={current_user} reply_chirp_id={id} exit={()=>{setShowReplyEditor(false)}}/>:null}
  </div>
}