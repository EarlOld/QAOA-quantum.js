import { Col, Layout, Row, theme } from "antd";

const { Header, Content } = Layout;

declare module "./libs/graph";

import { useEdges } from "./hooks/useEdges.ts";
import Form from "./components/Form/Form.tsx";

import "./App.css";

function App() {
  const {
    edges,
    beta,
    gamma,
    score,
    handleChangeEdge,
    handleAddEdge,
    handleRemoveEdge,
    handleRunQAOA,
  } = useEdges();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="header">QAOA with MAX-CUT - Quantum.js</div>
      </Header>
      <Content>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <p className="text-sm">
            This is a demonstration of the Quantum Approximate Optimization
            Algorithm (QAOA) with the Constrained Optimization BY Linear
            Approximations (COBYLA) method.
          </p>
          <Row gutter={8} style={{ height: "40vh", overflow: 'auto' }}>
            <Col span={10}>
              <canvas
                className="flex-1"
                id="canvasid"
                width="1000px"
                height="700px"
              />
            </Col>
            <Col span={14}>
              <Row gutter={8}>
                <Col span={16}>
                  <p>Add edges</p>
                  <Form
                    edges={edges}
                    handleChangeEdge={handleChangeEdge}
                    handleAddEdge={handleAddEdge}
                    handleRemoveEdge={handleRemoveEdge}
                    handleRunQAOA={handleRunQAOA}
                  />
                </Col>
                <Col span={8}>
                  <p>QAOA Results:</p>
                  <div>Beta: {beta.toString()}</div>
                  <div>Gamma: {gamma.toString()}</div>
                  <div>Score: {score}</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <p>Circuit Graph:</p>
          <div
            style={{ width: "100vw", height: "48vh", overflow: "auto" }}
            id="mpl"
          />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
