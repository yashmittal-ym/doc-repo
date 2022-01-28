import {db} from './firebase';
import React,{useState,useEffect} from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Form from "./Form";


function DocDataTable() {
const [tableData, setTableData] = useState();
const [modalShow, setModalShow] = useState(false);
const [formData, setFormData] = useState({
  title: "",
  description: "",
  url: "",
  id: "",
  action: "",
});

  const loadData = () => {
    const tableDataRef = db.ref('userData');
    tableDataRef.on('value', (snapshot) => {
      const todos = snapshot.val();
      const tableData = [];
      for (let id in todos) {
        tableData.push({ id, ...todos[id] });
      }
      setTableData(tableData);
    });
  }
  useEffect(() => {
    loadData();
  }, [])

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Document
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form 
            editTitle={formData.title}
            editDescription={formData.description}
            editId={formData.id}
            editUrl={formData.url}
            editAction={"update"}
            editOnClick={props.onHide}
          />
        </Modal.Body>
      </Modal>
    );
  }
  
  const handleOnEdit = (props) => {
    setModalShow(true);
    setFormData({
      title: props.title,
      description: props.description,
      url: props.url,
      id: props.id,
      action: "update"
    });
  }
  const handleOnDelete = (props) => {
    const tutorialsRef = db.ref('userData');
    tutorialsRef.child(props.id).remove();
    loadData();

  }

 const columns = [
    {
        name: 'TITLE',
        selector: row => row.title,
    },
    {
      name: 'DESCRIPTION',
      selector: row => row.description,
    },
    {
      name: "EDIT",
      key: "action",
      text: "Action",
      className: "action",
      width: 100,
      align: "left",
      sortable: false,
      cell: (record) => {
        return (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleOnEdit(record);
              }}
            >
              Edit
            </button>
        );
       },
      },
      {
        name: "DELETE",
        key: "action",
        text: "Action",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        cell: (record) => {
          return (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  handleOnDelete(record);
                }}
              >
                Delete
              </button>
          );
        },
      },
      {
        name: "URL",
        key: "action",
        text: "Action",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        cell: (record) => {
          return (
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>  {
                    navigator.clipboard.writeText(record.url)
                    alert("Copied to clipboard");
                  }
                }
              >
                Copy
              </button>
          );
        },
      },
  ];

  
  return (
    <div>
        <h1 className="header">All documents</h1>
        <DataTable
            columns={columns}
            data={tableData}
            highlightOnHover
            pointerOnHover
            theme={'light'}
        />
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default DocDataTable;
 