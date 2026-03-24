import React from 'react';
import { Terminal } from '../components/Terminal';
import { Navbar } from '../components/Navbar';
import { motion } from 'motion/react';

export function TerminalPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4">
      <Navbar />
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-white tracking-tight">Terminal Simulyatori</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Linux buyruqlarini xavfsiz muhitda sinab ko'ring. 
            `ls`, `cd`, `mkdir`, `touch` va boshqa buyruqlarni ishlatib ko'ring.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Terminal />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Tezkor Buyruqlar</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><code className="text-green-400">ls</code> - Fayllarni ko'rish</li>
              <li><code className="text-green-400">cd [papka]</code> - Papkaga kirish</li>
              <li><code className="text-green-400">mkdir [nom]</code> - Yangi papka ochish</li>
              <li><code className="text-green-400">touch [nom]</code> - Yangi fayl ochish</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Maslahat</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Terminalda ishlashni o'rganish uchun yuqoridagi "O'rganishni boshlash" 
              tugmasini bosing. U erda har bir buyruq uchun amaliy mashqlar mavjud.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
