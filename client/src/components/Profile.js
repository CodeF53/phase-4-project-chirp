import { useState } from "react";
import '../style/profile.css';
import { ProfileEditor } from "./ProfileEditor";

export function Profile ({userData, current_user, toggleEdit, fetchUserData}) {
  const [showEditorModal, setShowEditorModal] = useState(false)

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
      {userData.bio && <p className="bio">{userData.bio}</p>}
      {userData.website && <a className="website" href={userData.website}>{userData.website.split("https://").slice(-1)[0]}</a>}
      {userData.birthday>0 && <p className="birthday">Born on {userData.birthday}</p>}
      <div className="row">
        <p className="follows">{userData.followers.length} Followers</p>
        <p className="following">{userData.followers.length} Following</p>
      </div>
    </div>

    {showEditorModal?<ProfileEditor userData={userData} toggleEdit={()=>toggleEdit()} exit={()=>setShowEditorModal(false)} fetchUserData={fetchUserData}/>:null}
  </div>
}