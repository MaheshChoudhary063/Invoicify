import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InvoiceModal = ({
  showModal,
  closeModal,
  info = {},
  items = [],
  currency = "$",
  subTotal = 0,
  total = 0,
  saveInvoice,
}) => {
  const navigate = useNavigate();

  const handleSaveInvoice = async () => {
    const invoiceData = {
      ...info,
      items,
      currency,
      subTotal: parseFloat(subTotal),
      total: parseFloat(total),
    };

    try {
      if (info._id) {
        const response = await axios.put(
          `http://localhost:5000/invoices/${info._id}`,
          invoiceData
        );
        console.log("Invoice updated successfully:", response.data);
      } else {
        const response = await axios.post(
          "http://localhost:5000/invoices/",
          invoiceData
        );
        console.log("New Invoice created:", response.data);
      }
      navigate("/home");
    } catch (error) {
      console.error("Error saving the invoice:", error);
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Invoice Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="m-0">Commercial Invoice</h3>
            <p className="m-0">Corporation</p>
          </div>
          <div>
            <h3 className="m-0">Invoice</h3>
            <p className="m-0">
              <strong>Invoice Number:</strong> {info.invoiceNumber || ""}
            </p>
            <p className="m-0">
              <strong>Date:</strong> {info.dateOfIssue || ""}
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <div>
            <h5 className="m-0">Invoice To:</h5>
            <p className="m-0">{info.billTo || ""}</p>
            <p className="m-0">{info.billToEmail || ""}</p>
            <p className="m-0">{info.billToAddress || ""}</p>
          </div>
          <div>
            <h5 className="m-0">Total Due:</h5>
            <h3 className="m-0 text-dark">
              {currency}
              {parseFloat(total).toFixed(2)}
            </h3>
          </div>
        </div>
        <hr />
        <div className="mb-4">
          <h5 className="mb-3">Items</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th className="text-end">Price</th>
                <th className="text-end">Quantity</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td className="text-end">
                    {currency}
                    {parseFloat(item.price).toFixed(2)}
                  </td>
                  <td className="text-end">{item.quantity}</td>
                  <td className="text-end">
                    {currency}
                    {(parseFloat(item.price) * parseInt(item.quantity)).toFixed(
                      2
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="text-end mb-4">
          <h5 className="mb-3">Summary</h5>
          <p className="mb-1">
            <strong>Subtotal:</strong> {currency}
            {parseFloat(subTotal).toFixed(2)}
          </p>
          <p className="mb-1">
            <strong>Tax:</strong> {currency}
            {(parseFloat(total) - parseFloat(subTotal)).toFixed(2)}
          </p>
          <p className="mb-1">
            <strong>Total:</strong> {currency}
            {parseFloat(total).toFixed(2)}
          </p>
        </div>
        <div className="mb-4">
          <h5 className="mb-3">Address</h5>
          <p className="mb-1">Galaxy Corporation Near ACD Foundation</p>
          
        </div>
        <div className="mb-4">
          <p className="mb-1">Thank you for your purchase!</p>
        </div>
        <div className="mb-4">
          <p className="mb-1">
            {" "}
            If you have any questions conerning this invoice . Contact :Diego
            at(123) 456-7890{" "}
          </p>
          <p className="mb-1">abcbcb@gmail.com</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveInvoice}>
          Save Invoice
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvoiceModal;
