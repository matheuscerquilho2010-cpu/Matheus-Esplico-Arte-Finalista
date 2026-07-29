import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { services } from '../data';
import { Palette, Printer, Ruler, Cloud, Zap, Layers } from 'lucide-react';

const iconMap: Record<string, ReactNode> = {
  palette: <Palette size={24} />,
  printer: <Printer size={24} />,
  ruler: <Ruler size={24} />,
  cloud: <Cloud size={24} />,
  zap: <Zap size={24} />,
  layers: <Layers size={24} />
};

export default function Services() {
  return (
    <motion.section 
      id="servicos" 
      className="py-12 relative px-6 border-t border-white/5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full">
        <div className="text-center mb-8">
          <motion.h2 className="text-2xl font-bold mb-2 text-white">
            Meus <span className="text-brand-blue">Serviços</span>
          </motion.h2>
          <motion.p className="text-gray-400 text-xs px-4">
            Soluções completas para confecções e estamparias.
          </motion.p>
        </div>

        <div className="flex flex-col gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ scale: 1.018, y: -3 }}
              className="glass p-5 rounded-2xl relative overflow-hidden group flex items-start gap-4 hover:border-brand-blue/30 hover:shadow-[0_8px_25px_rgba(0,168,255,0.12)] transition-colors duration-300"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-brand-blue border border-white/10">
                {iconMap[service.icon]}
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-1 text-white">{service.title}</h3>
                <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-[11px] text-gray-300">
                      <span className="w-1 h-1 rounded-full bg-brand-green mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

