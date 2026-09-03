import React, { useState } from 'react';
import { Package, Plus, Printer } from 'lucide-react';
import { INITIAL_PRODUCTOS } from '../data/mockData';

export default function AlmacenPage() {
  const [productos, setProductos] = useState(INITIAL_PRODUCTOS);
  const totalValorizado = productos.reduce((acc, p) => acc + (p.stock * p.precioVenta), 0);

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-4">
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs no-print">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <Package className="w-5 h-5 text-amber-600" />
            <span>Almacén e Inventario - Kardex Valorado</span>
          </h1>
          <p className="text-xs text-slate-500">Control de stock de repuestos, lubricantes y materiales institucionales</p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center space-x-1.5 bg-blue-700 hover:bg-blue-600 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs transition"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir Kardex Valorado</span>
        </button>
      </div>

      <div id="printable-area" className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden p-4">
        <div className="text-center border-b border-slate-300 pb-2 mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">Kardex Valorado de Almacén</h2>
          <p className="text-xs text-slate-500">A la fecha: 02-09-2026 | Moneda: Bolivianos (Bs)</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-white font-semibold">
              <tr>
                <th className="p-2.5">Código</th>
                <th className="p-2.5">Descripción del Producto</th>
                <th className="p-2.5 text-center">Unidad</th>
                <th className="p-2.5 text-center">Saldo / Stock</th>
                <th className="p-2.5 text-right">Precio Venta (Bs)</th>
                <th className="p-2.5 text-right">Monto Valorado (Bs)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {productos.map((prod) => {
                const totalItem = prod.stock * prod.precioVenta;
                return (
                  <tr key={prod.codigo} className="hover:bg-slate-50 font-sans">
                    <td className="p-2.5 font-mono font-bold text-blue-700">{prod.codigo}</td>
                    <td className="p-2.5 uppercase font-medium text-slate-900">{prod.descripcion}</td>
                    <td className="p-2.5 text-center text-slate-600">{prod.unidad}</td>
                    <td className="p-2.5 text-center font-mono font-bold">
                      <span className={prod.stock <= prod.alertaMin ? 'text-rose-600 font-extrabold' : 'text-slate-800'}>
                        {prod.stock.toFixed(1)}
                      </span>
                    </td>
                    <td className="p-2.5 text-right font-mono">{prod.precioVenta.toFixed(2)}</td>
                    <td className="p-2.5 text-right font-mono font-bold text-slate-900">{totalItem.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 mt-4 flex justify-between items-center text-xs font-bold">
          <span>VALORIZACIÓN TOTAL DEL INVENTARIO:</span>
          <span className="font-mono text-base font-extrabold text-blue-900">Bs {totalValorizado.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}