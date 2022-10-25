import { useEffect, useState } from "react"
import { LabeledInput } from "./LabeledInput"
import {ReactComponent as CloseSvg} from '../assets/close.svg';

export function ProfileEditor ({userData, exit, fetchUserData}) {
  const [profileInfo, setProfileInfo] = useState({userData})

  const handleEdit = ({target:{name, value}})=>setProfileInfo(profileInfo=>({...profileInfo, [name]: value}))

  function patchProfile (e) {
    e.preventDefault()
    fetch(`/user/${userData.username}`, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(profileInfo)
      }).then(r=>{if (r.ok) { r.json().then((data) => {
        fetchUserData()
        exit()
        console.log(data)
      })}})
  }

  return <div className="modalOverlay" onClick={exit}>
    <div className="modal col editProfileModal" onClick={e=>e.stopPropagation()}>
      <button className="closeModal" aria-label="close" onClick={exit}><CloseSvg/></button>
      <form onSubmit={patchProfile}>
      <h1>Edit Profile</h1>

      <LabeledInput value={profileInfo.display_name ? profileInfo.display_name : userData.display_name} name="display_name" label="Name" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput value={profileInfo.bio ? profileInfo.bio : userData.bio} name="bio" label="Bio" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput value={profileInfo.website ? profileInfo.website : userData.website} name="website" label="Website" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput value={profileInfo.birthday ? profileInfo.birthday : userData.birthday} name="birthday" label="Birthday" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput value={profileInfo.icon ? profileInfo.icon : userData.icon} name="icon" label="Icon image address" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput value={profileInfo.banner ? profileInfo.banner : userData.banner} name="banner" label="Banner image address" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <input type="submit" onClick={()=>patchProfile()}/>
      <br></br>
    </form>
    </div>
  </div>
}