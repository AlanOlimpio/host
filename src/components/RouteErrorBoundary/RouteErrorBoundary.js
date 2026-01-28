import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function RouteErrorBoundary() {
  const error = useRouteError();

  console.error('MF Error:', error);

  return (
    <div style={{ padding: 24 }}>
      <h2>Algo deu errado</h2>

      <p>Não foi possível carregar este módulo no momento.</p>

      {process.env.NODE_ENV === 'development' && (
        <pre style={{ marginTop: 16, color: '#c00' }}>
          {error?.message || JSON.stringify(error, null, 2)}
        </pre>
      )}
    </div>
  );
}
