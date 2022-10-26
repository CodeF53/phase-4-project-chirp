import { Fragment, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function LoginSignup({ user, setUser, isLogin }) {
  const navigate = useNavigate()
  if (user) navigate("/")

  const [username, setUsername]   = useState("")
  const [password, setPassword]   = useState("")
  const [errorText, setErrorText] = useState("")
  const [icon, setIcon] = useState(null)
  const [banner, setBanner] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()

    if (username.length===0) { setErrorText("Username must be filled"); return; }
    else if (password.length<6) { setErrorText("Password must be at least 6 characters in length"); return; }
    else { setErrorText("") }

    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    if (icon)   formData.append('icon', icon, icon.name)
    if (banner) formData.append('banner', banner, banner.name)

    fetch(isLogin?"/login":"/signup", {
      method: "POST",
      body: formData
    }).then(r=>{ if (r.ok) { r.json().then(user=>{
      setUser(user) // save user details
      navigate("/") // send user back to home
    })} else {
      r.json().then(({errors})=>{
        setErrorText(errors[0])
      })
    }})
  }

  let errorNode = errorText.length===0? null: (<span className="centered" style={{color:"red", textAlign:"center"}}>{errorText}</span>)

  // TODO: profile picture upload
  return (
    <div className="col">
      <form onSubmit={handleSubmit} className="login centered col" id="log-form">
        <h1>{isLogin? "Log In": "Sign Up"}</h1>
        <input onChange={(e)=>{setUsername(e.target.value)}} value={username} placeholder="username" type="text"/>
        <input onChange={(e)=>{setPassword(e.target.value)}} value={password} placeholder="password" type="password"/>

        {!isLogin && <div className="images col">
          <div className="row">
            <label htmlFor="icon-input">Icon:</label>
            <div className="spacer"/>
            <input id="icon-input" type="file" accept="image/*" onChange={e=>setIcon(e.target.files[0])}/>
          </div>
          <div className="row">
            <label htmlFor="banner-input">Banner:</label>
            <div className="spacer"/>
            <input id="banner-input" type="file" accept="image/*" onChange={e=>setBanner(e.target.files[0])}/>
          </div>
        </div>}
        {<span className="errorText">{errorText}</span>}

        <div className="row centerChildren">
          <button className="centered" type="submit">Submit</button>
          <div className="spacer"/>
          <span className="centered">{isLogin? "New?":"Not New?"} <Link className="link" style={{textDecoration:"underline"}} to={isLogin? "/signup":"/login"}>{isLogin? "Sign Up":"Log In"}</Link></span>
        </div>
      </form>
      {errorNode}
    </div>
  )
}