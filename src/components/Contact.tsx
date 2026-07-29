import { motion } from 'motion/react';
import { Mail, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contato" className="py-12 relative overflow-hidden">
      <div className="w-full px-6">
        <div className="flex flex-col gap-8">
          
          <div className="text-center">
            <motion.h2 className="text-2xl font-bold mb-2">
              Iniciar <span className="text-brand-blue">Projeto</span>
            </motion.h2>
            <motion.p className="text-gray-400 text-xs mb-6">
              Entre em contato para orçamentos ou dúvidas.
            </motion.p>
            
            <div className="flex justify-center gap-4">
              <a href="https://wa.me/5515996526796" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-brand-green hover:scale-110 transition-all duration-300">
                <Send size={18} />
              </a>
              <a href="mailto:contato@studiomtsartes.com" className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-brand-blue hover:scale-110 transition-all duration-300">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-6 rounded-2xl"
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input type="text" placeholder="Nome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-blue/50 transition-colors" />
              </div>
              <div>
                <textarea rows={3} placeholder="Mensagem" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-blue/50 transition-colors resize-none"></textarea>
              </div>
              <button className="w-full bg-brand-blue hover:bg-blue-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
                Enviar
                <Send size={14} />
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
