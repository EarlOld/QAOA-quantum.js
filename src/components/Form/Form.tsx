import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import { drawGraph } from "../../hooks/useEdges";

interface FormProps {
  handleChangeEdge: (index: number, position: number, value: number) => void;
  handleAddEdge: () => void;
  handleRunQAOA: () => void;
  handleRemoveEdge: (index: number) => void;
  edges: Array<[number | undefined, number | undefined]>;
}

const Form = ({
  handleChangeEdge,
  handleAddEdge,
  handleRemoveEdge,
  handleRunQAOA,
  edges,
}: FormProps) => {
  const handleDraw = () => {
    drawGraph(edges, "canvasid");
  };
  return (
    <div>
      {edges.map(([source, target], index) => (
        <Row key={index} gutter={8} style={{ margin: "4px 0" }} wrap={false}>
          <Col span={4}>
            <Input
              type="number"
              value={source}
              onChange={(e) =>
                handleChangeEdge(index, 0, parseInt(e.target.value))
              }
            />
          </Col>
          <Col span={4}>
            <Input
              type="number"
              value={target}
              onChange={(e) =>
                handleChangeEdge(index, 1, parseInt(e.target.value))
              }
            />
          </Col>

          <Col span={4}>
            <Row gutter={8} wrap={false}>
              {edges.length > 1 && (
                <Col>
                  <Button
                    danger
                    onClick={() => handleRemoveEdge(index)}
                    icon={<DeleteOutlined />}
                  />
                </Col>
              )}
              {index === edges.length - 1 && (
                <Col>
                  <Button onClick={handleAddEdge}>Add edge</Button>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      ))}
      <Row gutter={8} wrap={false}>
        <Col>
          <Button type="primary" onClick={handleDraw}>
            Draw graph
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handleRunQAOA}>
            Run QAOA
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Form;
