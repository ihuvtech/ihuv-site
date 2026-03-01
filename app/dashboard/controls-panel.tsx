"use client";

import { useReactFlow, useViewport } from "@xyflow/react";
import { useCallback, useState } from "react";

interface ControlsPanelProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onDelete: () => void;
  hasSelection: boolean;
  onFitView: () => void;
  addButtonRef: React.RefObject<HTMLButtonElement | null>;
  onAddNodeClick: () => void;
}

export function ControlsPanel({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onDelete,
  hasSelection,
  onFitView,
  addButtonRef,
  onAddNodeClick,
}: ControlsPanelProps) {
  const { zoomIn, zoomOut, zoomTo } = useReactFlow();
  const { zoom } = useViewport();
  const [showZoomMenu, setShowZoomMenu] = useState(false);

  const handleZoomIn = useCallback(() => {
    zoomIn();
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut();
  }, [zoomOut]);

  const handleZoomTo = (level: number) => {
    zoomTo(level);
    setShowZoomMenu(false);
  };

  const zoomOptions = [
    { value: 2, label: "200%" },
    { value: 1.5, label: "150%" },
    { value: 1, label: "100%" },
    { value: 0.5, label: "50%" },
  ];

  return (
    <div className="absolute left-6 top-16 z-10">
      <div className="flex flex-col items-center gap-3">
        {/* Add Node Button */}
        <button
          ref={addButtonRef}
          onClick={onAddNodeClick}
          title="Add Node (Shift+A)"
          className="group relative p-2 text-teal-600 hover:text-teal-700 transition-all duration-200 rounded-full hover:bg-white/80 backdrop-blur-sm"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform drop-shadow-md">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
          </svg>
          <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Add Node
          </div>
        </button>

        <div className="h-px bg-gray-400/30 w-8"></div>

        {/* Zoom Out */}
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 0.1}
          title="Zoom Out (Ctrl+-)"
          className="group relative p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-200 rounded-full hover:bg-white/80 backdrop-blur-sm disabled:hover:bg-transparent"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform drop-shadow-md">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" />
          </svg>
        </button>

        {/* Zoom Percentage */}
        <div className="relative">
          <button
            onClick={() => setShowZoomMenu(!showZoomMenu)}
            className="px-2 py-1 text-xs font-semibold text-gray-700 hover:text-gray-900 transition-all duration-200 min-w-[48px] text-center rounded-full hover:bg-white/80 backdrop-blur-sm"
          >
            {Math.round(zoom * 100)}%
          </button>
          {showZoomMenu && (
            <div className="absolute left-full ml-3 top-0 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 py-1.5 min-w-[120px] z-50">
              {zoomOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleZoomTo(option.value)}
                  className="w-full px-3 py-1.5 text-sm text-left text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                >
                  {option.label}
                </button>
              ))}
              <div className="h-px bg-gray-200 my-1.5"></div>
              <button
                onClick={() => {
                  onFitView();
                  setShowZoomMenu(false);
                }}
                className="w-full px-3 py-1.5 text-sm text-left text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                Zoom to fit
              </button>
            </div>
          )}
        </div>

        {/* Zoom In */}
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 4}
          title="Zoom In (Ctrl++)"
          className="group relative p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-200 rounded-full hover:bg-white/80 backdrop-blur-sm disabled:hover:bg-transparent"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform drop-shadow-md">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm.5-7h-1v2H7v1h2v2h1v-2h2V9h-2z" />
          </svg>
        </button>

        <div className="h-px bg-gray-400/30 w-8"></div>

        {/* Undo */}
        <button
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
          className="group relative p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-200 rounded-full hover:bg-white/80 backdrop-blur-sm disabled:hover:bg-transparent"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform drop-shadow-md">
            <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
          </svg>
        </button>

        {/* Redo */}
        <button
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
          className="group relative p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-200 rounded-full hover:bg-white/80 backdrop-blur-sm disabled:hover:bg-transparent"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform drop-shadow-md">
            <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
          </svg>
        </button>

        <div className="h-px bg-gray-400/30 w-8"></div>

        {/* Delete */}
        <button
          onClick={onDelete}
          disabled={!hasSelection}
          title="Delete (Del)"
          className="group relative p-2 text-gray-600 hover:text-red-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-200 rounded-full hover:bg-white/80 backdrop-blur-sm disabled:hover:bg-transparent"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform drop-shadow-md">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
