import { motion } from 'motion/react';

const stats = [
  { value: '+5k', label: 'Artes' },
  { value: '+700', label: 'Clientes' },
  { value: '99%', label: 'Aprovação' },
  { value: '24h', label: 'Entrega' },
];

export default function Stats() {
  return (
    <section className="py-8 bg-white/[0.02] backdrop-blur-xl border-y border-white/5">
      <div className="w-full px-6">
        <div className="grid grid-cols-4 gap-2 divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center px-1"
            >
              <h3 className="text-lg font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-brand-blue font-medium text-[8px] tracking-wider uppercase leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
