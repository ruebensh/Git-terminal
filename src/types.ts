export interface FileNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: Record<string, FileNode>;
  permissions?: string;
}

export interface TerminalState {
  currentPath: string;
  fileSystem: FileNode;
  history: string[];
  output: { type: 'input' | 'output' | 'error'; content: string }[];
  currentBranch?: string;
  isEditorOpen?: boolean;
  editingFile?: { name: string; content: string };
}

export interface Command {
  name: string;
  description: string;
  examples: string[];
  category: 'terminal' | 'c' | 'git';
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  initialFileSystem: FileNode;
  goal: string;
  hint?: string;
  checkCompletion: (state: TerminalState) => boolean;
}
