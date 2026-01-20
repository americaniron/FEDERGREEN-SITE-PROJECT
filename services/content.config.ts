
export interface PageContent {
  title: string;
  subheadline: string;
  overview: string[];
  deliverables: string[];
  methodology: string[];
  whoItsFor: string[];
  outcomes: string[];
  caseStudy: { title: string; description: string };
  faq: { q: string; a: string }[];
}

export const frameworkContent: Record<string, PageContent> = {
  "/investors": {
    title: "Institutional Investors Hub",
    subheadline: "Strategic orchestration for family offices and institutional syndicates seeking sovereign-grade deal flow.",
    overview: [
      "The Federgreen Institutional Hub serves as a restricted access point for qualified capital allocators seeking exposure to meticulously vetted high-growth tranches.",
      "We provide the structural intelligence required to navigate complex global arbitrage opportunities while maintaining absolute capital integrity and regulatory hygiene."
    ],
    deliverables: ["Curated Institutional Deal Flow", "Sovereign Risk Assessments", "Strategic Alpha Mapping"],
    methodology: ["Audit: Triple-redundant validation of enterprise viability.", "Alignment: Synchronizing capital with specific institutional risk tranches.", "Execution: Managing the transaction lifecycle through to finality."],
    whoItsFor: ["Sovereign Wealth Funds", "Multi-Family Offices", "Accredited Institutional Syndicates"],
    outcomes: ["Optimized ROI Tranches", "Mitigated Portfolio Volatility", "Enhanced Market Access"],
    caseStudy: { title: "Global Infrastructure Alignment", description: "Successfully orchestrated a $150M capital node for a European infrastructure project, aligning three tier-1 family offices." },
    faq: [{ q: "How are opportunities qualified for the Hub?", a: "Each enterprise node undergoes a rigorous 45-day underwriting cycle before becoming available for institutional ingestion." }]
  },
  "/investors/opportunities": {
    title: "Opportunities Hub",
    subheadline: "Exclusive tranches and high-velocity capital nodes currently open for subscription.",
    overview: ["Access a restricted portfolio of vetted opportunities across sectors ranging from aerospace debt to high-growth sustainability nodes."],
    deliverables: ["Confidential Information Memorandums", "Due Diligence Data Room Access", "Tranche Yield Analysis"],
    methodology: ["Scanning: Identifying alpha-rich nodes in global markets.", "Vetting: Hardening the enterprise narrative through stress-testing.", "Deployment: Facilitating efficient capital entry."],
    whoItsFor: ["Active Capital Allocators", "Institutional Portfolio Managers"],
    outcomes: ["Exclusive Deal Ingestion", "Hardened Due Diligence Records", "Strategic Entry Positioning"],
    caseStudy: { title: "Series B Fintech Node", description: "Facilitated a $35M growth round for a high-conviction digital banking entity, now performing at top-decile tranches." },
    faq: []
  },
  "/investors/what-we-do": {
    title: "Institutional Mandate",
    subheadline: "Architecting the bridge between sophisticated capital and sovereign-grade assets.",
    overview: ["Federgreen specializes in the identification, hardening, and management of investment nodes for the world's most discerning capital allocators."],
    deliverables: ["Institutional Asset Selection", "Macro-Risk Management", "Exit Sequence Architecture"],
    methodology: ["Intelligence: Understanding specific institutional mandates.", "Selection: Identifying assets with high-fidelity alignment.", "Oversight: Ongoing monitoring of performance nodes."],
    whoItsFor: ["Strategic Institutional Partners", "Sovereign Capital Managers"],
    outcomes: ["Strategic Vision Clarity", "Execution Precision", "Alpha Preservation Tranches"],
    caseStudy: { title: "Asset Management Node", description: "Oversaw the performance lifecycle of a $500M diversified portfolio across four sovereign jurisdictions." },
    faq: []
  },
  "/investors/expertise/hnwi": {
    title: "HNWI Alpha Tranches",
    subheadline: "Bespoke high-ROI instruments with low risk-weighted exposure for private families.",
    overview: ["Assisting High-Net-Worth Individuals in identifying arbitrage-rich nodes that offer institutional safety with venture-level alpha."],
    deliverables: ["Private Alpha Access", "Asset Diversification Memos", "Tax-Efficient Capital Mapping"],
    methodology: ["Profiling: Identifying family-specific liquidity requirements.", "Arbitrage: Sourcing nodes with asymmetric risk-reward ratios.", "Entry: Executing low-friction capital deployment."],
    whoItsFor: ["Ultra-High-Net-Worth Families", "Single Family Offices"],
    outcomes: ["Preserved Generational Wealth", "Enhanced Portfolio Alpha", "Low-Vol Income Nodes"],
    caseStudy: { title: "HNWI Liquidity Node", description: "Generated a 12% risk-adjusted yield for a private family office through a art-backed lending program." },
    faq: []
  },
  "/new-world-finance": {
    title: "New World of Finance",
    subheadline: "Bridging traditional institutional capital with digital liquidity instruments.",
    overview: ["The modular node where sovereign debt, traditional equity, and digital collateral converge to create high-alpha financial instruments."],
    deliverables: ["BTC/USDT Lending Protocols", "Digital Asset Trade Programs", "Hybrid Instrument Architecture"],
    methodology: ["Bridge: Creating the legal bridge for digital ingestion.", "Collateral: Securing tranches via digital or tangible assets.", "Yield: Leveraging digital velocity for institutional return nodes."],
    whoItsFor: ["Forward-Thinking Allocators", "Digital Asset Funds"],
    outcomes: ["High-Velocity Liquidity", "Modern Asset Exposure", "Institutional-Grade Digital Alpha"],
    caseStudy: { title: "BTC-Leveraged Infra Node", description: "Utilized $20M in digital collateral to trigger a $100M infrastructure funding sequence." },
    faq: []
  },
  "/investors/expertise/early-stage": {
    title: "Early-Stage Ventures",
    subheadline: "Navigating the venture architecture of tomorrow's market leaders.",
    overview: ["We identify and harden seed and pre-seed ventures, ensuring they possess the structural integrity required for institutional-grade tranches."],
    deliverables: ["Venture Integrity Audits", "Scaling Roadmaps", "Founder Vetting Protcols"],
    methodology: ["Technical Diligence: Stress-testing the core IP.", "Market Feasibility: Validating the growth narrative.", "Structural Hardening: Preparing the entity for Series A+ ingestion."],
    whoItsFor: ["Venture Capital Syndicates", "Angel Networks", "Family Office Growth Nodes"],
    outcomes: ["Early Market Entry Alpha", "Mitigated Venture Risk", "High-Fidelity Growth Scaling"],
    caseStudy: { title: "IP Hardening Sequence", description: "Guided a deep-tech startup through IP protection and structural hardening, leading to a successful $10M seed round." },
    faq: []
  },
  "/investors/expertise/growth-stage": {
    title: "Growth-Stage Alpha",
    subheadline: "Accelerating enterprise velocity for mature scaling sequences.",
    overview: ["Focusing on entities ready for Series B/C tranches that require sophisticated scaling architecture and institutional governance."],
    deliverables: ["Expansion Strategy Blueprints", "Capital Stack Optimization", "Operational Resilience Audits"],
    methodology: ["Scaling Analysis: Identifying velocity bottlenecks.", "Market Ingestion: Roadmapping global expansion.", "Infrastructure Audit: Hardening the operational core."],
    whoItsFor: ["Growth Funds", "Corporate Strategists", "Late-Stage Private Equity"],
    outcomes: ["Market Dominance Nodes", "Unified Scaling Sequences", "Enterprise Value Appreciation"],
    caseStudy: { title: "SaaS Scaling Sequence", description: "Optimized the scaling architecture for a $200M SaaS provider expanding into Asian and Middle Eastern nodes." },
    faq: []
  },
  "/investors/expertise/established": {
    title: "Established Yield",
    subheadline: "Optimizing multi-generational enterprise tranches and legacy preservation.",
    overview: ["Advising mature firms on capital restructuring, M&A sequences, and the preservation of sovereign-grade legacies."],
    deliverables: ["Capital Restructuring Memos", "M&A Strategic Mapping", "Legacy Preservation Blueprints"],
    methodology: ["Enterprise Audit: Identifying hidden value nodes.", "Valuation Modeling: Precise asset assessment.", "Pivot Design: Architecting the next growth node."],
    whoItsFor: ["Legacy Founders", "Private Equity Groups", "Family Enterprises"],
    outcomes: ["Optimized Liquidity Nodes", "Protected Institutional Legacy", "Enhanced Operational Stability"],
    caseStudy: { title: "Manufacturing Recapitalization", description: "Restructured the $80M debt stack for a legacy manufacturer, increasing free cash flow tranches by 15%." },
    faq: []
  },
  "/investors/expertise/public": {
    title: "Public Equity Nodes",
    subheadline: "Institutional advisory for listed enterprise tranches and secondary market sequences.",
    overview: ["Advising on secondary tranches, shareholder alignment, and institutional-grade investor relations protocols for listed entities."],
    deliverables: ["Shareholder Alignment Strategy", "Public Market Sentiment Mapping", "Secondary Offering Blueprints"],
    methodology: ["Market Pulse: Analyzing institutional sentiment.", "Regulatory Check: Ensuring compliance tranches.", "Targeting: Identifying aligned public investors."],
    whoItsFor: ["Public Boards", "Listed Entities", "Institutional Shareholders"],
    outcomes: ["Enhanced Market Trust", "Stabilized Shareholder Base", "Optimized Public Valuation"],
    caseStudy: { title: "Public IR Node Hardening", description: "Redesigned the IR protocol for a NASDAQ-listed tech firm, resulting in a 25% increase in institutional ownership." },
    faq: []
  },
  "/investors/expertise/real-estate-infra": {
    title: "Infrastructure & Real Estate",
    subheadline: "Hardening tangible asset nodes through institutional-grade capital stacks.",
    overview: ["Capital advisory for class-A developments and sovereign-grade infrastructure projects requiring complex funding tranches."],
    deliverables: ["Institutional Underwriting Memos", "Project Funding Stacks", "Feasibility Node Analysis"],
    methodology: ["Asset Audit: Reviewing physical and legal nodes.", "Underwriting: Executing deep credit analysis.", "Capital Matching: Sourcing aligned institutional debt/equity."],
    whoItsFor: ["Real Estate Developers", "Infrastructure Fund Managers", "Institutional Lenders"],
    outcomes: ["Secured Project Funding", "Optimized Yield Nodes", "Enhanced Asset Longevity"],
    caseStudy: { title: "Regional Energy Grid Node", description: "Secured $300M in hybrid funding for a regional renewable energy grid, now a sovereign utility node." },
    faq: []
  },
  "/investors/private-membership": {
    title: "Private Membership",
    subheadline: "Restricted entry into the inner circle of Federgreen institutional tranches.",
    overview: ["Private membership offers first-look access to our most high-fidelity institutional nodes and direct advisory tranches."],
    deliverables: ["First-Look Deal Access", "Quarterly Executive Briefings", "Direct Senior Advisory Line"],
    methodology: ["Invitation Node: Selective onboarding process.", "KYC Clearance: Rigorous compliance vetting.", "Integration: Seamless entry into the private deal network."],
    whoItsFor: ["Elite Family Offices", "Ultra-High-Net-Worth Individuals", "Institutional Partners"],
    outcomes: ["Absolute Alpha Access", "Enhanced Privacy Protocols", "Institutional Peer Networking"],
    caseStudy: { title: "Restricted Alpha Sequence", description: "Exclusive placement of a $50M art-backed liquidity node with 5 private members within 48 hours." },
    faq: []
  },
  "/investors/understanding-investors": {
    title: "Intelligence & Sentiment",
    subheadline: "Mapping the psychological tranches and requirements of global institutional capital.",
    overview: ["Deep insights into the shifting requirements and decision-making nodes of world-class capital allocators."],
    deliverables: ["Investor Sentiment Mapping", "Capital Requirement Reports", "Risk Tolerance Tranche Analysis"],
    methodology: ["Data Tracking: Analyzing global capital flows.", "Network Intelligence: Leveraging direct advisory feedback.", "Synthesis: Creating actionable market intelligence."],
    whoItsFor: ["Enterprise Founders", "Board Members", "Strategic Planners"],
    outcomes: ["Improved Capital Access", "Unified Strategic Language", "Enhanced Negotiation Position"],
    caseStudy: { title: "Sentiment Shift Analysis", description: "Identified a macro-shift in PE risk tolerance 6 months before market movement, protecting 10 client tranches." },
    faq: []
  },
  "/investors/clients": {
    title: "Institutional Track Record",
    subheadline: "A legacy of trust established across global capital nodes.",
    overview: ["Showcasing the tranches of institutional success facilitated by the Federgreen senior advisory desk."],
    deliverables: ["Sanitized Case Histories", "Verified Performance Audits", "Institutional References"],
    methodology: ["Audit: Periodic review of past node performance.", "Sanitization: Protecting client identity and proprietary tranches.", "Archival: Maintaining the historical record of success."],
    whoItsFor: ["Prospective Institutional Partners", "Vetting Committees"],
    outcomes: ["Verified Trust Tranches", "Demonstrated Node Success", "Long-Term Performance Records"],
    caseStudy: { title: "Legacy Performance Audit", description: "Demonstrated a consistent historical alpha of 400bps above market benchmarks for managed tranches." },
    faq: []
  },
  "/investors/disclaimer": {
    title: "Institutional Disclaimer",
    subheadline: "Risk tranches, jurisdictional boundaries, and regulatory hygiene for the Investors Hub.",
    overview: [
      "Investment in private tranches involves significant risk. This node provides critical disclosures regarding the nature of our advisory services.",
      "Federgreen Consulting Group acts as a strategic advisor and structural architect; we do not operate as a registered broker-dealer in all jurisdictions."
    ],
    deliverables: ["Risk Tranche Disclosures", "Jurisdictional Restrictions", "Advisory Scope Boundaries"],
    methodology: ["Compliance Review: Continuous audit of disclosure nodes.", "Updating: Reflecting the shifting global regulatory landscape.", "Transparency: Maintaining clear operational boundaries."],
    whoItsFor: ["All Prospective Investors", "Compliance Officers"],
    outcomes: ["Absolute Legal Clarity", "Hardened Regulatory Node", "Transparent Risk Awareness"],
    caseStudy: { title: "Global Compliance Sequence", description: "Implemented a cross-jurisdictional disclosure framework covering 12 major financial nodes." },
    faq: []
  }
};
