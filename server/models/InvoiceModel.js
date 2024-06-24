// import mongoose from "mongoose";

// const InvoiceSchema = mongoose.Schema({
//   dueDate: Date,
//   currency: String,
//   items: [
//     { itemName: String, unitPrice: String, quantity: String, discount: String },
//   ],
//   rates: String,
//   vat: Number,
//   total: Number,
//   subTotal: Number,
//   notes: String,
//   status: String,
//   invoiceNumber: String,
//   type: String,
//   creator: [String],
//   totalAmountReceived: Number,
//   client: { name: String, email: String, phone: String, address: String },
//   paymentRecords: [
//     {
//       amountPaid: Number,
//       datePaid: Date,
//       paymentMethod: String,
//       note: String,
//       paidBy: String,
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: new Date(),
//   },
// });

// const InvoiceModel = mongoose.model("InvoiceModel", InvoiceSchema);
// export default InvoiceModel;


import mongoose from "mongoose";

const InvoiceSchema = mongoose.Schema({
  dateOfIssue: {
    type: Date,
    required: true,
  },
  billTo: {
    type: String,
    required: true,
  },
  billToEmail: {
    type: String,
    required: true,
  },
  billToAddress: {
    type: String,
    required: true,
  },
  billFrom: {
    type: String,
    required: true,
  },
  billFromEmail: {
    type: String,
    required: true,
  },
  billFromAddress: {
    type: String,
    required: true,
  },
  notes: String,
  total: {
    type: Number,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  items: [
    {
      name: String,
      description: String,
      price: Number,
      quantity: Number,
    },
  ],
});

const InvoiceModel = mongoose.model("InvoiceModel", InvoiceSchema);
export default InvoiceModel;
