import React, { Component } from "react";
import { Row, Col, Button, Form, Card } from "react-bootstrap";
import InvoiceItem from "../Invoice/InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import axios from "axios";
class InvoiceForm extends Component {
  constructor(props) {
    super(props);
    const { invoiceData: data } = this.props;
    this.state = data
      ? {
          ...data,
          items: data.items,
          isOpen: false,
        }
      : {
          id: this.generateId(),
          dateOfIssue: "",
          billTo: "",
          billToEmail: "",
          billToAddress: "",
          billFrom: "",
          billFromEmail: "",
          billFromAddress: "",
          notes: "",
          total: 0.0,
          subTotal: 0.0,
          items: [this.createNewItem()],
          isOpen: false,
        };
    this.editField = this.editField.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
    this.handleRowDel = this.handleRowDel.bind(this);
    this.handleCalculateTotal = this.handleCalculateTotal.bind(this);
  }

  componentDidMount() {
    this.handleCalculateTotal();
  }

  generateId() {
    return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  }

  createNewItem() {
    return {
      id: this.generateId(),
      name: "",
      description: "",
      price: 0.0,
      quantity: 0,
    };
  }

  handleAddEvent() {
    this.setState(
      (prevState) => ({
        items: [...prevState.items, this.createNewItem()],
      }),
      this.handleCalculateTotal
    );
  }

  handleRowDel(itemToDelete) {
    this.setState(
      (prevState) => ({
        items: prevState.items.filter((item) => item !== itemToDelete),
      }),
      this.handleCalculateTotal
    );
  }

  handleCalculateTotal() {
    const { items } = this.state;
    const subTotal = items.reduce(
      (acc, item) =>
        acc + parseFloat(item.price) * parseInt(item.quantity || 0),
      0
    );
    const total = subTotal.toFixed(2);

    this.setState({
      subTotal: subTotal.toFixed(2),
      total,
    });
  }

  handleItemEdit(evt) {
    const { id, name, value } = evt.target;
    const updatedItems = this.state.items.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });

    this.setState({ items: updatedItems }, this.handleCalculateTotal);
  }

  editField(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  openModal = (event) => {
    event.preventDefault();
    this.setState({ isOpen: true });
  };

  closeModal = () => this.setState({ isOpen: false });

  saveInvoice = (invoiceData) => {
    axios
      .post("http://localhost:5000/invoices/", invoiceData)
      .then((response) => {
        console.log("Invoice saved successfully:", response.data);
        this.setState({ isOpen: false });
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          console.error(
            "Conflict error: Invoice already exists or other conflict:",
            error.response.data
          );
          alert("Conflict error: Invoice already exists or other conflict.");
        } else {
          console.error("There was an error saving the invoice!", error);
          alert("There was an error saving the invoice!");
        }
      });
  };

  render() {
    const { subTotal, total, items } = this.state;

    return (
      <div className="container p-5 my-5 border border-secondary rounded bg-light">
        <Form onSubmit={this.openModal}>
          <Card className="mt-3 mb-3">
            <Card.Header>Invoice Info</Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formGridInvoiceNumber">
                    <Form.Label>Invoice Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="invoiceNumber"
                      placeholder="Enter invoice number"
                      value={this.state.invoiceNumber}
                      onChange={this.editField}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formGridCurrentDate">
                    <Form.Label>Issue Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfIssue"
                      value={this.state.dateOfIssue}
                      onChange={this.editField}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formGridBillTo">
                    <Form.Label>Bill To</Form.Label>
                    <Form.Control
                      type="text"
                      name="billTo"
                      placeholder="Enter client name"
                      value={this.state.billTo}
                      onChange={this.editField}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formGridBillToEmail" className="mt-3">
                    <Form.Label>Bill To Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="billToEmail"
                      placeholder="Enter client email"
                      value={this.state.billToEmail}
                      onChange={this.editField}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formGridBillToAddress"
                    className="mt-3"
                  >
                    <Form.Label>Bill To Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="billToAddress"
                      placeholder="Enter client address"
                      value={this.state.billToAddress}
                      onChange={this.editField}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formGridBillFrom">
                    <Form.Label>Bill From</Form.Label>
                    <Form.Control
                      type="text"
                      name="billFrom"
                      placeholder="Enter your company name"
                      value={this.state.billFrom}
                      onChange={this.editField}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formGridBillFromEmail"
                    className="mt-3"
                  >
                    <Form.Label>Bill From Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="billFromEmail"
                      placeholder="Enter your company email"
                      value={this.state.billFromEmail}
                      onChange={this.editField}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formGridBillFromAddress"
                    className="mt-3"
                  >
                    <Form.Label>Bill From Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="billFromAddress"
                      placeholder="Enter your company address"
                      value={this.state.billFromAddress}
                      onChange={this.editField}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mt-3 mb-3">
            <Card.Header>Items</Card.Header>
            <Card.Body>
              <InvoiceItem
                onItemizedItemEdit={this.handleItemEdit}
                onRowAdd={this.handleAddEvent}
                onRowDel={this.handleRowDel}
                items={items}
              />
            </Card.Body>
          </Card>

          <Card className="mt-3 mb-3">
            <Card.Header>Totals</Card.Header>
            <Card.Body>
              <Row className="mt-3">
                <Col md={{ span: 4, offset: 8 }}>
                  <Form.Group controlId="formGridTotal">
                    <Form.Label>Total</Form.Label>
                    <Form.Control
                      type="text"
                      name="total"
                      placeholder="Total amount"
                      value={total}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Button variant="primary" type="submit">
            Preview Invoice
          </Button>
        </Form>

        <InvoiceModal
          showModal={this.state.isOpen}
          closeModal={this.closeModal}
          info={this.state}
          items={items}
          currency="$"
          subTotal={subTotal}
          total={total}
          saveInvoice={this.saveInvoice}
        />
      </div>
    );
  }
}

export default InvoiceForm;
