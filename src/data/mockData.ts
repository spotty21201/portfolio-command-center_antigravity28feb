export type Sector = 'Resources' | 'Manufacturing' | 'FMCG' | 'Logistics' | 'Real Estate' | 'Financial Services' | 'Telecom/Tech' | 'Healthcare';
export type Region = 'DKI Jakarta' | 'West Java' | 'East Java' | 'Central Java' | 'Banten' | 'Sumatra' | 'Kalimantan' | 'Sulawesi' | 'International';
export type Status = 'Normal' | 'Watch' | 'Intervention';

export interface Initiative {
  id: string;
  title: string;
  status: 'Not Started' | 'In Progress' | 'Delayed' | 'Completed';
  health: 'Green' | 'Amber' | 'Red';
  budgetBurn: number; // percentage
  nextMilestone: string;
  keyRisks: string[];
  decisionRequired: boolean;
  owner: string;
  dueDate: string;
}

export interface Risk {
  id: string;
  title: string;
  category: 'Financial' | 'Operational' | 'Compliance' | 'Strategic';
  likelihood: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  owner: string;
  status: 'Open' | 'Mitigated' | 'Closed';
}

export interface Company {
  id: string;
  name: string;
  sector: Sector;
  region: Region;
  ownershipPercent: number;
  reportingCurrency: 'IDR' | 'USD';
  status: Status;
  owner: string;
  
  // Financials (in Billions IDR for simplicity, we'll convert to USD if toggled)
  revenueYTD: number;
  revenueBudget: number;
  revenueLY: number;
  
  ebitdaYTD: number;
  ebitdaBudget: number;
  ebitdaLY: number;
  
  netProfitYTD: number;
  cash: number;
  netDebt: number;
  capex: number;
  workingCapitalDays: number;
  headcount: number;
  
  // Operational KPIs
  onTimeDelivery: number; // percentage
  safetyIncidents: number;
  complianceScore: number; // 0-100
  overallHealth: 'Green' | 'Amber' | 'Red';
  
  initiatives: Initiative[];
  risks: Risk[];
  
  lastUpdated: string;
  dataSource: string;
}

const today = new Date();

