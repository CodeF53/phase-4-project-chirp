import { useEffect, useState } from "react"

const fixTextarea = ()=>{
  let chirpTextNode = document.querySelector(`.chirp_editor > .chirp_content_container > textarea.chirp_editor_text`)
  chirpTextNode.style.height = `calc(${chirpTextNode.value.split("\n").length} * 1.5rem)`
  chirpTextNode.style.width = chirpTextNode.parentNode.width
}

export function ChirpEditor({current_user, addChirp}) {
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
      body: JSON.stringify({text: chirpText})
    }).then(r=>{if (r.ok) { r.json().then(data=>{
      setChirpText("")
      addChirp(data.id)
    })}})
  }

  // TODO: implement image adding
  return <div className="chirp chirp_editor row">
    <div className="chirp_icon_container">
      <img src={current_user.icon} alt="your icon"/>
    </div>
    <div className="chirp_content_container col">
      <textarea className="chirp_editor_text" placeholder="What's Happening?" value={chirpText} onChange={(e)=>setChirpText(e.target.value)}/>
      <div className="chirp_editor_controls row">
        <button>add image</button>
        <div className="spacer"/>
        <button onClick={handleChirp}>Chirp</button>
      </div>
    </div>
  </div>
}