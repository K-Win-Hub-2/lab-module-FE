import React from "react";
import { createDate } from "../../assets/plugins/moment/src/lib/create/date-from-array";
import { Link } from "react-router-dom";
import { FaCashRegister, FaArrowLeft, FaMinus } from "react-icons/fa";
import Sidebar from "./SideBar";
import axios from "axios";
import { useEffect, useState } from "react";

function LabServiceRegister() {
  const [stockUnitTemp, setStockUnitTemp] = useState("");
  const [stockUnit, setStockUnit] = useState([]);
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
    console.log(stockLists, "stockLists", newStock);
  };

  const ReagentCreate = () => {
    const data = {
      code: code,
      name: name,
      stockUnit: stockLists,
      supplier: supplier,
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
                    <li className="breadcrumb-item active mt-1">Test</li>
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
                <h4 className="text-center mt-3">Test Result</h4>
                <div class="card-body p-b-0">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">Voucher Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name="company_name"
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">Voucher Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="company_name"
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">Patient Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="company_name"
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">Refer Doctor</label>
                        <input
                          type="text"
                          className="form-control"
                          name="company_name"
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">Patient Code</label>
                        <input type="text" className="form-control"></input>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="control-label">
                          Test Result List
                        </label>{" "}
                        &nbsp; &nbsp;
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
                            <div className="col-md-3">
                              <label>Name</label>
                              <input
                                type="text"
                                value={regArr.name}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-3">
                              <label>Result</label>
                              <input
                                type="text"
                                defaultValue={0}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-3">
                              <label>Nominal Value</label>
                              <input
                                type="text"
                                defaultValue={0}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-3">
                              <label>Unit</label>
                              <input
                                type="text"
                                defaultValue={0}
                                className="form-control"
                              />
                            </div>
                            {/* <div className="col-md-2">
                              <button className="btn btn-sm btn-danger rounded-circle opacity-75">
                                <FaMinus />
                              </button>
                            </div> */}
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="row mt-5">
                    <div className="col-md-9">
            
                          <button
                            type="submit"
                            onClick={ReagentCreate}
                            className="btn btn-primary">
                            Finish
                          </button>
                          &nbsp;
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal">
                            Cancel
                          </button>
                        
                    </div>
                    <div className="col-md-3">
                      <button type="submit" className="btn btn-warning">
                        Save Draft
                      </button>
                      &nbsp;
                      <button type="submit" className="btn btn-secondary">
                        Print
                      </button>
                      &nbsp;
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
