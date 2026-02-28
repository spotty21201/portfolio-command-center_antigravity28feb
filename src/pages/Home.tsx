import { useAppStore } from '../store/appStore';
import { mockCompanies } from '../data/mockData';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  ChevronRight,
  Activity,
  UserCircle,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const monthlyData = [
  { name: 'Jan', revenue: 4000, ebitda: 2400 },
  { name: 'Feb', revenue: 3000, ebitda: 1398 },
  { name: 'Mar', revenue: 2000, ebitda: 9800 },
  { name: 'Apr', revenue: 2780, ebitda: 3908 },
  { name: 'May', revenue: 1890, ebitda: 4800 },
  { name: 'Jun', revenue: 2390, ebitda: 3800 },
  { name: 'Jul', revenue: 3490, ebitda: 4300 },
];

const sectorData = [
  { name: 'Resources', value: 35 },
  { name: 'FMCG', value: 25 },
  { name: 'FinServ', value: 20 },
  { name: 'Real Estate', value: 10 },
  { name: 'Telecom', value: 10 },
];

// Institutional, monochromatic palette for charts
const COLORS = ['#1e293b', '#334155', '#475569', '#64748b', '#94a3b8'];

export function Home() {
  const { currency } = useAppStore();

  // Aggregate KPIs
  const totalRevenue = mockCompanies.reduce((acc, c) => acc + c.revenueYTD, 0);
  const totalEbitda = mockCompanies.reduce((acc, c) => acc + c.ebitdaYTD, 0);
  const totalNetProfit = mockCompanies.reduce((acc, c) => acc + c.netProfitYTD, 0);
  const totalCash = mockCompanies.reduce((acc, c) => acc + c.cash, 0);
  const totalNetDebt = mockCompanies.reduce((acc, c) => acc + c.netDebt, 0);
  const totalCapex = mockCompanies.reduce((acc, c) => acc + c.capex, 0);
  const avgWorkingCapital = Math.round(mockCompanies.reduce((acc, c) => acc + c.workingCapitalDays, 0) / mockCompanies.length);
  const totalHeadcount = mockCompanies.reduce((acc, c) => acc + c.headcount, 0);

  const kpis = [
    { label: 'Revenue YTD', value: formatCurrency(totalRevenue, currency), trend: '+5.2%', isPositive: true },
    { label: 'EBITDA YTD', value: formatCurrency(totalEbitda, currency), trend: '+2.1%', isPositive: true },
    { label: 'Net Profit', value: formatCurrency(totalNetProfit, currency), trend: '-1.5%', isPositive: false },
    { label: 'Cash Position', value: formatCurrency(totalCash, currency), trend: '+12%', isPositive: true },
    { label: 'Net Debt', value: formatCurrency(totalNetDebt, currency), trend: '+8.4%', isPositive: false },
    { label: 'Capex Burn', value: formatCurrency(totalCapex, currency), trend: '-4.2%', isPositive: true },
    { label: 'WC Days', value: `${avgWorkingCapital}d`, trend: '+2d', isPositive: false },
    { label: 'Headcount', value: formatNumber(totalHeadcount), trend: '+1.2%', isPositive: true },
  ];

  const alerts = [
    { id: 1, type: 'Red', title: 'Critical Cash Burn', desc: 'Pabrik Baja Sentosa cash days < 30', owner: 'Joko P.', due: 'Immediate' },
    { id: 2, type: 'Red', title: 'Covenant Breach Warning', desc: 'TransLogistik ID net debt/EBITDA > 4.5x', owner: 'Hendra T.', due: '2 Days' },
    { id: 3, type: 'Amber', title: 'Margin Deterioration', desc: 'IndoTech Solutions EBITDA margin down 5% vs budget', owner: 'Ferry A.', due: '1 Week' },
    { id: 4, type: 'Amber', title: 'Data SLA Violation', desc: 'TransLogistik ID financial reporting > 7 days stale', owner: 'System', due: 'Overdue' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Group Overview</h1>
          <p className="text-sm font-medium text-slate-500 mt-2 tracking-wide uppercase">Portfolio Command Center • YTD 2026</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4 mr-2 text-slate-400" />
            PDF Brief
          </button>
          <button className="px-5 py-2 bg-[#0F172A] text-white rounded-md text-sm font-semibold hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10">
            Create Intervention
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col relative overflow-hidden group">
            {/* Soft subtle gradient matching executive feel */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent group-hover:via-amber-200 transition-all" />
            
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 truncate" title={kpi.label}>{kpi.label}</span>
            <span className="text-2xl font-bold text-slate-800 tabular-nums tracking-tight mb-3">{kpi.value}</span>
            <div className="mt-auto flex items-center text-xs font-semibold">
              {kpi.isPositive ? (
                <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 mr-1.5 text-red-600" />
              )}
              <span className={kpi.isPositive ? "text-emerald-700" : "text-red-700"}>
                {kpi.trend} vs Plan
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Attention Panel */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wide uppercase text-slate-900 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
              Requires Attention
            </h2>
            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">{alerts.length} Active</span>
          </div>
          <div className="p-0 flex-1 overflow-y-auto">
            <ul className="divide-y divide-slate-50">
              {alerts.map((alert) => (
                <li key={alert.id} className={cn(
                  "p-5 transition-all cursor-pointer group border-l-4",
                  alert.type === 'Red' 
                    ? "border-red-500 bg-red-50/30 hover:bg-red-50/80" 
                    : "border-amber-400 bg-amber-50/20 hover:bg-amber-50/60"
                )}>
                  <div className="flex items-start">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors uppercase tracking-wide">{alert.title}</p>
                      <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{alert.desc}</p>
                      <div className="flex items-center mt-3 text-xs text-slate-500 font-semibold">
                        <span className="flex items-center mr-4 bg-white px-2 py-1 rounded border border-slate-200/60 shadow-sm">
                          <UserCircle className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> 
                          {alert.owner}
                        </span>
                        <span className="flex items-center text-red-600">
                          <Clock className="w-3.5 h-3.5 mr-1.5" /> 
                          Due: {alert.due}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0 mt-0.5" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
            <button className="text-xs font-bold tracking-widest uppercase text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center w-full">
              View Escalation Queue <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Portfolio Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wide uppercase text-slate-900 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-slate-500" />
              Portfolio Performance
            </h2>
            <div className="flex items-center space-x-2">
              <select className="text-xs font-semibold border-slate-200 bg-slate-50 rounded-md text-slate-700 py-1.5 pl-3 pr-8 focus:ring-0 focus:border-slate-300 cursor-pointer shadow-sm">
                <option>Revenue vs Budget</option>
                <option>EBITDA vs Budget</option>
              </select>
            </div>
          </div>
          <div className="p-6 flex-1 min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 600 }}
                  itemStyle={{ fontSize: '13px', paddingTop: '4px' }}
                  labelStyle={{ fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}
                />
                <Line type="monotone" dataKey="revenue" name="Actual" stroke="#0F172A" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#0F172A' }} />
                <Line type="monotone" dataKey="ebitda" name="Plan" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Mix */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold tracking-wide uppercase text-slate-900">Revenue Mix by Sector</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center min-h-[250px]">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={sectorData} layout="vertical" margin={{ top: 5, right: 30, left: 25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} width={80} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontWeight: 600 }} />
                <Bar dataKey="value" name="% of Total" radius={[0, 4, 4, 0]} barSize={20}>
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heatmap Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wide uppercase text-slate-900">Portfolio Health Matrix</h2>
            <Link to="/portfolio" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors">
              Full Matrix &rarr;
            </Link>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80">
                  <th className="py-3 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest sticky left-0 bg-slate-50/80 z-10 backdrop-blur-sm">Entity</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Growth</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Margin</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Cash</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Safety</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Delivery</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockCompanies.slice(0, 5).map((company) => (
                  <tr key={company.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 sticky left-0 bg-white group-hover:bg-slate-50 transition-colors">
                      <div className="text-sm font-bold text-slate-900 truncate max-w-[180px]">{company.name}</div>
                      <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-1">{company.sector}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <StatusBadge 
                        value={`${Math.round((company.revenueYTD / company.revenueBudget) * 100)}%`} 
                        status={company.revenueYTD > company.revenueBudget ? 'good' : 'warning'} 
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <StatusBadge 
                        value={`${Math.round((company.ebitdaYTD / company.revenueYTD) * 100)}%`} 
                        status={company.ebitdaYTD > company.ebitdaBudget ? 'good' : (company.ebitdaYTD < company.ebitdaBudget * 0.8 ? 'danger' : 'warning')} 
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <StatusBadge 
                        value={company.cash > 1000 ? 'High' : (company.cash < 200 ? 'Low' : 'Med')} 
                        status={company.cash > 1000 ? 'good' : (company.cash < 200 ? 'danger' : 'warning')} 
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <StatusBadge 
                        value={`${company.safetyIncidents}`} 
                        status={company.safetyIncidents === 0 ? 'good' : (company.safetyIncidents > 3 ? 'danger' : 'warning')} 
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <StatusBadge 
                        value={`${company.onTimeDelivery}%`} 
                        status={company.onTimeDelivery >= 95 ? 'good' : (company.onTimeDelivery < 85 ? 'danger' : 'warning')} 
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <StatusBadge 
                        value={`${company.complianceScore}`} 
                        status={company.complianceScore >= 90 ? 'good' : (company.complianceScore < 75 ? 'danger' : 'warning')} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for institutional heatmap badges
function StatusBadge({ value, status }: { value: string | number, status: 'good' | 'warning' | 'danger' }) {
  const styles = {
    good: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-red-50 text-red-700 border-red-200"
  };

  const dots = {
    good: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-red-500"
  };

  return (
    <div className={cn("inline-flex items-center justify-center px-2.5 py-1 rounded border shadow-sm text-xs font-bold tabular-nums min-w-[50px]", styles[status])}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", dots[status])} />
      {value}
    </div>
  );
}
