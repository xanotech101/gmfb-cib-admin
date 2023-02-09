import Papa from 'papaparse';
import { useCallback, useState } from 'react';
import { notification } from 'utils';
import * as xlsx from 'xlsx';

export const useConvertFileToJson = () => {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const convertFileToJson = useCallback((file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const columnsArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          columnsArray.push(Object.values(d));
        });

        setRows(rowsArray[0]);
        setColumns(columnsArray);
      }
    });
  }, []);

  //this is the function to convert xls to json
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);

        const headers = Object.keys(json[0]);
        setRows(headers);

        const columnsArray = json.map((d) => {
          return Object.values(d);
        });
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
      readUploadFile(e);
    } else if (file.type === 'text/csv') {
      convertFileToJson(file, ['text/csv']);
    } else {
      notification('Invalid file format', 'error');
    }
  };

  const clearFile = useCallback(() => {
    setFile(null);
    setRows([]);
    setColumns([]);
  }, []);

  return { file, rows, columns, convertFile, clearFile };
};
