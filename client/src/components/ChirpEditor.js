import { useEffect, useState } from "react"
import {ReactComponent as ImgSvg} from '../assets/add_img.svg';


const fixTextarea = ()=>{
  let chirpTextNode = document.querySelector(`.chirp_editor > .chirp_content_container > textarea.chirp_editor_text`)
  chirpTextNode.style.height = `calc(${chirpTextNode.value.split("\n").length} * 1.5rem)`
  chirpTextNode.style.width = chirpTextNode.parentNode.width
}

export function ChirpEditor({current_user, addChirp, reply_chirp_id, placeholder="What's Happening?", onSuccess=()=>{}}) {
  const [chirpText, setChirpText] = useState("")
  useEffect(()=>{ fixTextarea() }, [chirpText])

  useEffect(() => {
    function handleResize(e) { setTimeout(()=>{fixTextarea()}, 10) }
    window.addEventListener("resize", handleResize)
    return () => { window.removeEventListener("resize", handleResize) }
  }, [])


  function handleChirp() {
    if (chirpText.length===0) return

    fetch("chirps", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text: chirpText, reply_chirp_id: reply_chirp_id})
    }).then(r=>{if (r.ok) { r.json().then(data=>{
      setChirpText("")
      addChirp(data.id)
      onSuccess()
    })}})
  }

  // TODO: implement image adding
  return <div className="chirp chirp_editor row noOutline">
    <div className="chirp_icon_container">
      <img src={current_user.icon} alt="your icon"/>
    </div>
    <div className="chirp_content_container col">
      <textarea className="chirp_editor_text" placeholder={placeholder} value={chirpText} onChange={(e)=>setChirpText(e.target.value)}/>
      <div className="chirp_editor_controls row">
        <button className="addImage"><ImgSvg/></button>
        <div className="spacer"/>
        <button className="sendChirp" onClick={handleChirp}>{reply_chirp_id?"Reply":"Chirp"}</button>
      </div>
    </div>
  </div>
}