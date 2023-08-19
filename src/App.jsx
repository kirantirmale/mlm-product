import './App.css';
import { useState } from 'react';
import Product from './components/Product';
import Login from './components/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';

function App() {
  const [isLogin, setisLogin] = useState(localStorage.getItem('token'));
  // console.log("isLogin",isLogin)
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            {
              // isLogin == null ?
              //   <>
              //     <Route path="/" element={<Navigate to="/login" />}></Route>
              //     <Route path="/login" element={<Login />}></Route>
              //     <Route path="*" element={<Navigate to="/login" />}></Route>
              //     <Route path="/signup" element={<Signup />}></Route>
              //   </>
              //   :
              //   <>
              //     {/* <Route element={<Product />}></Route> */}
              //     <Route path="/" element={<Navigate to="/product" />}></Route>
              //     <Route path="/product" element={<Product />}></Route>
              //     <Route path="*" element={<Navigate to="/product" />}></Route>

              //   </>
            }
            <Route path="/" element={<Navigate to="/login" />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<Navigate to="/login" />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/" element={<Navigate to="/product" />}></Route>
            <Route path="/product" element={<Product />}></Route>
            <Route path="*" element={<Navigate to="/product" />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
