import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

/** 登录页（本期 mock 登录；生产 SSO 对接预留见 doc/arch/） */
export default function Login() {
  const { login, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('柜员001');

  const from = (location.state as { from?: string } | null)?.from ?? '/';

  if (session) {
    navigate(from, { replace: true });
    return null;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(name);
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={onSubmit}>
        <h1>OneBank 登录</h1>
        <p className="login-hint">本期为 mock 登录，生产环境对接行内 SSO</p>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="请输入柜员姓名" />
        <button type="submit">登录</button>
      </form>
    </div>
  );
}
