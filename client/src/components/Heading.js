import { Fragment } from "react";
import { Link } from "react-router-dom";
import '../style/heading.css';

export function Heading ({text, showBackButton, showChirpCount, chirpCount}) {
  return <div className="heading row">
    {showBackButton? <Link to="/"><button>back</button></Link>:null}
    <div className="heading_text col">
      {showChirpCount? <Fragment>
        <h1 className="display_name">{text}</h1>
        <h3>{chirpCount} chirps</h3>
      </Fragment>:<h1>{text}</h1>}
    </div>
  </div>
}