import { Route, Routes } from "react-router-dom";
import Signup from "./AuthPages/Signup";
import PostListScreen from "./Posts/PostsPage";
import PasswordReset from "./Posts/ResetPass";


function App() {
  return (
    <div>
    <Routes>


      <Route path="/"  element={<Signup />}/>
      <Route path="/posts"  element={<PostListScreen />}/>
      <Route path="/passwordreset"  element={<PasswordReset />}/>
    </Routes>
    </div>
  );
}

export default App;
