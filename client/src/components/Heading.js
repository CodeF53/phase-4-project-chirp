import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import '../style/heading.css';

export function Heading ({userData}) {
    let path = useParams();
    
    if (path.username)
        return (
        <div className="heading_container">
                <h1 className="display_name">{userData.display_name} +</h1>
                <p>99 chirps</p>
        </div>
        )
    else
        return (
            <div>
                <h1>add a back button</h1>
            </div>
        )
}