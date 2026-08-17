import React from 'react';
import { Paintbrush, Code2, Download, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onOpenCodeModal: () => void;
  onDownloadHtml: () => void;
  savedInStorage: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCodeModal,
  onDownloadHtml,
  savedInStorage,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-teal-400 to-amber-400 p-0.5 shadow-lg shadow-sky-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Paintbrush className="w-5 h-5 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white font-display">
                COLOR<span className="text-sky-400">LINK</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full hidden sm:inline-block">
                Pintura Profesional
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Sistema de Registro y Especificaciones Técnicas
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {savedInStorage && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Memoria activa (localStorage)</span>
            </div>
          )}

          <button
            onClick={onOpenCodeModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors shadow-sm"
            title="Ver y copiar el código HTML, CSS y JS en un solo archivo"
          >
            <Code2 className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">Ver Código</span> HTML
          </button>

          <button
            onClick={onDownloadHtml}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm shadow-sky-600/30"
            title="Descargar archivo index.html listo para usar"
          >
            <Download className="w-4 h-4" />
            <span>Descargar .html</span>
          </button>
        </div>
      </div>
    </header>
  );
};
