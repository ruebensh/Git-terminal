import React from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, Code, GitBranch, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0a0a0a]">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Interactive Learning Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Linux, C va Git'ni <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Amalda O'rganing
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-gray-400 font-light leading-relaxed">
            Haqiqiy terminal simulyatori, amaliy mashqlar va sodda tushuntirishlar orqali 
            dasturlash va tizim boshqaruvini oson o'zlashtiring.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            <Link 
              to="/learn" 
              className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center gap-2 shadow-xl shadow-green-500/20 group"
            >
              Boshlash <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/terminal" 
              className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border border-white/10"
            >
              Terminalni Sinash
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20">
            {[
              { icon: TerminalIcon, title: 'Terminal', desc: 'Linux buyruqlari va fayl tizimi' },
              { icon: Code, title: 'C Dasturlash', desc: 'Algoritmlar va asosiy tushunchalar' },
              { icon: GitBranch, title: 'Git & GitLab', desc: 'Versiya nazorati va jamoaviy ish' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
