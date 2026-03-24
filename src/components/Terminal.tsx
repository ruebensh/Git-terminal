import React, { useState, useRef, useEffect } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { cn } from '../lib/utils';
import { FileNode } from '../types';

interface TerminalProps {
  initialFS?: FileNode;
}

export function Terminal({ initialFS }: TerminalProps) {
  const { state, executeCommand, saveFile, exitEditor, tabComplete } = useTerminal(initialFS);
  const [input, setInput] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.isEditorOpen && state.editingFile) {
      setEditorContent(state.editingFile.content);
    }
  }, [state.isEditorOpen, state.editingFile]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.output]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const completed = tabComplete(input);
      setInput(completed);
    }
  };

  const handleEditorKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'o') {
      e.preventDefault();
      saveFile(state.editingFile!.name, editorContent);
    } else if (e.ctrlKey && e.key === 'x') {
      e.preventDefault();
      exitEditor();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const start = (e.target as HTMLTextAreaElement).selectionStart;
      const end = (e.target as HTMLTextAreaElement).selectionEnd;
      const newContent = editorContent.substring(0, start) + "    " + editorContent.substring(end);
      setEditorContent(newContent);
      // We can't easily set selection back here without a ref, but it's a good start
    }
  };

  if (state.isEditorOpen && state.editingFile) {
    return (
      <div className="bg-[#000080] text-white font-mono p-0 rounded-lg shadow-2xl h-[500px] flex flex-col border border-gray-400 overflow-hidden">
        <div className="bg-gray-300 text-black px-2 py-1 flex justify-between items-center text-xs font-bold">
          <span>GNU nano 5.4</span>
          <span>{state.editingFile.name}</span>
          <span>Modified</span>
        </div>
        <textarea
          className="flex-1 bg-transparent outline-none p-4 resize-none text-white font-mono text-sm leading-relaxed"
          value={editorContent}
          onChange={(e) => setEditorContent(e.target.value)}
          onKeyDown={handleEditorKeyDown}
          autoFocus
          spellCheck={false}
        />
        <div className="bg-gray-300 text-black p-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-bold">
          <button 
            onClick={() => saveFile(state.editingFile!.name, editorContent)}
            className="bg-gray-400 hover:bg-gray-500 px-2 py-1 rounded border border-gray-600 flex items-center justify-center gap-1"
          >
            <span className="text-blue-800">^O</span> Saqlash
          </button>
          <button 
            onClick={exitEditor}
            className="bg-gray-400 hover:bg-gray-500 px-2 py-1 rounded border border-gray-600 flex items-center justify-center gap-1"
          >
            <span className="text-blue-800">^X</span> Chiqish
          </button>
          <div className="hidden sm:flex items-center justify-center opacity-50">Yordam: F1</div>
          <div className="hidden sm:flex items-center justify-center opacity-50">Qidirish: ^W</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono p-4 rounded-lg shadow-2xl h-[500px] flex flex-col border border-gray-800">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-xs text-gray-500 ml-2">bash — {state.currentPath}</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-700">
        {state.output.map((line, i) => (
          <div key={i} className={cn(
            "whitespace-pre-wrap break-all",
            line.type === 'input' ? "text-green-400" : line.type === 'error' ? "text-red-400" : "text-gray-300"
          )}>
            {line.type === 'input' && <span className="text-blue-400 mr-2">user@linux:{state.currentPath}$</span>}
            {line.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-blue-400 shrink-0">user@linux:{state.currentPath}$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 text-green-400"
          autoFocus
        />
      </form>
    </div>
  );
}
