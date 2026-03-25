import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { TERMINAL_COMMANDS, C_CONCEPTS, GIT_COMMANDS } from '../data/commands';
import { EXERCISES } from '../data/exercises';
import { Terminal } from '../components/Terminal';
import { CompilationVisual } from '../components/CompilationVisual';
import { VariablesVisual } from '../components/VariablesVisual';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Terminal as TerminalIcon, Code, GitBranch, CheckCircle2, Play } from 'lucide-react';
import { cn } from '../lib/utils';

export function Learning() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'c' | 'git' | 'exercises'>('terminal');
  const [selectedItem, setSelectedItem] = useState<any>(TERMINAL_COMMANDS[0]);

  const tabs = [
    { id: 'terminal', label: 'Terminal', icon: TerminalIcon, data: TERMINAL_COMMANDS },
    { id: 'c', label: 'C Programming', icon: Code, data: C_CONCEPTS },
    { id: 'git', label: 'Git & GitLab', icon: GitBranch, data: GIT_COMMANDS },
    { id: 'exercises', label: 'Amaliy Mashqlar', icon: Play, data: EXERCISES }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4">
      <Navbar />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSelectedItem(tab.data[0]);
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  activeTab === tab.id 
                    ? "bg-green-600 text-white shadow-lg shadow-green-500/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-4">Mavzular</h3>
            <div className="space-y-1">
              {tabs.find(t => t.id === activeTab)?.data.map((item: any) => (
                <button
                  key={item.name || item.id}
                  onClick={() => setSelectedItem(item)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-all group",
                    selectedItem === item 
                      ? "bg-white/10 text-white" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{item.name || item.title}</span>
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-transform",
                    selectedItem === item ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  )} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-9 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem?.name || selectedItem?.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    {selectedItem?.name || selectedItem?.title}
                  </h2>
                  <p className="text-gray-400 text-lg font-light leading-relaxed">
                    {selectedItem?.description}
                  </p>
                </div>

                {selectedItem?.name === 'O\'zgaruvchilar (Variables)' && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Vizual ko'rinish</h4>
                    <VariablesVisual />
                  </div>
                )}

                {selectedItem?.name === 'Kompilyatsiya va Ishga tushirish' && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Vizual jarayon</h4>
                    <CompilationVisual />
                  </div>
                )}

                {selectedItem?.examples && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Misollar</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedItem.examples.map((ex: string, i: number) => (
                        <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-sm text-green-400">
                          {ex}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'exercises' && (
                  <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 space-y-4">
                    <div className="flex items-center gap-2 text-green-500 font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                      Vazifa Maqsadi
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {selectedItem?.goal}
                    </p>
                    <div className="pt-4">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Maslahat</h4>
                      <p className="text-gray-400 text-xs italic">{selectedItem?.hint}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Terminal for practice */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-4">
                  <h3 className="text-lg font-bold text-white">Amaliyot</h3>
                  <span className="text-xs text-gray-500">Terminalda buyruqlarni sinab ko'ring</span>
                </div>
                <Terminal initialFS={activeTab === 'exercises' ? selectedItem?.initialFileSystem : undefined} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
