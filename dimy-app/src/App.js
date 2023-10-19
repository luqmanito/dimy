import React, { useState } from "react";

function App() {
  const [rows, setRows] = useState([
    {
      productName: "",
      productPrice: "",
      quantity: 1,
      total: 0,
    },
  ]);

  const handleNewRow = () => {
    setRows([
      ...rows,
      {
        productName: "",
        productPrice: "",
        quantity: 1,
        total: 0,
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    updatedRows[index].total = value * updatedRows[index].quantity;
    setRows(updatedRows);
  };

  const handleQuantityChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    if (value < 1) {
      alert("Quantity cannot be less than 1");
      updatedRows[index].quantity = 1;
    }
    updatedRows[index].total = updatedRows[index].productPrice * value;
    setRows(updatedRows);
  };

  const calculateGrandTotal = () => {
    let grandTotal = 0;
    for (let row of rows) {
      grandTotal += row.total;
    }
    return grandTotal;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Quantity</th>
            <th>Total</th>
            {rows.length > 1 && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="productName"
                  value={row.productName}
                  onChange={(e) => handleProductChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="productPrice"
                  value={row.productPrice}
                  onChange={(e) => handleProductChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  value={row.quantity}
                  onChange={(e) => handleQuantityChange(index, e)}
                />
              </td>
              <td>{row.total}</td>
              {rows.length > 1 && (
                <td>
                  <button onClick={() => handleDeleteRow(index)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleNewRow}>New</button>
      <div>Grand Total: {calculateGrandTotal()}</div>
    </div>
  );
}

export default App;
