import React, { useState } from "react";
import { Form, Button, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

const MyAddress = () => {
  const [deliveryForm] = useForm();

  return (
    <div className="my__adress_">
      <h5>Çatdırılma ünvanı</h5>
      <div className="delivery_info">
        <Form
          // onFinish={onFinish}
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
                  defaultValue={"Nərimanov rayonu,Təbriz küçəsi"}
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
                  defaultValue={"Bina 10 mənzil 40"}
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
              style={{
                resize: "none",
                border: "none",
              }}
              defaultValue={"Nərimanov metrosunun sağ tərəfi. Qapı kodu 12313A"}
              cols={5}
              rows={5}
              size="large"
            />
          </Form.Item>
          <div className="myInfo_btn">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <EditOutlined style={{ fontSize: "17px" }} />
                Məlumatları yenilə
              </Button>
            </Form.Item>
            {/* <Form.Item>
              <Button type="primary" htmlType="submit">
                <SaveOutlined style={{ fontSize: "17px" }} />
                Yadda saxla
              </Button>
            </Form.Item> */}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MyAddress;
