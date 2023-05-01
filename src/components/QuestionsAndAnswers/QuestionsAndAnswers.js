import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Collapse } from "antd";
import { fetchData } from "../../redux/actions/action";
import { connect } from "react-redux";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

const QuestionsAndAnswers = ({ main, fetchData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="frequently_asked">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#" onClick={() => navigate("/")}>
                Ana səhifə
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <span>Tez-tez verilən suallar</span>
            </li>
          </ol>
        </nav>
        <div className="q_and_a">
          <h5>Tez-tez verilən suallar</h5>
          <div className="q_and_a_wrapper">
            {main?.questions_answers?.data?.map((items) => (
              <Collapse
                expandIconPosition="right"
                expandIcon={({ isActive }) => (
                  <span style={{ fontSize: "17px",color:"#4F4F4F",fontWeight:"600" }}>
                    {isActive ? <CloseOutlined /> : < PlusOutlined/>}
                  </span>
                )}
              >
                <Panel header={items.question} key="1">
                  <p>{items.answer}</p>
                </Panel>
              </Collapse>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, { fetchData })(QuestionsAndAnswers);
