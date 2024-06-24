import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import InvoiceModal from "../Invoice/InvoiceModal";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [status, setStatus] = useState("idle");

  const navigate = useNavigate();

  const createInvoice = () => {
    navigate("/create-invoice");
  };

  const actionInvoice = async (id, action) => {
    const invoice = invoices.find((invoice) => invoice._id === id);
    switch (action) {
      case "Edit":
        navigate(`/edit-invoice/${id}`);
        break;
      case "Delete":
        try {
          const response = await fetch(`http://localhost:5000/invoices/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error("Failed to delete invoice");
          }
          setInvoices(invoices.filter((invoice) => invoice._id !== id));
        } catch (error) {
          console.error("Error deleting invoice:", error);
        }
        break;
      case "View":
        setSelectedInvoice(invoice);
        setIsOpen(true);
        break;
      default:
        break;
    }
  };

  const closeView = () => {
    setIsOpen(false);
    setSelectedInvoice(null);
  };

  const saveInvoice = (invoiceData) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice._id === invoiceData._id ? invoiceData : invoice
    );
    setInvoices(updatedInvoices);
    closeView();
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      setStatus("loading");
      try {
        const response = await fetch("http://localhost:5000/invoices");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setInvoices(data);
        setStatus("idle");
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatus("error");
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="m-5">
      <Button variant="primary" onClick={createInvoice}>
        Create Invoice
      </Button>
      {status !== "idle" && (
        <div className="mt-3 p-2 rounded-md bg-yellow-200">
          Status: {status}
        </div>
      )}

      <Table striped bordered hover size="m" className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            {/* <th>Invoice Id</th> */}
            <th>Bill To (Name)</th>
            <th>Bill From (Name)</th>
            <th>Date of Issue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices &&
            invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {/* <td>{invoice._id}</td> */}
                <td>{invoice.billTo}</td>
                <td>{invoice.billFrom}</td>
                <td>{new Date(invoice.dateOfIssue).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="outline-success"
                    className="m-1"
                    onClick={() => actionInvoice(invoice._id, "View")}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline-info"
                    className="m-1"
                    onClick={() => actionInvoice(invoice._id, "Edit")}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="m-1"
                    onClick={() => actionInvoice(invoice._id, "Delete")}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {selectedInvoice && (
        <InvoiceModal
          showModal={isOpen}
          closeModal={closeView}
          info={selectedInvoice.info}
          items={selectedInvoice.items}
          currency={selectedInvoice.currency}
          subTotal={selectedInvoice.subTotal}
          taxAmount={selectedInvoice.taxAmount}
          discountAmount={selectedInvoice.discountAmount}
          total={selectedInvoice.total}
          saveInvoice={saveInvoice}
        />
      )}
    </div>
  );
};

export default Home;
