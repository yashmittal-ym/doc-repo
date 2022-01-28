import React  from 'react';
import Form from "./Form";
import DocDataTable from './DocDataTable';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { BiArchiveOut } from 'react-icons/bi';
export default function Welcome({handleLogout}) {
  const [modalShow, setModalShow] = React.useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to add new item 
    </Tooltip>
  );
  const handleAddItem = () =>{
    setModalShow(true);
  }
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
            Add Document
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form 
            editOnClick={props.onHide}
          />
        </Modal.Body>
      </Modal>
    );
  }
  return (
    <div className='hero'>
        <nav>
            <h2>Welcome</h2>
            <button onClick={handleLogout}>Logout</button>
        </nav>
        <DocDataTable />
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
          className="bottom-right"
        >
          <Button onClick={handleAddItem} className="bottom-right">+</Button>
        </OverlayTrigger>,
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
