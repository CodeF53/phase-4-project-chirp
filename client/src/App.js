import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginSignup } from './pages/LoginSignup';

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
    <div className="App">
    </div>
  );
}

export default App;
