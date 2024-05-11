import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router/index';

function App() {
  return (
    <div className="App">
      <Suspense fallback="">{useRoutes(routes)}</Suspense>
    </div>
  );
}

export default App;
