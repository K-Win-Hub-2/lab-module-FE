import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useSelector} from 'react-redux';
import SideBar from "./SideBar";
import Swal from "sweetalert2";
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

const LabServiceUpdate = (props) => {
  const url =  useSelector(state=>state.auth.url);
  const [categoryLists, setCategoryLists] = useState([]);
  const [doctorLists, setDoctorLists] = useState([]);
  const [code,setCode] = useState('');
  const [name,setName] = useState('');
  const [categoryId,setCategoryId] = useState('');
const [categoryName,setCategoryName] = useState('');
const [doctorId,setDoctorId] = useState('');
const [doctorName,setDoctorName] = useState('');
const [charges,setCharges] = useState('');
  const [isShow,setIsShow] = useState(true);
  const labid = useLocation().pathname.split('/')[2];
  const navigate = useNavigate();

  useEffect(() => {
    const getDoctorLists = async () => {
        try {
            const res = await axios.get(
                "http://centralclinicbackend.kwintechnologykw11.com:3000/api/doctors"
            );
            setDoctorLists(res.data.data.filter(item => item.selection === 'ReferDoctor'));
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: err.response.data.message,
                icon: "error",
                confirmButtonText: "CANCEL",
            })
        }
    };
    const getCategoryLists = async () => {
        try {
            const res = await axios.get(
                "http://centralclinicbackend.kwintechnologykw11.com:3000/api/categories"
            );
            setCategoryLists(res.data.data);
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: err.response.data.message,
                icon: "error",
                confirmButtonText: "CANCEL",
            })
        }
    };
    const getUpdate = async () => {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/service/"+labid
        );
        console.log('success')
        console.log(res.data);
        setCode(res.data.data.code);
        setName(res.data.data.name);
        setCategoryId(res.data.data.relatedCategory._id);       
        setCategoryName(res.data.data.relatedCategory.name); 
        setCharges(res.data.data.charges);         
      };
      getUpdate();
    getCategoryLists();
    getDoctorLists();
    
}, []);

  const save = () =>{
    const data = {
        id: labid,
        code: code,
        name: name,
        relatedCategory: categoryId,
        referDoctor: doctorId,
        charges: charges
    };
    const config = {
        headers: { "Content-Type": "application/json" },
    };
    axios
        .put(
            "http://centralclinicbackend.kwintechnologykw11.com:3000/api/service",
            data,
            config
        )
        .then(function (response) {
            Swal.fire({
                title: "Success",
                text: "successfully Registered!",
                icon: "success",
                confirmButtonText: "OK",
            })
            navigate('/lab-test');
            window.location.reload(false);
        })
        .catch(function (err) {
            Swal.fire({
                title: "Error",
                text: err.response.data.message,
                icon: "error",
                confirmButtonText: "CANCEL",
            })
        });
  }
  
  return (
    <div classNameName="App">
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className="wrapper">
        <SideBar />
        {/* <!-- Content Wrapper. Contains page content --> */}

        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
                <div className='row'>
                <div className='offset-3 col-6'>
                <div className='card'>
                     <div className='card-body'>
                     <div className='row form-group'>
            <div className='col-12'>
            <label htmlFor="">Code:</label>
            <input type="text" className='form-control' value={code} onChange={(e)=>setCode(e.target.value)}/>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Name:</label>
            <input type="text" className='form-control' value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div class="form-group">
            <label for="name">Category</label>
            <select
                class="custom-select border-info"
                name="account_type_id"
                onChange={(e) => setCategoryId(e.target.value)}>
                <option value={categoryId}>{categoryName}</option>
                {categoryLists.map((option) => (
                    <option value={option._id}>{option.name}</option>
                ))}
            </select>
        </div>

        <div class="form-group">
            <label for="name">Refer Doctor</label>
            <select
                class="custom-select border-info"
                name="account_type_id"
                onChange={(e) => setDoctorId(e.target.value)}>
                <option id={doctorId}>{doctorName}</option>
                {doctorLists.map((option) => (
                    <option value={option._id}>{option.name}</option>
                ))}
            </select>
        </div>
        <div class="form-group">
            <label for="name">Charges</label>
            <input
                type="text"
                class="form-control border-info"
                name="releatedCurrency"
                value={charges}
                onChange={(e) => setCharges(e.target.value)}
            />
        </div>
        <div className='mt-3'>
            <button className='btn btn-warning btn-m text-white' onClick={save}> 
             Update
            </button>
        </div>
        </div>
                     </div>
                </div>
                </div>
                </div>
        
        </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default LabServiceUpdate