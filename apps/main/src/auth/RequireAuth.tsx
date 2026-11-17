import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { DEFAULT_LOGIN_PATH } from '@one-bank/sdk';
import { useAuth } from './AuthContext';

/** 鉴权守卫：未登录统一回基座登录页，并记住来源路径 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to={DEFAULT_LOGIN_PATH} replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}
