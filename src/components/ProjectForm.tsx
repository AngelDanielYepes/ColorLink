import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  MapPin, 
  Truck, 
  FileText, 
  Layers, 
  SunMedium, 
  Palette, 
  Calendar, 
  Camera, 
  Send, 
  RotateCcw, 
  Info, 
  Check, 
  Sparkles,
  X
} from 'lucide-react';
import { ProjectFormData } from '../types';

interface ProjectFormProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  onClearForm: () => void;
  isLoadedFromMemory: boolean;
  hasSavedData: boolean;
  onRestoreFromStorage: () => void;
}

const PRESET_COLORS = [
  { name: 'Azul Real Colorlink', hex: '#0284c7' },
  { name: 'Gris Grafito', hex: '#334155' },
  { name: 'Blanco Puro', hex: '#ffffff' },
  { name: 'Arena Cálida', hex: '#d97706' },
  { name: 'Verde Bosque', hex: '#059669' },
  { name: 'Terracota Teja', hex: '#dc2626' },
];

export const ProjectForm: React.FC<ProjectFormProps> = ({
  formData,
  setFormData,
  onSubmitForm,
  onClearForm,
  isLoadedFromMemory,
  hasSavedData,
  onRestoreFromStorage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (newColor: string) => {
    setFormData((prev) => ({ ...prev, color: newColor }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        fotoNombre: file.name,
        fotoPreviewUrl: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData((prev) => ({
      ...prev,
      fotoNombre: undefined,
      fotoPreviewUrl: undefined,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Banner / Notice when loaded from localStorage */}
      {isLoadedFromMemory && (
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100 px-6 py-3 flex items-center justify-between text-xs text-sky-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0 animate-pulse" />
            <span>
              <strong>Autocompletado activo:</strong> Se han restaurado los datos guardados en la memoria local (localStorage).
            </span>
          </div>
          <button
            type="button"
            onClick={onClearForm}
            className="text-sky-600 hover:text-sky-800 font-semibold underline shrink-0 ml-2"
          >
            Limpiar
          </button>
        </div>
      )}

      {/* Header Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-teal-500 to-amber-500" />

      <form onSubmit={onSubmitForm} className="p-6 sm:p-8 space-y-8" id="colorlinkForm">
        {/* ========================================================= */}
        {/* SECCIÓN 1: DATOS DEL CLIENTE Y ENVÍO                     */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold text-xs">
                1
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
                Datos del Cliente y Envío
              </h2>
            </div>
            <span className="text-xs font-medium text-slate-400">Campos obligatorios *</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Cliente / Empresa */}
            <div className="md:col-span-2 space-y-1.5">
              <label htmlFor="cliente" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-sky-600" />
                Cliente / Empresa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cliente"
                name="cliente"
                required
                value={formData.cliente}
                onChange={handleChange}
                placeholder="Ej. Constructora Andina S.A. / Lic. Roberto Méndez"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 outline-none transition-all"
              />
            </div>

            {/* Ciudad */}
            <div className="space-y-1.5">
              <label htmlFor="ciudad" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                Ciudad <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                required
                value={formData.ciudad}
                onChange={handleChange}
                placeholder="Ej. Ciudad de México / Guadalajara"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 outline-none transition-all"
              />
            </div>

            {/* Dirección de Envío */}
            <div className="space-y-1.5">
              <label htmlFor="direccionEnvio" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Truck className="w-3.5 h-3.5 text-sky-600" />
                Dirección de Envío <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="direccionEnvio"
                name="direccionEnvio"
                required
                value={formData.direccionEnvio}
                onChange={handleChange}
                placeholder="Ej. Calle 45 #120-B, Parque Industrial"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 outline-none transition-all"
              />
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECCIÓN 2: ESPECIFICACIONES DEL PROYECTO                  */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-100 text-teal-700 font-bold text-xs">
                2
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
                Especificaciones del Proyecto
              </h2>
            </div>
            <span className="text-xs font-medium text-slate-400">Requerimientos técnicos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Proyecto (Descripción) */}
            <div className="md:col-span-2 space-y-1.5">
              <label htmlFor="proyecto" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <FileText className="w-3.5 h-3.5 text-teal-600" />
                Proyecto (Descripción) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="proyecto"
                name="proyecto"
                required
                value={formData.proyecto}
                onChange={handleChange}
                placeholder="Ej. Recubrimiento de fachada exterior y muros de recepción"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 outline-none transition-all"
              />
            </div>

            {/* Área (m²) */}
            <div className="space-y-1.5">
              <label htmlFor="area" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Layers className="w-3.5 h-3.5 text-teal-600" />
                Área (m²) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="area"
                  name="area"
                  step="0.01"
                  min="0.01"
                  required
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Ej. 185.50"
                  className="w-full px-3.5 py-2.5 pr-12 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 outline-none transition-all font-mono"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">
                  m²
                </span>
              </div>
            </div>

            {/* Ambiente (select) */}
            <div className="space-y-1.5">
              <label htmlFor="ambiente" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <SunMedium className="w-3.5 h-3.5 text-teal-600" />
                Ambiente <span className="text-red-500">*</span>
              </label>
              <select
                id="ambiente"
                name="ambiente"
                required
                value={formData.ambiente}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 outline-none transition-all cursor-pointer font-medium"
              >
                <option value="interior">Interior (Bajo VOC, lavabilidad alta)</option>
                <option value="exterior">Exterior (Resistencia UV y agentes climáticos)</option>
              </select>
            </div>

            {/* Superficie (opcional) */}
            <div className="space-y-1.5">
              <label htmlFor="superficie" className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
                <span>Superficie</span>
                <span className="text-[10px] font-normal text-slate-400 lowercase tracking-normal">opcional</span>
              </label>
              <input
                type="text"
                id="superficie"
                name="superficie"
                value={formData.superficie}
                onChange={handleChange}
                placeholder="Ej. Concreto pulido, madera, yeso, tablaroca"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 outline-none transition-all"
              />
            </div>

            {/* Condición (opcional) */}
            <div className="space-y-1.5">
              <label htmlFor="condicion" className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
                <span>Condición de Superficie</span>
                <span className="text-[10px] font-normal text-slate-400 lowercase tracking-normal">opcional</span>
              </label>
              <input
                type="text"
                id="condicion"
                name="condicion"
                value={formData.condicion}
                onChange={handleChange}
                placeholder="Ej. Humedad leve, micro-fisuras, pintura descascarada"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 outline-none transition-all"
              />
            </div>

            {/* Color */}
            <div className="space-y-1.5">
              <label htmlFor="colorInput" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Palette className="w-3.5 h-3.5 text-teal-600" />
                Color Solicitado <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="relative shrink-0">
                  <input
                    type="color"
                    id="colorPicker"
                    value={formData.color.startsWith('#') && formData.color.length === 7 ? formData.color : '#0284c7'}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-11 h-10 rounded-xl cursor-pointer border border-slate-300 p-1 bg-white hover:scale-105 transition-transform"
                    title="Seleccionar tono exacto con selector cromático"
                  />
                </div>
                <input
                  type="text"
                  id="colorInput"
                  name="color"
                  required
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Código Hex (#0284c7) o Nombre de Tono"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 outline-none transition-all font-mono"
                />
              </div>

              {/* Swatch chips */}
              <div className="flex items-center gap-1.5 pt-1.5 flex-wrap">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Tonalidades rápidas:</span>
                {PRESET_COLORS.map((preset) => (
                  <button
                    key={preset.hex}
                    type="button"
                    onClick={() => handleColorChange(preset.hex)}
                    className="w-5 h-5 rounded-full border border-slate-300 shadow-xs hover:scale-125 transition-transform shrink-0"
                    style={{ backgroundColor: preset.hex }}
                    title={`${preset.name} (${preset.hex})`}
                  />
                ))}
              </div>
            </div>

            {/* Fecha Requerida */}
            <div className="space-y-1.5">
              <label htmlFor="fechaRequerida" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                Fecha Requerida <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="fechaRequerida"
                name="fechaRequerida"
                required
                value={formData.fechaRequerida}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 outline-none transition-all cursor-pointer font-medium"
              />
            </div>

            {/* Fotografías (opcional) */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-teal-600" />
                  Fotografías del Proyecto
                </span>
                <span className="text-[10px] font-normal text-slate-400 lowercase tracking-normal">opcional</span>
              </label>

              {formData.fotoPreviewUrl ? (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={formData.fotoPreviewUrl}
                      alt="Vista previa"
                      className="w-14 h-14 object-cover rounded-lg border border-slate-200 shadow-xs"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
                        {formData.fotoNombre || 'imagen_proyecto.jpg'}
                      </p>
                      <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Imagen cargada para análisis
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar imagen"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                    dragActive
                      ? 'border-teal-500 bg-teal-50/50 scale-[0.99]'
                      : 'border-slate-300 hover:border-teal-400 bg-slate-50/60 hover:bg-slate-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="fotografias"
                    name="fotografias"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Camera className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                  <p className="text-xs font-semibold text-slate-700">
                    Haga clic o arrastre aquí imágenes del área
                  </p>
                  <p className="text-[11px] text-slate-400">
                    PNG, JPG o WEBP para diagnóstico de estado de muro
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* BOTONES DE ACCIÓN Y CONTROLES                             */}
        {/* ========================================================= */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            id="btnSubmitProject"
            className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-sm shadow-md shadow-sky-600/25 hover:shadow-lg hover:shadow-sky-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <Send className="w-4 h-4" />
            <span>Registrar Proyecto</span>
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              type="button"
              id="btnClearForm"
              onClick={onClearForm}
              className="flex-1 sm:flex-none py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              title="Borrar todos los campos actuales"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar</span>
            </button>

            {hasSavedData && (
              <button
                type="button"
                onClick={onRestoreFromStorage}
                className="flex-1 sm:flex-none py-3 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-xs border border-sky-200 transition-colors flex items-center justify-center gap-1.5"
                title="Cargar última versión guardada en localStorage"
              >
                <span>Restaurar guardado</span>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
