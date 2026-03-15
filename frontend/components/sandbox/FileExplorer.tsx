"use client";

import { useState, useMemo } from "react";
import { SandboxFile } from "@/lib/sandbox";

interface FileExplorerProps {
  files: Record<string, SandboxFile>;
  activeFile: string;
  onSelect: (name: string) => void;
}

interface TreeNode {
  name: string;
  fullName: string;
  type: "file" | "dir";
  children?: TreeNode[];
  file?: SandboxFile;
}

export default function FileExplorer({
  files,
  activeFile,
  onSelect,
}: FileExplorerProps) {
  // Convert flat record to nested tree structure
  const tree = useMemo(() => {
    const root: TreeNode = { name: "sandbox-project", fullName: "", type: "dir", children: [] };

    Object.entries(files).forEach(([path, file]) => {
      const parts = path.split("/");
      let current = root;

      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1;
        const fullName = parts.slice(0, index + 1).join("/");
        
        let existing = current.children?.find((c) => c.name === part);

        if (!existing) {
          existing = {
            name: part,
            fullName,
            type: isLast ? "file" : "dir",
            children: isLast ? undefined : [],
            file: isLast ? file : undefined,
          };
          current.children?.push(existing);
        }
        current = existing;
      });
    });

    // Sort: directories first, then files alphabetically
    const sortNodes = (nodes?: TreeNode[]) => {
      if (!nodes) return;
      nodes.sort((a, b) => {
        if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
      nodes.forEach((n) => sortNodes(n.children));
    };
    sortNodes(root.children);

    return root;
  }, [files]);

  return (
    <div className="w-64 shrink-0 border-r border-purple-500/30 flex flex-col bg-zinc-950/50">
      <div className="px-3 py-2 text-[10px] text-purple-500 font-bold uppercase tracking-widest border-b border-purple-500/20 flex items-center justify-between">
        <span>📁 explorer</span>
        <span className="text-[8px] text-zinc-600">v1.0.4</span>
      </div>
      <div className="flex-1 py-1 overflow-y-auto custom-scrollbar">
        {tree.children?.map((node) => (
          <FileNode
            key={node.fullName}
            node={node}
            depth={0}
            activeFile={activeFile}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function FileNode({
  node,
  depth,
  activeFile,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  activeFile: string;
  onSelect: (name: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const isActive = activeFile === node.fullName;

  if (node.type === "dir") {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-3 py-1.5 text-[11px] font-bold text-zinc-500 hover:text-purple-400 hover:bg-purple-900/10 transition-colors flex items-center gap-1.5 cursor-pointer uppercase tracking-tight"
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
        >
          <span className="text-[10px] transition-transform duration-200" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            ▶
          </span>
          <span className="opacity-70">📁</span>
          <span className="truncate">{node.name}</span>
        </button>
        {isOpen && (
          <div className="flex flex-col">
            {node.children?.map((child) => (
              <FileNode
                key={child.fullName}
                node={child}
                depth={depth + 1}
                activeFile={activeFile}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelect(node.fullName)}
      className={`w-full text-left px-3 py-1.5 text-[11px] font-mono flex items-center gap-2 transition-all cursor-pointer border-l-2 ${
        isActive
          ? "bg-purple-900/30 text-purple-200 border-purple-500 shadow-[inset_4px_0_8px_-4px_rgba(168,85,247,0.4)]"
          : "text-zinc-500 hover:text-purple-300 hover:bg-purple-900/10 border-transparent"
      }`}
      style={{ paddingLeft: `${depth * 12 + 24}px` }}
    >
      <span className="text-[10px] shrink-0 grayscale group-hover:grayscale-0">
        {node.file?.locked ? "🔒" : "📄"}
      </span>
      <span className="truncate">{node.name}</span>
    </button>
  );
}
