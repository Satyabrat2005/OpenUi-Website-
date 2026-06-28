import { useState } from 'react'
import { SiGithub, SiZoom, SiGooglechrome, SiWhatsapp, SiSlack, SiGmail } from 'react-icons/si'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'

export default function HomePage() {
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
  const [waitlistLoading, setWaitlistLoading] = useState(false)

  async function handleWaitlist(e) {
    e.preventDefault()
    setWaitlistLoading(true)
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: e.target.querySelector('input').value })
      })
      if (response.ok) {
        setWaitlistSubmitted(true)
      } else {
        alert('Something went wrong')
        setWaitlistLoading(false)
      }
    } catch {
      alert('Network error')
      setWaitlistLoading(false)
    }
  }

  async function handleDownload(e, platform) {
    e.preventDefault()
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_name: `OpenUI Download (${platform})` })
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Failed to start checkout')
      }
    } catch {
      alert('Error starting checkout')
    }
  }

  return (
    <>
      {/* ══════════════════ HERO ══════════════════ */}
      <section id="download">
        <div className="wrap">
          <div className="hero-grid">
            {/* left */}
            <div>
              <p className="label" style={{ marginBottom: '28px' }}>Local-first · No data leaves your machine</p>
              <h1 className="display" style={{ fontSize: 'clamp(54px,7.5vw,92px)', color: 'var(--color-paper)' }}>
                AI that runs<br />
                your entire<br />
                <em style={{ color: 'var(--color-lime)', fontStyle: 'italic' }}>operating system.</em>
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', maxWidth: '400px', lineHeight: 1.75, marginTop: '28px' }}>
                Talks, types, clicks, codes, books meetings, and reviews pull requests —
                all from a menu bar icon. No cloud required to get started.
              </p>
            </div>

            {/* right: downloads */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '228px' }}>
              <p className="label" style={{ marginBottom: '10px' }}>Available now</p>

              <a href="#" className="btn-white" onClick={(e) => handleDownload(e, 'Mac')}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
                </svg>
                Download for Mac
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#9a9a90', marginLeft: 'auto' }}>.dmg</span>
              </a>

              <a href="#" className="btn-ghost" onClick={(e) => handleDownload(e, 'Windows')}>
                <svg width="14" height="14" viewBox="0 0 88 88" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M0 12.402l35.687-4.86.016 34.423-35.67.201zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349-.011 41.34-47.318-6.678-.066-34.739z" />
                </svg>
                Download for Windows
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-subdued)', marginLeft: 'auto' }}>.exe</span>
              </a>

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-subdued)', textAlign: 'center', marginTop: '4px' }}>
                Free · 20 AI messages / day · No account needed
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ══════════════════ APP VISUAL ══════════════════ */}
      <section style={{ padding: '32px 0' }}>
        <div className="wrap">
          <div className="placeholder" style={{ height: '440px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '34px', background: '#0d0c0a', borderBottom: '1px solid var(--color-wire)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: '7px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2a2a26' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2a2a26' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2a2a26' }}></div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#2a2a26', margin: '0 auto' }}>OpenUI</span>
            </div>
            <span>[ App screenshot / demo  ·  1160 × 440 ]</span>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ticker */}
      <div className="wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ paddingRight: '22px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Works in
          </div>
          <div className="ticker-wrap" style={{ borderLeft: '1px solid var(--color-wire)' }}>
            <div className="ticker">
              {/* Set 1 */}
              <div className="ticker-item no-border"><SiGithub color="#ffffff" /> <b>GitHub</b></div>
              <div className="ticker-item"><FaRegCalendarAlt color="#ffffff" /> <b>Calendar</b></div>
              <div className="ticker-item"><SiZoom color="#2D8CFF" /> <b>Zoom</b></div>
              <div className="ticker-item"><SiGooglechrome color="#4285F4" /> <b>Browser</b></div>
              <div className="ticker-item"><VscVscode color="#007ACC" /> <b>VS Code</b></div>
              <div className="ticker-item"><SiWhatsapp color="#25D366" /> <b>WhatsApp</b></div>
              <div className="ticker-item"><SiSlack color="#E01E5A" /> <b>Slack</b></div>
              <div className="ticker-item"><SiGmail color="#EA4335" /> <b>Gmail</b></div>
              {/* Set 2 for seamless loop */}
              <div className="ticker-item"><SiGithub color="#ffffff" /> <b>GitHub</b></div>
              <div className="ticker-item"><FaRegCalendarAlt color="#ffffff" /> <b>Calendar</b></div>
              <div className="ticker-item"><SiZoom color="#2D8CFF" /> <b>Zoom</b></div>
              <div className="ticker-item"><SiGooglechrome color="#4285F4" /> <b>Browser</b></div>
              <div className="ticker-item"><VscVscode color="#007ACC" /> <b>VS Code</b></div>
              <div className="ticker-item"><SiWhatsapp color="#25D366" /> <b>WhatsApp</b></div>
              <div className="ticker-item"><SiSlack color="#E01E5A" /> <b>Slack</b></div>
              <div className="ticker-item"><SiGmail color="#EA4335" /> <b>Gmail</b></div>
            </div>
          </div>
        </div>
      </div>

      <hr className="rule" />

      {/* ══════════════════ FEATURES ══════════════════ */}
      <section id="features" style={{ padding: '72px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'end', marginBottom: '52px' }}>
            <div>
              <p className="label" style={{ marginBottom: '18px' }}>What it does</p>
              <h2 className="display" style={{ fontSize: 'clamp(28px,3.5vw,40px)', lineHeight: 1.1 }}>
                Everything your OS can do,<br />
                spoken in <span style={{ color: 'var(--color-lime)' }}>plain language.</span>
              </h2>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.75, maxWidth: '360px', marginLeft: 'auto' }}>
              Not a wrapper. Not a chat panel bolted to your desktop.
              A genuine agent that reads your screen, holds context, and acts.
            </p>
          </div>

          <div>
            <div className="feat-row">
              <span className="num">01</span>
              <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-paper)' }}>Local-first privacy</p>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.75 }}>
                Nothing is transmitted without your consent. Conversations, files, screen contents —
                processed on device. Opt into cloud models when you need them;
                the app never stores API keys in plaintext.
              </p>
            </div>
            <div className="feat-row">
              <span className="num">02</span>
              <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-paper)' }}>Full OS automation</p>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.75 }}>
                Opens apps, moves the mouse, types into any input, reads your screen via OCR
                or cloud vision, fills forms, books calendar events, browses the web —
                macOS via AppleScript and Windows via PowerShell.
              </p>
            </div>
            <div className="feat-row">
              <span className="num">03</span>
              <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-paper)' }}>Autonomous background coding</p>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.75 }}>
                Go idle for five minutes and the agent reads your task list, writes code into
                a sandboxed workspace, runs your test suite, iterates on failures, and stops
                cleanly when you return. Up to 20 agentic coding turns per run.
              </p>
            </div>
            <div className="feat-row">
              <span className="num">04</span>
              <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-paper)' }}>Voice — push-to-talk or always-on</p>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.75 }}>
                Whisper transcribes locally. No API key required in offline mode.
                TTS responses piped through system audio. Hotkey{' '}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', background: 'var(--color-dim)', padding: '2px 6px', border: '1px solid var(--color-wire)' }}>Ctrl+Alt+O</span>{' '}
                triggers listening from anywhere on screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ══════════════════ PLATFORM ══════════════════ */}
      <section id="platform" style={{ padding: '72px 0' }}>
        <div className="wrap">
          <p className="label" style={{ marginBottom: '44px' }}>Platform support</p>
          <div className="platform-grid">
            {/* macOS */}
            <div className="platform-col" style={{ paddingLeft: 0 }}>
              <p className="label" style={{ marginBottom: '28px' }}>macOS</p>
              <div className="placeholder" style={{ width: '100%', height: '220px', marginBottom: '32px' }}>
                <span>[ Mac UI screenshot ]</span>
              </div>
              <h3 className="display" style={{ fontSize: '28px', marginBottom: '14px', lineHeight: 1.05 }}>Universal binary.</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.75, maxWidth: '300px' }}>
                Runs natively on Apple Silicon and Intel. Menu bar icon, AppleScript-powered
                automation, Calendar.app integration, Spotlight triggers.
              </p>
              <div style={{ marginTop: '20px' }}>
                <span className="chip">arm64</span><span className="chip">x64</span>
                <span className="chip">macOS 12+</span><span className="chip">DMG</span>
              </div>
            </div>
            {/* Windows */}
            <div className="platform-col" style={{ paddingRight: 0 }}>
              <p className="label" style={{ marginBottom: '28px' }}>Windows</p>
              <div className="placeholder" style={{ width: '100%', height: '220px', marginBottom: '32px' }}>
                <span>[ Windows UI screenshot ]</span>
              </div>
              <h3 className="display" style={{ fontSize: '28px', marginBottom: '14px', lineHeight: 1.05 }}>System tray native.</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.75, maxWidth: '300px' }}>
                NSIS installer, PowerShell automation, silent auto-update via GitHub Releases.
                No admin rights required on x64 or ia32 hardware.
              </p>
              <div style={{ marginTop: '20px' }}>
                <span className="chip">x64</span><span className="chip">ia32</span>
                <span className="chip">Win 10+</span><span className="chip">NSIS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ══════════════════ WAITLIST ══════════════════ */}
      <section id="waitlist" style={{ padding: '88px 0' }}>
        <div className="wrap">
          <div className="waitlist-grid">
            {/* left */}
            <div>
              <p className="label" style={{ marginBottom: '20px' }}>Pro · Coming soon</p>
              <h2 className="display" style={{ fontSize: 'clamp(54px,7.5vw,92px)', lineHeight: 1.0 }}>
                More model.<br />
                More context.<br />
                <span style={{ color: 'var(--color-lime)' }}>Same machine.</span>
              </h2>


            </div>

            {/* right */}
            <div style={{ paddingTop: '56px' }}>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.75, marginBottom: '28px' }}>
                Join the list for early access and a 30-day free trial when Pro ships.
                One email when it's ready — nothing else.
              </p>

              {!waitlistSubmitted ? (
                <form onSubmit={handleWaitlist} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input type="email" className="field" placeholder="your@email.com" required autoComplete="email" />
                  <button type="submit" className="btn-white" style={{ justifyContent: 'center' }} disabled={waitlistLoading}>
                    {waitlistLoading ? 'Joining…' : 'Join the Pro waitlist →'}
                  </button>
                </form>
              ) : (
                <div style={{ marginTop: '18px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-lime)' }}>✓ You're on the list.</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-subdued)', marginTop: '6px' }}>
                    We'll email when Pro opens.
                  </p>
                </div>
              )}

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-faint)', marginTop: '14px' }}>
                No spam · Unsubscribe any time
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="rule" />
    </>
  )
}
