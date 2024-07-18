import React, { useState, useEffect } from "react";
import InvoiceModal from "./InvoiceModal";

const InvoiceView = ({ id, isOpen, closeView, invoices }) => {
  const [open, setOpen] = useState(isOpen);
  const invoice = invoices.find((inv) => inv.info.id === id);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  if (!id || !invoice || !invoice.info) return null;

  const closeModal = () => {
    setOpen(false);
    closeView();
  };

  return (
    <InvoiceModal
      type={3}
      showModal={open}
      closeModal={closeModal}
      info={invoice.info}
      items={invoice.items}
      currency={invoice.currency}
      subTotal={invoice.subTotal}
      total={invoice.total}
    />
  );
};

export default InvoiceView;
