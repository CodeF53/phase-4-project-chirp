import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LargeChirp, SingleChirp } from "../components/Chirp";
import { ChirpEditor } from "../components/ChirpEditor";
import { Heading } from "../components/Heading";

export function ChirpView({ current_user }) {
  const { id } = useParams()

  const [chirp, setChirp] = useState({})
  const [reply_ids, setReply_ids] = useState([])

  const fetchChirp = ()=>{ fetch(`/chirps/${id}`).then(r=>r.json())
    .then(data=>{ setChirp(data); setReply_ids(data.reply_ids) })}
  // eslint-disable-next-line
  useEffect(() => { fetchChirp() }, [id])

  // ! temporary "live" (every 5 second) updating
  useEffect(() => {
    const interval = setInterval(fetchChirp, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  const removeChirp = chirp_id => setReply_ids(reply_ids.filter(id=>id!==chirp_id))
  const addChirp = chirp_id => setReply_ids([chirp_id, ...reply_ids])

  return <div>
    <Heading text="Chirp" showBackButton={true}/>
    {chirp.like_user_ids?
      <Fragment>
        <LargeChirp id={id} chirp={chirp} current_user={current_user} addChirp={addChirp} removeChirp={removeChirp} fetchChirp={fetchChirp}/>
        <ChirpEditor current_user={current_user} addChirp={addChirp} removeChirp={removeChirp} placeholder="Chirp your reply" reply_chirp_id={id}/>
        {reply_ids.map(reply_id=><SingleChirp key={reply_id} id={reply_id} current_user={current_user}/>)}
      </Fragment>:
      <Fragment>
        <h1>Error 404 Chirp Not Found</h1>
        <h2>The Chirp you are looking for doesn't exist</h2>
      </Fragment>
    }
  </div>

}