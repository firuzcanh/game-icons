import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

interface Toast {
  id: number;
  text: string;
  tag?: string;
}

type Show = (text: string, tag?: string) => void;

const ToastContext = createContext<Show>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const nextId = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // One toast at a time: a new message replaces the current one.
  const show = useCallback<Show>((text, tag) => {
    clearTimeout(timer.current);
    setToast({ id: nextId.current++, text, tag });
    timer.current = setTimeout(() => setToast(null), 1600);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        {toast && (
          <div key={toast.id} className="toast">
            <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
              <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{toast.text}</span>
            {toast.tag && <span className="toast-tag">{toast.tag}</span>}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
