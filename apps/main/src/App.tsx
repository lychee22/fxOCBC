import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import { installMonitor } from './monitor/monitor';
import { registerAndStart } from './micro/apps';

export default function App() {
  useEffect(() => {
    installMonitor();
    registerAndStart();
  }, []);

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}
