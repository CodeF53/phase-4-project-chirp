import { useEffect, useState } from "react";
import '../style/chirp.css';

const fixTextarea = (id)=>{
  let chirpTextNode = document.querySelector(`.chirpID_${id} > .chirp_content_container > textarea.chirp_text`)
  chirpTextNode.style.height = chirpTextNode.scrollHeight - 3 + "px"
  chirpTextNode.style.height = chirpTextNode.parentNode.width
}

export function Chirp({id}) {
  const [chirp, setChirp] = useState({ text:"", attachment:"", reply_chirp_id:null, unix_timestamp:0, user: { display_name:"", username:"", icon:"" }  })

  useEffect(() => {
    fetch(`chirps/${id}`).then(r=>r.json()).then(data=>{
      setChirp(data)
      setTimeout(()=>{fixTextarea(id)}, 10)
    })

    function handleResize(e) { setTimeout(()=>{fixTextarea(id)}, 10) }
    window.addEventListener("resize", handleResize)
    return () => { window.removeEventListener("resize", handleResize) }
  }, [id])

  return <div className={`chirp row chirpID_${id}`}>
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
        <button>Reply Button</button>
        <div className="spacer"/>
        <button>Re-chirp Button</button>
        <div className="spacer"/>
        <button>Like Button</button>
        <div className="spacer"/>
        <button>Share Button</button>
        <div className="spacer"/>
      </div>
    </div>
  </div>
}