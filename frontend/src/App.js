
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import LoginSuccess from './components/LoginSuccess';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/Signup';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/ResetPassword';
function App() {
  console.log()
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/sign-up' element={<Signup />} />
        <Route exact path='/login-success' element={<LoginSuccess />} />
        <Route exact path='/forgot-password' element={<ForgotPassword />} />
        <Route exact path='//resetpassword/:token' element={<ResetPassword />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
