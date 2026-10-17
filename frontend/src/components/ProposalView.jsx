import './ProposalView.css'

function ProposalView({ proposal, accent = false }) {
  return (
    <div className={`proposal-view${accent ? ' proposal-view--accent' : ''}`}>
      <h3>{proposal.title}</h3>
      <p>{proposal.summary}</p>
      {proposal.sections.map((section) => (
        <section key={section.title}>
          <h4>{section.title}</h4>
          <KeyValueTable rows={section.rows} />
        </section>
      ))}
    </div>
  )
}

export function KeyValueTable({ rows }) {
  return (
    <dl className="kv-table">
      {rows.map(([key, value]) => (
        <div key={key}>
          <dt>{key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default ProposalView
