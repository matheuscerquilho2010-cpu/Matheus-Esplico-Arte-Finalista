import { motion } from 'motion/react';
import { testimonials } from '../data';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-12 relative overflow-hidden border-t border-white/5">
      <div className="w-full px-6">
        <div className="text-center mb-8">
          <motion.h2 className="text-2xl font-bold mb-2 text-white">
            <span className="text-brand-blue">Feedback</span>
          </motion.h2>
          <motion.p className="text-gray-400 text-xs">
            O que dizem os clientes.
          </motion.p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {testimonials.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-5 rounded-2xl relative min-w-[280px] snap-center flex flex-col justify-between"
            >
              <Quote className="absolute top-4 right-4 text-white/5" size={32} />
              
              <div>
                <div className="flex gap-1 mb-3">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-brand-blue text-brand-blue" />
                  ))}
                </div>
                
                <p className="text-gray-300 text-sm mb-6 leading-relaxed relative z-10 italic">
                  "{test.content}"
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{test.name}</h4>
                  <p className="text-[10px] text-gray-400">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
