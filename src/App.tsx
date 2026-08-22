import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProjectForm } from './components/ProjectForm';
import { TechnicalSummary } from './components/TechnicalSummary';
import { HtmlExportModal } from './components/HtmlExportModal';
import { ProjectFormData } from './types';
import { generateStandaloneHtml } from './utils/standaloneHtml';
import { calculateQuotation } from './utils/pricing';
import { 
  CheckCircle, 
  ShieldCheck,
  Store
} from 'lucide-react';

const STORAGE_KEY = 'colorlink_project_registration';

const INITIAL_FORM_STATE: ProjectFormData = {
  // 1. Datos de Empresa / Cliente (CLIENTES + CONTACTOS_CLIENTE)
  cliente: '',
  nitOCedula: '',
  contactoNombre: '',
  cargoContacto: '',
  telefono: '',
  email: '',
  tipoCliente: 'constructora',

  // 2. Especificaciones de Pintura & Cotización (PRODUCTOS + COTIZACIONES + EXTRAS)
  area: '',
  superficie: '',
  condicion: '',
  ambiente: 'interior',
  paintGrade: 'vinilo_tipo1',
  coats: 2,
  color: '#0284c7',
  colorNombre: 'Azul Real Colorlink',
  includeRollerKit: true,
  includeProtectionKit: true,
  includePrimer: false,
  includeResaneProduct: false,

  // 3. Datos de Envío y Despacho (PEDIDOS + DIRECCIONES_ENVIO)
  ciudad: '',
  departamento: '',
  direccionEnvio: '',
  barrioSector: '',
  proyecto: '',
  recibeNombre: '',
  telefonoRecibe: '',
  fechaRequerida: '',
  indicacionesEntrega: '',
  fotoNombre: undefined,
  fotoPreviewUrl: undefined,
};

