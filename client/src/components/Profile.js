import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../style/profile.css';

export function Profile ({username, current_user}) {
    const [user, setUser] = useState({ username:"", icon:"", banner:"", display_name:"", bio:"", website:"", birthday: 0, pinned_chirp_id: 0  })

    useEffect(() => {
        fetch(`users/${username}`).then(r=>r.json())
        .then(data=>{setUser(data)}
        )
    }, [])

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

    
// if current_user.username == user.username, show edit button //
    return (
    <div className={`profile  userID_${user.id}`}>
            <h1>{fakeUser.display_name}</h1>
        <div className="banner_container">
            <img src={fakeUser.banner} alt={`${fakeUser.display_name}'s banner`}/>
        </div>
        <div className="profile_icon_container">
            <img src={fakeUser.icon} alt={`${fakeUser.display_name}'s icon`}/>
        </div>
            <h1>{fakeUser.display_name}</h1>
            <h2>@{fakeUser.username}</h2>
            <p>{fakeUser.bio}</p>
            <button>Follow</button>
    </div>
    )
}
