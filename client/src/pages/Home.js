import { useEffect, useState } from "react"
import { Chirps } from "../components/Chirp"

export function Home() {
  const [chirp_ids, setChirp_ids] = useState([])
  // useEffect(() => { fetch("feed?").then(r=>r.json()).then(data=>{
  //   setChirp_ids(data)
  // })}, [])

  return <div>
    {/* the thing at the top (chirp editor) */}
    <Chirps chirp_ids={chirp_ids}/>
  </div>
}