export default function App() {
  const [formData, setFormData] = useState<ProjectFormData>(INITIAL_FORM_STATE);
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
          // Cliente / Empresa (CLIENTES + CONTACTOS_CLIENTE)
          cliente: parsed.cliente || '',
          nitOCedula: parsed.nitOCedula || '',
          contactoNombre: parsed.contactoNombre || '',
          cargoContacto: parsed.cargoContacto || '',
          telefono: parsed.telefono || '',
          email: parsed.email || '',
          tipoCliente: parsed.tipoCliente || 'constructora',

          // Cotización (PRODUCTOS + COTIZACIONES + EXTRAS)
          area: parsed.area ? String(parsed.area) : '',
          superficie: parsed.superficie || '',
          condicion: parsed.condicion || '',
          ambiente: parsed.ambiente || 'interior',
          paintGrade: parsed.paintGrade || (parsed.ambiente === 'exterior' ? 'exterior_acrilica' : 'vinilo_tipo1'),
          coats: parsed.coats || 2,
          color: parsed.color || '#0284c7',
          colorNombre: parsed.colorNombre || undefined,
          includeRollerKit: parsed.includeRollerKit ?? true,
          includeProtectionKit: parsed.includeProtectionKit ?? true,
          includePrimer: parsed.includePrimer ?? false,
          includeResaneProduct: parsed.includeResaneProduct ?? false,

          // Envío (PEDIDOS + DIRECCIONES_ENVIO)
          ciudad: parsed.ciudad || '',
          departamento: parsed.departamento || '',
          direccionEnvio: parsed.direccionEnvio || '',
          barrioSector: parsed.barrioSector || '',
          proyecto: parsed.proyecto || '',
          recibeNombre: parsed.recibeNombre || '',
          telefonoRecibe: parsed.telefonoRecibe || '',
          fechaRequerida: parsed.fechaRequerida || '',
          indicacionesEntrega: parsed.indicacionesEntrega || '',
          fotoNombre: parsed.fotografia?.nombre || undefined,
          fotoPreviewUrl: parsed.fotografia?.preview || undefined,
        });
        setIsLoadedFromMemory(true);
        setHasSavedData(true);

        console.log('🔄 [COLORLINK] Datos cargados desde localStorage:', parsed);
      }
    } catch (e) {
      console.error('Error al leer de localStorage:', e);
    }
  }, []);

  // 2. SUBMIT FORMULARIO SIN RECARGA, LOG ESTRUCTURADO EN CONSOLA Y PERSISTENCIA
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const quotation = calculateQuotation(formData);

    const structuredPayload = {
      // 1. Datos de Empresa / Cliente (CLIENTES + CONTACTOS_CLIENTE)
      empresaCliente: {
        razonSocial: formData.cliente.trim(),
        nitOCedula: formData.nitOCedula?.trim() || null,
        contacto: formData.contactoNombre?.trim() || null,
        cargoContacto: formData.cargoContacto?.trim() || null,
        telefono: formData.telefono?.trim() || null,
        email: formData.email?.trim() || null,
        tipoCliente: formData.tipoCliente,
      },

      // 2. Cotización y Materiales (PRODUCTOS + COTIZACIONES + EXTRAS)
      cotizacionMateriales: {
        areaM2: parseFloat(formData.area) || 0,
        superficie: formData.superficie?.trim() || null,
        condicion: formData.condicion?.trim() || null,
        lineaPintura: formData.paintGrade,
        ambiente: formData.ambiente,
        manos: formData.coats || 2,
        colorHex: formData.color?.trim(),
        colorNombre: formData.colorNombre || null,
        desgloseMateriales: {
          galonesPinturaTotal: quotation.gallonsNeeded,
          cunetesCincoGalones: quotation.cunetes,
          galonesSueltos: quotation.remainderGallons,
          kitRodilloBrocha: formData.includeRollerKit,
          kitProteccionPlasticos: formData.includeProtectionKit,
          selladorImprimante: formData.includePrimer,
          masillaResane: formData.includeResaneProduct,
        },
        valoresEconomicosCOP: {
          costoPintura: quotation.paintCost,
          costoHerramientasEInsumos: quotation.accessoriesSubtotal,
          subtotalBruto: quotation.subtotalBruto,
          descuentoAplicado: quotation.discountAmount,
          totalNetoCOP: quotation.totalNetoCOP,
          costoPromedioPorM2COP: quotation.costPerM2COP,
        },
      },

      // 3. Logística de Envío y Despacho (PEDIDOS + DIRECCIONES_ENVIO)
      logisticaDespacho: {
        ciudad: formData.ciudad.trim(),
        departamento: formData.departamento?.trim() || null,
        direccionEntrega: formData.direccionEnvio.trim(),
        barrioSector: formData.barrioSector?.trim() || null,
        proyectoObra: formData.proyecto.trim(),
        personaRecibe: formData.recibeNombre?.trim() || null,
        telefonoRecibe: formData.telefonoRecibe?.trim() || null,
        fechaRequerida: formData.fechaRequerida,
        indicacionesEntrega: formData.indicacionesEntrega?.trim() || null,
      },

      fotografia: formData.fotoNombre
        ? {
            nombre: formData.fotoNombre,
            tieneArchivo: true,
            preview: formData.fotoPreviewUrl,
          }
        : null,
      fechaRegistro: new Date().toISOString(),
    };

    console.log('=====================================================');
    console.log('📦 [COLORLINK COLOMBIA] Registro Completo de Pedido & Cotización:');
    console.log(structuredPayload);
    console.log('📄 [COLORLINK] JSON Serializado:');
    console.log(JSON.stringify(structuredPayload, null, 2));
    console.log('=====================================================');

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...formData,
        area: parseFloat(formData.area) || 0,
        fotografia: formData.fotoNombre ? { nombre: formData.fotoNombre, preview: formData.fotoPreviewUrl } : null,
      }));
      setHasSavedData(true);
      setIsLoadedFromMemory(false);
    } catch (err) {
      console.error('Error al guardar en localStorage:', err);
    }

    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const handleClearForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setIsLoadedFromMemory(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHasSavedData(false);
      console.log('🧹 [COLORLINK] Memoria local y formulario limpiados.');
    } catch (e) {
      console.error(e);
    }
  };

  const handleRestoreFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData({
          cliente: parsed.cliente || '',
          nitOCedula: parsed.nitOCedula || '',
          contactoNombre: parsed.contactoNombre || '',
          telefono: parsed.telefono || '',
          email: parsed.email || '',
          tipoCliente: parsed.tipoCliente || 'constructora',

          area: parsed.area ? String(parsed.area) : '',
          superficie: parsed.superficie || '',
          condicion: parsed.condicion || '',
          ambiente: parsed.ambiente || 'interior',
          paintGrade: parsed.paintGrade || (parsed.ambiente === 'exterior' ? 'exterior_acrilica' : 'vinilo_tipo1'),
          coats: parsed.coats || 2,
          color: parsed.color || '#0284c7',
          colorNombre: parsed.colorNombre || undefined,
          includeRollerKit: parsed.includeRollerKit ?? true,
          includeProtectionKit: parsed.includeProtectionKit ?? true,
          includePrimer: parsed.includePrimer ?? false,
          includeResaneProduct: parsed.includeResaneProduct ?? false,

          ciudad: parsed.ciudad || '',
          departamento: parsed.departamento || '',
          direccionEnvio: parsed.direccionEnvio || '',
          barrioSector: parsed.barrioSector || '',
          proyecto: parsed.proyecto || '',
          recibeNombre: parsed.recibeNombre || '',
          fechaRequerida: parsed.fechaRequerida || '',
          indicacionesEntrega: parsed.indicacionesEntrega || '',
          fotoNombre: parsed.fotografia?.nombre || undefined,
          fotoPreviewUrl: parsed.fotografia?.preview || undefined,
        });
        setIsLoadedFromMemory(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadHtml = () => {
    const html = generateStandaloneHtml();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'colorlink_tienda_cotizador.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation Header */}
      <Header
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onDownloadHtml={handleDownloadHtml}
        savedInStorage={hasSavedData}
      />

      {/* Success Notification */}
      {showSuccessToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-emerald-900/95 backdrop-blur-md text-emerald-100 px-4 py-3 rounded-xl border border-emerald-500/40 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">
              ¡Pedido y Cotización Registrados con Éxito!
            </p>
            <p className="text-[11px] text-emerald-200">
              Datos guardados en memoria local y disponibles para consulta.
            </p>
          </div>
        </div>
      )}

      {/* Main Single-View Application Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Title */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Store className="w-3.5 h-3.5 text-sky-600" />
            Colorlink Colombia • Venta Directa de Pinturas & Materiales
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Formulario de Pedido & Cotizador de Materiales (COP)
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            Complete los datos de la empresa, especifique las áreas para generar la cotización formal en PDF y suministre los datos de despacho nacional.
          </p>
        </div>

        {/* UNIFIED SINGLE VIEW: Form on left, live quotation sidebar on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
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

          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            <TechnicalSummary 
              formData={formData} 
            />

            {/* Quality & Factory Guarantee Card */}
            <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 border border-slate-800 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Garantía de Fábrica Colorlink</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Venta exclusiva de pinturas de alta cobertura, cuñetes, galones y herramientas para pintar. No incluye servicio de aplicación o mano de obra.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Colorlink Pinturas Profesionales Colombia. Venta de pinturas y materiales.</p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Cotizador en COP</span>
            <span>•</span>
            <span>Autocompletado Local</span>
            <span>•</span>
            <span>Despacho Nacional</span>
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
