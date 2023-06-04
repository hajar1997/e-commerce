import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Form, Button, Input, notification, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import axios from "axios";

const ClickedAddressEdit = ({setUsers,users,setEditAddressClicked,editAddressClicked}) => {
  const [deliveryForm] = useForm();
  const [initialValues, setInitialValues] = useState({});

  const id = localStorage.getItem("current_id");
  
  const onFinishAddress = async (values) => {
    const user = users[0];
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
          message: "Məlumatlar uğurla dəyişdirildi!",
        });
        setEditAddressClicked(false);
      })
      .catch((err) => {
        message.error("Xəta baş verdi");
      });
  };

  const getData = async () => {
    await axios.get(`http://localhost:8001/users/${id}`).then((res) => {
      const user = res.data;
      setUsers([user]);
      const initialValues = {
        address: user.addresses[0].address,
        apartment: user.addresses[0].apartment,
        comment: user.addresses[0].comment,
      };
      setInitialValues(initialValues);
      deliveryForm.setFieldsValue(initialValues);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="payment__header mb-3">
        <h6> 2. Çatdırılma</h6>
      </div>
      <Form
        onFinish={onFinishAddress}
        style={{
          maxWidth: 800,
          width: "100%",
        }}
        form={deliveryForm}
        initialValues={initialValues}
        layout="vertical"
      >
        <div className="form_flex">
          <div style={{ flex: "1 1 50%" }}>
            <Form.Item name="address" label="Ünvan">
              <Input
                placeholder="Ünvanınızı daxil edin"
                disabled={!editAddressClicked}
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
                disabled={!editAddressClicked}
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
            disabled={!editAddressClicked}
            cols={5}
            rows={5}
            size="large"
          />
        </Form.Item>
        <div className="myInfo_btn">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <SaveOutlined style={{ fontSize: "17px" }} />
              Yadda saxla
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ClickedAddressEdit;
