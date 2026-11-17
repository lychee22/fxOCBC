import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { track } from '../monitor/monitor';

const MENU = [
  { path: '/', label: '首页' },
  { path: '/market', label: '公共行情' },
];

/** 基座布局框架：顶栏 + 侧边导航 + 子应用挂载点 */
export default function Layout() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="shell">
      <header className="shell-header">
        <span className="shell-logo">OneBank 基座</span>
        <span className="shell-user">
          {session?.userName}（{session?.roles?.join('/')}）
          <button
            className="shell-btn"
            onClick={() => {
              track('logout');
              logout();
              navigate('/login');
            }}
          >
            退出
          </button>
        </span>
      </header>
      <div className="shell-body">
        <nav className="shell-sidemenu">
          {MENU.map((m) => (
            <NavLink key={m.path} to={m.path} end className={({ isActive }) => (isActive ? 'active' : '')}>
              {m.label}
            </NavLink>
          ))}
        </nav>
        <main className="shell-content">
          <Outlet />
          <div id="subapp-viewport" />
          <span className="subapp-loading" style={{ display: 'none' }}>
            子应用加载中…
          </span>
        </main>
      </div>
    </div>
  );
}
