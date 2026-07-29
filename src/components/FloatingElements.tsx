import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { ArrowUp, MessageCircle } from 'lucide-react';

export default function FloatingElements() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 sm:left-[calc(50%-224px)] sm:right-[calc(50%-224px)] h-1 bg-brand-blue origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 sm:right-[calc(50%-200px)] flex flex-col items-end gap-4 z-[90]">
        
        {/* Back to Top */}
        <AnimatePresence>
          {showTopBtn && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={scrollToTop}
              className="h-10 px-4 rounded-full glass flex items-center justify-center gap-2 text-white hover:bg-white/10 transition-colors shadow-lg whitespace-nowrap text-xs font-semibold"
              title="Voltar ao topo"
            >
              <ArrowUp size={16} />
              <span>Voltar ao Topo</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp */}
        <motion.a
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          href="https://wa.me/5515996526796"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform relative group"
        >
          <MessageCircle size={24} />
          {/* Pulse effect */}
          <span className="absolute inset-0 rounded-full border border-brand-green animate-ping opacity-75" />
        </motion.a>
      </div>
    </>
  );
}
