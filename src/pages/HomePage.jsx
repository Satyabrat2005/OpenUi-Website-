import { useState } from 'react'
import { SiGithub, SiZoom, SiGooglechrome, SiWhatsapp, SiSlack, SiGmail } from 'react-icons/si'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'

const ImageComparisonSlider = ({ withImage, withoutImage }) => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '220px', overflow: 'hidden', borderRadius: '12px', userSelect: 'none', backgroundColor: 'var(--color-bg-alt)' }}>
      {/* Right Image (Background / Without) */}
      <img src={withoutImage} alt="Without" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} draggable="false" />
      
      {/* Left Image (Foreground / With) */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        clipPath: `inset(0 ${100 - sliderPos}% 0 0)` 
      }}>
        <img src={withImage} alt="With" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} draggable="false" />
      </div>

      {/* Range Input */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPos} 
        onChange={(e) => setSliderPos(e.target.value)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'ew-resize',
          zIndex: 10,
          margin: 0
        }}
      />

      {/* Slider Line & Handle */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${sliderPos}%`,
        width: '2px',
        backgroundColor: '#1c1c1c',
        pointerEvents: 'none',
        transform: 'translateX(-50%)',
        zIndex: 5
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#2d2d2d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          border: '1px solid #1c1c1c'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 17l-5-5 5-5 M14 17l5-5-5-5" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        color: '#fff',
        padding: '6px 10px',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: 600,
        pointerEvents: 'none',
        zIndex: 5,
        opacity: sliderPos > 30 ? 1 : 0,
        transition: 'opacity 0.2s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        Visible to you
      </div>
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        color: '#fff',
        padding: '6px 10px',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: 600,
        pointerEvents: 'none',
        zIndex: 5,
        opacity: sliderPos < 70 ? 1 : 0,
        transition: 'opacity 0.2s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        Invisible to others
      </div>
    </div>
  );
};

export default function HomePage() {
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
  const [waitlistLoading, setWaitlistLoading] = useState(false)

  async function handleWaitlist(e) {
    e.preventDefault()
    setWaitlistLoading(true)
    try {
      const name = e.target.elements.name.value
      const email = e.target.elements.email.value
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
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

 

  return (
    <>
      {/* ══════════════════ HERO ══════════════════ */}
      <section id="hero">
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

              <a href="/#demo" className="btn-white" style={{ justifyContent: 'center' }}>
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ══════════════════ APP VISUAL ══════════════════ */}
      <section style={{ padding: '32px 0' }}>
        <div className="wrap">
          <div className="placeholder" style={{ padding: 0, overflow: 'hidden', display: 'block' }}>
            <div style={{ height: '34px', background: '#0d0c0a', borderBottom: '1px solid var(--color-wire)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: '7px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2a2a26' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2a2a26' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2a2a26' }}></div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#2a2a26', margin: '0 auto' }}>OpenUI</span>
            </div>
            <iframe 
              src="/desktop-demo.html" 
              style={{ width: '100%', aspectRatio: '16/9', border: 'none', display: 'block' }} 
              title="OpenUI Demo"
            />
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
              <div style={{ width: '100%', aspectRatio: '16/10', marginBottom: '32px' }}>
                <ImageComparisonSlider withImage="/images/mac_with.webp" withoutImage="/images/mac_without.webp" />
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
              <div style={{ width: '100%', aspectRatio: '16/10', marginBottom: '32px' }}>
                <ImageComparisonSlider withImage="/images/win_with.webp" withoutImage="/images/win_without.webp" />
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
      <section id="demo" style={{ padding: '88px 0' }}>
        <div className="wrap">
          <div className="waitlist-grid">
            {/* left */}
            <div>
              <p className="label" style={{ marginBottom: '20px' }}>Demo</p>
              <h2 className="display" style={{ fontSize: 'clamp(54px,7.5vw,92px)', lineHeight: 1.0 }}>
                Book a demo<br />
                <span style={{ color: 'var(--color-lime)' }}>today.</span>
              </h2>


            </div>

            {/* right */}
            <div style={{ paddingTop: '56px' }}>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.75, marginBottom: '28px' }}>
                Schedule a call with our team to see how OpenUI can work for you.
              </p>

              {!waitlistSubmitted ? (
                <form onSubmit={handleWaitlist} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input type="text" name="name" className="field" placeholder="Your Name" required autoComplete="name" />
                  <input type="email" name="email" className="field" placeholder="your@email.com" required autoComplete="email" />
                  <button type="submit" className="btn-white" style={{ justifyContent: 'center' }} disabled={waitlistLoading}>
                    {waitlistLoading ? 'Booking…' : 'Book a demo →'}
                  </button>
                </form>
              ) : (
                <div style={{ marginTop: '18px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-lime)' }}>✓ Demo requested.</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-subdued)', marginTop: '6px' }}>
                    We'll be in touch soon.
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
