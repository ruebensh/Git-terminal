import React from 'react';
import { motion } from 'motion/react';
import { Box, Hash, Type, Percent } from 'lucide-react';

export function VariablesVisual() {
  const containers = [
    { type: 'int', name: 'yosh', value: '10', icon: Hash, color: 'blue' },
    { type: 'char', name: 'harf', value: "'S'", icon: Type, color: 'green' },
    { type: 'float', name: 'vazn', value: '35.5', icon: Percent, color: 'purple' },
  ];

  return (
    <div className="p-8 rounded-3xl bg-black/40 border border-white/5 space-y-8 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {containers.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/20 border border-${item.color}-500/40 flex items-center justify-center text-${item.color}-400`}>
              <item.icon className="w-6 h-6" />
            </div>
            
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.type}</span>
              <h5 className="text-lg font-bold text-white">{item.name}</h5>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 + 0.5, type: 'spring' }}
              className={`px-4 py-2 rounded-lg bg-${item.color}-500/10 border border-${item.color}-500/20 text-${item.color}-400 font-mono font-bold`}
            >
              {item.value}
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      <p className="text-sm text-gray-400 text-center italic">
        "O'zgaruvchilar - bu ma'lumotlarni saqlash uchun ishlatiladigan nomlangan idishlardir."
      </p>
    </div>
  );
}
