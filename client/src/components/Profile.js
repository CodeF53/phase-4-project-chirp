import { useEffect, useState } from "react";
import '../style/profile.css';
import { ProfileEditor } from "./ProfileEditor";

export function Profile ({userData, current_user, toggleEdit}) {
  const [showEditorModal, setShowEditorModal] = useState(false)
  const [user, setUser] = useState({ username:"", icon:"", banner:"", display_name:"", bio:"", website:"", birthday: 0, pinned_chirp_id: 0  })

  console.log('profile.js userData', userData)

  useEffect(() => { fetch(`users/${userData.username}`).then(r=>r.json())
    .then(data=>{ setUser(data) })}, [userData])

  const isSelf = userData.username === current_user.username
  const isFollowing = current_user.id === userData.follower_ids

  return <div className={`profile userID_${userData.id}`}>
    <div className="banner" style={{backgroundImage:`url(${userData.banner})`}}>
      <img src={userData.icon} alt={`${userData.display_name}'s icon`} className="icon"/>
      <div className="buttons row">
        <div className="spacer"/>
        {isSelf ? null : <button className="followbtn_container">{isFollowing ? "Unfollow" : "Follow"}</button>}
        {isSelf ? <button className="followbtn_container" onClick={()=>setShowEditorModal(true)}>Edit Profile</button> : null}
      </div>
    </div>
    <div className="bio_container col">
      <h1 className="display_name">{userData.display_name}</h1>
      <h2 className="username">@{userData.username}</h2>
      <p className="bio">{userData.bio}</p>
      <a className="website" href={userData.website}>userData.website</a>
      <p className="birthday">Born on {userData.birthday}</p>
      {/* <p className="follows">{userData.followers.length} Followers</p> */}
    </div>

    {showEditorModal?<ProfileEditor userData={userData} toggleEdit={()=>toggleEdit()} exit={()=>setShowEditorModal(false)}/>:null}
  </div>
}

// i like big tabs and i cannot lie
