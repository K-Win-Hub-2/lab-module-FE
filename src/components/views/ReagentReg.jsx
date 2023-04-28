import React from "react";

import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Sidebar from "./SideBar";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function LabServiceRegister() {
  const [stockUnitTemp, setStockUnitTemp] = useState("");
  const [stockLists, setStockLists] = useState([]);
  const [supplierLists, setSupplierLists] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [supplier, setSupplier] = useState("");

  const handleBox = (event) => {
    let newStock = {
      id: stockUnitTemp.split(".")[0],
      name: stockUnitTemp.split(".")[1],
      amount: 0,
    };
    setStockLists([...stockLists, newStock]);
   
  };

  const ReagentCreate = () => {
    const data = {
      code: code,
      name: name,
      stockUnit: stockLists,
      supplier: supplier,
    };

    // alert(JSON.stringify(data));
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/reagent",
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
      })
      .catch(function (err) {
        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "CANCEL",
        })
      });
    document.getElementById("supplier").value = "";
    document.getElementById("name").value = "";
    document.getElementById("code").value = "";
    // document.getElementById("flag").value = "";
  };

  useEffect(() => {
    const getSupplier = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/suppliers?limit=30"
        );

        setSupplierLists(res.data.data);
      } catch (err) {}
    };
    getSupplier();
  }, []);
  return (
    <div classNameName="App">
      <div className="wrapper">
        <Sidebar />
        {/* <!-- Content Wrapper. Contains page content --> */}
        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/reagent">
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active mt-1">
                      Reagent Register
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}
          <section className="content">
            <div className="container-fluid">
              {/* <!-- Small boxes (Stat box) --> */}
              <div class="card">
                <div class="card-body p-b-0">
                  <div className="form-group">
                    <label className="control-label">Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company_name"
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="control-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company_address"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* <div className="col-md-12">
                    <label className="control-label">Stock Unit</label>
                    <div className="row">
                      <div className="col-md-10">
                        <select
                          class="custom-select border-info"
                          name="account_type_id"
                          id="flag"
                          onChange={(e) => {
                            setStockUnitTemp(e.target.value);
                          }}>
                          <option value="">Choose Stock</option>
                          {stockLists.map((option) => (
                            <option value={option._id + "." + option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-2">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={(e) => handleBox(e.target.value)}>
                          <i class="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    {stockLists ? (
                      <div>
                        {stockLists.map((regArr) => (
                          <div className="row mt-3">
                            <div className="col-md-5">
                              <input
                                type="text"
                                value={regArr.name}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-5">
                              <input
                                type="text"
                                defaultValue={0}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-2">
                              <button className="btn btn-sm btn-danger rounded-circle opacity-75">
                                <FaMinus />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div> */}

                  <div className="form-group mt-3">
                    <label className="control-label">Supplier</label>
                    <select
                      name="currency"
                      id="supplier"
                      className="form-control mt-1"
                      onchange="convert(this.value)"
                      onChange={(e) => setSupplier(e.target.value)}>
                      <option value="">Choose Supplier</option>
                      {supplierLists.map((option) => (
                        <option value={option._id}>{option.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* <div className="form-group">
                    <label className="control-label">Purchase Price</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="md_name"
                    />
                  </div> */}

                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className=" col-md-9">
                          <button
                            type="submit"
                            onClick={ReagentCreate}
                            className="btn btn-primary">
                            Create
                          </button>
                          &nbsp;
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- /.row (main row) --> */}

            {/*<!-- /.container-fluid --> */}
          </section>
          {/* <!-- /.content --> */}
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
        <aside className="control-sidebar control-sidebar-dark">
          {/* <!-- Control sidebar content goes here --> */}
        </aside>
        {/* <!-- /.control-sidebar --> */}
      </div>
      {/* <!-- ./wrapper --> */}
    </div>
  );
}
export default LabServiceRegister;
