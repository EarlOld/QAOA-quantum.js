// let graph = new Graph("canvasid");
// let node1 = graph.node(100, 100, 25, "node1");
// let node2 = graph.node(200, 200, 25, "node2");
// node1.connect(node2, 25) //created a connection with a weight of 25

import Graph from "./graph.js";

export interface Node {
  x: number;
  y: number;
  r: number;
  name: string;
  connect: (node: Node, weight?: number) => any;
}

export interface GraphType {
  constructor: (canvasId: string) => GraphType;
  node: (x: number, y: number, r: number, name: string) => any;
  edge: (source: any, target: any, weight: number) => any;
  clear: () => any;
  delete: () => any;
}

export { Graph };
