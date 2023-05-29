import React, { useState } from "react";
import { CheckCircleFilled } from "@ant-design/icons";

const NotClickedPaymentUserInfo = ({
  user,
  users,
  editInfoClicked,
  setEditInfoClicked,
}) => {
  const formatNumberWithDashes = (number) => {
    const formattedNumber = number.toString();
    const part1 = formattedNumber.slice(0, 3);
    const part2 = formattedNumber.slice(3, 5);
    const part3 = formattedNumber.slice(5, 7);
    return `${part1}-${part2}-${part3}`;
  };
  const [isPersonalInfoClicked, setIsPersonalInfoClicked] = useState(true);
  const phoneNumber = users.map((user) => user.phone);
  const formattedPhoneNumber = formatNumberWithDashes(phoneNumber);
  return (
    <div className="customer_personal_info__payment">
      <div className="payment__header">
        <h6 onClick={() => setIsPersonalInfoClicked(!isPersonalInfoClicked)}>
          1. Şəxsi məlumatlar
        </h6>
        <div className="icon_and_edit">
          <a href="#" onClick={() => setEditInfoClicked(!editInfoClicked)}>
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
      {isPersonalInfoClicked && (
        <div className="customer_infos__container">
          <span>
            {user.name} {user.surname}
          </span>
          <span>
            ({user.prefix}) {formattedPhoneNumber}
          </span>
          <span>{user.email}</span>
        </div>
      )}
    </div>
  );
};

export default NotClickedPaymentUserInfo;
