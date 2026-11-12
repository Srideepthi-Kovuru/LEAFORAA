import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border shadow-lg text-sm backdrop-blur-sm transition-opacity ${
              isSuccess
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : isError
                ? 'bg-rose-50 text-rose-900 border-rose-200'
                : 'bg-white text-stone-800 border-stone-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />}
              <span className="font-medium text-xs sm:text-sm">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
