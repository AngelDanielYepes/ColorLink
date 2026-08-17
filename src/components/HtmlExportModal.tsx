import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, CheckCircle } from 'lucide-react';
import { generateStandaloneHtml } from '../utils/standaloneHtml';

interface HtmlExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadHtml: () => void;
}

export const HtmlExportModal: React.FC<HtmlExportModalProps> = ({
  isOpen,
  onClose,
  onDownloadHtml,
}) => {
  const [copied, setCopied] = useState(false);
  const htmlCode = generateStandaloneHtml();

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Código HTML Puro (Todo en un solo archivo .html)
              </h3>
              <p className="text-xs text-slate-400">
                Incluye HTML5, CSS integrado (<code className="text-sky-300">&lt;style&gt;</code>) y JavaScript (<code className="text-sky-300">&lt;script&gt;</code>) con localStorage y console.log().
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="px-6 py-2.5 bg-slate-950/30 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono">colorlink_registro.html</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Copiado al Portapapeles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Todo el Código</span>
                </>
              )}
            </button>
            <button
              onClick={onDownloadHtml}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .html</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-6 overflow-y-auto font-mono text-xs text-sky-200 bg-slate-950 leading-relaxed">
          <pre>
            <code>{htmlCode}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Listo para copiar y abrir directamente en Chrome, Safari, Firefox o Edge con doble clic.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
