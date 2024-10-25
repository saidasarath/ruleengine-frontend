import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import "../styles/table.css"
function Availabledata() {
  const [data, setdata] = useState([]);
  const [records, setRecords] = useState([]);

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'age',
      selector: row => row.age,
      sortable: true,
    },
    {
      name: 'department',
      selector: row => row.department,
      sortable: true,
      right: true,
    },
    {
      name: 'Salary',
      selector: row => row.salary,
      sortable: true,
      right: true,
    },
    {
      name: 'Experience',
      selector: row => row.experience,
      sortable: true,
      right: true,
    },
    {
      name: 'Action',
      cell: row => (
        <button onClick={() => handledata(row)} className="btn btn-primary">
          Detele
        </button>
      ),
    },
  ];
  function handledata(row) {
    const dataId = row.id; 
    axios.delete(`http://localhost:8080/data/${dataId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error data');
      });
  }

  function handleFilter(e) {
    const newdata = data.filter(row => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newdata);
  }

  useEffect(() => {
    fetch('http://localhost:8080/data/all')
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
        setRecords(data); 
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div >
  <div >
    <input
      type="text"
      style={{ width: "350px" }}
      onChange={handleFilter}
      placeholder="Search by name"
    />
  </div>
  <DataTable
    columns={columns}
    data={records}
    pagination
  />
    </div>
  );
}

export default Availabledata;
