export type PaintGrade = 'vinilo_tipo1' | 'exterior_acrilica' | 'esmalte_epoxica';

export type TipoCliente = 
  | 'constructora'
  | 'contratista'
  | 'arquitecto_disenador'
  | 'administracion_ph'
  | 'empresa_comercial'
  | 'persona_natural';

export interface ProjectFormData {
  // 1. Datos de Empresa / Cliente
  cliente: string; // Razón Social o Nombre
  nitOCedula: string; // NIT o Cédula
  contactoNombre: string; // Persona de contacto
  telefono: string; // Celular o WhatsApp
  email: string; // Correo electrónico
  tipoCliente: TipoCliente;

  // 2. Especificaciones del Proyecto & Materiales (Cotización)
  area: string; // m2 en formato string para el input
  ambiente: 'interior' | 'exterior';
  paintGrade: PaintGrade;
  coats: number;
  color: string;
  colorNombre?: string;
  superficie: string;
  condicion: string;

  // Herramientas y Elementos para Pintar
  includeRollerKit: boolean;
  includeProtectionKit: boolean;
  includePrimer: boolean;
  includeResaneProduct: boolean;

  // 3. Datos de Envío y Despacho
  ciudad: string;
  departamento: string;
  direccionEnvio: string;
  barrioSector: string;
  proyecto: string; // Nombre del Proyecto / Obra
  recibeNombre: string; // Nombre de quien recibe en obra / Tel
  fechaRequerida: string;
  indicacionesEntrega: string; // Instrucciones de acceso / horarios
  fotoNombre?: string;
  fotoPreviewUrl?: string;
}

export interface QuotationBreakdown {
  area: number;
  paintGrade: PaintGrade;
  paintName: string;
  coats: number;
  gallonsNeeded: number;
  cunetes: number;
  remainderGallons: number;
  paintCost: number;
  rollerCost: number;
  rollerKitsCount: number;
  protectionCost: number;
  protectionKitsCount: number;
  primerCost: number;
  primerUnits: number;
  resaneCost: number;
  resaneUnits: number;
  accessoriesSubtotal: number;
  subtotalBruto: number;
  effectiveDiscount: number;
  discountAmount: number;
  totalNetoCOP: number;
  costPerM2COP: number;
}

export interface QuotationConfig {
  paintGrade: PaintGrade;
  coats: number;
  includeResaneProduct: boolean;
  includePrimer: boolean;
  includeRollerKit: boolean;
  includeProtectionKit: boolean;
  discountPercentage: number;
}
