import {db} from './firebase';
import React,{useState,useEffect} from 'react';
import DataTable from 'react-data-table-component';

function DocDataTable() {
const [tableData, setTableData] = useState();
  useEffect(() => {
    const tableDataRef = db.ref('userData');
    tableDataRef.on('value', (snapshot) => {
      const todos = snapshot.val();
      const tableData = [];
      for (let id in todos) {
        tableData.push({ id, ...todos[id] });
      }
      setTableData(tableData);
      console.log(tableData);
    });
  }, [])

 const columns = [
    {
        name: 'Name',
        selector: row => row.email,
    },
    {
        name: 'URL',
        cell:(row) => <a href={`${row.url}`} target="_blank">URL</a> ,
        // selector: row => row.url,
    },
  ];
  
  return (
    <div>
        <h1>DataTable</h1>
        <DataTable
            columns={columns}
            data={tableData}
        />
        {/* <DataTableExtensions {...helper}>
            <DataTable
            columns={columns}
            data={tableData}
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
            />
        </DataTableExtensions> */}
    </div>
  );
}

export default DocDataTable;