export const mockCompanies: Company[] = [
  {
    id: 'c1',
    name: 'Nusantara Energy',
    sector: 'Resources',
    region: 'Kalimantan',
    ownershipPercent: 65,
    reportingCurrency: 'USD',
    status: 'Watch',
    owner: 'Budi S.',
    revenueYTD: 12500,
    revenueBudget: 13000,
    revenueLY: 11000,
    ebitdaYTD: 3200,
    ebitdaBudget: 3500,
    ebitdaLY: 2800,
    netProfitYTD: 1500,
    cash: 800,
    netDebt: 4500,
    capex: 1200,
    workingCapitalDays: 45,
    headcount: 4500,
    onTimeDelivery: 92,
    safetyIncidents: 3,
    complianceScore: 85,
    overallHealth: 'Amber',
    initiatives: [
      { id: 'i1', title: 'Mine Automation Phase 1', status: 'In Progress', health: 'Amber', budgetBurn: 65, nextMilestone: 'Fleet Deployment', keyRisks: ['Supply chain delays'], decisionRequired: true, owner: 'Andi M.', dueDate: '2026-04-15' }
    ],
    risks: [
      { id: 'r1', title: 'Coal Price Volatility', category: 'Financial', likelihood: 'High', impact: 'High', owner: 'CFO', status: 'Open' },
      { id: 'r2', title: 'Environmental Permit Renewal', category: 'Compliance', likelihood: 'Medium', impact: 'High', owner: 'Legal', status: 'Open' }
    ],
    lastUpdated: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    dataSource: 'SAP ERP'
  },
  {
    id: 'c2',
    name: 'IndoAgri Foods',
    sector: 'FMCG',
    region: 'West Java',
    ownershipPercent: 100,
    reportingCurrency: 'IDR',
    status: 'Normal',
    owner: 'Siti W.',
    revenueYTD: 8500,
    revenueBudget: 8200,
    revenueLY: 7800,
    ebitdaYTD: 1400,
    ebitdaBudget: 1350,
    ebitdaLY: 1200,
    netProfitYTD: 800,
    cash: 1200,
    netDebt: 1500,
    capex: 300,
    workingCapitalDays: 25,
    headcount: 8200,
    onTimeDelivery: 98,
    safetyIncidents: 0,
    complianceScore: 95,
    overallHealth: 'Green',
    initiatives: [
      { id: 'i2', title: 'New Plant Construction', status: 'In Progress', health: 'Green', budgetBurn: 40, nextMilestone: 'Roofing Complete', keyRisks: ['Weather delays'], decisionRequired: false, owner: 'Rudi H.', dueDate: '2026-08-01' }
    ],
    risks: [
      { id: 'r3', title: 'Raw Material Inflation', category: 'Operational', likelihood: 'High', impact: 'Medium', owner: 'Procurement', status: 'Mitigated' }
    ],
    lastUpdated: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    dataSource: 'Oracle NetSuite'
  },
  {
    id: 'c3',
    name: 'TransLogistik ID',
    sector: 'Logistics',
    region: 'DKI Jakarta',
    ownershipPercent: 80,
    reportingCurrency: 'IDR',
    status: 'Intervention',
    owner: 'Hendra T.',
    revenueYTD: 4200,
    revenueBudget: 5000,
    revenueLY: 4800,
    ebitdaYTD: 350,
    ebitdaBudget: 600,
    ebitdaLY: 550,
    netProfitYTD: -50,
    cash: 150,
    netDebt: 2800,
    capex: 150,
    workingCapitalDays: 65,
    headcount: 3100,
    onTimeDelivery: 82,
    safetyIncidents: 5,
    complianceScore: 72,
    overallHealth: 'Red',
    initiatives: [
      { id: 'i3', title: 'Fleet Optimization', status: 'Delayed', health: 'Red', budgetBurn: 90, nextMilestone: 'Route AI Integration', keyRisks: ['Vendor underperformance', 'Budget overrun'], decisionRequired: true, owner: 'Hendra T.', dueDate: '2026-03-01' }
    ],
    risks: [
      { id: 'r4', title: 'Fuel Price Hike', category: 'Financial', likelihood: 'High', impact: 'High', owner: 'CFO', status: 'Open' },
      { id: 'r5', title: 'Driver Strike', category: 'Operational', likelihood: 'Medium', impact: 'High', owner: 'HR', status: 'Open' }
    ],
    lastUpdated: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(), // Stale data alert
    dataSource: 'Custom TMS'
  },
  {
    id: 'c4',
    name: 'Mega Property Group',
    sector: 'Real Estate',
    region: 'DKI Jakarta',
    ownershipPercent: 55,
    reportingCurrency: 'IDR',
    status: 'Normal',
    owner: 'Diana R.',
    revenueYTD: 6800,
    revenueBudget: 6500,
    revenueLY: 6200,
    ebitdaYTD: 2100,
    ebitdaBudget: 2000,
    ebitdaLY: 1900,
    netProfitYTD: 1200,
    cash: 2500,
    netDebt: 8500,
    capex: 4500,
    workingCapitalDays: 120,
    headcount: 1500,
    onTimeDelivery: 95,
    safetyIncidents: 1,
    complianceScore: 90,
    overallHealth: 'Green',
    initiatives: [
      { id: 'i4', title: 'CBD Tower 3 Launch', status: 'In Progress', health: 'Green', budgetBurn: 20, nextMilestone: 'Pre-sales opening', keyRisks: [], decisionRequired: false, owner: 'Diana R.', dueDate: '2026-06-15' }
    ],
    risks: [
      { id: 'r6', title: 'Interest Rate Hike', category: 'Financial', likelihood: 'High', impact: 'High', owner: 'Treasury', status: 'Open' }
    ],
    lastUpdated: new Date(today.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    dataSource: 'Yardi'
  },
  {
    id: 'c5',
    name: 'FinBank Nusantara',
    sector: 'Financial Services',
    region: 'DKI Jakarta',
    ownershipPercent: 40,
    reportingCurrency: 'IDR',
    status: 'Normal',
    owner: 'Tito S.',
    revenueYTD: 15500,
    revenueBudget: 15000,
    revenueLY: 14200,
    ebitdaYTD: 6500,
    ebitdaBudget: 6200,
    ebitdaLY: 5800,
    netProfitYTD: 4200,
    cash: 15000,
    netDebt: 0,
    capex: 800,
    workingCapitalDays: 0,
    headcount: 12000,
    onTimeDelivery: 99,
    safetyIncidents: 0,
    complianceScore: 98,
    overallHealth: 'Green',
    initiatives: [
      { id: 'i5', title: 'Digital Banking App v3', status: 'In Progress', health: 'Amber', budgetBurn: 75, nextMilestone: 'UAT Sign-off', keyRisks: ['Security audit findings'], decisionRequired: false, owner: 'CTO', dueDate: '2026-05-01' }
    ],
    risks: [
      { id: 'r7', title: 'Cybersecurity Breach', category: 'Operational', likelihood: 'Medium', impact: 'High', owner: 'CISO', status: 'Open' },
      { id: 'r8', title: 'NPL Increase', category: 'Financial', likelihood: 'Medium', impact: 'High', owner: 'CRO', status: 'Mitigated' }
    ],
    lastUpdated: new Date(today.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    dataSource: 'Core Banking'
  },
  {
    id: 'c6',
    name: 'TelcoNet',
    sector: 'Telecom/Tech',
    region: 'International',
    ownershipPercent: 100,
    reportingCurrency: 'USD',
    status: 'Watch',
    owner: 'Kevin W.',
    revenueYTD: 9200,
    revenueBudget: 9500,
    revenueLY: 8900,
    ebitdaYTD: 4100,
    ebitdaBudget: 4500,
    ebitdaLY: 4000,
    netProfitYTD: 1800,
    cash: 3200,
    netDebt: 12000,
    capex: 5500,
    workingCapitalDays: 35,
    headcount: 6500,
    onTimeDelivery: 96,
    safetyIncidents: 0,
    complianceScore: 88,
    overallHealth: 'Amber',
    initiatives: [
      { id: 'i6', title: '5G Rollout Phase 2', status: 'In Progress', health: 'Amber', budgetBurn: 55, nextMilestone: '1000 Sites Active', keyRisks: ['Equipment import delays'], decisionRequired: true, owner: 'Kevin W.', dueDate: '2026-07-30' }
    ],
    risks: [
      { id: 'r9', title: 'Regulatory Spectrum Fee', category: 'Compliance', likelihood: 'High', impact: 'Medium', owner: 'GovRel', status: 'Open' }
    ],
    lastUpdated: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    dataSource: 'SAP ERP'
  },
  {
    id: 'c7',
    name: 'SehatCare Hospitals',
    sector: 'Healthcare',
    region: 'East Java',
    ownershipPercent: 90,
    reportingCurrency: 'IDR',
    status: 'Normal',
    owner: 'Dr. Anita',
    revenueYTD: 3800,
    revenueBudget: 3600,
    revenueLY: 3200,
    ebitdaYTD: 850,
    ebitdaBudget: 800,
    ebitdaLY: 700,
    netProfitYTD: 450,
    cash: 600,
    netDebt: 1200,
    capex: 400,
    workingCapitalDays: 40,
    headcount: 4200,
    onTimeDelivery: 98,
    safetyIncidents: 1,
    complianceScore: 96,
    overallHealth: 'Green',
    initiatives: [
      { id: 'i7', title: 'New Wing Surabaya', status: 'Completed', health: 'Green', budgetBurn: 98, nextMilestone: 'Grand Opening', keyRisks: [], decisionRequired: false, owner: 'Dr. Anita', dueDate: '2026-02-20' }
    ],
    risks: [
      { id: 'r10', title: 'Medical Malpractice Claim', category: 'Operational', likelihood: 'Low', impact: 'High', owner: 'Legal', status: 'Mitigated' }
    ],
    lastUpdated: new Date(today.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    dataSource: 'HIS'
  },
  {
    id: 'c8',
    name: 'Pabrik Baja Sentosa',
    sector: 'Manufacturing',
    region: 'Banten',
    ownershipPercent: 100,
    reportingCurrency: 'IDR',
    status: 'Intervention',
    owner: 'Joko P.',
    revenueYTD: 5400,
    revenueBudget: 6200,
    revenueLY: 6000,
    ebitdaYTD: 420,
    ebitdaBudget: 850,
    ebitdaLY: 800,
    netProfitYTD: -120,
    cash: 80, // Cash alert
    netDebt: 3500,
    capex: 200,
    workingCapitalDays: 85,
    headcount: 2800,
    onTimeDelivery: 75,
    safetyIncidents: 8,
    complianceScore: 65,
    overallHealth: 'Red',
    initiatives: [
      { id: 'i8', title: 'Furnace Upgrade', status: 'Delayed', health: 'Red', budgetBurn: 110, nextMilestone: 'Testing', keyRisks: ['Contractor dispute'], decisionRequired: true, owner: 'Joko P.', dueDate: '2026-01-15' }
    ],
    risks: [
      { id: 'r11', title: 'Scrap Metal Shortage', category: 'Operational', likelihood: 'High', impact: 'High', owner: 'Procurement', status: 'Open' },
      { id: 'r12', title: 'Environmental Fine', category: 'Compliance', likelihood: 'High', impact: 'Medium', owner: 'HSE', status: 'Open' }
    ],
    lastUpdated: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    dataSource: 'SAP ERP'
  },
  {
    id: 'c9',
    name: 'Agro Makmur',
    sector: 'FMCG',
    region: 'Sumatra',
    ownershipPercent: 75,
    reportingCurrency: 'IDR',
    status: 'Normal',
    owner: 'Lina K.',
    revenueYTD: 7200,
    revenueBudget: 7000,
    revenueLY: 6800,
    ebitdaYTD: 1600,
    ebitdaBudget: 1500,
    ebitdaLY: 1450,
    netProfitYTD: 900,
    cash: 1100,
    netDebt: 2200,
    capex: 450,
    workingCapitalDays: 30,
    headcount: 15000,
    onTimeDelivery: 94,
    safetyIncidents: 2,
    complianceScore: 92,
    overallHealth: 'Green',
    initiatives: [
      { id: 'i9', title: 'Sustainable Sourcing Cert', status: 'In Progress', health: 'Green', budgetBurn: 50, nextMilestone: 'Audit Phase 1', keyRisks: [], decisionRequired: false, owner: 'Lina K.', dueDate: '2026-09-01' }
    ],
    risks: [
      { id: 'r13', title: 'Weather Anomalies (El Nino)', category: 'Operational', likelihood: 'Medium', impact: 'High', owner: 'Operations', status: 'Open' }
    ],
    lastUpdated: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    dataSource: 'Oracle NetSuite'
  },
  {
    id: 'c10',
    name: 'IndoTech Solutions',
    sector: 'Telecom/Tech',
    region: 'DKI Jakarta',
    ownershipPercent: 60,
    reportingCurrency: 'IDR',
    status: 'Watch',
    owner: 'Ferry A.',
    revenueYTD: 2800,
    revenueBudget: 3200,
    revenueLY: 2500,
    ebitdaYTD: 450,
    ebitdaBudget: 600,
    ebitdaLY: 380,
    netProfitYTD: 200,
    cash: 400,
    netDebt: 800,
    capex: 150,
    workingCapitalDays: 55,
    headcount: 850,
    onTimeDelivery: 88,
    safetyIncidents: 0,
    complianceScore: 85,
    overallHealth: 'Amber',
    initiatives: [
      { id: 'i10', title: 'Cloud Migration Services Launch', status: 'In Progress', health: 'Amber', budgetBurn: 80, nextMilestone: 'Go-Live', keyRisks: ['Talent shortage'], decisionRequired: false, owner: 'Ferry A.', dueDate: '2026-04-01' }
    ],
    risks: [
      { id: 'r14', title: 'Key Talent Attrition', category: 'Operational', likelihood: 'High', impact: 'Medium', owner: 'HR', status: 'Open' }
    ],
    lastUpdated: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    dataSource: 'Workday'
  }
];
