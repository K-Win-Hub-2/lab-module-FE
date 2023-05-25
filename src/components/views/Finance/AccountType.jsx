/* eslint-disable */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";
import useCollapse from "react-collapsed";
// import AccTypeUpdate from '../views/AccTypeUpdate';
import Swal from "sweetalert2";
import {
  FaRegEdit,
  FaRegTrashAlt
} from "react-icons/fa";

function Dashboard()
{
  
  const [isExpanded, setExpanded] = useState(false);
  const [isAccData, setAccData] = useState(false);

   const [updateDialog, setUpdateDialog] = useState(false);
   const [id, setId] = useState("");
  //  const showUpdate = (val) => {
  //    setId(val);
  //    setUpdateDialog(true);
  //  };

  // const handleAdminChange = () => {
  //   setExpanded(!isExpanded);
  // };

  // const handleAccChange = () => {
  //   setAccData(!isAccData);
  // };
  const [accountType, setAccountType] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showUpdate, setShowUpdate] = useState(false)
  const [upCode, setUpCode] = useState("");
  const [upName, setUpName] = useState("");
  const [upDesc, setUpDesc] = useState("");


  const handleUpdate = event => {
    console.log(event, 'event')
    const getAccTypeUpdate = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-type/' +
            event
        )
        console.log(res.data)
        // setUpCode(res.data.data[0].code)
         setUpName(res.data.data[0].name)
         setUpDesc(res.data.data[0].description)
      } catch (err) {}
    }
    getAccTypeUpdate()
   setShowUpdate(true)
    setId(event)
  }

  const AccountTypeUpdate = () => {
    const data = {
      id: id,
      name: upName,
      description: upDesc
    }

    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    axios
      .put(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-type',
        data,
        config
      )
      .then(function (response) {
        Swal.fire({
          title: 'Successful!',
          text: 'Successfully Updated',
          icon: 'success',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })

        setAccountType(
          accountType.map(type => {
            if (type._id === response.data.data._id) {
              return response.data.data
            } else {
              return type
            }
          })
        )
      })
      .catch(function (err) {
        Swal.fire({
          title: 'Something Wrong!',
          text: 'Try again, Please.',
          icon: 'warning',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })
      })
    document.getElementById('updesc').value = ''
    document.getElementById('upname').value = ''
    setShowUpdate(false)
  }

  const AccountTypeCreate = () => {
    const data = {
      name: name,
      code: code,
      description: description,
    };
    // alert(JSON.stringify(data));
    console.log(data);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-type",
        data,
        config
      )
      .then(function (response) {
        Swal.fire({
          title: 'Successful!',
          text: 'Successfully Updated',
          icon: 'success',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })
        setAccountType([...accountType, response.data.data]);
      })
      .catch(function (err) {
        Swal.fire({
          title: 'Something Wrong!',
          text: 'Try again, Please.',
          icon: 'warning',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })
      });
    document.getElementById("description").value = "";
    document.getElementById("name").value = "";
    //      props.setOpen(false);
  };

const handleDelete = (event) => {
  axios
    .delete(
      "http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-type/" +
        event
    )
    .then((response) => {
      Swal.fire({
        title: "Success",
        text: "Successfully Deleted!",
        icon: "success",
        confirmButtonText: "OK",
      });
      const result = accountType.filter((item) => item._id !== event);
      setAccountType(result);
    })
    .catch((error) => {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "CANCEL",
      });
    });
};



  useEffect(() => {
    const getAccountType = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-types?limit=30"
        );

        setAccountType(res.data.list);
      } catch (err) {}
    };
    getAccountType();
  }, []);
  return (
    <div classNameName="App">
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className="wrapper">
        {/* <!-- Navbar --> */}

        {/* <!-- /.navbar --> */}

        {/* <!-- Main Sidebar Container --> */}
        <SideBar />

        {/* <!-- Content Wrapper. Contains page content --> */}

        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <ol className="breadcrumb">
                    {/* <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li> */}
                    <li className="breadcrumb-item active">
                      Account Type List
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-9">
                  <div className="card">
                    <div className="card-header">
                      {/* <h3 className="card-title">Cost Center List</h3> */}
                    </div>
                    <div className="card-body">
                      <table id="example1" className="table">
                        <thead className="text-center bg-info">
                          <tr>
                            <th>No</th>

                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        {accountType.map((accType, i) => (
                          <tbody className="">
                            <tr>
                              <td>{++i}</td>

                              <td>{accType.name}</td>
                              <td>{accType.description}</td>
                              <td className="text-center">
                                {/* <button
                                  type="button"
                                  onClick={() => showUpdate(accType._id)}
                                  class="btn btn-warning btn-sm ml-2">
                                  Update
                                </button> */}
                                <button
                                  className='btn btn-sm btn-warning'
                                  onClick={e => handleUpdate(accType._id)}
                                >
                                  <FaRegEdit />
                                </button>
                                &nbsp;
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={(e)=>handleDelete(accType._id)}>
                                 <FaRegTrashAlt />
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>

                {showUpdate ?( <div className="col-md-3" style={{ Position: 'sticky' }}>
                  <div className="card px-3 py-3">
                    <h5 className="card-header mb-4 fw-5 text-secondary">
                     Update Account Types
                    </h5>
                    <div class="form-group">
                      <label for="name" className="text-secondary">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control border-info"
                        name="balance"
                        id="upname"
                        defaultValue={upName}
                        //   ref={(el) => (this.name = el)}
                        onChange={(e) => setUpName(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <label for="name" className="text-secondary">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="updesc"
                        defaultValue={upDesc}
                        //   ref={(el) => (this.description = el)}
                        onChange={(e) =>
                          setUpDesc(e.target.value)
                        }></textarea>
                    </div>
                    <button
                      className="btn btn-primary form-control text-center fw-5"
                      onClick={AccountTypeUpdate}>
                      Update
                    </button>
                  </div>
                </div>) :(
                <div className="col-md-3">
                  <div className="card px-3 py-3">
                    <h5 className="card-header mb-4 fw-5 text-secondary">
                      Create Acc Types
                    </h5>
                    <div class="form-group">
                      <label for="name" className="text-secondary">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control border-info"
                        name="balance"
                        id="name"
                        //   ref={(el) => (this.name = el)}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <label for="name" className="text-secondary">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        //   ref={(el) => (this.description = el)}
                        onChange={(e) =>
                          setDescription(e.target.value)
                        }></textarea>
                    </div>
                    <button
                      className="btn btn-primary form-control text-center fw-5"
                      onClick={AccountTypeCreate}>
                      Save
                    </button>
                  </div>
                </div>
                )}
              </div>
              {/* <AccTypeUpdate
                updateDialog={updateDialog}
                close={() => setUpdateDialog(false)}
                setUpdateDialog={setUpdateDialog}
                id={id}
                setAccountType={setAccountType}
                accountType={accountType}
              /> */}
            </div>
            {/*<!-- /.container-fluid --> */}
          </section>
        </div>
      </div>

      {/* <!-- /.content-wrapper --> */}
      <footer className="main-footer">
        <strong>
          Copyright &copy; 2017-2020{" "}
          <a href="http://www.kwintechnologies.com">K-win Technology</a>.
        </strong>
        All rights reserved.
      </footer>

      {/* <!-- Control Sidebar --> */}
      <aside classNameName="control-sidebar control-sidebar-dark">
        {/* <!-- Control sidebar content goes here --> */}
      </aside>
      {/* <!-- /.control-sidebar --> */}

      {/* <!-- ./wrapper --> */}
    </div>
  );
}
export default Dashboard;
