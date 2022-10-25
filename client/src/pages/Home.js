import { useEffect, useState } from "react"
import { Chirps } from "../components/Chirp"
import {Heading} from "../components/Heading"
import { ChirpEditor } from "../components/ChirpEditor"

export function Home({current_user}) {
  const [chirp_ids, setChirp_ids] = useState([])
  useEffect(() => { fetch("feed").then(r=>r.json()).then(data=>{
    setChirp_ids(data)
  })}, [])

  const removeChirp = chirp_id => setChirp_ids(chirp_ids.filter(id=>id!==chirp_id))
  const addChirp = chirp_id => setChirp_ids([chirp_id, ...chirp_ids])

  return <div>
    <Heading text="Home" showBackButton={false} showChirpCount={false} />
    <ChirpEditor current_user={current_user} addChirp={addChirp} removeChirp={removeChirp}/>
    <Chirps chirp_ids={chirp_ids} current_user={current_user} addChirp={addChirp} removeChirp={removeChirp}/>
  </div>
}