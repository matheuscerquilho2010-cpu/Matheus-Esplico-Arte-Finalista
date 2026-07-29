import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Briefcase, ShoppingCart, MessageCircle, X, Printer, Shirt } from 'lucide-react';

export default function Hero() {
  const [showCatalogs, setShowCatalogs] = useState(false);

  return (
    <section id="home" className="relative pt-12 pb-8 overflow-hidden px-6">
      <div className="w-full z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center"
        >
          {/* Profile Image */}
          <div className="relative mb-6 group">
            <div className="absolute inset-0 bg-brand-blue rounded-full blur-xl opacity-30 transition-opacity duration-500" />
            <div className="w-28 h-28 rounded-full bg-white/5 border-[3px] border-white/10 flex items-center justify-center overflow-hidden relative z-10 shadow-xl">
              <img src="https://drive.google.com/thumbnail?id=1sxVXzAT8gz1al7MxmoYg0XAXto1Kfsor&sz=w600-h600" alt="MTS Arte Finalista" className="w-full h-full object-cover" />
            </div>
            
            {/* Online Badge */}
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-brand-green rounded-full border-[3px] border-[#0a0a0a] z-20" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center gap-1 mb-4"
          >
            <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-[10px] font-bold uppercase tracking-widest text-brand-blue">
              <Sparkles size={12} />
              Matheus Esplicido
            </div>
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/50">Designer Arte Finalista</span>
          </motion.div>
          
          <h1 className="text-3xl font-bold tracking-tight mb-3 leading-tight text-white">
            Transformo ideias em <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8FF] to-blue-300">artes prontas</span>.
          </h1>
          
          <p className="text-white/60 text-sm mb-8 leading-relaxed px-4">
            Especialista em fechamento de arquivos, criação de estampas e organização de produção para confecções.
          </p>

          {/* Linktree style buttons */}
          <div className="flex flex-col gap-3 w-full max-w-[300px]">
            <a
              href="https://wa.me/5515996526796"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 rounded-2xl bg-brand-green hover:bg-[#1ebd5a] text-white font-semibold transition-all flex items-center justify-between shadow-[0_0_15px_rgba(37,211,102,0.2)] hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-3">
                <MessageCircle size={20} />
                <span>Fazer Orçamento</span>
              </div>
              <ArrowRight size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="#portfolio"
              className="w-full p-4 rounded-2xl glass hover:bg-white/10 text-white font-semibold transition-all flex items-center justify-between hover:-translate-y-1 group border-white/10"
            >
              <div className="flex items-center gap-3">
                <Briefcase size={20} className="text-brand-blue" />
                <span>Meu Portfólio</span>
              </div>
              <ArrowRight size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>

            <button
              onClick={() => setShowCatalogs(true)}
              className="w-full p-4 rounded-2xl glass hover:bg-white/10 text-white font-semibold transition-all flex items-center justify-between hover:-translate-y-1 group border-white/10"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart size={20} className="text-purple-400" />
                <span>Catálogos</span>
              </div>
              <ArrowRight size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showCatalogs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
            onClick={() => setShowCatalogs(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-sm p-6 rounded-3xl flex flex-col gap-4 relative bg-[#111] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCatalogs(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>
              
              <h3 className="text-xl font-bold mb-2">Escolha o Catálogo</h3>
              
              <a
                href="#catalogos-dtf"
                onClick={() => {
                  setShowCatalogs(false);
                  window.location.hash = 'catalogos-dtf';
                  setTimeout(() => document.getElementById('catalogos')?.scrollIntoView(), 100);
                }}
                className="w-full p-4 rounded-2xl bg-brand-blue hover:bg-blue-500 text-white font-semibold flex items-center gap-3 transition-colors shadow-lg"
              >
                <Printer size={20} />
                Catálogo DTF
              </a>
              
              <a
                href="#catalogos-sublimacao"
                onClick={() => {
                  setShowCatalogs(false);
                  window.location.hash = 'catalogos-sublimacao';
                  setTimeout(() => document.getElementById('catalogos')?.scrollIntoView(), 100);
                }}
                className="w-full p-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center gap-3 transition-colors shadow-lg"
              >
                <Shirt size={20} />
                Catálogo Sublimação
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
