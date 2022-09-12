import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Addcourse from './components/Course/Addcourse/Addcourse';
import Managecourses from './components/Course/Managecourses/Managecourses';
import EditCourse from './components/Course/Manage_Course_Video/EditCourse';
import ShowVideos from './components/Course/Manage_Course_Video/ShowVideos';
import Addvideo from './components/Course/Manage_Course_Video/Addvideo';
import Manageusers from './components/Manageusers/Manageusers';
import Pendingkyc from './components/Manageusers/Kycpending';
import EditCourseVideo from './components/Course/Manage_Course_Video/EditCourseVideo';
import Webinar from './components/Events/Webinar';
import Training from './components/Events/Training';
import Offer from './components/Events/Offer';
import MarketingTools from './components/Events/MarketingTools';
import EditUserpage from './components/Manageusers/EditUserpage';
import Kycuser from './components/Manageusers/Kycuser';
import Homecarousel from './components/Events/Homecarousel';
import Contact from './components/Contact/Contact';
import Payments from './components/Payments/Payments';
import Login from './components/login/Login';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Payto from './components/Payments/Payto';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/addcourse' element={<Addcourse />} />
        <Route path='/managecourses' element={<Managecourses />} />
        <Route path='manageusers' element={<Manageusers />} />
        <Route path='/editcourse/:cid' element={<EditCourse />} />
        <Route path='/showvideos/:cid' element={<ShowVideos />} />
        <Route path='/addvideo/:cid' element={<Addvideo />} />
        <Route path='/kycstatus' element={<Pendingkyc />} />
        <Route path='/editvideo/:cid/:vid' element={<EditCourseVideo />} />
        <Route path='/webinars' element={<Webinar />} />
        <Route path='/training' element={<Training />} />
        <Route path='/offer' element={<Offer />} />
        <Route path='/marketingtools' element={<MarketingTools />} />
        <Route path='/homecarousel' element={<Homecarousel />} />
        <Route path='/edituserdetails/:uid' element={<EditUserpage />} />
        <Route path='/userkyc/:userid' element={<Kycuser />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/payments' element={<Payments />} />
        <Route path='/login' element={<Login />} />
        <Route path='/payto/:uemail' element={<Payto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
