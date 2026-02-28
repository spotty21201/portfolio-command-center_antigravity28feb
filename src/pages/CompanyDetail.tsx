import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockCompanies } from '../data/mockData';
import { formatCurrency, formatNumber, formatPercent } from '../utils/formatters';
import { useAppStore } from '../store/appStore';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  User, 
  Clock, 
  MessageSquarePlus,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const tabs = ['Performance', 'Cash & Capital', 'Operations', 'Risk & Compliance', 'Initiatives', 'People'];

export function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const { currency } = useAppStore();
  const [activeTab, setActiveTab] = useState('Performance');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const company = mockCompanies.find(c => c.id === id);

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <Building2 className="w-12 h-12 mb-4 text-slate-300" />
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Company Not Found</h2>
        <p className="mb-6">The company you are looking for does not exist or you don't have access.</p>
        <Link to="/portfolio" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  const ebitdaMargin = (company.ebitdaYTD / company.revenueYTD) * 100;
  const ebitdaMarginBudget = (company.ebitdaBudget / company.revenueBudget) * 100;
  const marginDiff = ebitdaMargin - ebitdaMarginBudget;

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <Link to="/portfolio" className="mr-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center mb-1">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mr-3">{company.name}</h1>
                <span className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  company.status === 'Normal' ? "bg-emerald-100 text-emerald-800" : 
                  company.status === 'Watch' ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                )}>
                  {company.status}
                </span>
              </div>
              <div className="flex items-center text-sm text-slate-500 space-x-4 mt-2">
                <span className="flex items-center"><Building2 className="w-4 h-4 mr-1.5" /> {company.sector}</span>
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> {company.region}</span>
                <span className="flex items-center"><User className="w-4 h-4 mr-1.5" /> {company.owner}</span>
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> Updated: {new Date(company.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center"
            >
              <MessageSquarePlus className="w-4 h-4 mr-2" />
              Ask / Decision Request
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 shrink-0">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === tab
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto pb-6">
        {activeTab === 'Performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Revenue Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Revenue YTD</h3>
                <div className="flex items-end justify-between mb-4">
                  <span className="text-3xl font-bold text-slate-900">{formatCurrency(company.revenueYTD, currency)}</span>
                  <div className={cn("flex items-center text-sm font-medium", company.revenueYTD >= company.revenueBudget ? "text-emerald-600" : "text-red-600")}>
                    {company.revenueYTD >= company.revenueBudget ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {Math.abs(Math.round((company.revenueYTD / company.revenueBudget - 1) * 100))}% vs Budget
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                  <div className={cn("h-2 rounded-full transition-all", company.revenueYTD >= company.revenueBudget ? "bg-emerald-500" : "bg-amber-500")} style={{ width: `${Math.min((company.revenueYTD / company.revenueBudget) * 100, 100)}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Target: {formatCurrency(company.revenueBudget, currency)}</span>
                  <span>LY: {formatCurrency(company.revenueLY, currency)}</span>
                </div>
              </div>

              {/* EBITDA Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">EBITDA YTD</h3>
                <div className="flex items-end justify-between mb-4">
                  <span className="text-3xl font-bold text-slate-900">{formatCurrency(company.ebitdaYTD, currency)}</span>
                  <div className={cn("flex items-center text-sm font-medium", company.ebitdaYTD >= company.ebitdaBudget ? "text-emerald-600" : "text-red-600")}>
                    {company.ebitdaYTD >= company.ebitdaBudget ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {Math.abs(Math.round((company.ebitdaYTD / company.ebitdaBudget - 1) * 100))}% vs Budget
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                  <div className={cn("h-2 rounded-full transition-all", company.ebitdaYTD >= company.ebitdaBudget ? "bg-emerald-500" : "bg-amber-500")} style={{ width: `${Math.min((company.ebitdaYTD / company.ebitdaBudget) * 100, 100)}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Target: {formatCurrency(company.ebitdaBudget, currency)}</span>
                  <span>Margin: {formatPercent(ebitdaMargin)} ({marginDiff > 0 ? '+' : ''}{marginDiff.toFixed(1)}% vs Bgt)</span>
                </div>
              </div>

              {/* Net Profit Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Net Profit YTD</h3>
                <div className="flex items-end justify-between mb-4">
                  <span className={cn("text-3xl font-bold", company.netProfitYTD >= 0 ? "text-slate-900" : "text-red-600")}>
                    {formatCurrency(company.netProfitYTD, currency)}
                  </span>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 font-medium">Forecast Confidence</span>
                    <span className="text-sm font-bold text-emerald-600">High (85%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Drivers & Variance */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-base font-semibold text-slate-900">EBITDA Variance Drivers (vs Budget)</h3>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex-1 text-center">
                    <div className="text-sm font-medium text-slate-500 mb-2">Volume</div>
                    <div className="text-lg font-bold text-emerald-600">+ {formatCurrency(company.ebitdaBudget * 0.05, currency)}</div>
                  </div>
                  <div className="text-slate-300 font-light text-2xl">+</div>
                  <div className="flex-1 text-center">
                    <div className="text-sm font-medium text-slate-500 mb-2">Price</div>
                    <div className="text-lg font-bold text-emerald-600">+ {formatCurrency(company.ebitdaBudget * 0.02, currency)}</div>
                  </div>
                  <div className="text-slate-300 font-light text-2xl">-</div>
                  <div className="flex-1 text-center">
                    <div className="text-sm font-medium text-slate-500 mb-2">Cost</div>
                    <div className="text-lg font-bold text-red-600">- {formatCurrency(company.ebitdaBudget * 0.08, currency)}</div>
                  </div>
                  <div className="text-slate-300 font-light text-2xl">+/-</div>
                  <div className="flex-1 text-center">
                    <div className="text-sm font-medium text-slate-500 mb-2">FX Impact</div>
                    <div className="text-lg font-bold text-amber-600">- {formatCurrency(company.ebitdaBudget * 0.01, currency)}</div>
                  </div>
                  <div className="text-slate-300 font-light text-2xl">=</div>
                  <div className="flex-1 text-center bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <div className="text-sm font-medium text-slate-500 mb-1">Total Variance</div>
                    <div className={cn("text-xl font-bold", company.ebitdaYTD >= company.ebitdaBudget ? "text-emerald-600" : "text-red-600")}>
                      {company.ebitdaYTD >= company.ebitdaBudget ? '+' : ''}{formatCurrency(company.ebitdaYTD - company.ebitdaBudget, currency)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Risk & Compliance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="text-base font-semibold text-slate-900">Top Risks</h3>
                  <span className="text-xs font-medium bg-slate-200 text-slate-700 px-2 py-1 rounded-full">{company.risks.length} Active</span>
                </div>
                <div className="p-0">
                  <table className="min-w-full divide-y divide-slate-200 text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Title</th>
                        <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                        <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Impact / Likelihood</th>
                        <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {company.risks.map(risk => (
                        <tr key={risk.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-4">
                            <div className="text-sm font-semibold text-slate-900">{risk.title}</div>
                            <div className="text-xs text-slate-500 mt-0.5">Owner: {risk.owner}</div>
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-600">{risk.category}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center space-x-2">
                              <span className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider", risk.impact === 'High' ? "bg-red-100 text-red-800" : risk.impact === 'Medium' ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800")}>
                                I: {risk.impact}
                              </span>
                              <span className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider", risk.likelihood === 'High' ? "bg-red-100 text-red-800" : risk.likelihood === 'Medium' ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800")}>
                                L: {risk.likelihood}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", risk.status === 'Open' ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800")}>
                              {risk.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {company.risks.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-500">No active risks registered.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Compliance Score</h3>
                  <div className="flex items-center justify-center mb-2">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={cn(company.complianceScore >= 90 ? "text-emerald-500" : company.complianceScore >= 75 ? "text-amber-500" : "text-red-500")}
                          strokeDasharray={`${company.complianceScore}, 100`}
                          strokeWidth="3"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-slate-900">{company.complianceScore}</span>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">/ 100</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-slate-600 mt-4">
                    {company.complianceScore >= 90 ? "Excellent standing. No major findings." : 
                     company.complianceScore >= 75 ? "Minor findings in recent audit. Remediation in progress." : 
                     "Critical compliance issues detected. Immediate action required."}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Safety Incidents YTD</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold text-slate-900">{company.safetyIncidents}</span>
                    {company.safetyIncidents === 0 ? (
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="w-10 h-10 text-amber-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Initiatives' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {company.initiatives.map(init => (
                <div key={init.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className={cn("h-2 w-full", init.health === 'Green' ? "bg-emerald-500" : init.health === 'Amber' ? "bg-amber-500" : "bg-red-500")} />
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">{init.title}</h3>
                      <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", 
                        init.status === 'Completed' ? "bg-emerald-100 text-emerald-800" : 
                        init.status === 'In Progress' ? "bg-blue-100 text-blue-800" : 
                        init.status === 'Delayed' ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-800"
                      )}>
                        {init.status}
                      </span>
                    </div>
                    
                    <div className="mt-4 space-y-3 flex-1">
                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-500 mb-1">
                          <span>Budget Burn</span>
                          <span>{init.budgetBurn}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className={cn("h-1.5 rounded-full", init.budgetBurn > 100 ? "bg-red-500" : "bg-indigo-500")} style={{ width: `${Math.min(init.budgetBurn, 100)}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-slate-100">
                        <div className="text-xs text-slate-500 font-medium mb-1">Next Milestone</div>
                        <div className="text-sm font-semibold text-slate-900">{init.nextMilestone}</div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center"><Clock className="w-3 h-3 mr-1" /> {init.dueDate}</div>
                      </div>

                      {init.keyRisks.length > 0 && (
                        <div className="pt-3 border-t border-slate-100">
                          <div className="text-xs text-slate-500 font-medium mb-1">Key Risks</div>
                          <ul className="list-disc list-inside text-sm text-slate-700">
                            {init.keyRisks.map((risk, i) => <li key={i}>{risk}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center text-xs text-slate-500 font-medium">
                        <User className="w-3.5 h-3.5 mr-1" />
                        {init.owner}
                      </div>
                      {init.decisionRequired && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                          Decision Required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {company.initiatives.length === 0 && (
                <div className="col-span-full p-12 text-center bg-white rounded-xl border border-slate-200 border-dashed">
                  <p className="text-slate-500 text-sm">No active initiatives for this company.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {['Cash & Capital', 'Operations', 'People'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-slate-200 border-dashed">
            <FileText className="w-10 h-10 mb-3 text-slate-300" />
            <h3 className="text-lg font-medium text-slate-900">{activeTab} View</h3>
            <p className="text-sm text-slate-500 mt-1">This module is under development for the prototype.</p>
          </div>
        )}
      </div>

      {/* Ask / Decision Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <MessageSquarePlus className="w-5 h-5 mr-2 text-indigo-600" />
                New Decision Request
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                <input type="text" disabled value={company.name} className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Request Title</label>
                <input type="text" placeholder="e.g., Capex Approval for Furnace Upgrade" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors">
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description & Context</label>
                <textarea rows={4} placeholder="Provide context for the holding team..." className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors resize-none"></textarea>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                Cancel
              </button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
