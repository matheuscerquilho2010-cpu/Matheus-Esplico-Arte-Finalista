const fs = require('fs');
let data = fs.readFileSync('src/components/Store.tsx', 'utf8');

data = data.replace(
  "import { Search, ShoppingCart, Eye, Image as ImageIcon, X } from 'lucide-react';",
  "import { Search, ShoppingCart, Eye, Image as ImageIcon, X, MessageCircle } from 'lucide-react';"
);

data = data.replace(
  `            <button \n              className="absolute top-4 right-4 text-white hover:text-brand-blue transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full z-10"\n              onClick={() => setSelectedImage(null)}\n            >\n              <X size={20} />\n            </button>\n            <motion.img\n              initial={{ scale: 0.8, opacity: 0 }}\n              animate={{ scale: 1, opacity: 1 }}\n              exit={{ scale: 0.8, opacity: 0 }}\n              transition={{ type: "spring", damping: 25, stiffness: 300 }}\n              src={selectedImage}\n              alt="Expanded view"\n              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"\n              onClick={e => e.stopPropagation()}\n            />`,
  `            <button 
              className="absolute top-4 right-4 text-white hover:text-brand-blue transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center justify-center max-h-full w-full" onClick={e => e.stopPropagation()}>
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedImage}
                alt="Expanded view"
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-6 flex w-full max-w-xs"
              >
                 <a 
                   href={\`https://wa.me/5511999999999?text=\${encodeURIComponent('Olá! Gostaria dessa arte para minha camiseta: ' + selectedImage)}\`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full bg-brand-green hover:bg-[#1ebd5a] text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                 >
                   <MessageCircle size={18} />
                   Enviar Arte por WhatsApp
                 </a>
              </motion.div>
            </div>`
);

fs.writeFileSync('src/components/Store.tsx', data);
console.log('Done');
