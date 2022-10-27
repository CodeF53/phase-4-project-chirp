import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Chirps } from "../components/Chirp"
import { Profile} from "../components/Profile"
import { Heading } from "../components/Heading"

export function User({current_user}) {
  const [userData, setUserData] = useState({chirp_ids:[], follower_ids:[], followed_user_ids: []})
  const { username } = useParams()

  const fetchUserData = ()=> fetch(`/user/${username}`)
    .then(r=>r.json()).then(data=>{ setUserData(data) })
  // eslint-disable-next-line
  useEffect(() => { fetchUserData() }, [username])

  // ! temporary "live" (every 5 second) updating
  useEffect(() => {
    const interval = setInterval(fetchUserData, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return <div>
    <Heading text={username} showBackButton={true} showChirpCount={true} chirpCount={userData.chirp_ids.length}/>
    <Profile userData={userData} current_user={current_user} fetchUserData={fetchUserData}/>
    <Chirps chirp_ids={userData.chirp_ids} current_user={current_user}/>
  </div>
}