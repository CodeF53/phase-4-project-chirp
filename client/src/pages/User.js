import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Chirps } from "../components/Chirp"
import { Profile} from "../components/Profile"
import {Heading} from "../components/Heading"

export function User({current_user}) {
  const [userData, setUserData] = useState({chirp_ids:[]})
  const { username } = useParams()

  useEffect(() => { fetch(`user/${username}`).then(r=>r.json()).then(data=>{
    setUserData(data)
  })}, [username])

  return <div>
    <Heading text={username} showBackButton={true} showChirpCount={true} chirpCount={userData.chirp_ids.length}/>
    <Profile userData={userData} current_user={current_user}/>
    {/* pinned chirp */}
    <Chirps chirp_ids={userData.chirp_ids}/>
  </div>
}