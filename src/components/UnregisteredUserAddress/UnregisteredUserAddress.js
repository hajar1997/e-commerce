import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UnregisteredAddressEdit from "../UnregisteredAddressEdit/UnregisteredAddressEdit";

const UnregisteredUserAddress = () => {
  const [editAddressClicked, setEditAddressClicked] = useState(false);
  const [deliveryForm] = useForm();
  const [users, setUsers] = useState([]);
  const [isDeliveryClicked, setIsDeliveryClicked] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const unregistered_id = localStorage.getItem("unregistered_user_id");

  const onFinish = async (values) => {
    const updatedData = [
      {
        address: values.address,
        apartment: values.apartment,
        comment: values.comment,
      },
    ];
    await axios
      .patch(`http://localhost:8001/unregisteredOrderInfo/${unregistered_id}`, {
        addresses: updatedData,
      })
      .then((res) => {
        updateUser(res.data);
        setSubmitted(true);
        notification.open({
          type: "success",
          message: "Məlumatlar uğurla göndərildi!",
        });
      })
      .catch((err) => {
        message.error("Xəta baş verdi");
      });
  };

  const updateUser = (updatedData) => {
    setUsers([updatedData]);
  };

  const getData = async () => {
    if (unregistered_id) {
      await axios
        .get(`http://localhost:8001/unregisteredOrderInfo/${unregistered_id}`)
        .then((res) => {
          const user = res.data;
          setUsers([user]);
        })
        .catch((err) => {
          message.error("Error occurred while fetching user data");
        });
    }
  };
  useEffect(() => {
    getData();
  }, [unregistered_id, submitted]);

  return (
    <div>
      {submitted ? (
        users.length > 0 &&
        users.map((user) =>
          editAddressClicked ? (
            <UnregisteredAddressEdit
              updateParentData={updateUser}
              user={user}
              setUsers={setUsers}
              editAddressClicked={editAddressClicked}
              setEditAddressClicked={setEditAddressClicked}
            />
          ) : (
            <div>
              <div className="payment__header">
                <h6 onClick={() => setIsDeliveryClicked(!isDeliveryClicked)}>
                  2. Çatdırılma
                </h6>
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
              {isDeliveryClicked && (
                <div className="customer_infos__container">
                  {users.length > 0 &&
                    users.map((user) =>
                      user?.addresses?.map((add) => (
                        <div className="d-flex flex-column">
                          <span>{add?.address}</span>
                          <span className="mt-2">{add?.apartment}</span>
                        </div>
                      ))
                    )}
                </div>
              )}
            </div>
          )
        )
      ) : (
        <>
          <div className="payment__header">
            <h6 onClick={() => setIsDeliveryClicked(!isDeliveryClicked)}>
              2. Çatdırılma
            </h6>
            <CheckCircleOutlined
              style={{
                fontSize: "22px",
                color: isDeliveryClicked ? "#2DD06E" : "#828282",
              }}
            />
          </div>
          {isDeliveryClicked && unregistered_id && (
            <div className="delivery_info">
              <Form
                onFinish={onFinish}
                style={{
                  maxWidth: 800,
                  width: "100%",
                  marginTop: 48,
                }}
                form={deliveryForm}
                layout="vertical"
              >
                <div className="form_flex">
                  <div style={{ flex: "1 1 50%" }}>
                    <Form.Item
                      name="address"
                      label="Ünvan"
                      rules={[
                        {
                          required: true,
                          message: "Ünvanı daxil edin",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Ünvanı daxil edin"
                        style={{
                          border: "none",
                        }}
                        size="large"
                      />
                    </Form.Item>
                  </div>
                  <div style={{ flex: "1 1 50%" }}>
                    <Form.Item
                      name="apartment"
                      label="Bina/Mənzil"
                      rules={[
                        {
                          required: true,
                          message: "Daxil edin",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Daxil edin"
                        style={{
                          border: "none",
                        }}
                        size="large"
                      />
                    </Form.Item>
                  </div>
                </div>
                <Form.Item name="comment" label="Kuryer üçün əlavə qeydlər">
                  <Input.TextArea
                    style={{
                      resize: "none",
                      border: "none",
                    }}
                    placeholder="Mətni daxil edin..."
                    cols={5}
                    rows={5}
                    size="large"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      marginTop: "20px",
                      backgroundColor: "#2DD06E",
                      width: "174px",
                      height: "44px",
                    }}
                  >
                    Yadda saxla
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UnregisteredUserAddress;
