import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Briefcase, ShoppingCart, MessageCircle, X, Printer, Shirt, Check, Truck, Ruler } from 'lucide-react';

export default function Hero() {
  const [showCatalogs, setShowCatalogs] = useState(false);
  const [showDtfOrder, setShowDtfOrder] = useState(false);

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

            <button
              onClick={() => setShowDtfOrder(true)}
              className="w-full p-4 rounded-2xl glass hover:bg-white/10 text-white font-semibold transition-all flex items-center justify-between hover:-translate-y-1 group border-white/10"
            >
              <div className="flex items-center gap-3">
                <Printer size={20} className="text-brand-blue" />
                <span>Pedido DTF</span>
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
                  window.dispatchEvent(new Event('hashchange'));
                  setTimeout(() => document.getElementById('catalogos')?.scrollIntoView({ behavior: 'smooth' }), 100);
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
                  window.dispatchEvent(new Event('hashchange'));
                  setTimeout(() => document.getElementById('catalogos')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="w-full p-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center gap-3 transition-colors shadow-lg"
              >
                <Shirt size={20} />
                Catálogo Sublimação
              </a>
            </motion.div>
          </motion.div>
        )}

        {showDtfOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
            onClick={() => setShowDtfOrder(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="glass-card w-full max-w-sm p-6 rounded-3xl flex flex-col relative bg-[#111] border border-white/10 shadow-[0_0_50px_rgba(0,168,255,0.2)] my-auto text-left"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDtfOrder(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                title="Fechar"
              >
                <X size={18} />
              </button>

              {/* Title Header */}
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center text-brand-blue mb-2 shadow-lg">
                  <Printer size={24} />
                </div>
                <h3 className="text-xl font-extrabold tracking-tight text-white">
                  DTF <span className="text-brand-blue">PROFISSIONAL</span>
                </h3>
              </div>

              {/* Largura */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-center gap-2 mb-4">
                <Ruler size={18} className="text-brand-blue" />
                <span className="text-xs font-bold tracking-wider text-gray-200">
                  LARGURA: <span className="text-brand-blue font-extrabold text-sm ml-1">57 CM</span>
                </span>
              </div>

              {/* Preços por Quantidade */}
              <div className="mb-4">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 text-center">
                  PREÇOS POR QUANTIDADE
                </p>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-xs font-semibold text-gray-300">1 A 9 METROS</span>
                    <span className="text-sm font-bold text-white">R$ 35,00<span className="text-[11px] font-normal text-gray-400">/m</span></span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-brand-blue/5 border border-brand-blue/30">
                    <span className="text-xs font-semibold text-white">10 A 29 METROS</span>
                    <span className="text-sm font-bold text-brand-blue">R$ 30,00<span className="text-[11px] font-normal text-gray-400">/m</span></span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-brand-green/10 border border-brand-green/40">
                    <span className="text-xs font-bold text-white">30 METROS OU MAIS</span>
                    <span className="text-sm font-extrabold text-brand-green">R$ 25,00<span className="text-[11px] font-normal text-gray-400">/m</span></span>
                  </div>
                </div>
              </div>

              {/* Benefícios */}
              <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3.5 mb-3 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-200">
                  <Check size={15} className="text-brand-green shrink-0 stroke-[3]" />
                  <span>Alta definição</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-200">
                  <Check size={15} className="text-brand-green shrink-0 stroke-[3]" />
                  <span>Cores vibrantes</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-200">
                  <Check size={15} className="text-brand-green shrink-0 stroke-[3]" />
                  <span>Acabamento profissional</span>
                </div>
              </div>

              {/* Frete */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-yellow-400/90 font-medium mb-4">
                <Truck size={15} className="text-yellow-400 shrink-0" />
                <span>Frete à parte.</span>
              </div>

              {/* WhatsApp CTA */}
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-bold text-center text-gray-300 uppercase tracking-wider">
                  SOLICITE SEU ORÇAMENTO PELO WHATSAPP!
                </p>
                <a
                  href={`https://wa.me/5515996526796?text=${encodeURIComponent('Olá Matheus! Gostaria de solicitar um orçamento para pedido de DTF Profissional (Largura: 57 cm).')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3.5 rounded-2xl bg-brand-green hover:bg-[#1ebd5a] text-white font-bold transition-all flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(37,211,102,0.35)] hover:scale-[1.02] text-xs sm:text-sm text-center"
                >
                  <MessageCircle size={18} />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
