import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { LoginSignup } from './pages/LoginSignup';
import { User } from './pages/User';

function App() {
  // persistent user through local storage
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem("isDarkMode")))
  useEffect(() => { localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  if (isDarkMode === null) setIsDarkMode(false)

  // persistent user through local storage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  useEffect(() => { localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  // auto-login (incase cookie expired or something)
  useEffect(() => {fetch("/me").then((r) => {
    if (r.ok) { r.json().then((user) => setUser(user)); }
    else { setUser(null) }
  });}, []);


  if (!user) {
    return <Routes>
      {/* route user to login if url is login */}
      <Route className={isDarkMode?"dark":""} path="/login" element={<LoginSignup isLogin={true}  user={user} setUser={setUser} />} />
      {/* but default to always directing to signup */}
      <Route className={isDarkMode?"dark":""} path="*"      element={<LoginSignup isLogin={false} user={user} setUser={setUser} />} />
    </Routes>
  }

  // if (user.followed_accounts == 0)
  //   "find people"

  // TODO: individual chirp view
  // TODO: find people view
  return (
    <div className={`App row ${isDarkMode?"dark":""}`} >
      <Header user={user}/>

      <Routes>
        <Route path="/" element={<Home current_user={user}/>}/>
        <Route path="/:username" element={<User current_user={user}/>}/>
      </Routes>
    </div>
  );
}

export default App;
