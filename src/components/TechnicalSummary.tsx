import React, { useState } from 'react';
import { 
  Paintbrush, 
  Store, 
  CheckCircle,
  Copy,
  Check,
  ShieldCheck,
  Layers,
  MapPin,
  Clock,
  FileDown
} from 'lucide-react';
import { ProjectFormData } from '../types';
import { calculateQuotation, formatCOP } from '../utils/pricing';
import { generateQuotationPdf } from '../utils/pdfGenerator';

interface TechnicalSummaryProps {
  formData: ProjectFormData;
}

export const TechnicalSummary: React.FC<TechnicalSummaryProps> = ({
  formData,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const quotation = calculateQuotation(formData);

  const handleCopyQuote = () => {
    const quoteText = `================================================
🎨 COTIZACIÓN COLORLINK COLOMBIA (COP)
================================================
Cliente: ${formData.cliente || 'Consumidor Final'}
Ciudad de Despacho: ${formData.ciudad || 'Colombia'}
Dirección de Entrega: ${formData.direccionEnvio || 'No especificada'}
Proyecto: ${formData.proyecto || 'Proyecto de Pintura'}
Fecha de Entrega: ${formData.fechaRequerida || 'Inmediata'}

📐 ESPECIFICACIONES TÉCNICAS:
- Área a cubrir: ${quotation.area} m²
- Línea de Pintura: ${quotation.paintName}
- Manos: ${quotation.coats} manos
- Color: ${formData.colorNombre || formData.color} (${formData.color})
${formData.superficie ? `- Superficie: ${formData.superficie}\n` : ''}${formData.condicion ? `- Estado: ${formData.condicion}\n` : ''}
📦 VOLUMEN & MATERIALES CALCULADOS:
- Pintura requerida: ${quotation.gallonsNeeded} Galones (~${quotation.cunetes} Cuñete(s) de 5 Gal + ${quotation.remainderGallons} Galones) -> ${formatCOP(quotation.paintCost)}
${formData.includeRollerKit ? `- Kit Rodillo Antigoteo + Brocha + Bandeja (${quotation.rollerKitsCount} un) -> ${formatCOP(quotation.rollerCost)}\n` : ''}${formData.includeProtectionKit ? `- Plásticos Cubretodo + Cintas Masking (${quotation.protectionKitsCount} un) -> ${formatCOP(quotation.protectionCost)}\n` : ''}${formData.includePrimer ? `- Sellador Imprimante Antialcalino (${quotation.primerUnits} gal) -> ${formatCOP(quotation.primerCost)}\n` : ''}${formData.includeResaneProduct ? `- Masilla Acrílica de Resane (${quotation.resaneUnits} gal) -> ${formatCOP(quotation.resaneCost)}\n` : ''}
💰 TOTAL EN PESOS COLOMBIANOS (COP):
- Subtotal: ${formatCOP(quotation.subtotalBruto)}
${quotation.effectiveDiscount > 0 ? `- Descuento por Volumen (${quotation.effectiveDiscount}%): -${formatCOP(quotation.discountAmount)}\n` : ''}TOTAL A PAGAR: ${formatCOP(quotation.totalNetoCOP)} COP
Costo promedio de material: ${formatCOP(quotation.costPerM2COP)} / m²

* Venta exclusiva de pinturas y materiales. No incluye mano de obra.
================================================`;

    navigator.clipboard.writeText(quoteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Store className="w-4 h-4 text-sky-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Resumen de Cotización (COP)
          </h3>
        </div>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          Pesos COP
        </span>
      </div>

      {/* Main Quote Hero Box */}
      <div className="bg-gradient-to-br from-slate-900 to-sky-950 text-white rounded-xl p-4 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 block">
          Total Materiales del Pedido
        </span>
        <div className="text-2xl font-black font-mono tracking-tight text-white">
          {formatCOP(quotation.totalNetoCOP)} COP
        </div>
        <div className="text-xs text-slate-300">
          {quotation.area > 0 ? (
            <span>Para <strong>{quotation.area} m²</strong> • ~{formatCOP(quotation.costPerM2COP)} / m²</span>
          ) : (
            <span>Ingrese el área en el formulario</span>
          )}
        </div>
      </div>

      {/* Breakdown Items */}
      <div className="space-y-3 text-xs">
        {/* Paint & Volume */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between text-slate-500 font-medium text-[11px]">
            <span className="flex items-center gap-1">
              <Paintbrush className="w-3 h-3 text-sky-600" />
              Pintura & Volumen
            </span>
            <span className="font-semibold text-slate-700">
              {quotation.coats} {quotation.coats === 1 ? 'mano' : 'manos'}
            </span>
          </div>
          <p className="font-bold text-slate-900 text-xs">
            {quotation.paintName}
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-200/60 font-mono">
            <span className="text-slate-500">
              {quotation.gallonsNeeded > 0
                ? `${quotation.gallonsNeeded} Gal (${quotation.cunetes > 0 ? `${quotation.cunetes} cuñetes + ` : ''}${quotation.remainderGallons} gal)`
                : '0 Galones'}
            </span>
            <span className="font-bold text-slate-900">
              {formatCOP(quotation.paintCost)}
            </span>
          </div>
        </div>

        {/* Color Selected */}
        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-slate-600 font-medium flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0 shadow-xs"
              style={{ backgroundColor: formData.color || '#0284c7' }}
            />
            Color
          </span>
          <span className="font-mono font-bold text-slate-800 text-[11px]">
            {formData.colorNombre || formData.color || '#0284c7'}
          </span>
        </div>

        {/* Supplementary Accessories Checklist */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Detalle de Insumos
          </span>

          <div className="space-y-1 text-[11px]">
            {formData.includeRollerKit && (
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Kit Rodillo + Brocha ({quotation.rollerKitsCount} un)
                </span>
                <span className="font-mono font-semibold text-slate-800">
                  {formatCOP(quotation.rollerCost)}
                </span>
              </div>
            )}

            {formData.includeProtectionKit && (
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Plásticos & Cintas ({quotation.protectionKitsCount} un)
                </span>
                <span className="font-mono font-semibold text-slate-800">
                  {formatCOP(quotation.protectionCost)}
                </span>
              </div>
            )}

            {formData.includePrimer && (
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Sellador Imprimante ({quotation.primerUnits} gal)
                </span>
                <span className="font-mono font-semibold text-slate-800">
                  {formatCOP(quotation.primerCost)}
                </span>
              </div>
            )}

            {formData.includeResaneProduct && (
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Masilla de Resane ({quotation.resaneUnits} gal)
                </span>
                <span className="font-mono font-semibold text-slate-800">
                  {formatCOP(quotation.resaneCost)}
                </span>
              </div>
            )}

            {/* Discount if present */}
            {quotation.effectiveDiscount > 0 && (
              <div className="flex items-center justify-between py-1 text-emerald-700 font-semibold">
                <span>Descuento Volumen ({quotation.effectiveDiscount}%)</span>
                <span className="font-mono">-{formatCOP(quotation.discountAmount)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        <button
          type="button"
          onClick={() => generateQuotationPdf(formData)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <FileDown className="w-4 h-4 text-sky-400" />
          <span>Generar PDF Cotización</span>
        </button>

        <button
          type="button"
          onClick={handleCopyQuote}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all border border-slate-300/80 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">¡Cotización Copiada!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-600" />
              <span>Copiar Texto de Cotización</span>
            </>
          )}
        </button>
      </div>

      {/* Logistics preview */}
      {formData.cliente && (
        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
          <div className="flex justify-between">
            <span>Cliente:</span>
            <span className="font-semibold text-slate-700 truncate max-w-[160px]">{formData.cliente}</span>
          </div>
          {formData.ciudad && (
            <div className="flex justify-between">
              <span>Ciudad:</span>
              <span className="font-semibold text-slate-700">{formData.ciudad}</span>
            </div>
          )}
          {formData.fechaRequerida && (
            <div className="flex justify-between">
              <span>Entrega:</span>
              <span className="font-semibold text-slate-700">{formData.fechaRequerida}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
