import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function CatRegister()
{
  const [categoryLists, setCategoryLists] = useState([]);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [flag, setFlag] = useState('');


  const handleDelete = (event) => {
    console.log(event, "event")
    axios.delete('http://centralclinicbackend.kwintechnologykw11.com:3000/api/category/' + event).then(response => {
      Swal.fire({
        title: "Success",
        text: "Successfully Deleted!",
        icon: "success",
        confirmButtonText: "OK"
      })
      const result = categoryLists.filter(item => item._id !== event)
      setCategoryLists(result);
    }).catch(error => {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "CANCEL",
      })
    })
  }
  

   const CategoryCreate = () => {
     const data = {
       code: code,
       name: name,
       description: description,
       flag:flag
     };

     
     const config = {
       headers: { "Content-Type": "application/json" },
     };
     axios
       .post(
         "http://centralclinicbackend.kwintechnologykw11.com:3000/api/category",
         data,
         config
       )
       .then(function (response) {
        //  alert("success");
         setCategoryLists([...categoryLists, response.data.data]);
         Swal.fire({
          title: "Success",
          text: "successfully Registered!",
          icon: "success",
          confirmButtonText: "OK",
        })
       })
       .catch(function (err) {
        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "CANCEL",
        })
       });
     document.getElementById("desc").value = "";
     document.getElementById("name").value = "";
     document.getElementById("code").value = "";
     document.getElementById("flag").value = "";

   };
  
   useEffect(() => {
     const getCategory = async () => {
       try {
         const res = await axios.get(
           "http://centralclinicbackend.kwintechnologykw11.com:3000/api/categories?limit=30"
         );

         setCategoryLists(res.data.data);
       } catch (err) {}
     };
     getCategory();
   }, []);
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
              <div className="row mb-2">
                <div className="col-sm-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Lab Service Category
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
                <div class="row">
                  <div class="col-md-9 py-3 card">
                    <div class="table-responsive text-black" id="slimtest2">
                      <table class="table table-hover" id="filter_date">
                        <thead class="bg-info text-white">
                          <tr>
                            <th>No.</th>
                            <th>Code</th>

                            <th>Name</th>

                            <th>Description</th>

                            <th>Flag</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>

                        {categoryLists.map((cat, i) => (
                          <tbody className="">
                            <tr>
                              <td>{++i}</td>
                              <td>{cat.code}</td>
                              <td>{cat.name}</td>

                              <td>{cat.description}</td>

                              <td>{cat.flag }</td>

                              <td className="text-center">
                                <button className="btn btn-sm btn-warning text-white">
                                  Update
                                </button>
                                &nbsp;
                                <button className="btn btn-sm btn-danger" role="" onClick={(e)=> handleDelete(cat._id)}>
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card px-3 py-3">
                      <h5 className="card-header mb-4 fw-5 text-secondary">
                        Create Category
                      </h5>

                      <div class="form-group">
                        <label for="code" className="text-secondary">
                          Code
                        </label>
                        <input
                          type="text"
                          id="code"
                          class="form-control border-info"
                          name="code"
                          //   ref={(el) => (this.name = el)}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="name" className="text-secondary">
                          Name
                        </label>
                        <input
                          type="text"
                          class="form-control border-info"
                          name="name"
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
                          id="desc"
                          //   ref={(el) => (this.description = el)}
                          onChange={(e) =>
                            setDescription(e.target.value)
                          }></textarea>
                      </div>
                      <div class="form-group">
                        <label for="name" className="text-secondary">
                          Flag
                        </label>
                        <select
                          class="custom-select border-info"
                          name="account_type_id"
                          id="flag"
                          onChange={(e) => setFlag(e.target.value)}
                        >
                          <option></option>
                          <option value="Service">Service</option>
                          <option value="Reagent">Reagent</option>
                        
                        </select>
                        
                      </div>
                      <button
                        className="btn btn-primary form-control text-center fw-5"
                        type="submit"
                        onClick={CategoryCreate}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* <ExpenseDialog
                open={open}
                close={() => setOpen(false)}
                expenseLists={expenseLists}
                setExpenseLists={setExpenseLists}
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
export default CatRegister;