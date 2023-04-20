import React from "react";
import { createDate } from "../../assets/plugins/moment/src/lib/create/date-from-array";
import { Link } from "react-router-dom";
import { FaCashRegister, FaArrowLeft } from "react-icons/fa";
import Sidebar from "./SideBar";
import axios from "axios";
import { useEffect, useState } from "react";

function LabServiceRegister() {
  const [reagentLists, setReagentLists] = useState([]);
  const [supplierLists, setSupplierLists] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [supplier, setSupplier] = useState("");

  const ReagentCreate = () => {
    const data = {
      code: code,
      name: name,
      supplier:supplier,
      
    };

    alert(JSON.stringify(data));
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post("http://localhost:9000/api/reagent", data, config)
      .then(function (response) {
        alert("success");
        // setReagentLists([...reagentLists, response.data.data]);
      })
      .catch(function (err) {
        alert(err.message);
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
          "http://localhost:9000/api/suppliers?limit=30"
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

                  {/* <div className="form-group">
                    <label className="control-label">Stock Unit</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="company_contact"
                    />
                  </div> */}

                  <div className="form-group">
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
