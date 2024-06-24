import express from "express";
import {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoice,
  // getInvoicesByUser,
  getTotalCount,
  getInvoices,
} from "../controllers/invoices.js";

const router = express.Router();

router.get("/count", getTotalCount); //use to generate invoice serial number
router.get("/:id", getInvoice);
router.get("/", getInvoices);
// router.get("/", getInvoicesByUser);
router.post("/", createInvoice);
router.put("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);

export default router;
