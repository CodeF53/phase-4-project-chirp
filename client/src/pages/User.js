import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Chirps } from "../components/Chirp"
import { Profile} from "../components/Profile"

export function User(current_user) {
  const [chirp_ids, setChirp_ids] = useState([])
  const [user, setUser] = useState([])
  const { username } = useParams()

  useEffect(() => { fetch("users/username").then(r=>r.json()).then(data=>{
    setChirp_ids(data.chirps)
  })}, [])

  useEffect(() => { fetch("users/username").then(r=>r.json()).then(data=>{
    setUser(data.username)
  })}, [])

  return <div>
    <Profile username={user} current_user={current_user}/>
    {/* pinned chirp */}
    {/* <Chirps chirp_ids={chirp_ids}/> */}
  </div>
}