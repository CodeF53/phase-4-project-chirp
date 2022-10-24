import { Link } from "react-router-dom";

export function Header({user}) {
  // TODO: search
  // TODO: SVGs
  // TODO: logout button
  return <header className="header col">
    <Link to="/"><button>home</button></Link>
    <button>search</button>
    <button>notifications</button>
    <button>messages</button>
    <Link to={user.username}><button>profile</button></Link>
    <button>new chirp</button>
  </header>
}