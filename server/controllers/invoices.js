import mongoose from "mongoose";
import express from "express";
import InvoiceModel from '../models/InvoiceModel.js';


export const createInvoice = async (req, res) => {
  const invoice = req.body;

  const newInvoice = new InvoiceModel(invoice);

  try {
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const getInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceModel.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoices", error });
  }
};

export const getInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await InvoiceModel.findById(id);

    res.status(200).json(invoice);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  const { id: _id } = req.params;
  const invoice = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No invoice with that id");

  const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
    _id,
    { ...invoice, _id },
    { new: true }
  );

  res.json(updatedInvoice);
};

export const deleteInvoice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No invoice with that id");

  await InvoiceModel.findByIdAndDelete(id);

  res.json({ message: "Invoice deleted successfully" });
};

export const getInvoicesByUser = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const invoices = await InvoiceModel.find({ creator: searchQuery });

    res.status(200).json({ data: invoices });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTotalCount = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const totalCount = await InvoiceModel.countDocuments({
      creator: searchQuery,
    });

    res.status(200).json(totalCount);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
