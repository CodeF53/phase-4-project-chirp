import { useEffect, useState } from "react"
import { LabeledInput } from "./LabeledInput"
import {ReactComponent as CloseSvg} from '../assets/close.svg';

export function ProfileEditor ({userData, toggleEdit, exit}) {
  const [profileInfo, setProfileInfo] = useState({userData})

  const handleEdit = ({target:{name, value}})=>setProfileInfo(profileInfo=>({...profileInfo, [name]: value}))

  function patchProfile (e) {
    e.preventDefault()
    fetch(`/user/${userData.username}`, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(profileInfo)
      }).then(r=>{if (r.ok) { r.json().then((data) => {
      toggleEdit()
      })}})
  }

  return <div className="modalOverlay" onClick={exit}>
    <div className="modal col editProfileModal" onClick={e=>e.stopPropagation()}>
      <button className="closeModal" aria-label="close" onClick={exit}><CloseSvg/></button>

      <form onSubmit={patchProfile} width='35rem'>
      <h1>Edit Profile</h1>
      <LabeledInput value={userData.icon} name="icon" label="Icon image address" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput value={userData.banner} name="banner" label="Banner image address" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput value={userData.display_name} name = "display_name" label="Display Name" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput value={userData.bio} name="bio" label="Bio" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput value={userData.website} name="website" label="Website" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput value={userData.birthday} name="birthday" label="Birthday" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput type="submit"/>
      <br></br>
    </form>
    </div>
  </div>
}