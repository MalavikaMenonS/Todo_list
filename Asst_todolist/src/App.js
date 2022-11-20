import SigninForm from "./components/signinform/Signinform";
// import { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Searchbar from "./components/searchbar/searchbar";
import Signupform from "./components/SignUpForm/Signupform";
import { useState } from "react";

window.addEventListener("storage",()=>{
  window.localStorage.clear()
  window.location.reload()
})

export const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <div>Not having Access</div>;
  }
  return children;
};

function App() {
  const [authorize, setAuthorize] = useState(
    JSON.parse(localStorage.getItem("authorize")) || false
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signupform />} />
          <Route
            path="/signin"
            element={<SigninForm setAuthorize={setAuthorize} />}
          />
          <Route
            path="/*"
            element={
              <ProtectedRoute isAuthenticated={authorize}>
                <Searchbar />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* </context.Provider>  */}
    </div>
  );
}

export default App;
