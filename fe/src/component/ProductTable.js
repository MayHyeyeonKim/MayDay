import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../utils/number";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

const ProductTable = ({ header, data, deleteItem, openEditForm }) => {
  const [productlist, setProductlist] = useState([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteName, setDeleteName] = useState("");
  useEffect(()=>{
    if(data)
      setProductlist(data)
  },[data])

  const handleShowDeleteConfirm = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setShowDeleteConfirm(true);
};

const handleDeleteConfirm = () => {
    if (deleteId) {
        deleteItem(deleteId);
    }
    setShowDeleteConfirm(false);
};
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productlist.length > 0 ? (
            productlist.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                <th>{item.sku}</th>
                <th style={{ minWidth: "100px" }}>{item.name}</th>
                <th>{currencyFormat(item.price)}</th>
                <th>
                  {Object.keys(item.stock).map((size, index) => (
                    <div key={index}>
                      {size}:{item.stock[size]}
                    </div>
                  ))}
                </th>
                <th>
                  <img src={item.image} width={100} alt="image" />
                </th>
                <th>{item.status}</th>
                <th style={{ minWidth: "100px" }}>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>  handleShowDeleteConfirm(item._id,item.name)}
                    className="mr-1"
                  >
                    -
                  </Button>
                  <Button size="sm" onClick={() => openEditForm(item)}>
                    Edit
                  </Button>
                </th>
              </tr>
            ))
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
      <Modal
                show={showDeleteConfirm}
                onHide={() => setShowDeleteConfirm(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {`Are you sure you want to delete "${deleteName}"?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteConfirm(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
    </div>
  );
};
export default ProductTable;
