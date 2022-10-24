import { useEffect, useState } from "react"
import { LabelledInput } from "./LabelledInput"

export function ProfileEditor ({userData, toggleEdit}) {
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
        fetch(`http://localhost:3000/${userData.username}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(profileInfo)
          }).then(r=>{if (r.ok) { r.json().then((data) => {
            toggleEdit()
          })}})
    }

    return (
        <>
        
        <form onSubmit={patchProfile} width='35rem'>
            <h1>Edit Profile</h1>
            <LabelledInput name="icon" label="Icon image address" onChange={(e)=>handleEdit(e)}/>
            <br></br>
            <LabelledInput name="banner" label="Banner image address" onChange={(e)=>handleEdit(e)}/>
            <br></br>
            <LabelledInput name = "display_name" label={userData.display_name == null || userData.username ? "What should other chirpers call you?" : userData.display_name} onChange={(e)=>handleEdit(e)}/>
            <br></br>
            <LabelledInput name="bio" label={userData.bio == null ? "Tell the world about yourself" : userData.bio} value={userData.bio} onChange={(e)=>handleEdit(e)}/>
            <br></br>
            <LabelledInput name="website" label={userData.website == null ? "Enter a website" : userData.website} onChange={(e)=>handleEdit(e)}/>
            <br></br>
            <LabelledInput name="birthday" label={userData.birthday == null ? "Enter your birthday" : userData.birthday} onChange={(e)=>handleEdit(e)}/>
            <br></br>
            <LabelledInput type="submit"/>
            <br></br>
        </form>
        </>
    )
}