import { Fragment } from "react";
import { Link } from "react-router-dom";
import '../style/heading.css';

import {ReactComponent as BackSvg} from '../assets/back.svg';

export function Heading ({text, showBackButton, showChirpCount, chirpCount}) {
  return <div className="heading row centerChildren">
    {showBackButton? <Link to="/"><button><BackSvg/></button></Link>:null}
    <div className="heading_text col">
      {showChirpCount? <Fragment>
        <h1 className="display_name">{text}</h1>
        <h3>{chirpCount} Chirps</h3>
      </Fragment>:<h1>{text}</h1>}
    </div>
  </div>
}