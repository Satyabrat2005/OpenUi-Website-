import { Link } from 'react-router-dom'

function CheckIcon() {
  return (
    <span className="icon check" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2 6 5 9 10 3" />
      </svg>
    </span>
  )
}

function CrossIcon() {
  return (
    <span className="icon cross" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="3" x2="9" y2="9" />
        <line x1="9" y1="3" x2="3" y2="9" />
      </svg>
    </span>
  )
}

function formatPrice(plan, billingPeriod) {
  if (plan.isCustom) {
    return { main: 'Custom', period: null, sub: 'Contact Sales' }
  }

  if (plan.monthlyPrice === 0) {
    return { main: '$0', period: '/month', sub: null }
  }

  if (plan.perSeat) {
    if (billingPeriod === 'yearly') {
      return {
        main: `$${plan.yearlyPrice}`,
        period: '/seat/mo',
        sub: 'billed annually',
      }
    }
    return {
      main: `$${plan.monthlyPrice}`,
      period: '/seat/mo',
      sub: `min ${plan.minSeats} seats`,
    }
  }

  if (billingPeriod === 'yearly') {
    return {
      main: `$${plan.yearlyPrice}`,
      period: '/year',
      sub: '~2 months free',
    }
  }
  return {
    main: `$${plan.monthlyPrice}`,
    period: '/month',
    sub: null,
  }
}

function formatINRPrice(plan, billingPeriod) {
  if (!plan.monthlyPriceINR) return null
  if (billingPeriod === 'yearly') {
    return `₹${plan.yearlyPriceINR.toLocaleString('en-IN')}/year`
  }
  return `₹${plan.monthlyPriceINR.toLocaleString('en-IN')}/month`
}

export default function PricingCard({ plan, billingPeriod }) {
  const price = formatPrice(plan, billingPeriod)
  const inrPrice = formatINRPrice(plan, billingPeriod)

  return (
    <div className={`pricing-card${plan.isPopular ? ' popular' : ''}`}>
      {plan.badge && <span className="badge">{plan.badge}</span>}

      <p className="plan-name">{plan.name}</p>

      <div className="plan-price">
        {price.main}
        {price.period && <span className="period">{price.period}</span>}
      </div>

      {price.sub && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-muted)', marginTop: '6px' }}>
          {price.sub}
        </p>
      )}

      {inrPrice && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-muted)', marginTop: '4px' }}>
          🇮🇳 {inrPrice}
        </p>
      )}

      <p className="plan-desc">{plan.description}</p>

      <ul className="features-list">
        {plan.features.map((feature, i) => (
          <li key={i}>
            <CheckIcon />
            {feature}
          </li>
        ))}
        {plan.unavailable.map((feature, i) => (
          <li key={`u-${i}`} className="unavailable">
            <CrossIcon />
            {feature}
          </li>
        ))}
      </ul>

      {plan.note && <p className="plan-note">{plan.note}</p>}

      <div className="plan-btn">
        {plan.isCustom ? (
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=neurotitanholdings@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className={plan.buttonStyle === 'primary' ? "btn-white" : "btn-ghost"}
            style={{ width: '100%', justifyContent: 'center', display: 'flex', textDecoration: 'none' }}
          >
            {plan.buttonText}
          </a>
        ) : (
          <Link
            to="/#demo"
            className={plan.buttonStyle === 'primary' ? "btn-white" : "btn-ghost"}
            style={{ width: '100%', justifyContent: 'center', display: 'flex', textDecoration: 'none' }}
          >
            {plan.buttonText}
          </Link>
        )}
      </div>
    </div>
  )
}
