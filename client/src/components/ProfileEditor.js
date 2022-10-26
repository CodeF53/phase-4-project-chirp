import { useEffect, useState } from "react"
import { LabeledInput } from "./LabeledInput"
import {ReactComponent as CloseSvg} from '../assets/close.svg';

export function ProfileEditor ({userData, exit, fetchUserData}) {
  const [profileInfo, setProfileInfo] = useState({userData})

  const [icon, setIcon] = useState(null)
  const [banner, setBanner] = useState(null)

  const handleEdit = ({target:{name, value}})=>setProfileInfo(profileInfo=>({...profileInfo, [name]: value}))

  function patchProfile (e) {
    e.preventDefault()

    const formData = new FormData()
    // copy the normal stuff into form data
    for (const key in profileInfo) { formData.append(key, profileInfo[key]) }
    // put the images in
    if (icon)   formData.append('icon', icon, icon.name)
    if (banner) formData.append('banner', banner, banner.name)

    fetch(`/user/${userData.username}`, {
      method: "PATCH",
      body: formData
      }).then(r=>{if (r.ok) {
        fetchUserData()
        exit()
      }})
  }

  return <div className="modalOverlay" onClick={exit}>
    <div className="modal col editProfileModal" onClick={e=>e.stopPropagation()}>
      <button className="closeModal" aria-label="close" onClick={exit}><CloseSvg/></button>
      <form onSubmit={patchProfile}>
      <h1>Edit Profile</h1>

      <LabeledInput value={profileInfo.display_name} name="display_name" label="Name" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput value={profileInfo.bio} name="bio" label="Bio" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput value={profileInfo.website} name="website" label="Website" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <LabeledInput value={profileInfo.birthday} name="birthday" label="Birthday" onChange={(e)=>handleEdit(e)}/>
      <br></br>
      <div className="images col">
        <div className="row">
          <label htmlFor="icon-input">Icon:</label>
          <div className="spacer"/>
          <input id="icon-input" type="file" accept="image/*" onChange={e=>setIcon(e.target.files[0])}/>
        </div>
        <div className="row">
          <label htmlFor="banner-input">Banner:</label>
          <div className="spacer"/>
          <input id="banner-input" type="file" accept="image/*" onChange={e=>setBanner(e.target.files[0])}/>
        </div>
      </div>
      <br></br>
      <input type="submit" onClick={patchProfile}/>
    </form>
    </div>
  </div>
}