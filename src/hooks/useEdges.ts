import { useEffect, useState } from "react";
import { optimizeQAOAWithCOBYLA } from "@earlold/quantum.js/library";
import { DataSet, Network } from "vis-network/standalone";

const getSquereCoordsByIndex = (index: number) => {
  const x = index % 3;
  const y = Math.floor(index / 3);

  return [x * 50 + 50, y * 50 + 50];
};

let graph: Network | undefined = undefined;
// @ts-ignore
let edges, nodes;

export const drawGraph = (
  source: Array<[number | undefined, number | undefined]>,
  canvasId: string
) => {
  graph?.destroy();
  // @ts-ignore
  nodes?.clear();
  // @ts-ignore
  edges?.clear();

  nodes = new DataSet(source.map((_, index) => ({ id: index, label: index })));

  edges = new DataSet(
    source.map(([source, target], index) => ({
      from: source,
      to: target,
      id: `${source}-${target}-${index}`,
    }))
  );

  const container = document.getElementById(canvasId);
  const data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {};
  // @ts-ignore
  graph = new Network(container!, data, options);
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
