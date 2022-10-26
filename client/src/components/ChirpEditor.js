import { useEffect, useState } from "react"
import {ReactComponent as ImgSvg} from '../assets/add_img.svg';


const fixTextarea = ()=>{
  let chirpTextNode = document.querySelector(`.chirp_editor > .chirp_content_container > textarea.chirp_editor_text`)
  chirpTextNode.style.height = `calc(${chirpTextNode.value.split("\n").length} * 1.70rem)`
  chirpTextNode.style.width = chirpTextNode.parentNode.width
}

export function ChirpEditor({current_user, addChirp, reply_chirp_id, placeholder="What's Happening?", onSuccess=()=>{}}) {
  const [chirpText, setChirpText] = useState("")
  const [attachments, setAttachments] = useState([])
  const [errorText, setErrorText] = useState("")

  function handleSetAttachments(e) {
    console.log(e.target.files)

    if ((e.target.files.length + attachments.length) > 4)
      { return setErrorText("Only a max of 4 images allowed") }
    setErrorText("")

    console.log([...attachments, ...e.target.files])

    setAttachments(attachments=>[ ...e.target.files, ...attachments])

    console.log(attachments)
  }

  // resize text area to fit whenever window is resized or text is edited
  useEffect(()=>{ fixTextarea() }, [chirpText])
  useEffect(() => {
    function handleResize(e) { setTimeout(()=>{fixTextarea()}, 10) }
    window.addEventListener("resize", handleResize)
    return () => { window.removeEventListener("resize", handleResize) }
  }, [])


  function handleChirp() {
    if (chirpText.length===0) return

    console.log(attachments)

    // https://dev.to/jblengino510/uploading-files-in-a-react-rails-app-using-active-storage-201c
    // we cant use the normal json for file uploads
    const formData = new FormData()
    formData.append('text', chirpText)
    if (reply_chirp_id) formData.append('reply_chirp_id', reply_chirp_id)
    attachments.forEach(attachment => formData.append('images[]', attachment, attachment.name))

    fetch("chirps", {
      method: "POST",
      body: formData
    }).then(r=>{if (r.ok) { r.json().then(data=>{
      setChirpText("")
      setAttachments([])
      addChirp(data.id)
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

        <label className="addImage" htmlFor="image-input">
          <ImgSvg/>
        </label>
        <input id="image-input" type="file" accept="image/*" multiple={true} onChange={handleSetAttachments}/>
        {<span className="errorText">{errorText}</span>}

        <div className="spacer"/>
        <button className="sendChirp" onClick={handleChirp}>{reply_chirp_id?"Reply":"Chirp"}</button>
      </div>
      <div className="chirp_editor_attachment_viewer col">
        {attachments.map((attachment,i)=><div className="row" key={i}>
          <button className="removeAttachment" onClick={()=>setAttachments(attachments.filter(a=>a.name!==attachment.name))}>X</button>
          <span>{attachment.name}</span>
        </div>)}
      </div>
    </div>
  </div>
}