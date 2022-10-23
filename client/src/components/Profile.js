import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../style/profile.css';

export function Profile ({userData, current_user}) {
    const [user, setUser] = useState({ username:"", icon:"", banner:"", display_name:"", bio:"", website:"", birthday: 0, pinned_chirp_id: 0  })
    const [following, setFollowing] = useState(false)
    useEffect(() => {
        fetch(`users/${userData.username}`).then(r=>r.json())
        .then(data=>{setUser(data)}
        )
    }, [])
    console.log('profile.js userData =', userData)
    let fakeUser = {
        username: "elonmusk",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXxxCzrX7ojA98h_3twc19cTEy2KnND6W6cQ&usqp=CAU",
        banner: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/NGC_4414_%28NASA-med%29.jpg/1200px-NGC_4414_%28NASA-med%29.jpg",
        display_name: "Elon Musk",
        bio: "Boring",
        website: "https://www.spacex.com/",
        birthday: 46981697,
        pinned_chirp_id: 1
    }

    console.log(user)

// if current_user.username == user.username, show edit button //
    return (
    <div className={`profile  userID_${userData.id}`}>
        <div className="banner_icon_followbtn_container"> 
            <div className="row profile_images">
                <img src={fakeUser.banner} alt={`${fakeUser.display_name}'s banner`} className="banner_container"/>
                <img src={fakeUser.icon} alt={`${fakeUser.display_name}'s icon`} className="profile_icon_container"/>
                <button className="followbtn_container">{following ? "Unfollow" : "Follow"}</button>
            </div>
        </div> 
        <div className="profile_bio_container">
            <h1 className="display_name">{fakeUser.display_name}</h1>
            <h2 className="username">@{fakeUser.username}</h2>
            <p className="bio">{fakeUser.bio}</p>  
        </div>
    </div>
    )
}
