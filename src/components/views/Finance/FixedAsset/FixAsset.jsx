/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCashRegister, FaFileMedical } from "react-icons/fa";
import axios from "axios";
import SideBar from "../../SideBar";
import SellEndDialog from "../FixedAsset/SellEndDialog";

function FixedAsset() {
  const [open, setOpen] = useState(false);
  const [fixedAssetLists, setFixedAssetLists] = useState([]);
  const [id, setId] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [relatedLists, setRelatedLists] = useState([]);
  
  useEffect(() => {
    const getFixedAsset = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/fixed-assets"
        );

        setFixedAssetLists(res.data.list);
      } catch (err) {}
    };

    getFixedAsset();
  }, []);

  const handleTransactionShow = (val) => {
    console.log(val);
    const getRelated = async () => {
      try {
        console.log(val);
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/transactions/related/" +
            val
        );

        console.log(res);
        setRelatedLists(res.data.data);
      } catch (err) {}
    };

    getRelated();

    if (isShow) {
      document.getElementById("toggle" + val).removeAttribute("hidden");
    } else {
      document.getElementById("toggle" + val).setAttribute("hidden", "hidden");
    }
    setIsShow(!isShow);
  };

  const showDialog = (val) => {
    setOpen(true);
    setId(val);
  };

  return (
    <div classNameName="App">
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className="wrapper">
        {/* <!-- Navbar --> */}

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
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Fix Asset List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className="content">
            <div className="container-fluid">
              <div className="card">
                <div className="card-body p-b-0">
                  {/* <label className="">Fixed Asset List</label> */}
                  <Link
                    to="/add-asset"
                    className="float-right btn btn-primary mb-3">
                    <i className="fas fa-plus"></i>
                    Add Asset
                  </Link>

                  <table className="table table-striped text-black">
                    <thead className="bg-info text-white">
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>Initial Price</th>
                        <th>Salvage Value</th>
                        {/* {{-- <th>Current Value</th> --}} */}
                        <th>Depreciate Total</th>
                        <th>Used Life</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    {fixedAssetLists.map((fixedAsset, i) => (
                      <tbody>
                        <tr>
                          <td>{++i}</td>
                          <td>{fixedAsset.name}</td>
                          <td>{fixedAsset.startDate.split("T")[0]}</td>
                          <td>{fixedAsset.initialPrice} </td>
                          <td>{fixedAsset.salvageValue}</td>
                          <td>
                            {fixedAsset.depriciationTotal
                              ? fixedAsset.depriciationTotal
                              : "No Choose"}
                          </td>
                          <td>{fixedAsset.useLife}</td>
                          <td className='text-center'>
                            <Link
                              to={"/sellEnd/" + fixedAsset._id}
                              className="btn btn-sm btn-outline-primary"

                              // onClick={() => showDialog(fixedAsset._id)}
                            >
                              Sell/End
                            </Link>
                            &nbsp;
                            <button
                              type="button"
                              className="btn btn-sm btn-primary ml-2"
                              onClick={() =>
                                handleTransactionShow(
                                  fixedAsset.relatedAssetAccount._id
                                )
                              }>
                              Transaction
                            </button>
                          </td>
                        </tr>

                        <tr
                          className="bg-light"
                          id={"toggle" + fixedAsset.relatedAssetAccount._id}
                          hidden>
                          <td colspan="12">
                            <div>
                              <div class="row">
                                <div class="col-md-2">
                                  <label
                                    style={{ fontSize: "15px" }}
                                    class="text-dark">
                                    No
                                  </label>
                                </div>
                                <div class="col-md-3">
                                  <label
                                    style={{ fontSize: "15px" }}
                                    class="text-dark">
                                    Account
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label
                                    style={{ fontSize: "15px" }}
                                    class="text-dark">
                                    Type
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label
                                    style={{ fontSize: "15px" }}
                                    class="text-dark">
                                    Date
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label
                                    style={{ fontSize: "15px" }}
                                    class="text-dark">
                                    Amount
                                  </label>
                                </div>
                              </div>

                              {relatedLists
                                ? relatedLists.map((reList, i) => (
                                    <div class="row">
                                      <div class="col-md-2">
                                        <div
                                          style={{
                                            fontSize: "15px",
                                          }}>
                                          {++i}
                                        </div>
                                      </div>
                                      <div class="col-md-3">
                                        <div
                                          style={{
                                            fontSize: "15px",
                                          }}>
                                          {reList.relatedAccounting.name}
                                        </div>
                                      </div>
                                      <div class="col-md-2">{reList.type}</div>
                                      <div class="col-md-2">
                                        <div
                                          style={{
                                            fontSize: "15px",
                                          }}>
                                          {reList.date.split("T")[0]}
                                        </div>
                                      </div>
                                      <div class="col-md-2">
                                        <div
                                          style={{
                                            fontSize: "15px",
                                          }}>
                                          {reList.amount}
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                : ""}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
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
    </div>
  );
}
export default FixedAsset;
