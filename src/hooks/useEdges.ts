import { useEffect, useState } from "react";
import { Graph, GraphType, Node } from "../libs/graph.ts";
import { optimizeQAOAWithCOBYLA } from "@earlold/quantum.js/library/utils/QAOA/index.ts";

const getSquereCoordsByIndex = (index: number) => {
  const x = index % 3;
  const y = Math.floor(index / 3);

  return [x * 50 + 50, y * 50 + 50];
};

let graph: GraphType;

export const drawGraph = (
  edges: Array<[number | undefined, number | undefined]>,
  canvasId: string
) => {
  if (graph == undefined) {
    graph = new Graph(canvasId);
  }

  graph.clear();

  const ghNodes: Node[] = edges.map((_, index) => {
    const [x, y] = getSquereCoordsByIndex(index);
    return graph.node(x, y, 15, index.toString());
  });

  console.log("ghNodes", ghNodes);

  edges.forEach(([source, target]) => {
    if (source === undefined || target === undefined) return;
    ghNodes[source].connect(ghNodes[target]);
  });
};

export const useEdges = () => {
  const [edges, setEdges] = useState<Array<[number, number]>>(
    JSON.parse(localStorage.getItem("edges") || "[[0,0]]") || [[0, 0]]
  );

  const [beta, setBeta] = useState<number[]>([]);
  const [gamma, setGamma] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    // save edges to local storage
    localStorage.setItem("edges", JSON.stringify(edges));
  }, [edges]);

  const handleChangeEdge = (index: number, subIndex: number, value: number) => {
    const newEdges = [...edges];
    newEdges[index][subIndex] = value;
    setEdges(newEdges);
  };

  const handleAddEdge = () => {
    setEdges([...edges, [0, 0]]);
  };

  const handleRemoveEdge = (index: number) => {
    const newEdges = [...edges];
    newEdges.splice(index, 1);
    setEdges(newEdges);
  };

  const handleRunQAOA = () => {
    const { beta, gamma, score } = optimizeQAOAWithCOBYLA(
      edges.map((_, index) => index),
      edges,
      1,
      "mpl"
    );

    setBeta(beta);
    setGamma(gamma);
    setScore(score);
  };

  return {
    edges,
    beta,
    gamma,
    score,
    handleChangeEdge,
    handleAddEdge,
    handleRemoveEdge,
    handleRunQAOA,
  };
};
