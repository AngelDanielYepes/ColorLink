export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Colorlink - Registro de Proyectos de Pintura</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0284c7;
      --primary-hover: #0369a1;
      --primary-light: #e0f2fe;
      --secondary: #0f172a;
      --text-main: #1e293b;
      --text-muted: #64748b;
      --bg-body: #f8fafc;
      --bg-card: #ffffff;
      --border: #e2e8f0;
      --radius: 12px;
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
      max-width: 780px;
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
      background: linear-gradient(90deg, #0284c7, #38bdf8, #f59e0b, #ef4444, #10b981);
    }

    .brand-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.1);
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 12px;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .brand-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #38bdf8;
    }

    .header h1 {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 6px;
    }

    .header p {
      color: #94a3b8;
      font-size: 14px;
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

    /* Alert Banner */
    .alert-banner {
      display: none;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 13px;
      margin-bottom: 24px;
      border: 1px solid transparent;
      align-items: center;
      gap: 10px;
    }

    .alert-banner.show {
      display: flex;
    }

    .alert-banner.info {
      background-color: #f0f9ff;
      border-color: #bae6fd;
      color: #0369a1;
    }

    .alert-banner.success {
      background-color: #f0fdf4;
      border-color: #bbf7d0;
      color: #15803d;
    }

    /* Section Styling */
    .form-section {
      margin-bottom: 28px;
      padding-bottom: 24px;
      border-bottom: 1px solid #f1f5f9;
    }

    .form-section:last-of-type {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 20px;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 17px;
      font-weight: 700;
      color: var(--secondary);
      margin-bottom: 18px;
    }

    .section-badge {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 26px;
      height: 26px;
      background-color: var(--primary-light);
      color: var(--primary);
      border-radius: 6px;
      font-size: 12px;
      font-weight: 800;
    }

    /* Grid Layout */
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }

    .col-span-2 {
      grid-column: span 2;
    }

    @media (max-width: 640px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
      .col-span-2 {
        grid-column: span 1;
      }
    }

    /* Form Controls */
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label {
      font-size: 13px;
      font-weight: 600;
      color: #334155;
    }

    .req {
      color: #ef4444;
      margin-left: 2px;
    }

    .opt {
      font-size: 11px;
      color: var(--text-muted);
      font-weight: 400;
      margin-left: 4px;
    }

    input[type="text"],
    input[type="number"],
    input[type="date"],
    select {
      width: 100%;
      padding: 10px 14px;
      border: 1.5px solid var(--border);
      border-radius: 8px;
      font-size: 14px;
      color: var(--text-main);
      background-color: #ffffff;
      transition: all 0.2s ease;
      outline: none;
    }

    input[type="text"]:focus,
    input[type="number"]:focus,
    input[type="date"]:focus,
    select:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--focus-ring);
    }

    /* Color picker combo */
    .color-input-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    input[type="color"] {
      -webkit-appearance: none;
      border: 1.5px solid var(--border);
      border-radius: 8px;
      width: 44px;
      height: 42px;
      cursor: pointer;
      padding: 2px;
      background-color: #ffffff;
    }

    input[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    input[type="color"]::-webkit-color-swatch {
      border: none;
      border-radius: 6px;
    }

    /* File input custom styling */
    .file-dropzone {
      border: 2px dashed #cbd5e1;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      background-color: #f8fafc;
      cursor: pointer;
      transition: all 0.2s;
    }

    .file-dropzone:hover {
      border-color: var(--primary);
      background-color: var(--primary-light);
    }

    .file-dropzone input[type="file"] {
      display: none;
    }

    .file-name-display {
      font-size: 12px;
      color: var(--primary);
      margin-top: 6px;
      font-weight: 600;
    }

    /* Buttons */
    .btn-group {
      display: flex;
      gap: 12px;
      margin-top: 10px;
    }

    .btn {
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn-primary {
      background-color: var(--primary);
      color: #ffffff;
      flex: 2;
    }

    .btn-primary:hover {
      background-color: var(--primary-hover);
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
    }

    .btn-secondary {
      background-color: #f1f5f9;
      color: #475569;
      flex: 1;
    }

    .btn-secondary:hover {
      background-color: #e2e8f0;
      color: #0f172a;
    }

    /* Footer & Console reminder */
    .footer-note {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: var(--text-muted);
    }

    .footer-note code {
      background-color: #e2e8f0;
      padding: 2px 6px;
      border-radius: 4px;
      color: #0f172a;
      font-size: 11px;
    }
  </style>
</head>
<body>

  <div class="container">
    <!-- Header -->
    <header class="header">
      <div class="brand-tag">
        <span class="brand-dot"></span>
        Colorlink Professional Paints
      </div>
      <h1>Registro Técnico de Proyecto</h1>
      <p>Capture los datos del cliente, logística de envío y especificaciones de recubrimiento.</p>
    </header>

    <!-- Main Form Card -->
    <div class="form-card">
      <!-- Autocomplete Memory Alert Banner -->
      <div id="memoryAlert" class="alert-banner info">
        <span>ℹ️ <strong>Datos cargados:</strong> Se restauraron los datos guardados de su última sesión.</span>
      </div>

      <div id="successAlert" class="alert-banner success">
        <span>✅ <strong>¡Formulario enviado!</strong> Datos impresos en <code>console.log()</code> y guardados en <code>localStorage</code>.</span>
      </div>

      <form id="colorlinkForm" novalidate>
        <!-- SECCIÓN 1: Datos del Cliente y Envío -->
        <div class="form-section">
          <h2 class="section-title">
            <span class="section-badge">1</span>
            Datos del Cliente y Envío
          </h2>
          <div class="form-grid">
            <div class="form-group col-span-2">
              <label for="cliente">Cliente / Empresa <span class="req">*</span></label>
              <input type="text" id="cliente" name="cliente" placeholder="Ej. Constructora Andina S.A. o Juan Pérez" required>
            </div>

            <div class="form-group">
              <label for="ciudad">Ciudad <span class="req">*</span></label>
              <input type="text" id="ciudad" name="ciudad" placeholder="Ej. Ciudad de México, Bogotá, Lima" required>
            </div>

            <div class="form-group">
              <label for="direccionEnvio">Dirección de Envío <span class="req">*</span></label>
              <input type="text" id="direccionEnvio" name="direccionEnvio" placeholder="Ej. Av. Las Industrias #450, Bodega 4" required>
            </div>
          </div>
        </div>

        <!-- SECCIÓN 2: Especificaciones del Proyecto -->
        <div class="form-section">
          <h2 class="section-title">
            <span class="section-badge">2</span>
            Especificaciones del Proyecto
          </h2>
          <div class="form-grid">
            <div class="form-group col-span-2">
              <label for="proyecto">Proyecto (Descripción) <span class="req">*</span></label>
              <input type="text" id="proyecto" name="proyecto" placeholder="Ej. Pintura de fachada principal y muros perimetrales" required>
            </div>

            <div class="form-group">
              <label for="area">Área (m²) <span class="req">*</span></label>
              <input type="number" id="area" name="area" step="0.01" min="0.01" placeholder="Ej. 125.50" required>
            </div>

            <div class="form-group">
              <label for="ambiente">Ambiente <span class="req">*</span></label>
              <select id="ambiente" name="ambiente" required>
                <option value="" disabled selected>Seleccione un ambiente...</option>
                <option value="interior">Interior</option>
                <option value="exterior">Exterior</option>
              </select>
            </div>

            <div class="form-group">
              <label for="superficie">Superficie <span class="opt">(opcional)</span></label>
              <input type="text" id="superficie" name="superficie" placeholder="Ej. concreto, madera, yeso, tablaroca">
            </div>

            <div class="form-group">
              <label for="condicion">Condición <span class="opt">(opcional)</span></label>
              <input type="text" id="condicion" name="condicion" placeholder="Ej. humedad, fisuras, alcalinidad, nueva">
            </div>

            <div class="form-group">
              <label for="colorText">Color <span class="req">*</span></label>
              <div class="color-input-wrapper">
                <input type="color" id="colorPicker" value="#0284c7" title="Elegir muestra de color">
                <input type="text" id="colorText" name="color" value="#0284c7" placeholder="Código Hex o Nombre (ej. Azul Real #0284c7)" required>
              </div>
            </div>

            <div class="form-group">
              <label for="fechaRequerida">Fecha requerida <span class="req">*</span></label>
              <input type="date" id="fechaRequerida" name="fechaRequerida" required>
            </div>

            <div class="form-group col-span-2">
              <label>Fotografías del Proyecto <span class="opt">(opcional)</span></label>
              <label class="file-dropzone" for="fotografias">
                <span style="font-size: 20px; display: block; margin-bottom: 4px;">📷</span>
                <span style="font-size: 13px; color: #475569; font-weight: 500;">Haga clic aquí para adjuntar fotografías del área</span>
                <input type="file" id="fotografias" name="fotografias" accept="image/*">
                <div id="fileName" class="file-name-display"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Botones de Acción -->
        <div class="btn-group">
          <button type="submit" class="btn btn-primary">
            <span>💾 Registrar Proyecto</span>
          </button>
          <button type="button" id="btnClear" class="btn btn-secondary">
            <span>Limpiar</span>
          </button>
        </div>
      </form>
    </div>

    <p class="footer-note">
      💡 Abra la <strong>Consola del Navegador</strong> (<code>F12</code> o <code>Ctrl+Shift+I</code> / <code>Cmd+Option+I</code>) para inspeccionar la impresión de los datos en formato JSON.
    </p>
  </div>

  <!-- JavaScript: Captura, Validación, JSON, Consola y LocalStorage -->
  <script>
    (function () {
      const STORAGE_KEY = 'colorlink_project_registration';
      const form = document.getElementById('colorlinkForm');
      const memoryAlert = document.getElementById('memoryAlert');
      const successAlert = document.getElementById('successAlert');
      const btnClear = document.getElementById('btnClear');
      const colorPicker = document.getElementById('colorPicker');
      const colorText = document.getElementById('colorText');
      const fileInput = document.getElementById('fotografias');
      const fileNameDisplay = document.getElementById('fileName');

      // Sincronizar picker de color y texto
      colorPicker.addEventListener('input', function (e) {
        colorText.value = e.target.value;
      });
      colorText.addEventListener('input', function (e) {
        if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
          colorPicker.value = e.target.value;
        }
      });

      // Mostrar nombre de archivo seleccionado
      fileInput.addEventListener('change', function (e) {
        if (e.target.files && e.target.files.length > 0) {
          fileNameDisplay.textContent = 'Archivo seleccionado: ' + e.target.files[0].name;
        } else {
          fileNameDisplay.textContent = '';
        }
      });

      // 1. AUTOCOMPLETADO (MEMORIA CON LOCALSTORAGE) AL CARGAR LA PÁGINA
      function cargarDatosPrevios() {
        try {
          const datosGuardados = localStorage.getItem(STORAGE_KEY);
          if (datosGuardados) {
            const data = JSON.parse(datosGuardados);
            if (data.cliente) document.getElementById('cliente').value = data.cliente;
            if (data.ciudad) document.getElementById('ciudad').value = data.ciudad;
            if (data.direccionEnvio) document.getElementById('direccionEnvio').value = data.direccionEnvio;
            if (data.proyecto) document.getElementById('proyecto').value = data.proyecto;
            if (data.area) document.getElementById('area').value = data.area;
            if (data.superficie) document.getElementById('superficie').value = data.superficie;
            if (data.condicion) document.getElementById('condicion').value = data.condicion;
            if (data.ambiente) document.getElementById('ambiente').value = data.ambiente;
            if (data.color) {
              document.getElementById('colorText').value = data.color;
              if (/^#[0-9A-F]{6}$/i.test(data.color)) {
                colorPicker.value = data.color;
              }
            }
            if (data.fechaRequerida) document.getElementById('fechaRequerida').value = data.fechaRequerida;

            // Mostrar aviso sutil de memoria
            memoryAlert.classList.add('show');
            setTimeout(function () {
              memoryAlert.classList.remove('show');
            }, 6000);
          }
        } catch (error) {
          console.error('Error al leer de localStorage:', error);
        }
      }

      // 2. ENVÍO DEL FORMULARIO (SUBMIT SIN RECARGA, CONSOLE.LOG Y GUARDADO EN LOCALSTORAGE)
      form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita la recarga de página

        // Validación nativa HTML5
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        // Obtener fotografía si existe
        let fotoData = null;
        if (fileInput.files && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          fotoData = {
            nombre: file.name,
            tamañoBytes: file.size,
            tipo: file.type
          };
        }

        // Construir el objeto estructurado JSON
        const proyectoData = {
          cliente: document.getElementById('cliente').value.trim(),
          ciudad: document.getElementById('ciudad').value.trim(),
          direccionEnvio: document.getElementById('direccionEnvio').value.trim(),
          proyecto: document.getElementById('proyecto').value.trim(),
          area: parseFloat(document.getElementById('area').value) || 0,
          superficie: document.getElementById('superficie').value.trim() || null,
          condicion: document.getElementById('condicion').value.trim() || null,
          ambiente: document.getElementById('ambiente').value,
          color: document.getElementById('colorText').value.trim(),
          fechaRequerida: document.getElementById('fechaRequerida').value,
          fotografia: fotoData,
          fechaRegistro: new Date().toISOString()
        };

        // IMPRIMIR EN CONSOLA COMO OBJETO JSON
        console.log('====================================');
        console.log('📦 [COLORLINK] Registro de Proyecto Capturado:');
        console.log(proyectoData);
        console.log('📄 [COLORLINK] JSON Serializado:');
        console.log(JSON.stringify(proyectoData, null, 2));
        console.log('====================================');

        // GUARDAR EN LOCALSTORAGE (MEMORIA)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(proyectoData));
          successAlert.classList.add('show');
          setTimeout(function () {
            successAlert.classList.remove('show');
          }, 5000);
        } catch (error) {
          console.error('Error al guardar en localStorage:', error);
        }
      });

      // Botón Limpiar
      btnClear.addEventListener('click', function () {
        if (confirm('¿Desea limpiar el formulario y borrar los datos guardados en memoria?')) {
          form.reset();
          fileNameDisplay.textContent = '';
          localStorage.removeItem(STORAGE_KEY);
          memoryAlert.classList.remove('show');
          successAlert.classList.remove('show');
          console.log('🧹 [COLORLINK] Memoria local y formulario limpiados.');
        }
      });

      // Cargar datos al iniciar
      window.addEventListener('DOMContentLoaded', cargarDatosPrevios);
    })();
  </script>
</body>
</html>`;
}
