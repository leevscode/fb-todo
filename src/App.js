import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";

function App() {
  // console.log("App 랜더링");
  // 추후에 Redux/Recoil state 로 관리 필요
  const [fbName, setFBName] = useState("");
  const [fbEmail, setFBEmail] = useState("");
  const [fbUid, setFBUid] = useState("");

  return (
    <div className="w-screen h-screen bg-blue-300 overflow-x-hidden">
      <Header 
      fbName={fbName} 
      fbEmail={fbEmail} 
      fbUid={fbUid} 
      setFBName={setFBName}
      setFBEmail={setFBEmail}
      setFBUid={setFBUid}
      />
      <div className="container mx-auto h-full">
        <Routes>
          {/* Navigate 를 이용한 강제 이동 */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={
              <Login
                setFBName={setFBName}
                setFBEmail={setFBEmail}
                setFBUid={setFBUid}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage 
           fbName={fbName} 
           fbEmail={fbEmail} 
           fbUid={fbUid} 
           setFBName={setFBName}
           setFBEmail={setFBEmail}
           setFBuid={setFBUid}/>} />
          <Route path="/todo" element={<Todo fbName={fbName} fbEmail={fbEmail} fbUid={fbUid}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
