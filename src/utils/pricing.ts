import { ProjectFormData, PaintGrade, QuotationBreakdown } from '../types';

export const PAINT_CATALOG: Record<PaintGrade, { 
  name: string; 
  gallonPrice: number; 
  cunetePrice: number; 
  coveragePerGallonCoat: number; 
  desc: string;
  recommendedAmbiente: 'interior' | 'exterior';
}> = {
  vinilo_tipo1: {
    name: 'Vinilo Tipo 1 Alto Tráfico (Interior)',
    gallonPrice: 98000,
    cunetePrice: 430000,
    coveragePerGallonCoat: 28, // m² por galón a 1 mano (~14 m² a 2 manos)
    desc: 'Lavabilidad superior clase A, bajo olor y máxima blancura/pigmentación.',
    recommendedAmbiente: 'interior',
  },
  exterior_acrilica: {
    name: 'Coraza Acrílica Clima-Guard (Exterior)',
    gallonPrice: 148000,
    cunetePrice: 650000,
    coveragePerGallonCoat: 25,
    desc: 'Protección hidrófuga contra lluvia torrencial, hongos y rayos UV.',
    recommendedAmbiente: 'exterior',
  },
  esmalte_epoxica: {
    name: 'Esmalte Sintético / Epóxica Especial',
    gallonPrice: 185000,
    cunetePrice: 830000,
    coveragePerGallonCoat: 22,
    desc: 'Recubrimiento de alta resistencia para maderas, metales o pisos de lavado intensivo.',
    recommendedAmbiente: 'interior',
  },
};

export const RESANE_GALLON_PRICE = 28000;
export const PRIMER_GALLON_PRICE = 46000;
export const ROLLER_KIT_PRICE = 38000;
export const PROTECTION_KIT_PRICE = 22000;

export function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function calculateQuotation(formData: ProjectFormData): QuotationBreakdown {
  const area = parseFloat(formData.area) || 0;
  const paintGrade = formData.paintGrade || (formData.ambiente === 'exterior' ? 'exterior_acrilica' : 'vinilo_tipo1');
  const selectedPaint = PAINT_CATALOG[paintGrade] || PAINT_CATALOG.vinilo_tipo1;
  const coats = Math.max(1, formData.coats || 2);

  if (area <= 0) {
    return {
      area: 0,
      paintGrade,
      paintName: selectedPaint.name,
      coats,
      gallonsNeeded: 0,
      cunetes: 0,
      remainderGallons: 0,
      paintCost: 0,
      rollerCost: 0,
      rollerKitsCount: 0,
      protectionCost: 0,
      protectionKitsCount: 0,
      primerCost: 0,
      primerUnits: 0,
      resaneCost: 0,
      resaneUnits: 0,
      accessoriesSubtotal: 0,
      subtotalBruto: 0,
      effectiveDiscount: 0,
      discountAmount: 0,
      totalNetoCOP: 0,
      costPerM2COP: 0,
    };
  }

  // Merma técnica del 8% y cálculo de manos
  const totalAreaCoats = area * coats;
  const gallonsNeededRaw = totalAreaCoats / selectedPaint.coveragePerGallonCoat;
  const gallonsNeeded = Math.max(1, Math.ceil(gallonsNeededRaw * 1.08));

  const cunetes = Math.floor(gallonsNeeded / 5);
  const remainderGallons = gallonsNeeded % 5;
  const paintCost = (cunetes * selectedPaint.cunetePrice) + (remainderGallons * selectedPaint.gallonPrice);

  // Herramientas y accesorios de la tienda
  const rollerKitsCount = formData.includeRollerKit ? (area > 150 ? 2 : 1) : 0;
  const rollerCost = rollerKitsCount * ROLLER_KIT_PRICE;

  const protectionKitsCount = formData.includeProtectionKit ? (area > 100 ? 2 : 1) : 0;
  const protectionCost = protectionKitsCount * PROTECTION_KIT_PRICE;

  const primerUnits = formData.includePrimer ? Math.max(1, Math.ceil(area / 45)) : 0;
  const primerCost = primerUnits * PRIMER_GALLON_PRICE;

  const resaneUnits = formData.includeResaneProduct ? Math.max(1, Math.ceil(area / 40)) : 0;
  const resaneCost = resaneUnits * RESANE_GALLON_PRICE;

  const accessoriesSubtotal = rollerCost + protectionCost + primerCost + resaneCost;
  const subtotalBruto = paintCost + accessoriesSubtotal;

  // Descuento automático por volumen en m2
  let effectiveDiscount = 0;
  if (area >= 250) effectiveDiscount = 10;
  else if (area >= 100) effectiveDiscount = 5;

  const discountAmount = (subtotalBruto * effectiveDiscount) / 100;
  const totalNetoCOP = subtotalBruto - discountAmount;
  const costPerM2COP = area > 0 ? Math.round(totalNetoCOP / area) : 0;

  return {
    area,
    paintGrade,
    paintName: selectedPaint.name,
    coats,
    gallonsNeeded,
    cunetes,
    remainderGallons,
    paintCost,
    rollerCost,
    rollerKitsCount,
    protectionCost,
    protectionKitsCount,
    primerCost,
    primerUnits,
    resaneCost,
    resaneUnits,
    accessoriesSubtotal,
    subtotalBruto,
    effectiveDiscount,
    discountAmount,
    totalNetoCOP,
    costPerM2COP,
  };
}
