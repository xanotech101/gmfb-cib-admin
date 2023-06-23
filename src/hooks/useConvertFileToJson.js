import Papa from 'papaparse';
import { useCallback, useState } from 'react';
import { notification } from 'utils';
import * as xlsx from 'xlsx';

export const useConvertFileToJson = () => {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [jsonArray, setJsonArray] = useState([]);

  const convertCsvToJson = useCallback((file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const columnsArray = [];

        setJsonArray(results.data);

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          columnsArray.push(Object.values(d));
        });
        setRows(rowsArray[0]);
        setColumns(columnsArray);
      }
    });
  }, []);

  const convertXlsToJson = (e) => {
    e.preventDefault?.();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        json.forEach((item, index) => {
          item.id = index + 1;
        });
        setJsonArray(json);
        const headers = Object.keys(json[0] ?? {});
        setRows(headers);

        const columnsArray = json.map((d) => {
          return Object.values(d);
        });
        if (columnsArray.length <= 0) {
          notification('No data found in the file', 'error');
        }
        setColumns(columnsArray);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const convertFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    if (
      file.type === 'application/vnd.ms-excel' ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      convertXlsToJson(e);
    } else if (file.type === 'text/csv') {
      convertCsvToJson(file, ['text/csv']);
    } else {
      notification('Invalid file format', 'error');
    }
  };

  const clearFile = useCallback(() => {
    setFile(null);
    setRows([]);
    setColumns([]);
    setJsonArray([]);
  }, []);

  const convertJsontoCSV = (json) => {
    const csv = Papa.unparse(json);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'transfer-request.csv');
    document.body.appendChild(a);
    a.click();
    return csv;
  };

  const convertJsonToExcel = (json, fileName) => {
    const worksheet = xlsx.utils.json_to_sheet(json);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${fileName}.xlsx`);
    document.body.appendChild(a);
    a.click();
    return excelBuffer;
  };

  return {
    file,
    rows,
    columns,
    convertFile,
    clearFile,
    jsonArray,
    convertJsontoCSV,
    convertJsonToExcel
  };
};
