import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Code, GitBranch, Play } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <Terminal className="w-6 h-6 text-green-500" />
          <span>Linux<span className="text-green-500">Master</span></span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link to="/terminal" className="hover:text-white transition-colors flex items-center gap-1">
            <Terminal className="w-4 h-4" /> Terminal
          </Link>
          <Link to="/c" className="hover:text-white transition-colors flex items-center gap-1">
            <Code className="w-4 h-4" /> C Programming
          </Link>
          <Link to="/git" className="hover:text-white transition-colors flex items-center gap-1">
            <GitBranch className="w-4 h-4" /> Git & GitLab
          </Link>
        </div>

        <Link 
          to="/learn" 
          className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-green-500/20"
        >
          <Play className="w-4 h-4" /> O'rganishni boshlash
        </Link>
      </div>
    </nav>
  );
}
