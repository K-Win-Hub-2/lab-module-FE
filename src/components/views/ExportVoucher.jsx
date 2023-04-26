import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'sheetjs-style';

const ExportVoucher = ({excelData,fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
  return (
    <>
        <button className='btn btn-sm btn-primary ml-3' onClick={(e) => exportToExcel(fileName)}>Export</button>
    </>
  )
}

export default ExportVoucher