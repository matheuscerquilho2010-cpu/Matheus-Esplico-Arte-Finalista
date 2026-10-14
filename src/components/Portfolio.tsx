import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioItems } from '../data';
import { Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, MessageCircle, Download } from 'lucide-react';

export default function Portfolio() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeItem = selectedIndex !== null ? portfolioItems[selectedIndex] : null;

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % portfolioItems.length : 0));
  }, []);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + portfolioItems.length) % portfolioItems.length : 0));
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  // Auto-play carousel
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (!isHovered && selectedIndex === null) {
      intervalId = setInterval(() => {
        if (carouselRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
          }
        }
      }, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered, selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <motion.section 
      id="portfolio" 
      className="py-12 relative border-t border-white/5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full relative">
        
        <div className="text-center mb-8 px-6">
          <motion.h2 className="text-2xl font-bold mb-2 text-white">
            Meu <span className="text-brand-blue">Portfólio</span>
          </motion.h2>
          <motion.p className="text-gray-400 text-xs">
            Trabalhos recentes e artes finalizadas. Clique na imagem para ampliar.
          </motion.p>
          <motion.p className="text-brand-blue text-[10px] uppercase tracking-widest mt-2 font-semibold">
            Imagens e cards atualizados todas as semanas
          </motion.p>
        </div>

        {/* Carousel Container with Arrows */}
        <div 
          className="relative group px-2 sm:px-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollCarousel('left')}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-brand-blue border border-white/20 hover:border-brand-blue text-white items-center justify-center transition-all shadow-xl active:scale-95 group/btn"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} className="group-hover/btn:-translate-x-0.5 transition-transform" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollCarousel('right')}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-brand-blue border border-white/20 hover:border-brand-blue text-white items-center justify-center transition-all shadow-xl active:scale-95 group/btn"
            aria-label="Próximo"
          >
            <ChevronRight size={20} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </button>

          {/* Scrollable Track */}
          <motion.div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 px-4 sm:px-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <AnimatePresence>
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 25, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  whileHover={{ scale: 1.04, y: -5 }}
                  transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-white/5 border border-white/10 hover:border-brand-blue/50 hover:shadow-[0_12px_35px_rgba(0,168,255,0.25)] transition-all duration-300 cursor-pointer flex items-center justify-center min-w-[210px] max-w-[240px] snap-center shrink-0"
                  onClick={() => setSelectedIndex(index)}
                >
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white/20">
                      <ImageIcon size={32} className="mb-2" />
                      <span className="text-[10px] uppercase tracking-widest">Arte Aqui</span>
                    </div>
                  )}
                  
                  {/* Hover Overlay with Expand Icon Only (No Titles) */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-brand-blue/90 text-black flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal (Clean, Carousel Controls, No Rotation) */}
      <AnimatePresence>
        {selectedIndex !== null && activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 select-none"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Top Toolbar */}
            <div className="w-full max-w-3xl flex items-center justify-between z-20 pointer-events-auto pt-2" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-bold text-white">
                <span className="text-brand-blue">Portfólio</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-300">{selectedIndex + 1} / {portfolioItems.length}</span>
              </div>

              <button 
                className="text-white hover:text-brand-blue transition-colors bg-white/10 hover:bg-white/20 p-2.5 rounded-full border border-white/10"
                onClick={() => setSelectedIndex(null)}
                title="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Center Image Area */}
            <div 
              className="relative flex items-center justify-center my-auto w-full max-w-2xl max-h-[70vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-1 sm:-left-12 z-30 bg-black/80 hover:bg-brand-blue text-white p-3 rounded-full border border-white/20 hover:border-brand-blue transition-all transform active:scale-95 shadow-2xl group"
                title="Imagem Anterior"
              >
                <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Image Container */}
              <div className="relative flex items-center justify-center p-2 max-w-full max-h-[70vh]">
                <motion.img
                  key={activeItem.id}
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.94, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  src={activeItem.imageUrl}
                  alt={activeItem.title || 'Arte do portfólio'}
                  className="max-w-full max-h-[68vh] object-contain rounded-2xl shadow-[0_0_60px_rgba(0,168,255,0.2)] border border-white/15"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-1 sm:-right-12 z-30 bg-black/80 hover:bg-brand-blue text-white p-3 rounded-full border border-white/20 hover:border-brand-blue transition-all transform active:scale-95 shadow-2xl group"
                title="Próxima Imagem"
              >
                <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Bottom Bar (WhatsApp & Download) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="w-full max-w-md flex flex-col items-center gap-3 pointer-events-auto pb-2"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 w-full">
                <a 
                  href={`https://wa.me/5515996526796?text=${encodeURIComponent('Olá! Gostei dessa arte do portfólio e gostaria de um orçamento parecido: ' + activeItem.imageUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-brand-green hover:bg-[#1ebd5a] text-white py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                >
                  <MessageCircle size={16} />
                  <span>Pedir Orçamento no WhatsApp</span>
                </a>
                
                <button
                  className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl flex items-center justify-center transition-colors border border-white/10"
                  title="Baixar Imagem"
                  onClick={() => {
                    fetch(activeItem.imageUrl)
                      .then(res => res.blob())
                      .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = `portfolio-arte-${selectedIndex + 1}.jpg`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                      })
                      .catch(() => {
                        const a = document.createElement('a');
                        a.href = activeItem.imageUrl;
                        a.target = '_blank';
                        a.rel = 'noopener noreferrer';
                        a.download = `portfolio-arte-${selectedIndex + 1}.jpg`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      });
                  }}
                >
                  <Download size={18} />
                </button>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}


