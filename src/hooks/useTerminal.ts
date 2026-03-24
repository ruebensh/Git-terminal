import { useState, useCallback, useEffect } from 'react';
import { FileNode, TerminalState } from '../types';

const INITIAL_FS: FileNode = {
  name: '/',
  type: 'directory',
  children: {
    'home': {
      name: 'home',
      type: 'directory',
      children: {
        'user': {
          name: 'user',
          type: 'directory',
          children: {
            'projects': {
              name: 'projects',
              type: 'directory',
              children: {}
            }
          }
        }
      }
    }
  }
};

export function useTerminal(initialFS?: FileNode) {
  const [state, setState] = useState<TerminalState>({
    currentPath: '/home/user',
    fileSystem: initialFS || INITIAL_FS,
    history: [],
    output: [{ type: 'output', content: 'Welcome to the Interactive Learning Terminal!' }, { type: 'output', content: 'Type "help" to see available commands.' }],
    currentBranch: 'main'
  });

  useEffect(() => {
    if (initialFS) {
      setState(prev => ({
        ...prev,
        fileSystem: initialFS,
        output: [{ type: 'output', content: 'Vazifa yuklandi. Ishni boshlashingiz mumkin.' }],
        history: [],
        currentPath: '/home/user',
        currentBranch: 'main'
      }));
    }
  }, [initialFS]);

  const getDir = useCallback((path: string, fs: FileNode): FileNode | null => {
    if (path === '/') return fs;
    const parts = path.split('/').filter(Boolean);
    let current = fs;
    for (const part of parts) {
      if (current.children && current.children[part]) {
        current = current.children[part];
      } else {
        return null;
      }
    }
    return current;
  }, []);

  const saveFile = useCallback((name: string, content: string) => {
    setState(prev => {
      const newFS = { ...prev.fileSystem };
      const dir = getDir(prev.currentPath, newFS);
      if (dir && dir.children) {
        dir.children[name] = {
          name,
          type: 'file',
          content,
          permissions: '644'
        };
      }
      return {
        ...prev,
        fileSystem: newFS,
        isEditorOpen: false,
        editingFile: undefined,
        output: [...prev.output, { type: 'output', content: `File '${name}' saved.` }]
      };
    });
  }, [getDir]);

  const exitEditor = useCallback(() => {
    setState(prev => ({ ...prev, isEditorOpen: false, editingFile: undefined }));
  }, []);

  const tabComplete = useCallback((input: string): string => {
    const parts = input.split(/\s+/);
    const cmd = parts[0];
    const lastPart = parts[parts.length - 1];
    
    // If it's just the command part, we could suggest commands, but let's focus on files for now
    if (parts.length === 1 && !input.endsWith(' ')) {
      const commands = ['ls', 'cd', 'cat', 'mkdir', 'touch', 'pwd', 'clear', 'git', 'help', 'gcc', 'chmod', 'nano', 'mv', 'cp', 'rm'];
      const matches = commands.filter(c => c.startsWith(cmd));
      if (matches.length === 1) return matches[0] + ' ';
      return input;
    }

    const dir = getDir(state.currentPath, state.fileSystem);
    if (!dir || !dir.children) return input;

    let entries = Object.keys(dir.children);

    // Context-aware filtering
    if (cmd === 'cd') {
      entries = entries.filter(name => dir.children![name].type === 'directory');
    } else if (cmd === 'gcc') {
      entries = entries.filter(name => name.endsWith('.c'));
    } else if (cmd === 'nano' || cmd === 'cat') {
      entries = entries.filter(name => dir.children![name].type === 'file');
    }

    const matches = entries.filter(name => name.startsWith(lastPart));
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0];
      return parts.join(' ');
    }
    return input;
  }, [state.currentPath, state.fileSystem, getDir]);

  const executeCommand = useCallback((input: string) => {
    const [cmd, ...args] = input.trim().split(/\s+/);
    if (!cmd) return;

    setState(prev => ({
      ...prev,
      history: [...prev.history, input],
      output: [...prev.output, { type: 'input', content: input }]
    }));

    const addOutput = (content: string, type: 'output' | 'error' = 'output') => {
      setState(prev => ({
        ...prev,
        output: [...prev.output, { type, content }]
      }));
    };

    switch (cmd) {
      case 'nano': {
        const name = args[0];
        if (!name) {
          addOutput('nano: missing filename', 'error');
          break;
        }
        const dir = getDir(state.currentPath, state.fileSystem);
        const file = dir?.children?.[name];
        setState(prev => ({
          ...prev,
          isEditorOpen: true,
          editingFile: {
            name,
            content: file?.content || ''
          }
        }));
        break;
      }
      case 'help':
        addOutput('Available commands: ls, cd, cat, mkdir, touch, pwd, clear, git, help, gcc, chmod, nano');
        addOutput('Maslahat: "Tab" tugmasini bosib, buyruq yoki fayl nomini avtomatik to\'ldirishingiz mumkin.');
        break;
      case 'clear':
        setState(prev => ({ ...prev, output: [] }));
        break;
      case 'pwd':
        addOutput(state.currentPath);
        break;
      case 'ls': {
        const dir = getDir(state.currentPath, state.fileSystem);
        if (dir && dir.children) {
          const showAll = args.includes('-a');
          const longFormat = args.includes('-l');
          
          let entries = Object.keys(dir.children);
          if (showAll) entries = ['.', '..', ...entries];
          
          if (longFormat) {
            const output = entries.map(name => {
              const node = dir.children?.[name] || { type: 'directory' };
              const type = node.type === 'directory' ? 'd' : '-';
              return `${type}rwxr-xr-x  user  group  4096  Mar 24 19:34  ${name}`;
            }).join('\n');
            addOutput(output || '(empty directory)');
          } else {
            addOutput(entries.join('  ') || '(empty directory)');
          }
        }
        break;
      }
      case 'mv': {
        const [src, dest] = args;
        if (!src || !dest) {
          addOutput('mv: missing file operand', 'error');
          break;
        }
        const dir = getDir(state.currentPath, state.fileSystem);
        if (dir && dir.children && dir.children[src]) {
          dir.children[dest] = { ...dir.children[src], name: dest };
          delete dir.children[src];
          addOutput(`Moved/Renamed ${src} to ${dest}`);
        } else {
          addOutput(`mv: cannot stat '${src}': No such file or directory`, 'error');
        }
        break;
      }
      case 'rm': {
        const name = args.find(a => !a.startsWith('-'));
        const recursive = args.includes('-r') || args.includes('-rf');
        if (!name) {
          addOutput('rm: missing operand', 'error');
          break;
        }
        const dir = getDir(state.currentPath, state.fileSystem);
        if (dir && dir.children && dir.children[name]) {
          if (dir.children[name].type === 'directory' && !recursive) {
            addOutput(`rm: cannot remove '${name}': Is a directory`, 'error');
          } else {
            delete dir.children[name];
            addOutput(`Removed: ${name}`);
          }
        } else {
          addOutput(`rm: cannot remove '${name}': No such file or directory`, 'error');
        }
        break;
      }
      case 'cp': {
        const [src, dest] = args;
        if (!src || !dest) {
          addOutput('cp: missing file operand', 'error');
          break;
        }
        const dir = getDir(state.currentPath, state.fileSystem);
        if (dir && dir.children && dir.children[src]) {
          dir.children[dest] = JSON.parse(JSON.stringify(dir.children[src]));
          dir.children[dest].name = dest;
          addOutput(`Copied ${src} to ${dest}`);
        } else {
          addOutput(`cp: cannot stat '${src}': No such file or directory`, 'error');
        }
        break;
      }
      case 'cd': {
        const target = args[0] || '/home/user';
        let newPath = '';
        if (target === '..') {
          const parts = state.currentPath.split('/').filter(Boolean);
          parts.pop();
          newPath = '/' + parts.join('/');
        } else if (target.startsWith('/')) {
          newPath = target;
        } else {
          newPath = (state.currentPath === '/' ? '' : state.currentPath) + '/' + target;
        }
        
        if (getDir(newPath, state.fileSystem)) {
          setState(prev => ({ ...prev, currentPath: newPath }));
        } else {
          addOutput(`cd: no such directory: ${target}`, 'error');
        }
        break;
      }
      case 'mkdir': {
        const name = args[0];
        if (!name) {
          addOutput('mkdir: missing operand', 'error');
          break;
        }
        // Simplified mkdir logic
        const dir = getDir(state.currentPath, state.fileSystem);
        if (dir && dir.children) {
          if (dir.children[name]) {
            addOutput(`mkdir: cannot create directory '${name}': File exists`, 'error');
          } else {
            dir.children[name] = { name, type: 'directory', children: {} };
            addOutput(`Created directory: ${name}`);
          }
        }
        break;
      }
      case 'touch': {
        const name = args[0];
        if (!name) {
          addOutput('touch: missing operand', 'error');
          break;
        }
        const dir = getDir(state.currentPath, state.fileSystem);
        if (dir && dir.children) {
          dir.children[name] = { name, type: 'file', content: '' };
          addOutput(`Created file: ${name}`);
        }
        break;
      }
      case 'cat': {
        const name = args[0];
        if (!name) {
          addOutput('cat: missing operand', 'error');
          break;
        }
        const dir = getDir(state.currentPath, state.fileSystem);
        if (dir && dir.children && dir.children[name]) {
          if (dir.children[name].type === 'file') {
            addOutput(dir.children[name].content || '(empty file)');
          } else {
            addOutput(`cat: ${name}: Is a directory`, 'error');
          }
        } else {
          addOutput(`cat: ${name}: No such file or directory`, 'error');
        }
        break;
      }
      case 'gcc': {
        const name = args.find(a => !a.startsWith('-'));
        const outputArgIndex = args.indexOf('-o');
        const outputName = outputArgIndex !== -1 ? args[outputArgIndex + 1] : 'a.out';
        
        if (!name) {
          addOutput('gcc: fatal error: no input files', 'error');
          break;
        }
        
        const dir = getDir(state.currentPath, state.fileSystem);
        if (dir && dir.children && dir.children[name]) {
          if (dir.children[name].type === 'file') {
            addOutput(`Compiling ${name}...`);
            dir.children[outputName] = { name: outputName, type: 'file', content: 'Binary executable content' };
            addOutput(`Compilation successful. Output: ${outputName}`);
          } else {
            addOutput(`gcc: error: ${name}: Is a directory`, 'error');
          }
        } else {
          addOutput(`gcc: error: ${name}: No such file or directory`, 'error');
        }
        break;
      }
      case 'git': {
        const sub = args[0];
        if (sub === 'clone') {
          const url = args[1];
          if (!url) {
            addOutput('git clone: missing URL', 'error');
            break;
          }
          addOutput(`Cloning into '${url.split('/').pop()}'...`);
          addOutput('remote: Enumerating objects: 12, done.');
          addOutput('remote: Counting objects: 100% (12/12), done.');
          addOutput('Receiving objects: 100% (12/12), 1.2 KiB | 1.2 MiB/s, done.');
          
          if (url.includes('gitlab.com/linux-learning/exercise-1')) {
            const dir = getDir(state.currentPath, state.fileSystem);
            if (dir && dir.children) {
              dir.children['exercise-1'] = {
                name: 'exercise-1',
                type: 'directory',
                children: {
                  'main.c': {
                    name: 'main.c',
                    type: 'file',
                    content: '#include <stdio.h>\n\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}\n'
                  },
                  '.git': { name: '.git', type: 'directory', children: {} }
                }
              };
            }
          }
        } else if (sub === 'status') {
          addOutput(`On branch ${state.currentBranch}\nYour branch is up to date with 'origin/${state.currentBranch}'.\n\nnothing to commit, working tree clean`);
        } else if (sub === 'checkout') {
          const isNew = args[1] === '-b';
          const branchName = isNew ? args[2] : args[1];
          if (!branchName) {
            addOutput('git checkout: branch name required', 'error');
            break;
          }
          setState(prev => ({ ...prev, currentBranch: branchName }));
          addOutput(isNew ? `Switched to a new branch '${branchName}'` : `Switched to branch '${branchName}'`);
        } else if (sub === 'branch') {
          addOutput(`* ${state.currentBranch}`);
        } else if (sub === 'merge') {
          const target = args[1];
          if (!target) {
            addOutput('git merge: branch name required', 'error');
            break;
          }
          addOutput(`Updating 7a2b3c4..d5e6f7g\nFast-forward\n main.c | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)`);
          addOutput(`Merged ${target} into ${state.currentBranch}`);
        } else if (sub === 'add') {
          addOutput('Changes added to index.');
        } else if (sub === 'commit') {
          const msg = args.slice(1).join(' ');
          addOutput(`[${state.currentBranch} ${Math.random().toString(36).substring(7)}] ${msg || 'Update'}\n 1 file changed, 1 insertion(+), 1 deletion(-)`);
        } else if (sub === 'push') {
          const remote = args[1];
          const branch = args[2];
          if (!remote || !branch) {
            addOutput('git push: remote and branch required', 'error');
            break;
          }
          addOutput(`Pushing to ${remote} ${branch}...`);
          addOutput('Total 3 (delta 2), reused 0 (delta 0), pack-reused 0');
          addOutput(`To ${remote}\n   a1b2c3d..e5f6g7h  ${branch} -> ${branch}`);
        } else {
          addOutput(`git: unknown command: ${sub}`, 'error');
        }
        break;
      }
      case 'chmod': {
        const mode = args[0];
        const name = args[1];
        if (!mode || !name) {
          addOutput('chmod: missing operand', 'error');
          break;
        }
        const dir = getDir(state.currentPath, state.fileSystem);
        if (dir && dir.children && dir.children[name]) {
          dir.children[name].permissions = mode;
          addOutput(`Permissions for '${name}' set to ${mode}`);
        } else {
          addOutput(`chmod: cannot access '${name}': No such file or directory`, 'error');
        }
        break;
      }
      default: {
        if (cmd.startsWith('./')) {
          const name = cmd.substring(2);
          const dir = getDir(state.currentPath, state.fileSystem);
          const file = dir?.children?.[name];
          if (file && file.type === 'file') {
            if (file.permissions && (file.permissions.includes('x') || file.permissions === '777' || file.permissions === '+x')) {
              addOutput(`Running ${name}...`);
              addOutput('Hello, World!');
            } else {
              addOutput(`bash: ./${name}: Permission denied`, 'error');
            }
          } else {
            addOutput(`bash: ./${name}: No such file or directory`, 'error');
          }
        } else {
          addOutput(`bash: ${cmd}: command not found`, 'error');
        }
      }
    }
  }, [state.currentPath, state.fileSystem, getDir]);

  return { state, executeCommand, saveFile, exitEditor, tabComplete };
}
