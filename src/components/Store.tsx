import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { artPacksCategories, artPacks } from '../data';
import { ArtPack } from '../types';
import { Search, ShoppingCart, Eye, Image as ImageIcon, X, MessageCircle, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Store() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPack, setSelectedPack] = useState<ArtPack | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleNextImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedPack && selectedPack.images && selectedPack.images.length > 0 && selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % selectedPack.images!.length : 0));
    }
  }, [selectedPack, selectedImageIndex]);

  const handlePrevImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedPack && selectedPack.images && selectedPack.images.length > 0 && selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + selectedPack.images!.length) % selectedPack.images!.length : 0));
    }
  }, [selectedPack, selectedImageIndex]);

  // Keyboard navigation for image modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, handleNextImage, handlePrevImage]);

  // Listen for hash changes to auto-filter if needed, though simple navigation works
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#catalogos-dtf') {
        setActiveCategory('DTF');
      } else if (window.location.hash === '#catalogos-sublimacao') {
        setActiveCategory('Sublimação');
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // check on mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filteredPacks = artPacks.filter(pack => {
    const matchesCategory = activeCategory === 'Todos' || pack.category === activeCategory;
    const matchesSearch = pack.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.section 
      id="catalogos" 
      className="py-12 relative border-t border-white/5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full px-6">
        
        <div className="text-center mb-8">
          <motion.h2 className="text-2xl font-bold mb-2 text-white">
            <span className="text-brand-blue">Catálogos</span>
          </motion.h2>
          <motion.p className="text-gray-400 text-xs">
            Artes prontas para impulsionar suas vendas.
          </motion.p>
          <motion.p className="text-brand-blue text-[10px] uppercase tracking-widest mt-2 font-semibold">
            Imagens e cards atualizados todas as semanas
          </motion.p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Pesquisar catálogos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-blue/50 transition-colors"
            />
          </div>
          
          <div className="flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {artPacksCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-brand-blue text-white' 
                    : 'glass text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPacks.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden bg-white/5 border-b border-white/10 flex items-center justify-center">
                {pack.imageUrl ? (
                  <img 
                    src={pack.imageUrl} 
                    alt={pack.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-white/20">
                    <ImageIcon size={32} className="mb-2" />
                    <span className="text-[10px] uppercase tracking-widest">Imagem do Catálogo</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] font-semibold text-white">
                  {pack.category}
                </div>
              </div>
              
              <div className="p-4 flex flex-col">
                <h3 className="text-sm font-bold mb-3 text-white">{pack.title}</h3>
                
                {pack.images && pack.images.length > 0 && (
                  <div className="mb-4 overflow-x-auto pb-2 flex gap-2 snap-x snap-mandatory [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                    {pack.images.slice(0, 5).map((img, i) => (
                      <div key={i} className="flex-shrink-0 w-12 h-12 rounded bg-white/5 snap-center border border-white/10 overflow-hidden relative">
                        <img src={img} alt={`${pack.title} ${i + 1}`} className="w-full h-full object-cover opacity-70" loading="lazy" />
                        {i === 4 && pack.images && pack.images.length > 5 && (
                           <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[10px] font-bold text-white">
                             +{pack.images.length - 5}
                           </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedPack(pack)}
                    className="flex-1 glass py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    <Eye size={14} />
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <AnimatePresence>
        {selectedPack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedPack(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass-card w-full max-w-sm max-h-[85vh] overflow-hidden rounded-3xl flex flex-col relative bg-[#111]"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
                <h3 className="text-lg font-bold truncate pr-4">{selectedPack.title}</h3>
                <button
                  onClick={() => setSelectedPack(null)}
                  className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-y-auto p-4 flex-1">
                {selectedPack.observation && (
                  <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <p className="text-xs text-yellow-500 font-medium whitespace-pre-wrap leading-relaxed">
                      {selectedPack.observation}
                    </p>
                  </div>
                )}
                {selectedPack.images && selectedPack.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {selectedPack.images.map((img, idx) => (
                      <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10 group relative cursor-pointer hover:border-brand-blue/50 transition-colors"
                        onClick={() => setSelectedImageIndex(idx)}>
                        <img 
                          src={img.replace('sz=w200-h200', 'sz=w800-h800')} 
                          alt={`${selectedPack.title} ${idx + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <ImageIcon size={32} className="mb-3 opacity-20" />
                    <p className="text-sm">Sem imagens disponíveis</p>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-white/10 bg-[#1a1a1a]">
                <a href="https://wa.me/5515996526796" target="_blank" rel="noopener noreferrer" className="w-full bg-brand-blue text-white py-3 rounded-xl flex flex-col items-center justify-center gap-1 text-sm font-semibold hover:bg-blue-500 transition-colors text-center px-2">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={16} />
                    <span>Escolha sua Arte para sua camiseta</span>
                  </div>
                  <span className="text-[10px] opacity-80 font-normal">e nos envie pelo WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Image Viewer Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && selectedPack && selectedPack.images && selectedPack.images[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex flex-col items-center justify-between p-4 sm:p-6 bg-black/95 backdrop-blur-md select-none"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Top Bar with Index Counter & Close */}
            <div className="w-full max-w-2xl flex items-center justify-between z-20 pointer-events-auto pt-2" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-bold text-white">
                <span className="text-brand-blue">Imagem</span>
                <span>{selectedImageIndex + 1}</span>
                <span className="text-gray-500">/</span>
                <span className="text-gray-400">{selectedPack.images.length}</span>
              </div>

              <button 
                className="text-white hover:text-brand-blue transition-colors bg-white/10 hover:bg-white/20 p-2.5 rounded-full border border-white/10"
                onClick={() => setSelectedImageIndex(null)}
                title="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Image Area with Previous / Next Buttons */}
            <div 
              className="relative flex items-center justify-center my-auto w-full max-w-xl max-h-[68vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Previous Image Button */}
              {selectedPack.images.length > 1 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute -left-2 sm:-left-12 z-30 bg-black/80 hover:bg-brand-blue text-white p-3 rounded-full border border-white/20 hover:border-brand-blue transition-all transform active:scale-95 shadow-2xl group"
                  title="Imagem Anterior"
                >
                  <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>
              )}

              {/* Clickable Image (Clicking advances to Next Image) */}
              <div 
                className="relative group cursor-pointer max-w-full max-h-[68vh] flex items-center justify-center rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_60px_rgba(0,168,255,0.15)] bg-black/40"
                onClick={handleNextImage}
                title="Clique para ir para a próxima imagem"
              >
                <motion.img
                  key={selectedImageIndex}
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.94, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  src={selectedPack.images[selectedImageIndex].replace('sz=w200-h200', 'sz=w800-h800')}
                  alt={`${selectedPack.title} ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-[68vh] object-contain rounded-2xl"
                />

                {/* Next Image Click Indicator Overlay */}
                {selectedPack.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-lg flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
                    <span>Próxima arte</span>
                    <ChevronRight size={14} className="text-brand-blue animate-pulse" />
                  </div>
                )}
              </div>

              {/* Next Image Button */}
              {selectedPack.images.length > 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute -right-2 sm:-right-12 z-30 bg-black/80 hover:bg-brand-blue text-white p-3 rounded-full border border-white/20 hover:border-brand-blue transition-all transform active:scale-95 shadow-2xl group"
                  title="Próxima Imagem"
                >
                  <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>

            {/* Bottom Action Bar (WhatsApp & Download) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="w-full max-w-md flex flex-col gap-2.5 pointer-events-auto pb-2"
              onClick={e => e.stopPropagation()}
            >
              <a 
                href={`https://wa.me/5515996526796?text=${encodeURIComponent('Olá! Gostaria dessa arte para minha camiseta: ' + selectedPack.images[selectedImageIndex].replace('sz=w200-h200', 'sz=w800-h800'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-green hover:bg-[#1ebd5a] text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all shadow-[0_0_25px_rgba(37,211,102,0.35)]"
              >
                <MessageCircle size={18} />
                <span>Enviar Arte por WhatsApp</span>
              </a>
              
              <button
                className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-colors border border-white/10"
                onClick={() => {
                  const currentImg = selectedPack.images![selectedImageIndex!].replace('sz=w200-h200', 'sz=w800-h800');
                  fetch(currentImg)
                    .then(res => res.blob())
                    .then(blob => {
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.style.display = 'none';
                      a.href = url;
                      a.download = `arte-${selectedPack.title}-${selectedImageIndex! + 1}.jpg`;
                      document.body.appendChild(a);
                      a.click();
                      window.URL.revokeObjectURL(url);
                    })
                    .catch(() => {
                      window.open(currentImg, '_blank');
                    });
                }}
              >
                <Download size={16} />
                <span>Baixar Imagem</span>
              </button>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.section>
  );
}
