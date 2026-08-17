export interface ProjectFormData {
  cliente: string;
  ciudad: string;
  direccionEnvio: string;
  proyecto: string;
  area: string; // Stored as string in form, parsed as float
  superficie: string;
  condicion: string;
  ambiente: 'interior' | 'exterior';
  color: string;
  fechaRequerida: string;
  fotoNombre?: string;
  fotoPreviewUrl?: string;
}

export interface SubmissionLog {
  id: string;
  timestamp: string;
  data: ProjectFormData;
  jsonString: string;
}
