import { useEffect, useState } from "react"
import { Chirps } from "../components/Chirp"
import {Heading} from "../components/Heading"
import { ChirpEditor } from "../components/ChirpEditor"

export function Home({current_user}) {
  const [chirp_ids, setChirp_ids] = useState([])
  useEffect(() => { fetch("feed").then(r=>r.json()).then(data=>{
    setChirp_ids(data)
  })}, [])

  return <div className="chirpWidth">
    <Heading text="Home" showBackButton={false} showChirpCount={false} />
    <ChirpEditor current_user={current_user} addChirp={(chirp_id)=>{setChirp_ids([chirp_id, ...chirp_ids])}}/>
    <Chirps chirp_ids={chirp_ids}/>
  </div>
}