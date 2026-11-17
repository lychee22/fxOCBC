export default function Home() {
  return (
    <div className="shell-home">
      <h2>欢迎进入 OneBank 基座平台</h2>
      <p>
        本期原子交付：<b>基座 + 公共行情（app-market）</b>。点击左侧「公共行情」体验子应用动态接入。
      </p>
      <ul>
        <li>基座职责：布局 / 登录 / 路由分发 / 子应用生命周期 / 全局状态 / 权限 / 监控兜底</li>
        <li>子应用接入协议见 doc/arch/子应用接入协议.md</li>
      </ul>
    </div>
  );
}
