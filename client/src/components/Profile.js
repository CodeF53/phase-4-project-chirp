import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../style/profile.css';


export function Profile ({userData, current_user, toggleEdit}) {
  const [user, setUser] = useState({ username:"", icon:"", banner:"", display_name:"", bio:"", website:"", birthday: 0, pinned_chirp_id: 0  })
  const [following, setFollowing] = useState(false)

  useEffect(() => {
    fetch(`users/${userData.username}`).then(r=>r.json())
    .then(data=>{
      setUser(data)
    })
  }, [])

  const isSelf = userData.username == current_user.username

  function handleClick() {
    toggleEdit()
    console.log('edit button clicked')
  }

// if current_user.username == user.username, show edit button //
  // return (
  // <div className={`profile  userID_${userData.id}`}>
  //   <div className="banner_icon_followbtn_container">
  //     <div className="row profile_images">
  //       <img src={userData.banner} alt={`${userData.display_name}'s banner`} className="banner_container"/>
  //       <img src={userData.icon} alt={`${userData.display_name}'s icon`} className="profile_icon_container"/>
  //       {isSelf ? null : <button className="followbtn_container">{following ? "Unfollow" : "Follow"}</button>}
  //       {isSelf ? <button className="followbtn_container" onClick={handleClick}>Edit</button> : null}
  //     </div>
  //   </div>
  //   <div className="profile_bio_container">
  //     <h1 className="display_name">{userData.display_name}</h1>
  //     <h2 className="username">@{userData.username}</h2>
  //     <p className="bio">{userData.bio}</p>
  //   </div>
  // </div>
  // )
  return <div className={`profile userID_${userData.id}`}>
    <div className="banner" style={{backgroundImage:`url(${userData.banner})`}}>
      <img src={userData.icon} alt={`${userData.display_name}'s icon`} className="icon"/>
      <div className="buttons row">
        <div className="spacer"/>
        {isSelf ? null : <button className="followbtn_container">{following ? "Unfollow" : "Follow"}</button>}
        {isSelf ? <button className="followbtn_container" onClick={handleClick}>Edit</button> : null}
      </div>
    </div>
    <div className="bio_container col">
      <h1 className="display_name">{userData.display_name}</h1>
      <h2 className="username">@{userData.username}</h2>
      <p className="bio">{userData.bio}</p>
    </div>
  </div>
}

// i like big tabs and i cannot lie
