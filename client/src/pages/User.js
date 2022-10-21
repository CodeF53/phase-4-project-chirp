import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Chirps } from "../components/Chirp"

export function User() {
  const [chirp_ids, setChirp_ids] = useState([])
  const { username } = useParams()

  // useEffect(() => { fetch("users/username").then(r=>r.json()).then(data=>{
  //   setChirp_ids(data.chirps)
  // })}, [])

  return <div>
    {/* the thing at the top (user bio) */}
    {/* pinned chirp */}
    <Chirps chirp_ids={chirp_ids}/>
  </div>
}