import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { completeOrder } from "../actions/orderActions";
import { Card, Input, Button, Form, Row, Col } from "antd";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [error, setError] = useState("");

  const handlePayment = async (values) => {
    // Perform card validation
    const { cardNumber, expiryDate, cvv } = values;
    if (!cardNumber || !expiryDate || !cvv) {
      setError("Please enter all card details.");
      return;
    }

    // Make payment request
    const paymentDetails = {
      cardNumber,
      expiryDate,
      cvv,
    };

    try {
      // Simulated payment API call
      const response = await axios.post("/api/payment", paymentDetails);

      if (response.data.success) {
        // Payment successful, complete the order
        dispatch(completeOrder(orderDetails));
        setError("");
      } else {
        // Payment failed, display error message
        setError(response.data.error);
      }
    } catch (error) {
      // Handle network errors or other payment errors
      setError("Payment failed. Please try again.");
    }
  };

  return (
    <Card title="Payment">
      <Form form={form} onFinish={handlePayment} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="cardNumber"
              label="Card Number"
              rules={[
                { required: true, message: "Please enter the card number" },
              ]}
            >
              <Input placeholder="Card Number" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="expiryDate"
              label="Expiry Date"
              rules={[
                { required: true, message: "Please enter the expiry date" },
              ]}
            >
              <Input placeholder="MM/YY" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="cvv"
              label="CVV"
              rules={[{ required: true, message: "Please enter the CVV" }]}
            >
              <Input placeholder="CVV" />
            </Form.Item>
          </Col>
        </Row>
        {error && <p>{error}</p>}
        <Button type="primary" htmlType="submit">
          Pay Now
        </Button>
      </Form>
    </Card>
  );
};

export default PaymentForm;
