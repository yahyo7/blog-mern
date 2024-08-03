import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Header from "./components/Header";
import FooterComponent from "./components/Footer";
import { PrivateRoute } from "./components/PrivateRoute";
import { OnlyAdminPrivateRoute } from "./components/OnlyAdminPrivateRoute";
import { CreatePost } from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import Post from "./pages/Post";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/post/:postSlug" element={<Post />} />
        
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
