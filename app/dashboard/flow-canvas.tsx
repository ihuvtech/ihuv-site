"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { customNodeTypes, type PortfolioNodeData } from "./custom-nodes";
import { ControlsPanel } from "./controls-panel";
import { AddTasksPanel } from "./add-tasks-panel";
import { NodeDetailsPanel } from "./node-details-panel";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = [
  { type: "portfolio", label: "Portfolio", icon: "💼", description: "Display portfolio items", color: "#10b981" },
  { type: "resumes", label: "Resumes", icon: "📋", description: "Manage resume documents", color: "#3b82f6" },
  { type: "update-profile", label: "Update Profile", icon: "👤", description: "Edit profile information", color: "#f59e0b" },
  { type: "update-portfolio", label: "Update Portfolio", icon: "✏️", description: "Edit portfolio content", color: "#8b5cf6" },
];

function FlowCanvasInner({ username }: { username: string }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [addTasksPanelOpen, setAddTasksPanelOpen] = useState(false);
  const [nodeId, setNodeId] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const { fitView, setCenter } = useReactFlow();
  const hasLoadedFromStorage = useRef(false);
  const isCentering = useRef(false);
  
  // Get initial viewport from sessionStorage before first render
  const getInitialViewport = () => {
    if (typeof window !== 'undefined') {
      const savedViewport = sessionStorage.getItem('flow-viewport');
      if (savedViewport) {
        try {
          const parsed = JSON.parse(savedViewport);
          return parsed;
        } catch (e) {
          console.error('Failed to parse viewport:', e);
        }
      }
    }
    return { x: 0, y: 0, zoom: 1 };
  };
  
  const [defaultViewport] = useState(getInitialViewport);

  // Load from sessionStorage on mount (persists on refresh, clears on tab close)
  useEffect(() => {
    const savedNodes = sessionStorage.getItem('flow-nodes');
    const savedEdges = sessionStorage.getItem('flow-edges');
    const savedNodeId = sessionStorage.getItem('flow-nodeId');
    
    if (savedNodes && savedEdges) {
      const parsedNodes = JSON.parse(savedNodes);
      const parsedEdges = JSON.parse(savedEdges);
      setNodes(parsedNodes);
      setEdges(parsedEdges);
      if (savedNodeId) {
        setNodeId(parseInt(savedNodeId));
      }
    }
    hasLoadedFromStorage.current = true;
  }, [setNodes, setEdges]);

  // Save to sessionStorage whenever nodes or edges change
  useEffect(() => {
    if (!hasLoadedFromStorage.current) {
      return;
    }
    
    if (nodes.length === 0 && edges.length === 0) {
      // If canvas is empty, clear nodes/edges but keep viewport
      sessionStorage.removeItem('flow-nodes');
      sessionStorage.removeItem('flow-edges');
      sessionStorage.removeItem('flow-nodeId');
      // Keep viewport so canvas position persists
    } else {
      // Save current state
      sessionStorage.setItem('flow-nodes', JSON.stringify(nodes));
      sessionStorage.setItem('flow-edges', JSON.stringify(edges));
      sessionStorage.setItem('flow-nodeId', nodeId.toString());
    }
  }, [nodes, edges, nodeId]);

  // Save to history when nodes or edges change
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({ nodes, edges });
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [nodes, edges]);

  const handleButtonClick = () => {
    setAddTasksPanelOpen(true);
  };

  const handleNodeSelect = (nodeType: string) => {
    console.log('🎯 handleNodeSelect called:', nodeType);
    const nodeDefinition = nodeTypes.find((n) => n.type === nodeType);
    if (!nodeDefinition) return;

    let position;
    let newEdge = null;
    
    if (nodes.length === 0) {
      // First node: place at center
      position = { x: 0, y: 0 };
    } else {
      // Subsequent nodes: place to the right of the last node
      const lastNode = nodes[nodes.length - 1];
      position = { x: lastNode.position.x + 300, y: lastNode.position.y };
      
      // Create edge connecting to the last node
      newEdge = {
        id: `e${lastNode.id}-${nodeType}-${nodeId}`,
        source: lastNode.id,
        target: `${nodeType}-${nodeId}`,
        type: 'default',
        animated: false,
      };
    }

    const newNode: Node = {
      id: `${nodeType}-${nodeId}`,
      type: "portfolioNode",
      position,
      data: {
        label: nodeDefinition.label,
        icon: nodeDefinition.icon,
        description: nodeDefinition.description,
        type: nodeDefinition.type,
        content: {},
        handlePositions: {
          source: "right" as Position,
          target: "left" as Position,
        },
      },
    };

    setNodes((nds) => [...nds, newNode]);
    if (newEdge) {
      setEdges((eds) => [...eds, newEdge]);
    }
    setNodeId((id) => id + 1);

    // Center on first node with smooth transition
    if (nodes.length === 0) {
      isCentering.current = true;
      // Use requestAnimationFrame to ensure the node is rendered first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCenter(0, 0, { zoom: 1, duration: 800 });
          setTimeout(() => {
            isCentering.current = false;
          }, 850);
        });
      });
    }
  };

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleDelete = () => {
    if (selectedNodeId) {
      // First, clear selection and close panel
      setSelectedNodeId(null);
      setSelectedNodeLabel(null);
      setSelectedNode(null);
      setDetailsPanelOpen(false);
      
      // Then update nodes and edges
      // The save effect will automatically clear sessionStorage if this results in empty canvas
      setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
      setEdges((eds) => eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId));
    }
  };

  const handleFitView = () => {
    fitView({ padding: 0.2, duration: 300 });
  };

  const [selectedNodeLabel, setSelectedNodeLabel] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [panelClosedNodes, setPanelClosedNodes] = useState<Set<string>>(new Set());

  const onSelectionChange = useCallback(({ nodes }: { nodes: Node[] }) => {
    if (nodes.length === 1) {
      const node = nodes[0];
      setSelectedNodeId(node.id);
      setSelectedNodeLabel(node.data.label as string);
      setSelectedNode(node);
      
      // If panel was never closed for this node, open it on single click
      if (!panelClosedNodes.has(node.id)) {
        setDetailsPanelOpen(true);
      }
    } else {
      setSelectedNodeId(null);
      setSelectedNodeLabel(null);
      setSelectedNode(null);
      setDetailsPanelOpen(false);
    }
  }, [panelClosedNodes]);

  const onNodeDoubleClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setDetailsPanelOpen(true);
  }, []);

  return (
    <div className="relative w-full h-full flex">
      {/* Add Tasks Panel */}
      <AddTasksPanel
        open={addTasksPanelOpen}
        onClose={() => setAddTasksPanelOpen(false)}
        onNodeSelect={handleNodeSelect}
      />

      {/* Canvas */}
      <div
        ref={reactFlowWrapper}
        className="flex-1 h-full relative"
      >
        {/* Dynamic Canvas Breadcrumb - Top Left */}
        <div className="absolute top-4 left-6 z-10 flex items-center gap-2 text-sm text-gray-300">
          <span className="font-medium">{username}</span>
          {selectedNodeLabel && (
            <>
              <span className="text-gray-500">&gt;</span>
              <span className="text-white">{selectedNodeLabel}</span>
            </>
          )}
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onSelectionChange={onSelectionChange}
          onNodeDoubleClick={onNodeDoubleClick}
          onMoveEnd={(_, viewport) => {
            // Don't save viewport during centering animation
            if (isCentering.current) {
              return;
            }
            // Always save viewport position when user stops panning/zooming
            sessionStorage.setItem('flow-viewport', JSON.stringify(viewport));
          }}
          nodeTypes={customNodeTypes}
          defaultViewport={defaultViewport}
          fitView={false}
          minZoom={0.1}
          maxZoom={4}
          proOptions={{ hideAttribution: true }}
          style={{ 
            background: "#151821",
            borderTopLeftRadius: "32px",
            overflow: "hidden"
          }}
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1.5} color="#4b5563" />
        </ReactFlow>




      </div>

      {/* Controls Panel - Bottom Left like MaxDome */}
      <ControlsPanel
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onDelete={handleDelete}
        hasSelection={!!selectedNodeId}
        onFitView={handleFitView}
        addButtonRef={addButtonRef}
        onAddNodeClick={handleButtonClick}
      />

      {/* Node Details Panel - Right Side */}
      <NodeDetailsPanel
        node={detailsPanelOpen ? selectedNode : null}
        onClose={() => {
          setDetailsPanelOpen(false);
          // Mark this node as having its panel closed
          if (selectedNodeId) {
            setPanelClosedNodes(prev => new Set(prev).add(selectedNodeId));
          }
        }}
      />
    </div>
  );
}

export default function FlowCanvas({ username }: { username: string }) {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner username={username} />
    </ReactFlowProvider>
  );
}
