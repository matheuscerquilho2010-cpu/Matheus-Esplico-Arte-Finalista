import { motion } from 'motion/react';
import { cloudFiles } from '../data';
import { CloudRain, Download, FolderOpen, Clock, CheckCircle, CircleDashed } from 'lucide-react';

export default function CloudFiles() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Concluído': return <CheckCircle size={16} className="text-brand-green" />;
      case 'Em Andamento': return <CircleDashed size={16} className="text-brand-blue animate-spin-slow" />;
      default: return <Clock size={16} className="text-yellow-500" />;
    }
  };

  return (
    <section id="nuvem" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6 text-center md:text-left">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Arquivos na <span className="text-brand-blue">Nuvem</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-xl"
            >
              Acompanhe o status dos seus projetos e faça o download dos arquivos finalizados direto do nosso drive seguro.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 glass px-6 py-4 rounded-2xl border-brand-blue/20"
          >
            <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue">
              <CloudRain size={24} />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-400">Status do Servidor</p>
              <p className="font-semibold text-brand-green flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                Sincronizado
              </p>
            </div>
          </motion.div>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-6 font-medium text-gray-400">Projeto</th>
                  <th className="p-6 font-medium text-gray-400">Cliente</th>
                  <th className="p-6 font-medium text-gray-400">Data</th>
                  <th className="p-6 font-medium text-gray-400">Tamanho</th>
                  <th className="p-6 font-medium text-gray-400">Status</th>
                  <th className="p-6 font-medium text-gray-400 text-right">Ação</th>
                </tr>
              </thead>
              <tbody>
                {cloudFiles.map((file, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    key={file.id} 
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <FolderOpen size={20} className="text-brand-blue" />
                        <span className="font-medium text-white">{file.projectName}</span>
                      </div>
                    </td>
                    <td className="p-6 text-gray-300">{file.client}</td>
                    <td className="p-6 text-gray-400 text-sm">{file.date}</td>
                    <td className="p-6 text-gray-400 text-sm">{file.size}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-sm">
                        {getStatusIcon(file.status)}
                        <span className="text-gray-300">{file.status}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg glass text-gray-300 hover:text-white hover:bg-white/10 transition-colors" title="Abrir">
                          <FolderOpen size={18} />
                        </button>
                        <button 
                          disabled={file.status !== 'Concluído'}
                          className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                            file.status === 'Concluído' 
                              ? 'bg-brand-blue text-white hover:bg-blue-500' 
                              : 'glass text-gray-600 cursor-not-allowed'
                          }`}
                          title="Download"
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
