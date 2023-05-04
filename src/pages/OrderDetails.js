import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
const OrderDetails = () => {
  const navigate = useNavigate();
  return (
    <div className="order__details">
      <Link onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
        <h5>Sifarişin detalları</h5>
      </Link>
    </div>
  );
};

export default OrderDetails;
