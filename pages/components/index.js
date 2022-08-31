import React , { useEffect, useState ,useRef} from "react";
import Select from 'react-select';
import { getCookie ,removeCookies } from 'cookies-next';
import Service from './../api/Service';
import Sidebar from './layouts/Sidebar';
import Dashboard from './dashboard';

const Homepage = () => {


    const [inDate,setDate] = useState();




  return (
    <>

    <div className="App">
        <div className="AppGlass">
        <Sidebar/>
        <Dashboard />

        </div>
    </div>

    
      
    </>
  );

};
export default Homepage;

