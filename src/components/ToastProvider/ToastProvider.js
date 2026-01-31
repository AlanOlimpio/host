import React, { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useIsMobile } from '../../hooks/useIsMobile';

const TOAST_EVENT = 'global-toast';

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handler = (event) => {
      const payload = event.detail;

      const id = crypto.randomUUID();

      setToasts((prev) => [
        ...prev,
        {
          id,
          title: payload?.title,
          message: payload?.message,
          variant: payload?.variant || 'dark',
          delay: payload?.delay || 3000,
        },
      ]);
    };

    window.addEventListener(TOAST_EVENT, handler);
    return () => window.removeEventListener(TOAST_EVENT, handler);
  }, []);

  function removeToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <>
      {children}

      <ToastContainer
        position={isMobile ? 'bottom-center' : 'top-end'}
        className="p-3"
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            bg={toast.variant}
            onClose={() => removeToast(toast.id)}
            delay={toast.delay}
            autohide
          >
            {toast.title && (
              <Toast.Header>
                <strong className="me-auto">{toast.title}</strong>
              </Toast.Header>
            )}

            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </>
  );
}
