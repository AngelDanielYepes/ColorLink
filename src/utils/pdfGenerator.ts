import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProjectFormData, TipoCliente } from '../types';
import { calculateQuotation, formatCOP, PAINT_CATALOG } from './pricing';

const TIPO_CLIENTE_LABELS: Record<TipoCliente, string> = {
  constructora: 'Constructora / Desarrollador',
  contratista: 'Contratista / Maestro de Obra',
  arquitecto_disenador: 'Arquitectura / Diseño',
  administracion_ph: 'Administración P.H. / Conjunto',
  empresa_comercial: 'Empresa / Comercial',
  persona_natural: 'Persona Natural / Residencial',
};

export function generateQuotationPdf(formData: ProjectFormData): void {
  const quotation = calculateQuotation(formData);
  const paintGrade = formData.paintGrade || 'vinilo_tipo1';
  const selectedPaint = PAINT_CATALOG[paintGrade] || PAINT_CATALOG.vinilo_tipo1;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor = [2, 132, 199]; // #0284c7 Sky 600
  const darkColor = [15, 23, 42]; // #0f172a Slate 900
  const lightBg = [248, 250, 252]; // #f8fafc

  // Date and Quote Number
  const quoteNumber = `COT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // --- HEADER BANNER ---
  doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.rect(0, 0, 210, 36, 'F');

  // Accent Line
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 36, 210, 2, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('COLORLINK COLOMBIA', 14, 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(186, 230, 253);
  doc.text('PINTURAS PROFESIONALES & MATERIALES DE CONSTRUCCIÓN', 14, 22);
  doc.text('Venta de pinturas en cuñetes, galones y herramientas • Despacho Nacional', 14, 27);

  // Quote Metadata in Header (Right)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('COTIZACIÓN COMERCIAL', 196, 14, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(224, 242, 254);
  doc.text(`N° ${quoteNumber}`, 196, 20, { align: 'right' });
  doc.text(`Fecha: ${dateStr}`, 196, 25, { align: 'right' });
  doc.text('Moneda: Pesos Colombianos (COP)', 196, 30, { align: 'right' });

  // --- 1. SECCIÓN DATOS DE LA EMPRESA / CLIENTE ---
  let currentY = 44;

  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(14, currentY, 182, 34, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, currentY, 182, 34, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('1. DATOS DE LA EMPRESA / CLIENTE', 18, currentY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);

  // Left column: Empresa, NIT, Tipo
  doc.text(`Empresa / Cliente:`, 18, currentY + 12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(formData.cliente || 'Consumidor Final', 50, currentY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`NIT / C.C.:`, 18, currentY + 18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(formData.nitOCedula || 'No especificado', 50, currentY + 18);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Sector / Perfil:`, 18, currentY + 24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(TIPO_CLIENTE_LABELS[formData.tipoCliente] || 'Comercial', 50, currentY + 24);

  // Right column: Contacto, Teléfono, Email
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Contacto:`, 110, currentY + 12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(formData.contactoNombre || 'Contacto Comercial', 135, currentY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Teléfono / WA:`, 110, currentY + 18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(formData.telefono || 'No especificado', 135, currentY + 18);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Correo Electrónico:`, 110, currentY + 24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(formData.email || 'ventas@colorlink.com.co', 135, currentY + 24);

  // --- 2. SECCIÓN ESPECIFICACIONES TÉCNICAS ---
  currentY += 40;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('2. ESPECIFICACIONES TÉCNICAS DEL PROYECTO', 14, currentY);

  currentY += 3;
  const specItems = [
    { label: 'Área Total:', val: `${quotation.area} m²` },
    { label: 'Línea de Pintura:', val: quotation.paintName },
    { label: 'Manos:', val: `${quotation.coats} manos` },
    { label: 'Color / Tono:', val: `${formData.colorNombre || formData.color} (${formData.color})` },
    { label: 'Superficie Base:', val: formData.superficie || 'Estándar' },
    { label: 'Condición:', val: formData.condicion || 'Normal / Repinte' },
  ];

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, currentY, 182, 13, 2, 2, 'F');
  doc.setFontSize(7.5);

  specItems.forEach((item, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const xPos = 18 + col * 60;
    const yPos = currentY + 4.5 + row * 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(item.label, xPos, yPos);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(item.val, xPos + doc.getTextWidth(item.label) + 1.5, yPos);
  });

  // --- TABLA DE MATERIALES & COTIZACIÓN ---
  currentY += 18;

  const tableRows = [];

  // Paint items
  if (quotation.cunetes > 0) {
    tableRows.push([
      `${quotation.paintName} - Cuñete (5 Galones)`,
      'Cuñete 5 Gal',
      `${quotation.cunetes} unid.`,
      formatCOP(selectedPaint.cunetePrice),
      formatCOP(quotation.cunetes * selectedPaint.cunetePrice),
    ]);
  }

  if (quotation.remainderGallons > 0 || (quotation.cunetes === 0 && quotation.gallonsNeeded > 0)) {
    const qty = quotation.cunetes > 0 ? quotation.remainderGallons : quotation.gallonsNeeded;
    tableRows.push([
      `${quotation.paintName} - Galón Individual`,
      'Galón (3.785 L)',
      `${qty} unid.`,
      formatCOP(selectedPaint.gallonPrice),
      formatCOP(qty * selectedPaint.gallonPrice),
    ]);
  }

  if (quotation.gallonsNeeded === 0) {
    tableRows.push([
      `${quotation.paintName}`,
      'Galón',
      '0 unid.',
      formatCOP(selectedPaint.gallonPrice),
      '$ 0 COP',
    ]);
  }

  // Accessories
  if (formData.includeRollerKit) {
    tableRows.push([
      'Kit de Aplicación Profesional (Rodillo antigoteo 9" + Brocha 2.5" + Bandeja)',
      'Kit Completo',
      `${quotation.rollerKitsCount} kit(s)`,
      formatCOP(38000),
      formatCOP(quotation.rollerCost),
    ]);
  }

  if (formData.includeProtectionKit) {
    tableRows.push([
      'Kit de Protección de Obra (Plástico Cubretodo 4x5m + Cintas Masking Tape)',
      'Kit Protección',
      `${quotation.protectionKitsCount} kit(s)`,
      formatCOP(22000),
      formatCOP(quotation.protectionCost),
    ]);
  }

  if (formData.includePrimer) {
    tableRows.push([
      'Sellador Imprimante Antialcalino Colorlink',
      'Galón',
      `${quotation.primerUnits} gal`,
      formatCOP(46000),
      formatCOP(quotation.primerCost),
    ]);
  }

  if (formData.includeResaneProduct) {
    tableRows.push([
      'Masilla Acrílica / Estuco de Resane para Grietas',
      'Galón',
      `${quotation.resaneUnits} gal`,
      formatCOP(28000),
      formatCOP(quotation.resaneCost),
    ]);
  }

  autoTable(doc, {
    startY: currentY,
    head: [['Descripción del Producto / Material', 'Presentación', 'Cantidad', 'Precio Unitario', 'Subtotal (COP)']],
    body: tableRows,
    theme: 'striped',
    headStyles: {
      fillColor: [2, 132, 199],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 41, 59],
      cellPadding: 2.5,
    },
    columnStyles: {
      0: { cellWidth: 74 },
      1: { cellWidth: 30 },
      2: { cellWidth: 22, halign: 'center' },
      3: { cellWidth: 28, halign: 'right' },
      4: { cellWidth: 28, halign: 'right', fontStyle: 'bold' },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { left: 14, right: 14 },
  });

  // Position after table
  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY || 160;

  // --- TOTALS & SHIPPING INFO (SIDE BY SIDE) ---
  let nextY = finalY + 4;

  // 3. DATOS DE ENVÍO Y DESPACHO BOX (Left)
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(14, nextY, 92, 32, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, nextY, 92, 32, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('3. DATOS DE ENVÍO Y DESPACHO', 18, nextY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);

  doc.text(`Destino:`, 18, nextY + 11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(`${formData.ciudad || 'Bogotá'}${formData.departamento ? `, ${formData.departamento}` : ''}`, 35, nextY + 11);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Dirección:`, 18, nextY + 16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(formData.direccionEnvio || 'No especificada', 35, nextY + 16);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Obra / Proy.:`, 18, nextY + 21);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(formData.proyecto || 'Proyecto General', 35, nextY + 21);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Recibe / Fec:`, 18, nextY + 26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(`${formData.recibeNombre ? `${formData.recibeNombre} • ` : ''}${formData.fechaRequerida || 'Inmediata'}`, 35, nextY + 26);

  // TOTALS BOX (Right)
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(110, nextY, 86, 32, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(110, nextY, 86, 32, 2, 2, 'D');

  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);

  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal Materiales:', 115, nextY + 6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(formatCOP(quotation.subtotalBruto), 190, nextY + 6, { align: 'right' });

  if (quotation.effectiveDiscount > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(5, 150, 105);
    doc.text(`Descuento Volumen (${quotation.effectiveDiscount}%):`, 115, nextY + 12);
    doc.setFont('helvetica', 'bold');
    doc.text(`-${formatCOP(quotation.discountAmount)}`, 190, nextY + 12, { align: 'right' });
  } else {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text('Descuento por Volumen:', 115, nextY + 12);
    doc.text('$ 0 COP', 190, nextY + 12, { align: 'right' });
  }

  doc.setDrawColor(203, 213, 225);
  doc.line(115, nextY + 16, 190, nextY + 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(2, 132, 199);
  doc.text('TOTAL A PAGAR (COP):', 115, nextY + 22);
  doc.text(formatCOP(quotation.totalNetoCOP), 190, nextY + 22, { align: 'right' });

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Costo Promedio Material: ${formatCOP(quotation.costPerM2COP)} / m²`, 115, nextY + 27);

  // --- COMMERCIAL TERMS & POLICIES ---
  const termsY = nextY + 36;

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, termsY, 182, 19, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('POLÍTICAS Y CONDICIONES COMERCIALES:', 18, termsY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text('1. Venta exclusiva de pinturas, cuñetes, galones y herramientas para pintar. No incluye mano de obra ni aplicación.', 18, termsY + 9);
  doc.text('2. Los valores están expresados en Pesos Colombianos (COP) e incluyen impuestos de ley aplicables. Oferta válida por 15 días.', 18, termsY + 13);
  doc.text('3. Despacho y entrega directa a la dirección de obra o empresa indicada en la orden de compra.', 18, termsY + 17);

  // --- FOOTER ---
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 283, 196, 283);

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Colorlink Pinturas Profesionales Colombia • PBX: +57 (601) 300-8000 • ventas@colorlink.com.co • Bogotá D.C., Colombia', 105, 288, { align: 'center' });

  // Save the PDF
  const cleanClient = (formData.cliente || 'cotizacion').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  doc.save(`Colorlink_Cotizacion_${cleanClient}_COP.pdf`);
}
