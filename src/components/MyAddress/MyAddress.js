import React, { useState, useEffect } from "react";
import { Form, Button, Input, Select, notification, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import axios from "axios";

const MyAddress = () => {
  const [deliveryForm] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [isEmptyForm, setIsEmptyForm] = useState(true);
  const [user, setUser] = useState([]);

  const id = localStorage.getItem("current_id");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get(`http://localhost:8001/users/${id}`).then((res) => {
      const user = res.data;
      setUser(user);
      deliveryForm.setFieldsValue(user.addresses[0]);
    });
  };
  const onFinish = async (values) => {
    if (user.length === 0) {
      await axios
        .post(`http://localhost:8001/users/${id}`, {
          ...user,
          addresses: [
            {
              address: values.address,
              apartment: values.apartment,
              comment: values.comment,
            },
          ],
        })
        .then((res) => {
          notification.open({
            type: "success",
            message: "Məlumatlar uğurla göndərildi!",
          });
          setEditMode(false);
        })
        .catch((err) => {
          message.error("Xəta baş verdi");
        });
    } else {
      await axios
        .put(`http://localhost:8001/users/${id}`, {
          ...user,
          addresses: [
            {
              address: values.address,
              apartment: values.apartment,
              comment: values.comment,
            },
          ],
        })
        .then((res) => {
          notification.open({
            type: "success",
            message: "Məlumatlar uğurla göndərildi!",
          });
          setEditMode(false);
        })
        .catch((err) => {
          message.error("Xəta baş verdi");
        });
    }
  };

  useEffect(() => {
    const isFormEmpty = Object.values(deliveryForm.getFieldsValue()).every(
      (value) => !value
    );
    setIsEmptyForm(isFormEmpty);
  }, [deliveryForm]);

  const handleEditButtonClick = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  return (
    <div className="my__adress_">
      <h5>Çatdırılma ünvanı</h5>
      <div className="delivery_info">
        <Form
          onFinish={onFinish}
          style={{
            maxWidth: 800,
            width: "100%",
          }}
          form={deliveryForm}
          layout="vertical"
        >
          <div className="form_flex">
            <div style={{ flex: "1 1 50%" }}>
              <Form.Item name="address" label="Ünvan">
                <Input
                  placeholder="Ünvanınızı daxil edin"
                  disabled={!editMode}
                  style={{
                    border: "none",
                    padding: "14px",
                  }}
                  size="large"
                />
              </Form.Item>
            </div>
            <div style={{ flex: "1 1 50%" }}>
              <Form.Item name="apartment" label="Bina/Mənzil">
                <Input
                  placeholder="Yaşadığınız bina və mənzili daxil edin"
                  disabled={!editMode}
                  style={{
                    border: "none",
                    padding: "14px",
                  }}
                  size="large"
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item name="comment" label="Kuryer üçün əlavə qeydlər">
            <Input.TextArea
              placeholder="Kuryer üçün əlavə qeydlərinizi daxil edin"
              style={{
                resize: "none",
                border: "none",
              }}
              disabled={!editMode}
              cols={5}
              rows={5}
              size="large"
            />
          </Form.Item>
          <div className="myInfo_btn">
            <Form.Item>
              {isEmptyForm && editMode ? (
                <Button type="primary" htmlType="submit">
                  <SaveOutlined style={{ fontSize: "17px" }} />
                  Yadda saxla
                </Button>
              ) : (
                <Button type="primary" onClick={handleEditButtonClick}>
                  <EditOutlined style={{ fontSize: "17px" }} />
                  Məlumatları yenilə
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MyAddress;
