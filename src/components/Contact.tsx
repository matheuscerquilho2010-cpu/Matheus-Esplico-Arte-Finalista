import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, MessageCircle, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !message.trim()) return;

    const formattedMessage = `Olá Matheus! Meu nome é ${name.trim() || 'Cliente'}.${message.trim() ? ` Mensagem: ${message.trim()}` : ' Gostaria de solicitar um orçamento para artes.'}`;
    const whatsappUrl = `https://wa.me/5515996526796?text=${encodeURIComponent(formattedMessage)}`;

    setSent(true);
    const a = document.createElement('a');
    a.href = whatsappUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      setName('');
      setMessage('');
      setSent(false);
    }, 4000);
  };

  return (
    <section id="contato" className="py-12 relative overflow-hidden border-t border-white/5">
      <div className="w-full px-6">
        <div className="flex flex-col gap-8">
          
          <div className="text-center">
            <motion.h2 className="text-2xl font-bold mb-2 text-white">
              Iniciar <span className="text-brand-blue">Projeto</span>
            </motion.h2>
            <motion.p className="text-gray-400 text-xs mb-6">
              Entre em contato direto para orçamentos, dúvidas ou pedidos.
            </motion.p>
            
            <div className="flex justify-center gap-4">
              <a 
                href="https://wa.me/5515996526796" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Falar no WhatsApp"
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-brand-green hover:scale-110 transition-all duration-300 shadow-md"
              >
                <MessageCircle size={20} />
              </a>
              <a 
                href="mailto:contato@studiomtsartes.com" 
                aria-label="Enviar E-mail"
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-brand-blue hover:scale-110 transition-all duration-300 shadow-md"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-6 rounded-2xl border border-white/10"
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input 
                  type="text" 
                  placeholder="Seu Nome" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-blue/50 transition-colors" 
                />
              </div>
              <div>
                <textarea 
                  rows={3} 
                  placeholder="Como posso ajudar? (Ex: Sublimação, DTF, criação de estampas...)" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-blue/50 transition-colors resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-brand-green hover:bg-[#1ebd5a] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm shadow-[0_0_15px_rgba(37,211,102,0.25)]"
              >
                {sent ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Abrindo WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar pelo WhatsApp</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
