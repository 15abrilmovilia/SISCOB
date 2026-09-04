/**
 * SISCOB - Motor de Impresión Aislada Profesional
 * Imprime documentos limpios directamente sin capturar la ventana, modales ni fondos del navegador.
 */

export function printIsolatedDocument(htmlContent, title = 'Documento SISCOB') {
  // Eliminar iframes previos si existen
  const oldIframe = document.getElementById('siscob-print-frame');
  if (oldIframe) {
    document.body.removeChild(oldIframe);
  }

  const iframe = document.createElement('iframe');
  iframe.id = 'siscob-print-frame';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.visibility = 'hidden';

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
          @page {
            margin: 8mm 10mm;
            size: auto;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            color: #0f172a;
            background: #ffffff;
            font-size: 11px;
            line-height: 1.4;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .font-mono {
            font-family: 'JetBrains Mono', monospace;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            page-break-inside: auto;
          }
          thead {
            display: table-header-group;
          }
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          .avoid-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .text-left { text-align: left; }
          .font-bold { font-weight: 700; }
          .font-black { font-weight: 900; }
          .uppercase { text-transform: uppercase; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `);
  doc.close();

  iframe.contentWindow.focus();
  setTimeout(() => {
    iframe.contentWindow.print();
    setTimeout(() => {
      if (iframe.parentNode) {
        document.body.removeChild(iframe);
      }
    }, 2500);
  }, 350);
}

/**
 * Generador HTML para Plan de Pagos Profesional / Contrato de Crédito
 */
export function generatePlanDePagosHTML(planData) {
  const {
    folio = 'PR-2026-001',
    socio = 'Socio Afiliado',
    socioCI = 'S/N',
    socioMovil = '0',
    monto = 5000,
    plazo = 12,
    tasaAnual = 12,
    cuotaMensual = 0,
    planPagos = []
  } = planData;

  const totalCapital = monto;
  const totalInteres = planPagos.reduce((acc, p) => acc + p.interes, 0);
  const totalPagar = totalCapital + totalInteres;

  const rowsHTML = planPagos.map(p => `
    <tr style="border-bottom: 1px solid #cbd5e1; font-family: 'JetBrains Mono', monospace; font-size: 11px;">
      <td style="padding: 6px 8px; text-align: center; font-weight: bold; color: #475569;">${p.nro}</td>
      <td style="padding: 6px 8px; text-align: center; font-weight: 700; color: #b91c1c;">${p.fechaLimite || 'Por definir'}</td>
      <td style="padding: 6px 8px; text-align: right; font-weight: 800; color: #0f172a;">Bs ${p.cuota.toFixed(2)}</td>
      <td style="padding: 6px 8px; text-align: right; color: #059669; font-weight: 600;">Bs ${p.capital.toFixed(2)}</td>
      <td style="padding: 6px 8px; text-align: right; color: #d97706; font-weight: 600;">Bs ${p.interes.toFixed(2)}</td>
      <td style="padding: 6px 8px; text-align: right; font-weight: bold; color: #1e293b;">Bs ${p.saldo.toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <div style="max-width: 800px; margin: 0 auto; padding: 10px; font-family: 'Inter', sans-serif;">
      <!-- Encabezado Institucional -->
      <div style="text-align: center; border-bottom: 2px solid #b91c1c; padding-bottom: 12px; margin-bottom: 14px;">
        <h1 style="font-size: 18px; font-weight: 900; color: #0f172a; letter-spacing: 1px; margin-bottom: 2px;">
          ASOCIACIÓN DE TRANSPORTE "RADIO MÓVIL 15 DE ABRIL" S.R.L.
        </h1>
        <p style="font-size: 10px; font-weight: 700; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase;">
          Personería Jurídica N° 458/98 • NIT: 1028374029 • Tarija, Bolivia
        </p>
        <div style="display: inline-block; background: #b91c1c; color: #ffffff; font-weight: 800; font-size: 12px; padding: 4px 16px; border-radius: 4px; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
          TABLA DE AMORTIZACIÓN Y PLAN DE PAGOS OFICIAL
        </div>
      </div>

      <!-- Cuadros de Datos en 2 Columnas -->
      <div style="display: flex; justify-content: space-between; gap: 12px; margin-bottom: 14px;">
        <!-- Tarjeta Socio -->
        <div style="flex: 1; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; background: #f8fafc;">
          <div style="font-weight: 800; font-size: 10px; color: #b91c1c; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 6px;">
            Datos del Socio Prestatario
          </div>
          <div style="font-size: 11px; line-height: 1.6;">
            <div><span style="color: #64748b;">Socio Titular:</span> <strong>${socio}</strong></div>
            <div><span style="color: #64748b;">Nro. Móvil Interno:</span> <strong style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #b91c1c;">#${socioMovil}</strong></div>
            <div><span style="color: #64748b;">Cédula de Identidad:</span> <strong>${socioCI}</strong></div>
            <div><span style="color: #64748b;">Estado:</span> <strong style="color: #059669;">AFILIADO ACTIVO</strong></div>
          </div>
        </div>

        <!-- Tarjeta Condiciones -->
        <div style="flex: 1; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; background: #f8fafc;">
          <div style="font-weight: 800; font-size: 10px; color: #b91c1c; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 6px;">
            Condiciones Financieras del Crédito
          </div>
          <div style="font-size: 11px; line-height: 1.6; font-family: 'JetBrains Mono', monospace;">
            <div><span style="color: #64748b; font-family: 'Inter';">Folio Contrato:</span> <strong style="color: #b91c1c;">${folio}</strong></div>
            <div><span style="color: #64748b; font-family: 'Inter';">Monto Capital:</span> <strong>Bs ${totalCapital.toLocaleString()}</strong></div>
            <div><span style="color: #64748b; font-family: 'Inter';">Plazo Acordado:</span> <strong>${plazo} Meses</strong></div>
            <div><span style="color: #64748b; font-family: 'Inter';">Tasa de Interés:</span> <strong>${tasaAnual}% Anual (1% Mensual)</strong></div>
          </div>
        </div>
      </div>

      <!-- Resumen Destacado de Cuota -->
      <div style="display: flex; justify-content: space-between; align-items: center; background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 8px; padding: 8px 14px; margin-bottom: 14px;">
        <div>
          <span style="font-size: 10px; font-weight: 800; color: #991b1b; text-transform: uppercase;">Cuota Mensual Fija:</span>
          <div style="font-size: 16px; font-weight: 900; color: #b91c1c; font-family: 'JetBrains Mono', monospace;">
            Bs ${cuotaMensual.toFixed(2)}
          </div>
        </div>
        <div style="text-align: right; font-family: 'JetBrains Mono', monospace; font-size: 11px;">
          <div><span style="color: #64748b; font-family: 'Inter';">Total Intereses:</span> <strong>Bs ${totalInteres.toFixed(2)}</strong></div>
          <div><span style="color: #64748b; font-family: 'Inter';">Total a Devolver:</span> <strong style="color: #0f172a; font-size: 12px;">Bs ${totalPagar.toFixed(2)}</strong></div>
        </div>
      </div>

      <!-- Tabla de Amortización Completa -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <thead>
          <tr style="background: #0f172a; color: #ffffff; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
            <th style="padding: 7px 8px; text-align: center; border: 1px solid #0f172a;">N° Cuota</th>
            <th style="padding: 7px 8px; text-align: center; border: 1px solid #0f172a;">Fecha Límite Pago</th>
            <th style="padding: 7px 8px; text-align: right; border: 1px solid #0f172a;">Cuota Fija (Bs)</th>
            <th style="padding: 7px 8px; text-align: right; border: 1px solid #0f172a;">Amortiz. Capital</th>
            <th style="padding: 7px 8px; text-align: right; border: 1px solid #0f172a;">Interés Mensual</th>
            <th style="padding: 7px 8px; text-align: right; border: 1px solid #0f172a;">Saldo Deudor</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHTML}
        </tbody>
        <tfoot>
          <tr style="background: #f1f5f9; font-weight: 900; font-family: 'JetBrains Mono', monospace; font-size: 11px; border-top: 2px solid #0f172a; border-bottom: 2px solid #0f172a;">
            <td style="padding: 8px; text-align: center; font-family: 'Inter';" colspan="2">TOTALES</td>
            <td style="padding: 8px; text-align: right; color: #b91c1c;">Bs ${totalPagar.toFixed(2)}</td>
            <td style="padding: 8px; text-align: right; color: #059669;">Bs ${totalCapital.toFixed(2)}</td>
            <td style="padding: 8px; text-align: right; color: #d97706;">Bs ${totalInteres.toFixed(2)}</td>
            <td style="padding: 8px; text-align: right;">Bs 0.00</td>
          </tr>
        </tfoot>
      </table>

      <!-- Cláusula Legal y Compromiso -->
      <div style="border: 1px dashed #94a3b8; border-radius: 6px; padding: 8px; font-size: 9.5px; color: #475569; margin-bottom: 25px; line-height: 1.4;" class="avoid-break">
        <strong>COMPROMISO DE PAGO:</strong> Por el presente documento, el prestatario se compromete a cancelar puntualmente sus cuotas mensuales en ventanilla de Caja Central de Radio Móvil 15 de Abril hasta el día 15 de cada mes. Las cuotas serán cobradas de forma prioritaria junto con los aportes y sostenimiento institucional.
      </div>

      <!-- Bloque de Firmas Formales -->
      <div style="display: flex; justify-content: space-between; margin-top: 35px; text-align: center; font-size: 11px;" class="avoid-break">
        <div style="width: 30%; border-top: 1.5px solid #0f172a; padding-top: 6px;">
          <strong>${socio}</strong><br>
          <span style="font-size: 10px; color: #64748b;">CI: ${socioCI}</span><br>
          <span style="font-weight: 800; font-size: 9px; color: #0f172a; text-transform: uppercase;">Socio Prestatario</span><br>
          <span style="font-size: 8px; color: #94a3b8;">Huella Dactilar</span>
        </div>

        <div style="width: 30%; border-top: 1.5px solid #0f172a; padding-top: 6px;">
          <strong>Directorio Ejecutivo</strong><br>
          <span style="font-size: 10px; color: #64748b;">Secretaría General</span><br>
          <span style="font-weight: 800; font-size: 9px; color: #0f172a; text-transform: uppercase;">Radio Móvil 15 de Abril</span>
        </div>

        <div style="width: 30%; border-top: 1.5px solid #0f172a; padding-top: 6px;">
          <strong>Tesorería General</strong><br>
          <span style="font-size: 10px; color: #64748b;">Dpto. de Crédito y Cobranza</span><br>
          <span style="font-weight: 800; font-size: 9px; color: #0f172a; text-transform: uppercase;">Radio Móvil 15 de Abril</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generador HTML para Ticket Térmico 80mm y Recibo Carta
 */
export function generateReceiptHTML(receiptData, printMode = 'termico') {
  const items = receiptData.items || receiptData.deudasCobrar || [];
  const total = receiptData.totalBs || receiptData.total || items.reduce((acc, d) => acc + (parseFloat(d.monto) || 0), 0);
  const socioNombre = receiptData.socioNombre || (receiptData.socio ? `${receiptData.socio.nombres} ${receiptData.socio.apPaterno} ${receiptData.socio.apMaterno || ''}`.trim() : 'Socio Afiliado');
  const socioId = receiptData.socioId || receiptData.socio?.id || '';
  const socioCI = receiptData.socioCI || receiptData.socio?.ci || '';
  const cajaNombre = receiptData.cajaNombre || receiptData.caja?.nombre || 'CAJA GENERAL';
  const cajero = receiptData.cajero || receiptData.usuario || 'Cajero(a) Central';
  const fecha = receiptData.fecha || new Date().toLocaleString('es-BO');

  const itemsRows = items.map(d => `
    <div style="display: flex; justify-content: space-between; font-size: 11px; padding: 2px 0; border-bottom: 1px dotted #e2e8f0;">
      <span style="font-family: sans-serif; padding-right: 8px;">${d.descripcion}${d.periodo ? ` (${d.periodo})` : ''}</span>
      <span style="font-weight: bold; font-family: monospace; white-space: nowrap;">Bs ${(parseFloat(d.monto) || 0).toFixed(2)}</span>
    </div>
  `).join('');

  if (printMode === 'carta') {
    // Formato Recibo Hoja Carta Oficial
    return `
      <div style="max-width: 700px; margin: 0 auto; padding: 15px; border: 2px solid #0f172a; border-radius: 8px; font-family: 'Inter', sans-serif;">
        <div style="text-align: center; border-bottom: 2px solid #b91c1c; padding-bottom: 8px; margin-bottom: 12px;">
          <h2 style="font-size: 16px; font-weight: 900; color: #0f172a; text-transform: uppercase;">RADIO MÓVIL 15 DE ABRIL S.R.L.</h2>
          <p style="font-size: 10px; color: #64748b; font-weight: bold; text-transform: uppercase;">Sistema Integral de Cobranza (SISCOB) • Tarija, Bolivia</p>
          <div style="margin-top: 4px; display: inline-block; background: #0f172a; color: #ffffff; padding: 3px 12px; font-size: 12px; font-weight: 800; border-radius: 4px;">
            RECIBO OFICIAL DE COBRANZA N° ${receiptData.nroRecibo}
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 12px; line-height: 1.6; background: #f8fafc; padding: 8px; border-radius: 6px;">
          <div>
            <div><strong>Socio / Afiliado:</strong> <span style="text-transform: uppercase;">${socioNombre}</span></div>
            <div><strong>Móvil Interno:</strong> #${socioId} &nbsp;|&nbsp; <strong>C.I.:</strong> ${socioCI}</div>
          </div>
          <div style="text-align: right;">
            <div><strong>Fecha:</strong> ${fecha}</div>
            <div><strong>Caja:</strong> ${cajaNombre} &nbsp;|&nbsp; <strong>Cajero:</strong> ${cajero}</div>
          </div>
        </div>

        <div style="margin-bottom: 12px;">
          <div style="font-weight: 800; font-size: 10px; text-transform: uppercase; color: #64748b; border-bottom: 1.5px solid #0f172a; padding-bottom: 3px; display: flex; justify-content: space-between;">
            <span>CONCEPTO / DETALLE DE OBLIGACIONES</span>
            <span>IMPORTE (BS)</span>
          </div>
          <div style="padding-top: 4px;">
            ${itemsRows}
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #0f172a; padding-top: 8px; margin-bottom: 25px;">
          <div style="font-size: 11px;">
            <div><strong>Forma de Pago:</strong> Efectivo</div>
            <div style="color: #059669; font-weight: bold;">ESTADO: CANCELADO / PAGADO</div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 11px; font-weight: bold; color: #64748b;">TOTAL CANCELADO:</span>
            <div style="font-size: 18px; font-weight: 900; color: #b91c1c; font-family: monospace;">
              Bs ${total.toFixed(2)}
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-around; text-align: center; font-size: 10px; margin-top: 30px;">
          <div style="width: 40%; border-top: 1px solid #475569; padding-top: 4px;">
            Firma del Socio Afiliado<br>
            <span style="color: #64748b;">Conformidad de Pago</span>
          </div>
          <div style="width: 40%; border-top: 1px solid #475569; padding-top: 4px;">
            Firma / Sello Caja Central<br>
            <span style="color: #64748b;">Radio Móvil 15 de Abril</span>
          </div>
        </div>
      </div>
    `;
  }

  // Formato Ticket Térmico 80mm
  return `
    <div style="max-width: 300px; margin: 0 auto; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #000000; padding: 5px;">
      <div style="text-align: center; border-bottom: 1px dashed #000; padding-bottom: 8px; margin-bottom: 8px;">
        <div style="font-size: 14px; font-weight: 900; text-transform: uppercase;">RADIO MÓVIL 15 DE ABRIL</div>
        <div style="font-size: 9px; font-weight: bold;">SISTEMA DE COBRANZA (SISCOB)</div>
        <div style="font-size: 9px;">TARIJA - BOLIVIA</div>
        <div style="margin-top: 6px; font-size: 13px; font-weight: 900; border: 1px solid #000; padding: 2px 4px; display: inline-block;">
          RECIBO N° ${receiptData.nroRecibo}
        </div>
        <div style="font-size: 9px; margin-top: 4px;">${fecha}</div>
      </div>

      <div style="border-bottom: 1px dashed #000; padding-bottom: 6px; margin-bottom: 6px; font-size: 10px; line-height: 1.4;">
        <div><strong>SOCIO:</strong> ${socioNombre}</div>
        <div><strong>MÓVIL:</strong> #${socioId} &nbsp;|&nbsp; <strong>CI:</strong> ${socioCI}</div>
        <div><strong>CAJA:</strong> ${cajaNombre}</div>
        <div><strong>CAJERO:</strong> ${cajero}</div>
      </div>

      <div style="border-bottom: 1px dashed #000; padding-bottom: 6px; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 9px; border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 4px;">
          <span>CONCEPTO</span>
          <span>MONTO</span>
        </div>
        ${itemsRows}
      </div>

      <div style="border-bottom: 1px dashed #000; padding-bottom: 6px; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 900;">
          <span>TOTAL:</span>
          <span>Bs ${total.toFixed(2)}</span>
        </div>
        <div style="font-size: 9px; margin-top: 2px;">FORMA PAGO: EFECTIVO</div>
      </div>

      <div style="text-align: center; font-size: 9px; line-height: 1.3;">
        <div>¡Gracias por su puntual aporte!</div>
        <div>Radio Móvil 15 de Abril</div>
        <div style="letter-spacing: 3px; font-size: 10px; margin-top: 4px;">||| ||||| |||| |||||| |||||</div>
      </div>
    </div>
  `;
}

import * as XLSX from 'xlsx';

/**
 * Exportador de Tablas a CSV limpio (Compatible al 100% con Excel en Español / Windows)
 */
export function downloadCSV(filename, headers, rows) {
  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvRows = [];
  // Usar ';' (punto y coma) que es el separador de listas estándar de Excel en Windows (Español)
  csvRows.push(headers.map(escapeCsv).join(';'));

  for (const row of rows) {
    csvRows.push(row.map(escapeCsv).join(';'));
  }

  // \uFEFF (UTF-8 BOM) + CRLF (\r\n) para que Excel no colapse las filas ni las columnas
  const csvContent = '\uFEFF' + csvRows.join('\r\n') + '\r\n';
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Exportador nativo a archivo Excel (.xlsx) con autoajuste de columnas
 */
export function downloadXLSX(filename, headers, rows, sheetName = 'Datos') {
  const data = [headers, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Autoajustar ancho de columnas
  const colWidths = headers.map((h, i) => {
    let maxLen = String(h || '').length;
    for (const r of rows) {
      if (r[i] !== undefined && r[i] !== null) {
        maxLen = Math.max(maxLen, String(r[i]).length);
      }
    }
    return { wch: Math.min(Math.max(maxLen + 3, 10), 45) };
  });
  ws['!cols'] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

