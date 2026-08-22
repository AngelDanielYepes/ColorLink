export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Colorlink Colombia - Venta de Pinturas, Materiales & Cotizador en COP</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0284c7;
      --primary-hover: #0369a1;
      --primary-light: #e0f2fe;
      --secondary: #0f172a;
      --emerald: #059669;
      --text-main: #1e293b;
      --text-muted: #64748b;
      --bg-body: #f8fafc;
      --bg-card: #ffffff;
      --border: #e2e8f0;
      --radius: 14px;
      --focus-ring: rgba(2, 132, 199, 0.25);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }

    body {
      background-color: var(--bg-body);
      color: var(--text-main);
      line-height: 1.6;
      padding: 30px 15px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .container {
      width: 100%;
      max-width: 860px;
    }

    /* Header */
    .header {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
      padding: 32px 28px;
      border-radius: var(--radius) var(--radius) 0 0;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.15);
    }

    .header::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #0284c7, #38bdf8, #10b981);
    }

    .brand-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.1);
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 12px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #7dd3fc;
    }

    .brand-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #38bdf8;
    }

    .header h1 {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 6px;
    }

    .header p {
      color: #94a3b8;
      font-size: 13.5px;
    }

    /* Main Form Card */
    .form-card {
      background-color: var(--bg-card);
      border: 1px solid var(--border);
      border-top: none;
      border-radius: 0 0 var(--radius) var(--radius);
      padding: 32px 28px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    }

    /* Quotation Box */
    .quote-hero-box {
      background: linear-gradient(135deg, #0f172a 0%, #0369a1 100%);
      color: #ffffff;
      padding: 22px;
      border-radius: 12px;
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .quote-hero-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
      color: #7dd3fc;
      display: block;
      margin-bottom: 4px;
    }

    .quote-hero-amount {
      font-size: 28px;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: -0.5px;
    }

    .quote-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 14px;
      font-size: 12.5px;
    }

    .quote-table td {
      padding: 6px 0;
      border-bottom: 1px solid #f1f5f9;
      color: var(--text-muted);
    }

    .quote-table td.val {
      text-align: right;
      font-weight: 700;
      color: var(--text-main);
      font-family: 'JetBrains Mono', monospace;
    }

    /* Alerts */
    .alert {
      padding: 12px 16px;
      border-radius: 10px;
      margin-bottom: 24px;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .alert-info {
      background-color: #f0f9ff;
      border: 1px solid #bae6fd;
      color: #0369a1;
    }

    .alert-success {
      background-color: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #065f46;
      display: none;
    }

    /* Sections */
    .form-section {
      margin-bottom: 36px;
      padding-bottom: 30px;
      border-bottom: 1px solid var(--border);
    }

    .form-section:last-of-type {
      border-bottom: none;
      margin-bottom: 24px;
      padding-bottom: 0;
    }

    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section-badge {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background-color: #0f172a;
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .section-badge.blue {
      background-color: var(--primary);
    }

    /* Grid Layouts */
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
    }

    @media (max-width: 640px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
      .quote-hero-box {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .full-width {
      grid-column: 1 / -1;
    }

    /* Form Inputs */
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label {
      font-size: 12px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .req {
      color: #ef4444;
    }

    .opt {
      font-size: 11px;
      color: var(--text-muted);
      text-transform: none;
      font-weight: normal;
    }

    input[type="text"],
    input[type="number"],
    input[type="email"],
    input[type="tel"],
    input[type="date"],
    select {
      width: 100%;
      padding: 10px 14px;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-size: 13.5px;
      color: var(--text-main);
      background-color: #f8fafc;
      transition: all 0.2s ease;
      outline: none;
    }

    input:focus,
    select:focus {
      background-color: #ffffff;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--focus-ring);
    }

    /* Color picker component */
    .color-input-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    input[type="color"] {
      -webkit-appearance: none;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      cursor: pointer;
      background: none;
      padding: 0;
    }

    input[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    input[type="color"]::-webkit-color-swatch {
      border: 1px solid var(--border);
      border-radius: 8px;
    }

    /* File Upload */
    .file-dropzone {
      border: 2px dashed #cbd5e1;
      border-radius: 10px;
      padding: 16px;
      text-align: center;
      background-color: #f8fafc;
      cursor: pointer;
      transition: all 0.2s;
    }

    .file-dropzone:hover {
      border-color: var(--primary);
      background-color: #f0f9ff;
    }

    .file-dropzone input {
      display: none;
    }

    .file-name-display {
      margin-top: 6px;
      font-size: 12px;
      color: var(--emerald);
      font-weight: 600;
    }

    /* Options grid */
    .quote-options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
      margin-top: 10px;
    }

    .quote-option-card {
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px;
      background: #f8fafc;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 12.5px;
    }

    .quote-option-card:hover {
      border-color: #cbd5e1;
    }

    /* Buttons */
    .btn-group {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid var(--border);
    }

    .btn {
      padding: 12px 24px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn-primary {
      background-color: var(--primary);
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
    }

    .btn-primary:hover {
      background-color: var(--primary-hover);
    }

    .btn-secondary {
      background-color: #f1f5f9;
      color: #475569;
      border: 1px solid var(--border);
    }

    .btn-secondary:hover {
      background-color: #e2e8f0;
      color: var(--text-main);
    }

    .notice-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
      font-size: 11.5px;
      color: #64748b;
      margin-top: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="brand-tag">
        <span class="brand-dot"></span>
        Colorlink Colombia • Venta Directa de Pinturas & Materiales
      </div>
      <h1>Cotizador de Materiales & Formulario de Pedido</h1>
      <p>Organizado por: Datos de Empresa → Cotización de Materiales & PDF → Datos de Envío y Despacho</p>
    </div>

    <!-- Main Card -->
    <div class="form-card">
      <div id="memoryAlert" class="alert alert-info" style="display: none;">
        <span>🔄 <strong>Datos cargados de memoria local:</strong> Formulario restaurado automáticamente.</span>
        <a href="#" id="btnClearMemory" style="color: #0369a1; font-weight: 700; text-decoration: underline;">Limpiar</a>
      </div>

      <div id="successAlert" class="alert alert-success">
        <span>✅ <strong>¡Pedido y Cotización Registrados!</strong> Los datos han sido guardados localmente.</span>
      </div>

      <form id="colorlinkForm" autocomplete="on">
        
        <!-- ========================================================= -->
        <!-- 1. SECCIÓN: DATOS DE LA EMPRESA / CLIENTE -->
        <!-- ========================================================= -->
        <div class="form-section">
          <h2 class="section-title">
            <span class="section-badge">1</span>
            Datos de la Empresa / Cliente
          </h2>

          <div class="form-grid">
            <div class="form-group full-width">
              <label for="cliente">Nombre de la empresa <span class="req">*</span></label>
              <input type="text" id="cliente" name="cliente" placeholder="Ej. Constructora Andina S.A.S. o Carlos Rodríguez" required>
            </div>

            <div class="form-group">
              <label for="nitOCedula">NIT o Cédula (C.C.) <span class="req">*</span></label>
              <input type="text" id="nitOCedula" name="nitOCedula" placeholder="Ej. 901.234.567-8" required>
            </div>

            <div class="form-group">
              <label for="tipoCliente">Sector / Perfil de Cliente</label>
              <select id="tipoCliente" name="tipoCliente">
                <option value="constructora">Constructora / Desarrollador</option>
                <option value="contratista">Contratista / Maestro de Obra</option>
                <option value="arquitecto_disenador">Arquitectura / Diseño</option>
                <option value="administracion_ph">Administración P.H. / Conjunto</option>
                <option value="empresa_comercial">Empresa / Comercial</option>
                <option value="persona_natural">Persona Natural / Residencial</option>
              </select>
            </div>

            <div class="form-group">
              <label for="contactoNombre">Persona de Contacto <span class="req">*</span></label>
              <input type="text" id="contactoNombre" name="contactoNombre" placeholder="Ej. Ing. Diana Morales" required>
            </div>

            <div class="form-group">
              <label for="cargoContacto">Cargo / Rol del Contacto</label>
              <input type="text" id="cargoContacto" name="cargoContacto" placeholder="Ej. Jefe de Compras / Director de Obra">
            </div>

            <div class="form-group">
              <label for="telefono">Teléfono / WhatsApp <span class="req">*</span></label>
              <input type="tel" id="telefono" name="telefono" placeholder="Ej. +57 310 555 1234" required>
            </div>

            <div class="form-group full-width">
              <label for="email">Correo Electrónico (Cotización y Facturación) <span class="req">*</span></label>
              <input type="email" id="email" name="email" placeholder="Ej. compras@constructoraandina.com" required>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- 2. SECCIÓN: ESPECIFICACIONES DE PINTURA & COTIZACIÓN -->
        <!-- ========================================================= -->
        <div class="form-section">
          <h2 class="section-title">
            <span class="section-badge blue">2</span>
            Especificaciones de Pintura & Cotizador en Vivo (COP)
          </h2>

          <div class="form-grid">
            <div class="form-group">
              <label for="area">Área total a cubrir (m²) <span class="req">*</span></label>
              <input type="number" id="area" name="area" step="0.5" min="1" placeholder="Ej. 120" required>
            </div>

            <div class="form-group">
              <label for="ambiente">Línea de Pintura Colorlink <span class="req">*</span></label>
              <select id="ambiente" name="ambiente" required>
                <option value="interior" selected>Vinilo Tipo 1 Alto Tráfico - $98.000/gal ($430.000/cuñete)</option>
                <option value="exterior">Coraza Acrílica Exterior UV - $148.000/gal ($650.000/cuñete)</option>
                <option value="esmalte">Esmalte Epóxico Especial - $185.000/gal ($830.000/cuñete)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="colorText">Color / Tono deseado <span class="req">*</span></label>
              <div class="color-input-wrapper">
                <input type="color" id="colorPicker" value="#0284c7" title="Elegir muestra de color">
                <input type="text" id="colorText" name="color" value="#0284c7" placeholder="Código Hex o Nombre" required>
              </div>
            </div>

            <div class="form-group">
              <label for="manos">Manos de Pintura</label>
              <select id="manos" name="manos">
                <option value="1">1 Mano</option>
                <option value="2" selected>2 Manos (Recomendado)</option>
                <option value="3">3 Manos (Color Intenso o Repinte)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="superficie">Superficie base <span class="opt">(opcional)</span></label>
              <input type="text" id="superficie" name="superficie" placeholder="Ej. concreto, revoque, yeso, tablaroca">
            </div>

            <div class="form-group">
              <label for="condicion">Estado de la superficie <span class="opt">(opcional)</span></label>
              <input type="text" id="condicion" name="condicion" placeholder="Ej. fisuras, humedad, nueva, repinte">
            </div>
          </div>

          <!-- Insumos y Herramientas -->
          <div style="margin-top: 20px;">
            <label style="font-size: 12px; font-weight: 700; color: #475569; display: block; margin-bottom: 8px;">
              🛠️ Herramientas & Elementos Complementarios
            </label>
            <div class="quote-options-grid">
              <label class="quote-option-card">
                <input type="checkbox" id="chkRoller" checked>
                <div>
                  <strong>Kit Rodillo + Brocha</strong>
                  <div style="color: #64748b; font-size: 11px;">$38.000 COP (Antigoteo + Bandeja)</div>
                </div>
              </label>

              <label class="quote-option-card">
                <input type="checkbox" id="chkProtection" checked>
                <div>
                  <strong>Plásticos & Cintas</strong>
                  <div style="color: #64748b; font-size: 11px;">$22.000 COP (Cubretodo + Masking)</div>
                </div>
              </label>

              <label class="quote-option-card">
                <input type="checkbox" id="chkPrimer">
                <div>
                  <strong>Sellador Imprimante</strong>
                  <div style="color: #64748b; font-size: 11px;">$46.000 COP / Galón</div>
                </div>
              </label>

              <label class="quote-option-card">
                <input type="checkbox" id="chkResane">
                <div>
                  <strong>Masilla de Resane</strong>
                  <div style="color: #64748b; font-size: 11px;">$28.000 COP / Galón</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Cuadro de Cotización y Botón PDF -->
          <div class="quote-hero-box">
            <div>
              <span class="quote-hero-title">Total Cotización de Materiales (COP)</span>
              <div id="displayTotalCOP" class="quote-hero-amount">$ 0 COP</div>
              <span id="displayCoverageDetails" style="font-size: 12px; color: #bae6fd;">Ingrese área para calcular</span>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button type="button" id="btnPdfQuote" class="btn" style="background: #38bdf8; color: #0f172a; font-size: 12px; padding: 8px 14px; font-weight: 700;">
                📄 Generar PDF Cotización
              </button>
              <button type="button" id="btnCopyQuote" class="btn" style="background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.3); font-size: 12px; padding: 8px 14px;">
                📋 Copiar Texto
              </button>
            </div>
          </div>

          <table class="quote-table">
            <tr>
              <td>Pintura & Recubrimiento:</td>
              <td class="val" id="rowPintura">$ 0</td>
            </tr>
            <tr id="rowRollerTr">
              <td>Kit Rodillo, Brocha y Bandeja:</td>
              <td class="val" id="rowRoller">$ 0</td>
            </tr>
            <tr id="rowProtectionTr">
              <td>Plásticos y Cintas de Enmascarar:</td>
              <td class="val" id="rowProtection">$ 0</td>
            </tr>
            <tr id="rowPrimerTr" style="display: none;">
              <td>Sellador Imprimante Antialcalino:</td>
              <td class="val" id="rowPrimer">$ 0</td>
            </tr>
            <tr id="rowResaneTr" style="display: none;">
              <td>Masilla Acrílica / Estuco de Resane:</td>
              <td class="val" id="rowResane">$ 0</td>
            </tr>
          </table>

          <div class="notice-box">
            ℹ️ <strong>Aviso Colorlink:</strong> Venta exclusiva de pinturas, cuñetes, galones y herramientas para pintar. No incluye servicio de mano de obra ni aplicación.
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- 3. SECCIÓN: DATOS DE ENVÍO Y DESPACHO -->
        <!-- ========================================================= -->
        <div class="form-section">
          <h2 class="section-title">
            <span class="section-badge">3</span>
            Datos de Envío y Despacho
          </h2>

          <div class="form-grid">
            <div class="form-group">
              <label for="ciudad">Ciudad de Despacho <span class="req">*</span></label>
              <input type="text" id="ciudad" name="ciudad" placeholder="Ej. Bogotá, Medellín, Cali, Barranquilla" required>
            </div>

            <div class="form-group">
              <label for="departamento">Departamento</label>
              <input type="text" id="departamento" name="departamento" placeholder="Ej. Cundinamarca, Antioquia">
            </div>

            <div class="form-group full-width">
              <label for="proyecto">Nombre del Proyecto / Obra <span class="req">*</span></label>
              <input type="text" id="proyecto" name="proyecto" placeholder="Ej. Edificio Torres del Parque" required>
            </div>

            <div class="form-group full-width">
              <label for="direccionEnvio">Dirección Exacta de Entrega <span class="req">*</span></label>
              <input type="text" id="direccionEnvio" name="direccionEnvio" placeholder="Ej. Calle 100 # 15-20, Acceso Proveedores" required>
            </div>

            <div class="form-group">
              <label for="barrioSector">Barrio / Sector / Zona Industrial</label>
              <input type="text" id="barrioSector" name="barrioSector" placeholder="Ej. Chicó Norte / Zona Franca">
            </div>

            <div class="form-group">
              <label for="recibeNombre">Nombre de quien Recibe en Sitio</label>
              <input type="text" id="recibeNombre" name="recibeNombre" placeholder="Ej. Maestro Jorge Gómez">
            </div>

            <div class="form-group">
              <label for="telefonoRecibe">Teléfono de Contacto en Sitio</label>
              <input type="tel" id="telefonoRecibe" name="telefonoRecibe" placeholder="Ej. +57 311 222 3344">
            </div>

            <div class="form-group">
              <label for="fechaRequerida">Fecha Requerida de Entrega <span class="req">*</span></label>
              <input type="date" id="fechaRequerida" name="fechaRequerida" required>
            </div>

            <div class="form-group">
              <label for="indicacionesEntrega">Horarios / Instrucciones de Entrega</label>
              <input type="text" id="indicacionesEntrega" name="indicacionesEntrega" placeholder="Ej. Reciben de 8:00 AM a 4:00 PM con EPP">
            </div>

            <div class="form-group full-width">
              <label>Fotografías del Área o Planos <span class="opt">(opcional)</span></label>
              <label class="file-dropzone">
                <div style="font-size: 13px; font-weight: 600; color: #334155;">📷 Haga clic para seleccionar una foto o plano</div>
                <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">Formatos aceptados: PNG, JPG o WEBP</div>
                <input type="file" id="fotografias" name="fotografias" accept="image/*">
                <div id="fileName" class="file-name-display"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- BOTONES DE ACCIÓN AL FINAL DE LOS DATOS DE ENVÍO -->
        <!-- ========================================================= -->
        <div class="btn-group">
          <button type="button" id="btnClear" class="btn btn-secondary" style="margin-right: auto;">
            <span>Limpiar Formulario</span>
          </button>
          <button type="submit" class="btn btn-primary" style="font-weight: 800; padding: 14px 28px;">
            <span>💾 Registrar Pedido</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- JavaScript -->
  <script>
    (function () {
      const STORAGE_KEY = 'colorlink_project_registration';
      const form = document.getElementById('colorlinkForm');
      const memoryAlert = document.getElementById('memoryAlert');
      const successAlert = document.getElementById('successAlert');
      const btnClear = document.getElementById('btnClear');
      const btnClearMemory = document.getElementById('btnClearMemory');
      const btnCopyQuote = document.getElementById('btnCopyQuote');
      const btnPdfQuote = document.getElementById('btnPdfQuote');
      const colorPicker = document.getElementById('colorPicker');
      const colorText = document.getElementById('colorText');
      const fileInput = document.getElementById('fotografias');
      const fileNameDisplay = document.getElementById('fileName');

      // Cotización elements
      const inputArea = document.getElementById('area');
      const selectAmbiente = document.getElementById('ambiente');
      const selectManos = document.getElementById('manos');
      const chkRoller = document.getElementById('chkRoller');
      const chkProtection = document.getElementById('chkProtection');
      const chkPrimer = document.getElementById('chkPrimer');
      const chkResane = document.getElementById('chkResane');

      const displayTotalCOP = document.getElementById('displayTotalCOP');
      const displayCoverageDetails = document.getElementById('displayCoverageDetails');
      const rowPintura = document.getElementById('rowPintura');
      const rowRoller = document.getElementById('rowRoller');
      const rowProtection = document.getElementById('rowProtection');
      const rowPrimer = document.getElementById('rowPrimer');
      const rowResane = document.getElementById('rowResane');
      const rowPrimerTr = document.getElementById('rowPrimerTr');
      const rowResaneTr = document.getElementById('rowResaneTr');

      const PRICES = {
        interior: { gallon: 98000, cunete: 430000, coveragePerGallon: 28, name: 'Vinilo Tipo 1' },
        exterior: { gallon: 148000, cunete: 650000, coveragePerGallon: 24, name: 'Coraza Acrílica Exterior' },
        esmalte: { gallon: 185000, cunete: 830000, coveragePerGallon: 22, name: 'Esmalte Epóxico' },
      };

      function formatCOP(num) {
        return '$ ' + Math.round(num).toLocaleString('es-CO') + ' COP';
      }

      function updateCalculation() {
        const area = parseFloat(inputArea.value) || 0;
        const ambiente = selectAmbiente.value || 'interior';
        const coats = parseInt(selectManos.value, 10) || 2;
        const config = PRICES[ambiente] || PRICES.interior;

        if (area <= 0) {
          displayTotalCOP.textContent = '$ 0 COP';
          displayCoverageDetails.textContent = 'Ingrese área en m² para calcular';
          rowPintura.textContent = '$ 0';
          rowRoller.textContent = chkRoller.checked ? formatCOP(38000) : '$ 0';
          rowProtection.textContent = chkProtection.checked ? formatCOP(22000) : '$ 0';
          rowPrimer.textContent = '$ 0';
          rowResane.textContent = '$ 0';
          return;
        }

        const effectiveArea = area * (coats / 2);
        const gallonsNeeded = Math.ceil(effectiveArea / config.coveragePerGallon);
        const cunetes = Math.floor(gallonsNeeded / 5);
        const remainderGallons = gallonsNeeded % 5;
        const paintCost = (cunetes * config.cunete) + (remainderGallons * config.gallon);

        let rollerCost = chkRoller.checked ? 38000 * Math.max(1, Math.ceil(area / 200)) : 0;
        let protectionCost = chkProtection.checked ? 22000 * Math.max(1, Math.ceil(area / 150)) : 0;
        let primerCost = chkPrimer.checked ? 46000 * Math.max(1, Math.ceil(area / 35)) : 0;
        let resaneCost = chkResane.checked ? 28000 * Math.max(1, Math.ceil(area / 60)) : 0;

        rowPrimerTr.style.display = chkPrimer.checked ? 'table-row' : 'none';
        rowResaneTr.style.display = chkResane.checked ? 'table-row' : 'none';

        const subtotal = paintCost + rollerCost + protectionCost + primerCost + resaneCost;
        let discount = 0;
        if (subtotal >= 2000000) discount = 0.08;
        else if (subtotal >= 1000000) discount = 0.05;

        const total = subtotal * (1 - discount);

        displayTotalCOP.textContent = formatCOP(total);
        displayCoverageDetails.textContent = gallonsNeeded + ' Galones (' + (cunetes > 0 ? cunetes + ' cuñetes + ' : '') + remainderGallons + ' gal) • ' + formatCOP(total / area) + '/m²';

        rowPintura.textContent = formatCOP(paintCost);
        rowRoller.textContent = formatCOP(rollerCost);
        rowProtection.textContent = formatCOP(protectionCost);
        rowPrimer.textContent = formatCOP(primerCost);
        rowResane.textContent = formatCOP(resaneCost);
      }

      [inputArea, selectAmbiente, selectManos, chkRoller, chkProtection, chkPrimer, chkResane].forEach(function(el) {
        if (el) {
          el.addEventListener('input', updateCalculation);
          el.addEventListener('change', updateCalculation);
        }
      });

      colorPicker.addEventListener('input', function (e) {
        colorText.value = e.target.value;
      });

      colorText.addEventListener('input', function (e) {
        if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
          colorPicker.value = e.target.value;
        }
      });

      fileInput.addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
          fileNameDisplay.textContent = '✓ ' + e.target.files[0].name;
        } else {
          fileNameDisplay.textContent = '';
        }
      });

      if (btnPdfQuote) {
        btnPdfQuote.addEventListener('click', function () {
          window.print();
        });
      }

      btnCopyQuote.addEventListener('click', function () {
        const area = inputArea.value || '0';
        const total = displayTotalCOP.textContent;
        const text = 'COTIZACIÓN COLORLINK COLOMBIA (COP)\\nCliente: ' + (document.getElementById('cliente').value || 'Consumidor') + '\\nÁrea: ' + area + ' m²\\nTotal: ' + total;
        navigator.clipboard.writeText(text).then(function() {
          btnCopyQuote.textContent = '¡Copiado!';
          setTimeout(function() { btnCopyQuote.textContent = '📋 Copiar Texto'; }, 2000);
        });
      });

      function cargarDatosPrevios() {
        try {
          const datosGuardados = localStorage.getItem(STORAGE_KEY);
          if (datosGuardados) {
            const data = JSON.parse(datosGuardados);
            if (data.cliente) document.getElementById('cliente').value = data.cliente;
            if (data.nitOCedula) document.getElementById('nitOCedula').value = data.nitOCedula;
            if (data.tipoCliente) document.getElementById('tipoCliente').value = data.tipoCliente;
            if (data.contactoNombre) document.getElementById('contactoNombre').value = data.contactoNombre;
            if (data.cargoContacto) document.getElementById('cargoContacto').value = data.cargoContacto;
            if (data.telefono) document.getElementById('telefono').value = data.telefono;
            if (data.email) document.getElementById('email').value = data.email;

            if (data.ciudad) document.getElementById('ciudad').value = data.ciudad;
            if (data.departamento) document.getElementById('departamento').value = data.departamento;
            if (data.proyecto) document.getElementById('proyecto').value = data.proyecto;
            if (data.direccionEnvio) document.getElementById('direccionEnvio').value = data.direccionEnvio;
            if (data.barrioSector) document.getElementById('barrioSector').value = data.barrioSector;
            if (data.recibeNombre) document.getElementById('recibeNombre').value = data.recibeNombre;
            if (data.telefonoRecibe) document.getElementById('telefonoRecibe').value = data.telefonoRecibe;
            if (data.fechaRequerida) document.getElementById('fechaRequerida').value = data.fechaRequerida;
            if (data.indicacionesEntrega) document.getElementById('indicacionesEntrega').value = data.indicacionesEntrega;

            if (data.area) inputArea.value = data.area;
            if (data.ambiente) selectAmbiente.value = data.ambiente;
            if (data.coats) selectManos.value = data.coats;
            if (data.color) {
              colorText.value = data.color;
              if (/^#[0-9A-F]{6}$/i.test(data.color)) colorPicker.value = data.color;
            }
            if (data.superficie) document.getElementById('superficie').value = data.superficie;
            if (data.condicion) document.getElementById('condicion').value = data.condicion;

            memoryAlert.style.display = 'flex';
            updateCalculation();
          }
        } catch (e) {
          console.error(e);
        }
      }

      function limpiarFormulario() {
        form.reset();
        fileNameDisplay.textContent = '';
        memoryAlert.style.display = 'none';
        colorPicker.value = '#0284c7';
        colorText.value = '#0284c7';
        localStorage.removeItem(STORAGE_KEY);
        updateCalculation();
      }

      btnClear.addEventListener('click', limpiarFormulario);
      if (btnClearMemory) {
        btnClearMemory.addEventListener('click', function (e) {
          e.preventDefault();
          limpiarFormulario();
        });
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formDataObj = {
          cliente: document.getElementById('cliente').value,
          nitOCedula: document.getElementById('nitOCedula').value,
          tipoCliente: document.getElementById('tipoCliente').value,
          contactoNombre: document.getElementById('contactoNombre').value,
          cargoContacto: document.getElementById('cargoContacto') ? document.getElementById('cargoContacto').value : '',
          telefono: document.getElementById('telefono').value,
          email: document.getElementById('email').value,

          ciudad: document.getElementById('ciudad').value,
          departamento: document.getElementById('departamento').value,
          proyecto: document.getElementById('proyecto').value,
          direccionEnvio: document.getElementById('direccionEnvio').value,
          barrioSector: document.getElementById('barrioSector').value,
          recibeNombre: document.getElementById('recibeNombre').value,
          telefonoRecibe: document.getElementById('telefonoRecibe') ? document.getElementById('telefonoRecibe').value : '',
          fechaRequerida: document.getElementById('fechaRequerida').value,
          indicacionesEntrega: document.getElementById('indicacionesEntrega').value,

          area: inputArea.value,
          ambiente: selectAmbiente.value,
          coats: selectManos.value,
          color: colorText.value,
          superficie: document.getElementById('superficie').value,
          condicion: document.getElementById('condicion').value,
          includeRollerKit: chkRoller.checked,
          includeProtectionKit: chkProtection.checked,
          includePrimer: chkPrimer.checked,
          includeResaneProduct: chkResane.checked,
          fechaRegistro: new Date().toISOString()
        };

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(formDataObj));
        } catch (err) {
          console.error(err);
        }

        console.log('📦 [COLORLINK PEDIDO REGISTRADO]:', formDataObj);

        successAlert.style.display = 'flex';
        memoryAlert.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(function () {
          successAlert.style.display = 'none';
        }, 5000);
      });

      cargarDatosPrevios();
    })();
  </script>
</body>
</html>`;
}
