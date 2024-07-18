import React, { useState, useEffect } from "react";
import InvoiceForm from "./InvoiceForm";
import { useParams } from "react-router-dom";

const EditInvoiceComponent = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(
          `https://invoicify-ktl2.onrender.com/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setInvoice(data);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    fetchInvoice();
  }, [id]);

  const handleFormSubmit = async (updatedInvoiceData) => {
    try {
      const response = await fetch(
        `https://invoicify-ktl2.onrender.com/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedInvoiceData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Invoice updated successfully:", data);
      setInvoice(data);
    } catch (error) {
      console.error("Error updating invoice data:", error);
    }
  };

  if (!invoice) return <p>Loading...</p>;

  return <InvoiceForm invoiceData={invoice} onSubmit={handleFormSubmit} />;
};

export default EditInvoiceComponent;
