export default function Footer() {
  return (
    <footer className="py-6 border-t border-white/5 bg-transparent">
      <div className="w-full px-6 flex flex-col items-center gap-2">
        <div className="text-sm font-bold tracking-tighter text-white">
          MTS<span className="text-brand-blue">.</span>Arte Finalista
        </div>
        <p className="text-[10px] text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Studio MTS Arte Finalista.<br/>Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
