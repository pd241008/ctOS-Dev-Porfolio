export interface FSFile {
  type: "file";
  content: string;
  asyncContent?: () => Promise<string>;
}

export interface FSDir {
  type: "dir";
  children: Record<string, FSNode>;
}

export type FSNode = FSFile | FSDir;

export interface TerminalContext {
  cwd: string[];
  setCwd: (path: string[]) => void;
  history: string[];
  setHistory: (history: string[]) => void;
  setInput: (input: string) => void;
  switchToGui: () => void;
  onMinimize: () => void;
  router: { push: (path: string) => void };
  currentPath: string;
}

export type CommandHandler = (
  args: string[],
  context: TerminalContext
) => string[] | void | Promise<string[] | void>;
