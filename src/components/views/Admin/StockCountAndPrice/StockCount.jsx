/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Sidebar from '../../SideBar'
import Swal from 'sweetalert2'
import {
    FaRegEdit,
    FaFileExcel,
    FaRegTrashAlt
} from 'react-icons/fa'
import { ExcelExport } from '@progress/kendo-react-excel-export'
import { ExcelExportColumn } from '@progress/kendo-react-excel-export'

export default function StockCount() {
    const [reagentList, setReagentList] = useState([])
    const url = 'http://centralclinicbackend.kwintechnologykw11.com:3000/api/'
    const _export = React.useRef(null)

    const excelExport = () => {
        if (_export.current !== null) {
            console.log(_export.current.props.data)
            _export.current.props.data.map(function (element) {
                element.createdAt = element.createdAt.split('T')[0]
            })
            _export.current.save()
        }
    }

    const handleDelete = async (id) => {
        await axios.delete(url + `reagent/${id}`)
            .then(() => {
                setReagentList(reagentList.filter(item => item._id !== id))
                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: "The item has been successfully deleted.",
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "An error occurred while deleting the item." + error,
                });
            })
    }

    useEffect(() => {
        const getReagents = async () => {
            await axios.get(url + 'reagents')
                .then(response => {
                    setReagentList(response.data.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        getReagents()
    }, [])
    return (
        <div classNameName='App'>
            {/* <!-- end preloader --> */}
            {/* @include('sweet::alert') */}

            <div className='wrapper'>
            <Sidebar />
               
                {/* <!-- Content Wrapper. Contains page content --> */}

                <div className='content-wrapper'>

                    {/* <!-- Content Header (Page header) --> */}
                    <div className='content-header'>
                        <div className='container-fluid'>
                            <div className='row mb-2'>
                                <div className='col-sm-12'>
                                    <ol className='breadcrumb'>
                                        <li className='breadcrumb-item'>
                                            <a href='/lab-test'>Home</a>
                                        </li>
                                        <li className='breadcrumb-item active'>
                                            Stock Count & Price List
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Main content --> */}

                    <section className='content'>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-md-4 '>
                                    <div className='input-group' style={{ marginTop: '35px' }}>
                                        <input
                                            type='search'
                                            className='form-control rounded'
                                            id='search_code'
                                            placeholder='Enter Account Code'
                                        />
                                        &nbsp;
                                        <button
                                            type='button'
                                            className='btn btn-outline-primary ml-2'
                                            style={{ height: '0.97cm', marginTop: '0.1em' }}
                                            onClick='acc_code_search()'
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <div className='row justify-content-between py-3'>
                                                <label className=''>
                                                    <span className='float-right'>
                                                        <Link to='/reagent-reg' className='btn btn-primary'>
                                                            <i className='fas fa-plus'></i> &nbsp;Reagent Register
                                                        </Link>
                                                        &nbsp;
                                                        <button
                                                            type='button'
                                                            className='btn btn-success'
                                                            onClick={excelExport}
                                                        >
                                                            <FaFileExcel />
                                                            &nbsp;Export
                                                        </button>
                                                    </span>
                                                </label>
                                            </div>
                                            <div className='row' id='trial_balance'></div>
                                        </div>

                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <div
                                                        className='table-responsive text-black'
                                                        id='slimtest2'
                                                    >
                                                        <table className='table table-hover' id='filter_date'>
                                                            <thead className='bg-info text-white'>
                                                                <tr>
                                                                    <th>#</th>

                                                                    {/* <th>Bank / Cash Account</th>  */}
                                                                    <th>Date</th>
                                                                    <th>Code</th>
                                                                    <th>Name</th>
                                                                    <th>Unit</th>
                                                                    <th>Quantity</th>

                                                                    <th className='text-center'>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <ExcelExport data={reagentList} ref={_export}>
                                                                <ExcelExportColumn
                                                                    field=''
                                                                    title='No'
                                                                    locked={true}
                                                                    width={30}
                                                                />
                                                                <ExcelExportColumn
                                                                    field='createdAt'
                                                                    title='Date'
                                                                    headerCellOptions={{
                                                                        textAlign: 'center'
                                                                    }}
                                                                    width={200}
                                                                />

                                                                <ExcelExportColumn
                                                                    field='code'
                                                                    title='Code'
                                                                    headerCellOptions={{
                                                                        textAlign: 'center'
                                                                    }}
                                                                    width={250}
                                                                />

                                                                <ExcelExportColumn
                                                                    field='name'
                                                                    title='Name'
                                                                    headerCellOptions={{
                                                                        textAlign: 'center'
                                                                    }}
                                                                    width={250}
                                                                />

                                                                <ExcelExportColumn
                                                                    field='stockUnit[0].unitName'
                                                                    title='Stock Unit'
                                                                    width={150}
                                                                />
                                                                <ExcelExportColumn
                                                                    field='qty'
                                                                    title='Quantity'
                                                                    headerCellOptions={{
                                                                        textAlign: 'center'
                                                                    }}
                                                                    width={150}
                                                                />
                                                            </ExcelExport>
                                                            <tbody >
                                                                {reagentList.map((item, i) => (
                                                                    <tr key={item._id}>
                                                                        <td>{++i}</td>

                                                                        <td>{item.createdAt ? item.createdAt.split('T')[0] : 'Not Set'}</td>

                                                                        <td>
                                                                            {item.code ? item.code : 'Not Set'}
                                                                        </td>
                                                                        <td>
                                                                            {item.name ? item.name : 'Not Set'}
                                                                        </td>
                                                                        <td>
                                                                            {item.stockUnit ? item.stockUnit[0].unitName : ''}
                                                                        </td>

                                                                        <td>
                                                                            {item.qty ? item.qty : 'Not Set'}
                                                                        </td>

                                                                        <td className='text-center'>
                                                                            &nbsp;
                                                                            <Link
                                                                                to={'/doctorUpdate/' + item._id}
                                                                                className='btn bt-sm btn-warning text-light'
                                                                            >
                                                                                <FaRegEdit />
                                                                            </Link>
                                                                            &nbsp;
                                                                            <button
                                                                                className='btn bt-sm btn-danger'
                                                                                onClick={() => handleDelete(item._id)}
                                                                            >
                                                                                <FaRegTrashAlt />
                                                                            </button>
                                                                        </td>
                                                                    </tr>

                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div >

            {/* <!-- /.content-wrapper --> */}
            < footer className='main-footer' >
                <strong>
                    Copyright &copy; 2017-2020{' '}
                    <a href='http://www.kwintechnologies.com'>K-win Technology</a>.
                </strong>
                All rights reserved.
            </footer >

            {/* <!-- Control Sidebar --> */}
            < aside className='control-sidebar control-sidebar-dark' >
                {/* <!-- Control sidebar content goes here --> */}
            </aside >
            {/* <!-- /.control-sidebar --> */}

            {/* <!-- ./wrapper --> */}
        </div >
    )
}