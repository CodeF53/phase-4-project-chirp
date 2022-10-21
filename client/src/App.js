import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { LoginSignup } from './pages/LoginSignup';
import { User } from './pages/User';

function App() {
  const [user, setUser] = useState(null)
  // auto-login
  useEffect(() => {fetch("/me").then((r) => { if (r.ok) {
    r.json().then((user) => setUser(user));
  }});}, []);

  if (!user) {
    return <Routes>
      {/* route user to login if url is login */}
      <Route path="/login" element={<LoginSignup isLogin={true}  user={user} setUser={setUser} />} />
      {/* but default to always directing to signup */}
      <Route path="*"      element={<LoginSignup isLogin={false} user={user} setUser={setUser} />} />
    </Routes>
  }

  // if (user.followed_accounts == 0)
  //   "find people"

  return (
    <div className="App row">
      <Header user={user}/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:username" element={<User/>} user={user}/>
      </Routes>
    </div>
  );
}

export default App;
