import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Chirps } from "../components/Chirp"
import { Profile} from "../components/Profile"
import { ProfileEditor} from "../components/ProfileEditor"
import {Heading} from "../components/Heading"

export function User({current_user}) {
  const [userData, setUserData] = useState({chirp_ids:[]})
  const { username } = useParams()

  useEffect(() => { fetch(`user/${username}`).then(r=>r.json()).then(data=>{
    setUserData(data)
  })}, [username])
  
  return <div>
    <Heading userData={userData}/>
    <Profile userData={userData} current_user={current_user}/>
    <ProfileEditor userData={userData} />
    <Chirps chirp_ids={userData.chirp_ids}/>
  </div>
}