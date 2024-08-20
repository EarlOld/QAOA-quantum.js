import { useEffect, useState } from "react";
import { optimizeQAOAWithCOBYLA } from "@earlold/quantum.js";
import { DataSet, Network } from "vis-network/standalone";

let graph: Network | undefined = undefined;

const getNodes = (edges: Array<[number | undefined, number | undefined]>) => {
  return edges.reduce((acc, item) => {
    const newAcc = [...acc];
    if (item[0] !== undefined && !newAcc.includes(item[0])) {
      newAcc.push(item[0]);
    }
    if (item[1] !== undefined && !newAcc.includes(item[1])) {
      newAcc.push(item[1]);
    }
    return newAcc;
  }, [] as number[]);
};

export const drawGraph = (
  source: Array<[number | undefined, number | undefined]>,
  canvasId: string
) => {
  graph?.destroy();

  const nodes = new DataSet(
    getNodes(source).map((index) => ({ id: index, label: index.toString() }))
  );

  const edges = new DataSet(
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
    const nodes = getNodes(edges);

    const { beta, gamma, score } = optimizeQAOAWithCOBYLA(
      nodes,
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
