import React, { useState, useRef, useEffect } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { cn } from '../lib/utils';
import { FileNode } from '../types';

interface TerminalProps {
  initialFS?: FileNode;
}

export function Terminal({ initialFS }: TerminalProps) {
  const { state, executeCommand } = useTerminal(initialFS);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

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
          className="bg-transparent border-none outline-none flex-1 text-green-400"
          autoFocus
        />
      </form>
    </div>
  );
}
