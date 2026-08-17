import React, { useState } from 'react';
import { Terminal, Copy, Check, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';
import { SubmissionLog } from '../types';

interface ConsoleViewerProps {
  logs: SubmissionLog[];
  onClearLogs: () => void;
}

export const ConsoleViewer: React.FC<ConsoleViewerProps> = ({ logs, onClearLogs }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (jsonStr: string, id: string) => {
    navigator.clipboard.writeText(jsonStr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const latestLog = logs[0];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden text-slate-200">
      {/* Console Title Bar */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="h-4 w-[1px] bg-slate-800 mx-1" />
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span>Visor de Consola (console.log)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {latestLog && (
            <button
              onClick={() => handleCopy(latestLog.jsonString, latestLog.id)}
              className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              {copiedId === latestLog.id ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>Copiar JSON</span>
                </>
              )}
            </button>
          )}

          {logs.length > 0 && (
            <button
              onClick={onClearLogs}
              className="text-[11px] text-slate-500 hover:text-slate-300 px-2 py-1 transition-colors"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {logs.length === 0 ? (
          <div className="py-8 px-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center mx-auto mb-3 border border-slate-700/50">
              <Terminal className="w-5 h-5 text-slate-500" />
            </div>
            <p className="text-xs font-semibold text-slate-400 font-mono">
              Esperando envío del formulario...
            </p>
            <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">
              Al hacer click en <strong>"Registrar Proyecto"</strong>, los datos se capturan como objeto JSON y se envían a <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-400">console.log()</code> sin recargar la página.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pb-2 border-b border-slate-800/60">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Objeto JSON capturado en console.log()
              </span>
              <span>{latestLog.timestamp}</span>
            </div>

            <div className="relative">
              <pre className="text-xs font-mono bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 overflow-x-auto text-sky-300 leading-relaxed max-h-[320px]">
                <code>{latestLog.jsonString}</code>
              </pre>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-2.5 border border-slate-700/40 text-[11px] text-slate-400 flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Verificado en tiempo real: Se imprimió también en las <strong>DevTools nativas</strong> de tu navegador (<kbd className="bg-slate-900 px-1 rounded text-slate-300">F12</kbd> &rarr; Consola).
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
