import React from "react";

const FeeSlip = ({ details }) => {
  return (
    <div
      id="fee-slip"
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        width: "400px",
        margin: "auto",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Library Management System</h2>
      <p>
        <strong>Slip No:</strong> {details.slipNo}
      </p>
      <p>
        <strong>Name:</strong> {details.name}
      </p>
      <p>
        <strong>Father's Name:</strong> {details.fatherName}
      </p>
      <p>
        <strong>Contact:</strong> {details.contact}
      </p>
      <p>
        <strong>Seat:</strong> {details.seat}
      </p>
      <p>
        <strong>Timing:</strong> {details.timing}
      </p>
      <p>
        <strong>Duration:</strong> {details.duration}
      </p>
      <p>
        <strong>Amount Paid:</strong> ₹{details.amount}
      </p>
      <p style={{ textAlign: "right" }}>
        <strong>Date:</strong> {details.date}
      </p>
      <p style={{ marginTop: "30px", textAlign: "center" }}>
        Authorized Signature
      </p>
    </div>
  );
};

export default FeeSlip;
