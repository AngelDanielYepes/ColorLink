import React, { useState, useRef } from 'react';
import { 
  Building2, 
  MapPin, 
  Truck, 
  Calendar, 
  UploadCloud, 
  FileCheck, 
  Trash2, 
  Layers, 
  Paintbrush, 
  Pipette, 
  FileText, 
  Sparkles, 
  ShoppingBag,
  RotateCcw,
  ShieldCheck,
  Check,
  FileDown,
  User,
  Phone,
  Mail,
  CreditCard,
  Briefcase,
  Navigation,
  Clock,
  CheckCircle
} from 'lucide-react';
import { ProjectFormData, PaintGrade, TipoCliente } from '../types';
import { calculateQuotation, formatCOP, PAINT_CATALOG } from '../utils/pricing';
import { generateQuotationPdf } from '../utils/pdfGenerator';

interface ProjectFormProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  onClearForm: () => void;
  isLoadedFromMemory?: boolean;
  hasSavedData?: boolean;
  onRestoreFromStorage?: () => void;
}

const PRESET_COLORS = [
  { name: 'Blanco Puro', hex: '#ffffff', border: true },
  { name: 'Gris Perla', hex: '#e2e8f0', border: false },
  { name: 'Arena Cálida', hex: '#e8d9c5', border: false },
  { name: 'Azul Real Colorlink', hex: '#0284c7', border: false },
  { name: 'Verde Eucalipto', hex: '#059669', border: false },
  { name: 'Terracota Colonial', hex: '#b45309', border: false },
  { name: 'Gris Grafito', hex: '#334155', border: false },
  { name: 'Negro Mate', hex: '#0f172a', border: false },
];

const TIPO_CLIENTE_OPTIONS: { value: TipoCliente; label: string }[] = [
  { value: 'constructora', label: 'Constructora / Desarrollador' },
  { value: 'contratista', label: 'Contratista / Maestro de Obra' },
  { value: 'arquitecto_disenador', label: 'Arquitectura / Diseño' },
  { value: 'administracion_ph', label: 'Administración P.H. / Conjunto' },
  { value: 'empresa_comercial', label: 'Empresa / Comercial' },
  { value: 'persona_natural', label: 'Persona Natural / Residencial' },
];

const COLOMBIA_CIUDADES = [
  'Bogotá D.C.',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Bucaramanga',
  'Cartagena',
  'Pereira',
  'Manizales',
  'Ibagué',
  'Santa Marta',
  'Villavicencio',
  'Cúcuta',
  'Pasto',
  'Armenia',
  'Neiva',
  'Montería',
  'Valledupar',
  'Popayán',
  'Tunja',
  'Otra Ciudad',
];

