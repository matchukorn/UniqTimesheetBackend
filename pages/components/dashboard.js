import React , { useEffect, useState ,useRef} from "react";
import Select from 'react-select';
import { getCookie  } from 'cookies-next';
import Service from './../api/Service';

const Dashboard = () => {

    const UseFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef,  setFocus ] 
  }

  const [group_code,setGroupCode] = useState();
  const [project_code,setProjectsGroup] = useState();
  const [depart_code,setDepartsGroup] = useState([]);
  const [activities_code,setActivitiesGroup] = useState([]);
  const [group_code_val,setGroupCodeValue] = useState();
  const [project_val,setProjectValue] = useState();
  const [depart_val,setDepartValue] = useState();
  const [checked, setChecked] = useState([]);
  const [select1Ref, setSelect1Focus] = UseFocus();
  const [select2Ref, setSelect2Focus] = UseFocus();
  const [select3Ref, setSelect3Focus] = UseFocus();

  const selGroupCode =(e)=>{
    setGroupCodeValue(e.value);  
    getProjectsGroup(e.value);  

  }

  const selProjectCode =(e)=>{
      setProjectValue(e.value);
      getDepartsGroup(group_code_val,e.value);
  }

  const selDepartCode =(e)=>{
    setDepartValue(e.value);
    getActivitiesGroup(group_code_val,project_val,e.value);
  }


  useEffect(() => {
    if (getCookie('token')) {
      getUserGroup();
    } else {
        window.location.href = "/";
    }
  }, []);

  const getUserGroup = async () => {

    await new Service().getUserGroup(getCookie('token')).then(res => {
        // console.log(res.data);
        if (res.data) {
          setGroupCode(res.data);      

        } else {
          console.log(res.data);
        }
    });

  }

const getProjectsGroup = async (group_code) => {

  await new Service().getProjectsGroup(getCookie('token'),group_code).then(res => {
    // console.log(res.data);
    if (res.data) {
        setProjectsGroup(res.data);
    } else {
      console.log(res.data);
    }
});

}


const getDepartsGroup = async (group_code,project_code) => {

  await new Service().getDepartsGroup(getCookie('token'),group_code,project_code).then(res => {
    // console.log(res.data);
    if (res.data) {
      setDepartsGroup(res.data);
    } else {
      console.log(res.data);
    }
});

}

const getActivitiesGroup = async (group_code,project_code,depart_code) => {

  await new Service().getActivitiesGroup(getCookie('token'),group_code,project_code,depart_code).then(res => {
      // console.log(res.data);
      if (res.data) {
        setActivitiesGroup(res.data);
      } else {
        console.log(res.data);
      }
  });

}

const updateActivityActive = async (group_code,project_code,depart_code,activity_code,active_code) => {

  await new Service().updateActivityActive(getCookie('token'),group_code,project_code,depart_code,activity_code,active_code).then(res => {
      
      if (res.data) {
        console.log(res.data.message);
      } else {
        console.log(res.data);
      }
  });

}



// Update Activity for active
const handleCheck = (event) => {

  var updatedList = [...checked];
  setActivityValue(event.target.value);


  if (event.target.checked) {
    updatedList = [...checked, event.target.value];
    setActiveValue(1);
    updateActivityActive(group_code_val,project_val,depart_val,event.target.value,'1');
    
  } else {
    updatedList.splice(checked.indexOf(event.target.value), 1);
    setActiveValue(0)
    updateActivityActive(group_code_val,project_val,depart_val,event.target.value,'0');

  }
  setChecked(updatedList);




};
  return (
    <>

            <div className="container-fluid">
                <div className="page-title">
                    <div className="row">
                        <div className="col-6">
                        {/* <h3>Dashboard</h3> */}
                        </div>
                        <div className="col-6">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html" data-original-title="" title="">Home</a></li>
                                <li className="breadcrumb-item active"> ตั้งค่าการเข้าใช้งาน</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>ตั้งค่าการเข้าใช้งาน</h5>
                            </div>
                            <div className="card-body">
                                <form className="needs-validation" >
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label >กลุ่ม</label>
                                            <Select 
                                            options={group_code} 
                                            onChange={(e) => {
                                                selGroupCode(e);
                                                if (e!="") setSelect2Focus();
                                                }
                                            } 
                                            ref={select1Ref}
                                            />

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label >โครงการ</label>
                                            <Select 
                                            options={project_code}  
                                            onChange={(e) => {
                                                selProjectCode(e);
                                                if (e!="") setSelect3Focus();
                                                }
                                            } 
                                            ref={select2Ref}
                                            />

                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label >แผนก</label>
                                            <Select  
                                            options={depart_code}  
                                            onChange={(e) => {
                                                selDepartCode(e);
                                                }
                                            } 
                                            ref={select3Ref}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12" >
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>รหัส</th>
                                                        <th>กิจกรรม</th>
                                                        <th className="text-center">Actived</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    activities_code.length === 0 
                                                    ?
                                                    <tr><td colSpan="3"  align="center">ไม่มีข้อมูล</td></tr>
                                                    :

                                                    activities_code.map((val) => (

                                                    <tr key={val.activity_code} >
                                                        <td >{val.activity_code}</td>
                                                        <td >{val.activity_name}</td>
                                                        <td align="center">
                                                        <input 
                                                            type="checkbox"  
                                                            value={val.activity_code} 
                                                            onChange={(e) =>handleCheck(e)} 
                                                            defaultChecked={val.active==='1' ? true : false }    
                                                        />
                                                        </td>
                                                    </tr>

                                                    ))

                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>

        
            </div>


    </>
  );

};
export default Dashboard;

