import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  return (
    <header>
      <div className="wrap">
        <nav>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <span className="dot dot-pulse"></span>
            <span style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.04em', color: 'var(--color-paper)' }}>OpenUI</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-subdued)' }}>v0.1.0</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <Link to="/#features" className="nav-link">Features</Link>
            <Link
              to="/platform"
              className={`nav-link${location.pathname === '/platform' ? ' active' : ''}`}
            >
              Platform
            </Link>
            <Link
              to="/pricing"
              className={`nav-link${location.pathname === '/pricing' ? ' active' : ''}`}
            >
              Pricing
            </Link>
            <a href="https://github.com/Satyabrat2005/Openui" className="nav-link" target="_blank" rel="noopener noreferrer">GitHub</a>
            <Link to="/#demo" className="btn-ghost" style={{ padding: '7px 14px', fontSize: '12px' }}>Book a Demo</Link>
          </div>
        </nav>
      </div>
      <hr className="rule" />
    </header>
  )
}