export const ProjectForm: React.FC<ProjectFormProps> = ({
  formData,
  setFormData,
  onSubmitForm,
  onClearForm,
  isLoadedFromMemory = false,
  hasSavedData = false,
  onRestoreFromStorage,
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [pdfGeneratedToast, setPdfGeneratedToast] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const quotation = calculateQuotation(formData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaintGradeChange = (grade: PaintGrade) => {
    const defaultAmbiente = PAINT_CATALOG[grade]?.recommendedAmbiente || 'interior';
    setFormData((prev) => ({
      ...prev,
      paintGrade: grade,
      ambiente: defaultAmbiente,
    }));
  };

  const handleColorChange = (hex: string, name?: string) => {
    setFormData((prev) => ({
      ...prev,
      color: hex,
      colorNombre: name || hex,
    }));
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          fotoNombre: file.name,
          fotoPreviewUrl: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      fotoNombre: undefined,
      fotoPreviewUrl: undefined,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownloadPdfQuote = () => {
    generateQuotationPdf(formData);
    setPdfGeneratedToast(true);
    setTimeout(() => setPdfGeneratedToast(false), 3000);
  };

  return (
    <form onSubmit={onSubmitForm} className="space-y-8" id="colorlink-structured-form">
      {/* Alerta de Autocompletado desde memoria */}
      {isLoadedFromMemory && (
        <div className="bg-sky-50 border border-sky-200/80 rounded-xl p-4 flex items-center justify-between gap-3 text-sky-900 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-100 rounded-lg text-sky-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold">Datos Cargados desde Memoria Local</p>
              <p className="text-[11px] text-sky-700">
                Se han restaurado los datos de la empresa, cotización y despacho guardados.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClearForm}
            className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline px-2 py-1 cursor-pointer"
          >
            Limpiar todo
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. SECCIÓN: DATOS DE LA EMPRESA / CLIENTE */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs">
              1
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Datos de la Empresa / Cliente
              </h2>
              <p className="text-xs text-slate-500">
                Identificación fiscal, contacto comercial y perfil del comprador.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
            Información del Cliente
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Empresa / Razón Social */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Building2 className="w-3.5 h-3.5 text-sky-600" />
              Razón Social / Nombre Completo <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="cliente"
              required
              value={formData.cliente}
              onChange={handleChange}
              placeholder="Ej. Constructora Andina S.A.S. o Carlos Rodríguez"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all"
            />
          </div>

          {/* NIT o Cédula */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <CreditCard className="w-3.5 h-3.5 text-sky-600" />
              NIT / Cédula (C.C.) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="nitOCedula"
              required
              value={formData.nitOCedula || ''}
              onChange={handleChange}
              placeholder="Ej. 901.234.567-8"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all font-mono"
            />
          </div>

          {/* Tipo de Cliente */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Briefcase className="w-3.5 h-3.5 text-sky-600" />
              Sector / Perfil de Cliente
            </label>
            <select
              name="tipoCliente"
              value={formData.tipoCliente || 'constructora'}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all cursor-pointer"
            >
              {TIPO_CLIENTE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Persona de Contacto */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <User className="w-3.5 h-3.5 text-sky-600" />
              Persona de Contacto / Compras <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="contactoNombre"
              required
              value={formData.contactoNombre || ''}
              onChange={handleChange}
              placeholder="Ej. Ing. Diana Morales"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all"
            />
          </div>

          {/* Teléfono / WhatsApp */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              Teléfono / WhatsApp <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              name="telefono"
              required
              value={formData.telefono || ''}
              onChange={handleChange}
              placeholder="Ej. +57 310 555 1234"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all font-mono"
            />
          </div>

          {/* Correo Electrónico */}
          <div className="space-y-1.5 lg:col-span-3">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Mail className="w-3.5 h-3.5 text-sky-600" />
              Correo Electrónico (Para envío de cotización y facturación) <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="Ej. compras@constructoraandina.com"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SECCIÓN: COTIZACIÓN & ESPECIFICACIONES TÉCNICAS */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-600 text-white font-bold text-xs">
              2
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Cotización & Especificaciones de Pintura
              </h2>
              <p className="text-xs text-slate-500">
                Cálculo instantáneo de volumen en cuñetes (5 gal), galones sueltos y herramientas.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            Cotizador en COP
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Área en m² */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-600" />
                Área Total a Cubrir (m²) <span className="text-rose-500">*</span>
              </span>
              {quotation.area > 0 && (
                <span className="text-[11px] font-semibold text-sky-700 font-mono">
                  ~{quotation.gallonsNeeded} Gal requeridos
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type="number"
                name="area"
                required
                min="1"
                step="0.5"
                value={formData.area}
                onChange={handleChange}
                placeholder="Ej. 120"
                className="w-full px-3.5 py-2.5 pr-12 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all font-mono"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">
                m²
              </span>
            </div>
          </div>

          {/* Manos de Pintura */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              Manos de Pintura
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, coats: num }))}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    (formData.coats || 2) === num
                      ? 'bg-sky-600 border-sky-600 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  {num} {num === 1 ? 'Mano' : 'Manos'}
                </button>
              ))}
            </div>
          </div>

          {/* Línea de Pintura Colorlink */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Paintbrush className="w-3.5 h-3.5 text-sky-600" />
              Línea de Pintura Colorlink <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['vinilo_tipo1', 'exterior_acrilica', 'esmalte_epoxica'] as PaintGrade[]).map((grade) => {
                const item = PAINT_CATALOG[grade];
                const isSelected = (formData.paintGrade || 'vinilo_tipo1') === grade;
                return (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => handlePaintGradeChange(grade)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500/20 text-sky-950 shadow-xs'
                        : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs block">{item.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight mb-2">
                      {item.desc}
                    </p>
                    <div className="text-[11px] font-mono font-semibold text-sky-700 pt-1.5 border-t border-slate-200/60">
                      {formatCOP(item.gallonPrice)} / gal • {formatCOP(item.cunetePrice)} / cuñete
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color del Proyecto */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
              <span className="flex items-center gap-1.5">
                <Pipette className="w-3.5 h-3.5 text-sky-600" />
                Color / Tono Requerido <span className="text-rose-500">*</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                {formData.colorNombre ? `${formData.colorNombre} (${formData.color})` : formData.color}
              </span>
            </label>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="flex items-center gap-2 bg-slate-50 p-1.5 border border-slate-300 rounded-xl">
                <input
                  type="color"
                  value={formData.color || '#0284c7'}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                />
                <input
                  type="text"
                  name="color"
                  required
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="#0284c7"
                  className="w-24 px-2 py-1 text-xs font-mono font-bold uppercase bg-white border border-slate-200 rounded-lg outline-none focus:border-sky-500"
                />
              </div>

              {/* Preset Palette */}
              <div className="flex-1 flex flex-wrap items-center gap-1.5">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => handleColorChange(c.hex, c.name)}
                    title={c.name}
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all border cursor-pointer ${
                      formData.color?.toLowerCase() === c.hex.toLowerCase()
                        ? 'border-sky-600 bg-sky-50 text-sky-950 ring-2 ring-sky-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: c.hex,
                        border: c.border ? '1px solid #cbd5e1' : 'none',
                      }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Superficie base */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
              <span>Superficie Base</span>
              <span className="text-[11px] font-normal lowercase text-slate-400">(opcional)</span>
            </label>
            <input
              type="text"
              name="superficie"
              value={formData.superficie}
              onChange={handleChange}
              placeholder="Ej. Concreto liso, revoque, drywall, madera"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all"
            />
          </div>

          {/* Condición / Estado */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
              <span>Estado / Condición de la Superficie</span>
              <span className="text-[11px] font-normal lowercase text-slate-400">(opcional)</span>
            </label>
            <input
              type="text"
              name="condicion"
              value={formData.condicion}
              onChange={handleChange}
              placeholder="Ej. Superficie nueva, repinte, fisuras leves"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all"
            />
          </div>
        </div>

        {/* Herramientas y Elementos Complementarios */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-sky-600" />
              Herramientas & Insumos Complementarios
            </label>
            <span className="text-[11px] text-slate-400">Opcionales</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Kit Rodillo + Brocha */}
            <label className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
              formData.includeRollerKit
                ? 'border-sky-500 bg-sky-50/50 shadow-xs'
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-600'
            }`}>
              <input
                type="checkbox"
                checked={formData.includeRollerKit}
                onChange={(e) => setFormData((prev) => ({ ...prev, includeRollerKit: e.target.checked }))}
                className="mt-0.5 w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 cursor-pointer"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 block">
                  Kit Rodillo + Brocha
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Antigoteo + Bandeja
                </span>
                <span className="text-[10px] text-sky-700 font-semibold block mt-0.5">
                  +{formatCOP(quotation.rollerCost)}
                </span>
              </div>
            </label>

            {/* Plásticos y Cintas */}
            <label className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
              formData.includeProtectionKit
                ? 'border-sky-500 bg-sky-50/50 shadow-xs'
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-600'
            }`}>
              <input
                type="checkbox"
                checked={formData.includeProtectionKit}
                onChange={(e) => setFormData((prev) => ({ ...prev, includeProtectionKit: e.target.checked }))}
                className="mt-0.5 w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 cursor-pointer"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 block">
                  Plásticos & Cintas
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Cubretodo 4x5m + Masking
                </span>
                <span className="text-[10px] text-sky-700 font-semibold block mt-0.5">
                  +{formatCOP(quotation.protectionCost)}
                </span>
              </div>
            </label>

            {/* Sellador Imprimante */}
            <label className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
              formData.includePrimer
                ? 'border-sky-500 bg-sky-50/50 shadow-xs'
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-600'
            }`}>
              <input
                type="checkbox"
                checked={formData.includePrimer}
                onChange={(e) => setFormData((prev) => ({ ...prev, includePrimer: e.target.checked }))}
                className="mt-0.5 w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 cursor-pointer"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 block">
                  Sellador Imprimante
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Antialcalino ($46.000/gal)
                </span>
                <span className="text-[10px] text-sky-700 font-semibold block mt-0.5">
                  +{formatCOP(quotation.primerCost)}
                </span>
              </div>
            </label>

            {/* Masilla de Resane */}
            <label className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
              formData.includeResaneProduct
                ? 'border-sky-500 bg-sky-50/50 shadow-xs'
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-600'
            }`}>
              <input
                type="checkbox"
                checked={formData.includeResaneProduct}
                onChange={(e) => setFormData((prev) => ({ ...prev, includeResaneProduct: e.target.checked }))}
                className="mt-0.5 w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 cursor-pointer"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 block">
                  Masilla de Resane
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Para grietas ($28.000/gal)
                </span>
                <span className="text-[10px] text-sky-700 font-semibold block mt-0.5">
                  +{formatCOP(quotation.resaneCost)}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUB-PANEL DE COTIZACIÓN Y BOTÓN PARA GENERAR PDF DE COTIZACIÓN */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 rounded-2xl p-5 text-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block">
                Total Cotización de Materiales Colorlink
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white mt-0.5">
                {formatCOP(quotation.totalNetoCOP)} COP
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-300 block">
                {quotation.area > 0 ? (
                  <>Volumen: <strong>{quotation.gallonsNeeded} Galones</strong> ({quotation.cunetes > 0 ? `${quotation.cunetes} cuñetes + ` : ''}{quotation.remainderGallons} gal)</>
                ) : (
                  'Especifique el área en m²'
                )}
              </span>
              <span className="text-[11px] text-sky-300 block font-mono">
                ~{formatCOP(quotation.costPerM2COP)} / m²
              </span>
            </div>
          </div>

          {/* BOTÓN DESTACADO: GENERAR PDF CON LA COTIZACIÓN */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Incluye desglose en COP, cuñetes, galones e insumos para presentar o aprobar.</span>
            </div>

            <button
              type="button"
              onClick={handleDownloadPdfQuote}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-sky-500/25 hover:shadow-lg cursor-pointer shrink-0"
            >
              <FileDown className="w-4 h-4" />
              <span>📄 Generar PDF Cotización</span>
            </button>
          </div>

          {pdfGeneratedToast && (
            <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-xl p-2.5 text-center text-xs text-emerald-200 animate-in fade-in">
              ✨ ¡Cotización generada y descargada exitosamente en formato PDF!
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SECCIÓN: DATOS DE ENVÍO Y DESPACHO */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs">
              3
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Datos de Envío y Despacho
              </h2>
              <p className="text-xs text-slate-500">
                Dirección exacta de obra, persona que recibe y fecha requerida de entrega.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
            Logística Nacional
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Ciudad de Despacho */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              Ciudad de Despacho <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="ciudad"
              required
              list="ciudades-list"
              value={formData.ciudad}
              onChange={handleChange}
              placeholder="Ej. Bogotá, Medellín, Cali, Barranquilla"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all"
            />
            <datalist id="ciudades-list">
              {COLOMBIA_CIUDADES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          {/* Departamento */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Navigation className="w-3.5 h-3.5 text-sky-600" />
              Departamento
            </label>
            <input
              type="text"
              name="departamento"
              value={formData.departamento || ''}
              onChange={handleChange}
              placeholder="Ej. Cundinamarca, Antioquia, Valle"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all"
            />
          </div>

          {/* Nombre del Proyecto / Obra */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <FileText className="w-3.5 h-3.5 text-sky-600" />
              Nombre del Proyecto / Obra <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="proyecto"
              required
              value={formData.proyecto}
              onChange={handleChange}
              placeholder="Ej. Edificio Torres del Parque"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all"
            />
          </div>

          {/* Dirección de Entrega */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Truck className="w-3.5 h-3.5 text-sky-600" />
              Dirección Exacta de Entrega <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="direccionEnvio"
              required
              value={formData.direccionEnvio}
              onChange={handleChange}
              placeholder="Ej. Calle 100 # 15-20, Acceso por Portería de Proveedores"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all"
            />
          </div>

          {/* Barrio / Sector */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              Barrio / Sector / Zona Industrial
            </label>
            <input
              type="text"
              name="barrioSector"
              value={formData.barrioSector || ''}
              onChange={handleChange}
              placeholder="Ej. Chicó Norte / Zona Franca"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all"
            />
          </div>

          {/* Persona que Recibe en Obra */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <User className="w-3.5 h-3.5 text-sky-600" />
              Nombre de quien Recibe en Sitio
            </label>
            <input
              type="text"
              name="recibeNombre"
              value={formData.recibeNombre || ''}
              onChange={handleChange}
              placeholder="Ej. Maestro Jorge Gómez (311 222 3344)"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all"
            />
          </div>

          {/* Fecha Requerida de Entrega */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              Fecha Requerida de Entrega <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              name="fechaRequerida"
              required
              value={formData.fechaRequerida}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all"
            />
          </div>

          {/* Indicaciones / Horarios de Descargue */}
          <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              Indicaciones de Entrega / Horarios de Descargue <span className="text-[11px] font-normal lowercase text-slate-400">(opcional)</span>
            </label>
            <input
              type="text"
              name="indicacionesEntrega"
              value={formData.indicacionesEntrega || ''}
              onChange={handleChange}
              placeholder="Ej. Reciben únicamente de 8:00 AM a 4:00 PM. Ingreso con EPP y ARL vigente."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 outline-none transition-all"
            />
          </div>

          {/* Subir Fotografías o Planos (Opcional) */}
          <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
              <span className="flex items-center gap-1.5">
                <UploadCloud className="w-3.5 h-3.5 text-sky-600" />
                Fotografías del Área o Planos de Obra
              </span>
              <span className="text-[11px] font-normal lowercase text-slate-400">
                (opcional)
              </span>
            </label>

            {!formData.fotoPreviewUrl ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-sky-500 bg-sky-50/60'
                    : 'border-slate-300 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-400'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                  className="hidden"
                />
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-xs border border-slate-200 text-sky-600">
                    <UploadCloud className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800">
                      Adjuntar fotografía del área o plano de la obra
                    </p>
                    <p className="text-[11px] text-slate-400">
                      PNG, JPG o WEBP (vista previa local)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <img
                    src={formData.fotoPreviewUrl}
                    alt="Vista previa"
                    className="w-10 h-10 object-cover rounded-lg border border-slate-200"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800 truncate max-w-xs">
                      {formData.fotoNombre || 'imagen_proyecto.jpg'}
                    </p>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5" /> Archivo adjuntado
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removePhoto}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Eliminar archivo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTONES DE ACCIÓN AL FINAL: LIMPIAR / RESTAURAR Y REGISTRAR PEDIDO */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-slate-200/80">
        <div className="flex items-center gap-2">
          {hasSavedData && onRestoreFromStorage && (
            <button
              type="button"
              onClick={onRestoreFromStorage}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Restaurar Guardado</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClearForm}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Limpiar Formulario</span>
          </button>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold shadow-md shadow-sky-600/25 hover:shadow-lg transition-all cursor-pointer"
        >
          <span>💾 Registrar Pedido</span>
        </button>
      </div>
    </form>
  );
};
