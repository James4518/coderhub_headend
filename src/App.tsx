import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router/index';
import AppHeader from './compoments/app-header';

function App() {
  return (
    <div className="App relative">
      <AppHeader />
      <Suspense fallback="">
        <main className="bg-slate-200 pt-4">
          <div className="w-10/12 mx-auto">{useRoutes(routes)}</div>
        </main>
      </Suspense>
    </div>
  );
}

export default App;
