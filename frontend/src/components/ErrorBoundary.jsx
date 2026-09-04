import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('[SISCOB ErrorBoundary] Error capturado:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center space-y-4 border border-slate-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Error Inesperado en SISCOB
            </h2>
            <p className="text-sm text-slate-600">
              Se produjo un error interno en la aplicación. Sus datos están seguros.
              Puede intentar recargar la página o continuar trabajando.
            </p>
            {this.state.error && (
              <details className="text-left bg-slate-50 rounded-xl p-3 border border-slate-200">
                <summary className="text-xs font-bold text-slate-700 cursor-pointer">
                  Detalles técnicos del error
                </summary>
                <pre className="mt-2 text-[10px] text-red-700 font-mono whitespace-pre-wrap overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={this.handleReset}
                className="px-5 py-2 bg-slate-200 text-slate-800 rounded-xl font-bold text-sm hover:bg-slate-300 transition"
              >
                Intentar Continuar
              </button>
              <button
                onClick={this.handleReload}
                className="px-5 py-2 bg-red-700 text-white rounded-xl font-bold text-sm hover:bg-red-800 transition"
              >
                Recargar Aplicación
              </button>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Sistema SISCOB — Radio Móvil 15 de Abril
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
