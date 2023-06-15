import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import * as XLSX from 'xlsx';

const ExcelFileReader = (props) => {
  const {saveUploadedRates} = props;
  const inputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headerRow = jsonData[0];
      const dataRows = jsonData.slice(1);

      const transformedData = dataRows.map((row) => {
        const rowData = {};
        headerRow.forEach((header, index) => {
          if (row[index] || row[index] === 0) rowData[header] = row[index];
        });
        return rowData;
      });

      const updatedData = transformedData.map((obj) => {
        const updatedObj = {};
        Object.keys(obj).forEach((key) => {
          if (key === 'id') {
          updatedObj[key] = obj[key].toFixed(2);
          }else {
            const updatedKey = Number(key).toFixed(2);
            updatedObj[updatedKey] = obj[key];
          }
        });
        return updatedObj;
      });

      saveUploadedRates(updatedData)
    };

    reader.readAsArrayBuffer(file);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleFileUpload}
      />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Upload Excel File
      </Button>
    </div>
  );
};

export default ExcelFileReader;
