import { CheckCircleFilled } from "@ant-design/icons";
import React from "react";

const NotClickedAddressEdit = ({ user, setEditAddressClicked, editAddressClicked }) => {
  return (
    <div>
      <div className="payment__header">
        <h6> 2. Çatdırılma</h6>
        <div className="icon_and_edit">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setEditAddressClicked(!editAddressClicked);
            }}
          >
            Düzəliş et
          </a>
          <CheckCircleFilled
            style={{
              fontSize: "22px",
              color: "#2DD06E",
            }}
          />
        </div>
      </div>
      <div className="customer_infos__container">
        {user?.addresses?.map((a) => (
          <div className="d-flex flex-column">
            <span>{a.address}</span>
            <span className="mt-2">{a.apartment}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotClickedAddressEdit;
