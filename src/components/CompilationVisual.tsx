import React from 'react';
import { motion } from 'motion/react';
import { FileCode, Cpu, Play, Terminal as TerminalIcon, ArrowRight } from 'lucide-react';

export function CompilationVisual() {
  return (
    <div className="p-8 rounded-3xl bg-black/40 border border-white/5 space-y-12 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
        {/* Step 1: Source Code */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-3 z-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/10">
            <FileCode className="w-8 h-8" />
          </div>
          <span className="text-sm font-bold text-blue-400">main.c</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">Source Code</span>
        </motion.div>

        {/* Arrow 1 */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="hidden md:block origin-left"
        >
          <ArrowRight className="w-6 h-6 text-gray-700" />
        </motion.div>

        {/* Step 2: Compiler (GCC) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-3 z-10"
        >
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full border border-dashed border-green-500/30"
            />
            <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 shadow-lg shadow-green-500/10">
              <Cpu className="w-10 h-10" />
            </div>
          </div>
          <span className="text-sm font-bold text-green-400">gcc</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">Compiler</span>
        </motion.div>

        {/* Arrow 2 */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="hidden md:block origin-left"
        >
          <ArrowRight className="w-6 h-6 text-gray-700" />
        </motion.div>

        {/* Step 3: Executable */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col items-center gap-3 z-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/10">
            <Play className="w-8 h-8" />
          </div>
          <span className="text-sm font-bold text-purple-400">a.out</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">Executable</span>
        </motion.div>

        {/* Arrow 3 */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="hidden md:block origin-left"
        >
          <ArrowRight className="w-6 h-6 text-gray-700" />
        </motion.div>

        {/* Step 4: Output */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.6 }}
          className="flex flex-col items-center gap-3 z-10"
        >
          <div className="w-24 h-16 rounded-xl bg-gray-800 border border-white/10 flex items-center justify-center text-white font-mono text-xs overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.5 }}
              className="text-green-400"
            >
              Hello, World!
            </motion.div>
          </div>
          <span className="text-sm font-bold text-white">Natija</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">Output</span>
        </motion.div>

        {/* Connecting Line Background */}
        <div className="absolute top-8 left-0 right-0 h-px bg-white/5 -z-0 hidden md:block" />
      </div>

      {/* Explanation Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/5">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="space-y-2"
        >
          <h5 className="text-xs font-bold text-blue-400 uppercase tracking-widest">1. Kod yozish</h5>
          <p className="text-sm text-gray-400 leading-relaxed">
            Siz "main.c" fayliga C tilida buyruqlar yozasiz. Bu matnni siz tushunasiz, lekin kompyuter tushunmaydi.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="space-y-2"
        >
          <h5 className="text-xs font-bold text-green-400 uppercase tracking-widest">2. Tarjima (GCC)</h5>
          <p className="text-sm text-gray-400 leading-relaxed">
            "gcc" buyrug'i siz yozgan kodni kompyuter tushunadigan "0" va "1" larga (ikkilik sanoq tizimiga) o'giradi.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          className="space-y-2"
        >
          <h5 className="text-xs font-bold text-purple-400 uppercase tracking-widest">3. Dastur yaratish</h5>
          <p className="text-sm text-gray-400 leading-relaxed">
            Tarjima tugagach, "a.out" degan tayyor dastur paydo bo'ladi. Bu endi mustaqil ishlay oladigan fayl.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className="space-y-2"
        >
          <h5 className="text-xs font-bold text-white uppercase tracking-widest">4. Ishga tushirish</h5>
          <p className="text-sm text-gray-400 leading-relaxed">
            "./a.out" deb yozganingizda, kompyuter dasturni o'qiydi va natijani ekranda ko'rsatadi.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
