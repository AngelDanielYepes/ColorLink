import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProjectForm } from './components/ProjectForm';
import { TechnicalSummary } from './components/TechnicalSummary';
import { ConsoleViewer } from './components/ConsoleViewer';
import { HtmlExportModal } from './components/HtmlExportModal';
import { ProjectFormData, SubmissionLog } from './types';
import { generateStandaloneHtml } from './utils/standaloneHtml';
import { 
  CheckCircle, 
  Sparkles, 
  Info, 
  Layers, 
  Palette, 
  ShieldCheck,
  Building,
  Terminal,
  ExternalLink
} from 'lucide-react';

const STORAGE_KEY = 'colorlink_project_registration';

const INITIAL_FORM_STATE: ProjectFormData = {
  cliente: '',
  ciudad: '',
  direccionEnvio: '',
  proyecto: '',
  area: '',
  superficie: '',
  condicion: '',
  ambiente: 'interior',
  color: '#0284c7',
  fechaRequerida: '',
  fotoNombre: undefined,
  fotoPreviewUrl: undefined,
};

export default function App() {
  const [formData, setFormData] = useState<ProjectFormData>(INITIAL_FORM_STATE);
  const [logs, setLogs] = useState<SubmissionLog[]>([]);
  const [isLoadedFromMemory, setIsLoadedFromMemory] = useState<boolean>(false);
  const [hasSavedData, setHasSavedData] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);

  // 1. CARGA AUTOMÁTICA DESDE LOCALSTORAGE AL INICIAR
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData({
          cliente: parsed.cliente || '',
          ciudad: parsed.ciudad || '',
          direccionEnvio: parsed.direccionEnvio || '',
          proyecto: parsed.proyecto || '',
          area: parsed.area ? String(parsed.area) : '',
          superficie: parsed.superficie || '',
          condicion: parsed.condicion || '',
          ambiente: parsed.ambiente || 'interior',
          color: parsed.color || '#0284c7',
          fechaRequerida: parsed.fechaRequerida || '',
          fotoNombre: parsed.fotografia?.nombre || undefined,
          fotoPreviewUrl: parsed.fotografia?.preview || undefined,
        });
        setIsLoadedFromMemory(true);
        setHasSavedData(true);

        // También registrar en consola informativa
        console.log('🔄 [COLORLINK] Autocompletado: Datos previos cargados exitosamente desde localStorage:', parsed);
      }
    } catch (e) {
      console.error('Error al leer de localStorage:', e);
    }
  }, []);

  // 2. SUBMIT FORMULARIO SIN RECARGA, CONSOLE.LOG Y GUARDADO EN LOCALSTORAGE
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Construcción del objeto JSON estructurado con tipos exactos
    const structuredPayload = {
      cliente: formData.cliente.trim(),
      ciudad: formData.ciudad.trim(),
      direccionEnvio: formData.direccionEnvio.trim(),
      proyecto: formData.proyecto.trim(),
      area: parseFloat(formData.area) || 0, // Float/Decimal
      superficie: formData.superficie.trim() || null,
      condicion: formData.condicion.trim() || null,
      ambiente: formData.ambiente, // 'interior' | 'exterior'
      color: formData.color.trim(),
      fechaRequerida: formData.fechaRequerida,
      fotografia: formData.fotoNombre
        ? {
            nombre: formData.fotoNombre,
            tieneArchivo: true,
            preview: formData.fotoPreviewUrl,
          }
        : null,
      fechaRegistro: new Date().toISOString(),
    };

    // IMPRESIÓN REQUERIDA EN CONSOLA DEL NAVEGADOR
    console.log('=====================================================');
    console.log('📦 [COLORLINK] Formulario de Proyecto Enviado (Objeto JSON):');
    console.log(structuredPayload);
    console.log('📄 [COLORLINK] JSON Formateado:');
    console.log(JSON.stringify(structuredPayload, null, 2));
    console.log('=====================================================');

    // GUARDADO EN LOCALSTORAGE PARA AUTOCOMPLETADO FUTURO
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(structuredPayload));
      setHasSavedData(true);
      setIsLoadedFromMemory(false);
    } catch (err) {
      console.error('Error al guardar en localStorage:', err);
    }

    // Agregar al log visual en tiempo real
    const newLog: SubmissionLog = {
      id: String(Date.now()),
      timestamp: new Date().toLocaleTimeString(),
      data: formData,
      jsonString: JSON.stringify(structuredPayload, null, 2),
    };

    setLogs((prev) => [newLog, ...prev]);
    setShowSuccessToast(true);

    // Ocultar toast después de 4 segundos
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4500);
  };

  // Limpiar formulario y memoria local
  const handleClearForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setIsLoadedFromMemory(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHasSavedData(false);
      console.log('🧹 [COLORLINK] Memoria local (localStorage) y formulario reseteados.');
    } catch (e) {
      console.error(e);
    }
  };

  // Restaurar manualmente desde localStorage si existe
  const handleRestoreFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData({
          cliente: parsed.cliente || '',
          ciudad: parsed.ciudad || '',
          direccionEnvio: parsed.direccionEnvio || '',
          proyecto: parsed.proyecto || '',
          area: parsed.area ? String(parsed.area) : '',
          superficie: parsed.superficie || '',
          condicion: parsed.condicion || '',
          ambiente: parsed.ambiente || 'interior',
          color: parsed.color || '#0284c7',
          fechaRequerida: parsed.fechaRequerida || '',
          fotoNombre: parsed.fotografia?.nombre || undefined,
          fotoPreviewUrl: parsed.fotografia?.preview || undefined,
        });
        setIsLoadedFromMemory(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Descarga del archivo index.html independiente
  const handleDownloadHtml = () => {
    const html = generateStandaloneHtml();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'colorlink_registro.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <Header
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onDownloadHtml={handleDownloadHtml}
        savedInStorage={hasSavedData}
      />

      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-emerald-900/90 backdrop-blur-md text-emerald-100 px-4 py-3 rounded-xl border border-emerald-500/40 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">
              ¡Proyecto Registrado con Éxito!
            </p>
            <p className="text-[11px] text-emerald-200">
              Datos impresos en <code className="bg-emerald-950 px-1 rounded">console.log()</code> y persistidos en <code className="bg-emerald-950 px-1 rounded">localStorage</code>.
            </p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Subheader */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            Portal de Recubrimientos & Pinturas Colorlink
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Formulario de Registro Técnico y Envío
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            Complete las especificaciones del cliente y los parámetros de aplicación de recubrimiento. Al enviar, el formulario captura y valida los campos, genera el payload JSON para la consola del navegador y activa la memoria en <span className="font-mono font-semibold text-slate-700">localStorage</span> para futuras visitas.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            <ProjectForm
              formData={formData}
              setFormData={setFormData}
              onSubmitForm={handleSubmitForm}
              onClearForm={handleClearForm}
              isLoadedFromMemory={isLoadedFromMemory}
              hasSavedData={hasSavedData}
              onRestoreFromStorage={handleRestoreFromStorage}
            />
          </div>

          {/* Right Column: Live Calculated Specs & Real-time Console Log Inspector (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Live Technical Estimate Card */}
            <TechnicalSummary formData={formData} />

            {/* Live Console Output Visualizer */}
            <ConsoleViewer logs={logs} onClearLogs={() => setLogs([])} />

            {/* Quick Developer Tips Card */}
            <div className="p-4 bg-slate-100/80 rounded-2xl border border-slate-200/70 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Terminal className="w-4 h-4 text-slate-700" />
                <span>Verificación de Requerimientos</span>
              </div>
              <ul className="space-y-1.5 list-disc list-inside text-[11px] text-slate-600">
                <li>
                  <strong>console.log():</strong> Abre la consola con <kbd className="bg-white px-1 border border-slate-300 rounded text-slate-700">F12</kbd> para ver la salida nativa.
                </li>
                <li>
                  <strong>localStorage:</strong> Recarga la página (<kbd className="bg-white px-1 border border-slate-300 rounded text-slate-700">F5</kbd>) tras guardar y comprobarás el autocompletado automático.
                </li>
                <li>
                  <strong>Archivo Único:</strong> Puedes hacer click en <em>"Ver Código HTML"</em> arriba para copiar el archivo <code className="bg-white px-1 border border-slate-300 rounded text-slate-700">.html</code> completo con CSS y JS autónomo.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Colorlink Pinturas Profesionales. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>HTML5</span>
            <span>•</span>
            <span>JavaScript ES6 (localStorage)</span>
            <span>•</span>
            <span>Tailwind & CSS Moderno</span>
          </div>
        </div>
      </footer>

      {/* Standalone HTML Export Modal */}
      <HtmlExportModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        onDownloadHtml={handleDownloadHtml}
      />
    </div>
  );
}
