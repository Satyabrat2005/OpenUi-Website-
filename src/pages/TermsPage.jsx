import ReadingProgress from '../components/legal/ReadingProgress'
import LegalHero from '../components/legal/LegalHero'
import TableOfContents from '../components/legal/TableOfContents'
import LegalSection from '../components/legal/LegalSection'
import LegalCallout from '../components/legal/LegalCallout'
import FAQAccordion from '../components/legal/FAQAccordion'
import ContactSection from '../components/legal/ContactSection'
import BackToTop from '../components/legal/BackToTop'
import { termsSections, termsFaqs } from '../data/termsData'

function formatMarkdown(text) {
  if (!text) return '';
  const parts = text.split(/(\*\*.*?\*\*)/);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function TermsPage() {
  const wordCount = termsSections.reduce((acc, curr) => {
    const textWords = curr.content ? curr.content.split(/\s+/).length : 0
    const calloutWords = curr.callout ? curr.callout.text.split(/\s+/).length : 0
    return acc + textWords + calloutWords
  }, 0)

  return (
    <div className="legal-page-root">
      <ReadingProgress />

      <LegalHero
        title={<>Terms of <span style={{ color: 'var(--color-lime)' }}>Service</span></>}
        subtitle="Please read these Terms of Service carefully before installing or using our desktop automation platform and AI agent tools."
        lastUpdated="June 28, 2026"
        wordCount={wordCount}
        hideActions={true}
      />

      <div className="wrap legal-layout-grid">
        {/* Sticky Table of Contents sidebar */}
        <TableOfContents sections={termsSections} />

        {/* Main Document Content */}
        <main className="legal-main-content">
          {termsSections.map((sec, idx) => (
            <LegalSection
              key={sec.id}
              id={sec.id}
              idx={idx}
              title={sec.title}
            >
              <div className="legal-section-text">
                {sec.content.split('\n').map((para, pIdx) => {
                  if (para.startsWith('- ')) {
                    return (
                      <ul key={pIdx} className="legal-bullets">
                        <li>{formatMarkdown(para.substring(2))}</li>
                      </ul>
                    )
                  }
                  return <p key={pIdx}>{formatMarkdown(para)}</p>
                })}
              </div>

              {sec.callout && (
                <LegalCallout
                  type={sec.callout.type}
                  title={sec.callout.title}
                  text={sec.callout.text}
                />
              )}
            </LegalSection>
          ))}

          {/* FAQs Accordion */}
          <FAQAccordion faqs={termsFaqs} title="Terms of Service FAQs" />

          {/* Contact Section */}
          <ContactSection />
        </main>
      </div>

      <BackToTop />
    </div>
  )
}
