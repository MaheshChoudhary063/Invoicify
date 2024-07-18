import React from "react";
import { Table, Button, Form } from "react-bootstrap";

class InvoiceItem extends React.Component {
  handleChange = (event) => {
    this.props.onItemizedItemEdit(event);
  };

  handleDelete = (id) => {
    const item = this.props.items.find((item) => item.id === id);
    this.props.onRowDel(item);
  };

  render() {
    const { items, currency } = this.props;

    return (
      <div>
        <Table responsive className="mb-0">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th className="text-end">Price</th>
              <th className="text-end">Quantity</th>
              <th className="text-end">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <Form.Control
                    type="text"
                    name="name"
                    id={item.id}
                    value={item.name}
                    onChange={this.handleChange}
                    required
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    name="description"
                    id={item.id}
                    value={item.description}
                    onChange={this.handleChange}
                  />
                </td>
                <td className="text-end">
                  <Form.Control
                    type="number"
                    name="price"
                    id={item.id}
                    value={item.price}
                    onChange={this.handleChange}
                    className="text-end"
                    required
                  />
                </td>
                <td className="text-end">
                  <Form.Control
                    type="number"
                    name="quantity"
                    id={item.id}
                    value={item.quantity}
                    onChange={this.handleChange}
                    className="text-end"
                    required
                  />
                </td>
                <td className="text-end">
                  {currency}
                  {(parseFloat(item.price) * parseInt(item.quantity)).toFixed(
                    2
                  )}
                </td>
                <td className="text-end">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => this.handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
          className="mt-3"
          variant="success"
          onClick={this.props.onRowAdd}
        >
          Add Item
        </Button>
      </div>
    );
  }
}

export default InvoiceItem;
