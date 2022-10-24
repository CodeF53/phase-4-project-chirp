import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../style/profile.css';
import { ProfileEditor } from "./ProfileEditor";


export function Profile ({userData, current_user, toggleEdit}) {
  const [showEditorModal, setShowEditorModal] = useState(false)
  const [user, setUser] = useState({ username:"", icon:"", banner:"", display_name:"", bio:"", website:"", birthday: 0, pinned_chirp_id: 0  })
  const [following, setFollowing] = useState(false)

  useEffect(() => { fetch(`users/${userData.username}`).then(r=>r.json())
    .then(data=>{ setUser(data) })}, [])

  const isSelf = userData.username === current_user.username

  return <div className={`profile userID_${userData.id}`}>
    <div className="banner" style={{backgroundImage:`url(${userData.banner})`}}>
      <img src={userData.icon} alt={`${userData.display_name}'s icon`} className="icon"/>
      <div className="buttons row">
        <div className="spacer"/>
        {isSelf ? null : <button className="followbtn_container">{following ? "Unfollow" : "Follow"}</button>}
        {isSelf ? <button className="followbtn_container" onClick={()=>setShowEditorModal(true)}>Edit</button> : null}
      </div>
    </div>
    <div className="bio_container col">
      <h1 className="display_name">{userData.display_name}</h1>
      <h2 className="username">@{userData.username}</h2>
      <p className="bio">{userData.bio}</p>
    </div>

    {showEditorModal?<ProfileEditor userData={userData} toggleEdit={toggleEdit} exit={()=>setShowEditorModal(false)}/>:null}
  </div>
}

// i like big tabs and i cannot lie
