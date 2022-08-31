import React, { useState , useEffect } from "react";
import {  removeCookies } from 'cookies-next';
import Image from 'next/image';
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Logo from './../../../public/logouniq.png';

const Sidebar = () => {
 
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);
  const [display, setdisplay] = useState();

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }

  useEffect(() => {
    if (window.innerWidth<=768) {
        setdisplay('expanded');
      } else {
        setdisplay();
      }
    }, []);

  


    

  const logOut = () => {
      Swal.fire({
          title: 'ต้องการออกระบบหรือไม่ ?',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'ยกเลิก',
          confirmButtonText: 'ตกลง'
      }).then((result) => {
          if (result.isConfirmed) {
              removeCookies('token', { path: '/', domain: '' }); //report.tvothai.com
              localStorage.clear();
              window.location.assign('/');
          }
      });
  }



  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={display}
    >
      {/* logo */}
      <div className="logo">
        <Image src={Logo} alt="logo" width={90} height={110} />
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem SignOut" onClick={logOut}>
          <UilSignOutAlt />
          <span>ออกจากระบบ</span>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
