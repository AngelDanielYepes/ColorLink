import React from 'react';
import { Calculator, ShieldCheck, Truck, Layers, Palette, Calendar, MapPin } from 'lucide-react';
import { ProjectFormData } from '../types';

interface TechnicalSummaryProps {
  formData: ProjectFormData;
}

export const TechnicalSummary: React.FC<TechnicalSummaryProps> = ({ formData }) => {
  const areaNum = parseFloat(formData.area) || 0;
  // Standard professional paint yield: ~10 m² per liter per coat (2 coats = 5 m²/L)
  const litersRequired = areaNum > 0 ? (areaNum / 5).toFixed(1) : '0.0';
  const gallonsRequired = areaNum > 0 ? (parseFloat(litersRequired) / 3.785).toFixed(1) : '0.0';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-sky-600" />
          <h3 className="text-sm font-bold text-slate-800">
            Ficha Técnica Estimada (En Vivo)
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-slate-400">Colorlink Pro</span>
      </div>

      {/* Color Preview & Area Specs */}
      <div className="grid grid-cols-2 gap-3">
        {/* Color preview card */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg shadow-sm border border-slate-200 shrink-0"
            style={{ backgroundColor: formData.color || '#0284c7' }}
          />
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Tono Seleccionado
            </span>
            <p className="text-xs font-bold text-slate-800 truncate font-mono">
              {formData.color || '#0284c7'}
            </p>
          </div>
        </div>

        {/* Liters Calculation */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Rendimiento (2 Manos)
          </span>
          <p className="text-xs font-bold text-sky-700">
            ~{litersRequired} L <span className="text-slate-500 font-normal">({gallonsRequired} gal)</span>
          </p>
        </div>
      </div>

      {/* Details List */}
      <div className="space-y-2 text-xs">
        <div className="flex items-start justify-between py-1.5 border-b border-slate-100">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" /> Superficie & Condición:
          </span>
          <span className="font-semibold text-slate-800 text-right max-w-[55%] truncate">
            {formData.superficie || 'No especificada'} {formData.condicion ? `(${formData.condicion})` : ''}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <span className="text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Grado de Resistencia:
          </span>
          <span className="font-semibold text-slate-800 capitalize">
            Línea {formData.ambiente === 'exterior' ? 'Exterior Clima-Guard UV' : 'Interior Ultra-Lavable'}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <span className="text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> Destino de Despacho:
          </span>
          <span className="font-semibold text-slate-800 truncate max-w-[55%]">
            {formData.ciudad ? `${formData.ciudad}` : 'Por definir'}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> Entrega Solicitada:
          </span>
          <span className="font-semibold text-slate-800">
            {formData.fechaRequerida || 'Sin fecha asignada'}
          </span>
        </div>
      </div>
    </div>
  );
};
