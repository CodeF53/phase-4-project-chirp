import { useEffect, useState } from "react"

export function ProfileEditor ({userData}) {
    const [profileInfo, setProfileInfo] = useState({
        'icon': "",
        'banner': "",
        'display_name':"",
        'bio': "",
        'website': "",
        'birthday': ""
    })

    
    const handleEdit = ({target:{name, value}})=>setProfileInfo(profileInfo=>({...profileInfo, [name]: value}))
    
// TODO: fix fetch 
    function patchProfile (e) {
        e.preventDefault()
        fetch(`http://localhost:3000/users/${userData.username}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(profileInfo)
          }).then(r=>{if (r.ok) { r.json().then((data) => {
            console.log('edit profile patch request', profileInfo, 'data:', data)
          })}})
    }

    return (
        <>
        <form onSubmit={patchProfile}>
            <h1>Edit Profile</h1>
            <input name="icon" placeholder="Icon image address" onChange={(e)=>handleEdit(e)}></input>
            <input name="banner" placeholder="Banner image address" onChange={(e)=>handleEdit(e)}></input>
            <input name = "display_name" placeholder="Name" onChange={(e)=>handleEdit(e)}></input>
            <input name="bio" placeholder="Bio" onChange={(e)=>handleEdit(e)}></input>
            <input name="website" placeholder="Website" onChange={(e)=>handleEdit(e)}></input>
            <input name="birthday" placeholder="Birthday" onChange={(e)=>handleEdit(e)}></input>
            <input type="submit"></input>
        </form>
        </>
    )
}