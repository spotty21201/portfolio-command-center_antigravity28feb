import { useState } from 'react';
import { mockCompanies } from '../data/mockData';
import { 
  ShieldAlert, 
  AlertTriangle,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function RiskCompliance() {
  const allRisks = mockCompanies.flatMap(c => 
    c.risks.map(r => ({ ...r, companyName: c.name, companySector: c.sector }))
  );

  const openRisks = allRisks.filter(r => r.status === 'Open');
  const highImpactRisks = openRisks.filter(r => r.impact === 'High');
  const highLikelihoodRisks = openRisks.filter(r => r.likelihood === 'High');
  const criticalRisks = openRisks.filter(r => r.impact === 'High' && r.likelihood === 'High');

  const complianceScores = mockCompanies.map(c => ({ name: c.name, score: c.complianceScore }));
  const avgCompliance = Math.round(complianceScores.reduce((acc, c) => acc + c.score, 0) / complianceScores.length);
  const lowCompliance = complianceScores.filter(c => c.score < 80);

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Risk & Compliance</h1>
          <p className="text-sm text-slate-500 mt-1">Portfolio risk register and compliance tracking</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center">
            <ShieldAlert className="w-4 h-4 mr-2" />
            Log Incident
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Open Risks</span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-slate-900">{openRisks.length}</span>
            <span className="text-sm font-medium text-amber-600 flex items-center"><AlertTriangle className="w-4 h-4 mr-1" /> {criticalRisks.length} Critical</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Avg Compliance Score</span>
          <div className="flex items-end justify-between">
            <span className={cn("text-3xl font-bold", avgCompliance >= 90 ? "text-emerald-600" : avgCompliance >= 80 ? "text-amber-600" : "text-red-600")}>
              {avgCompliance}
            </span>
            <span className="text-sm font-medium text-slate-500">Target: 95</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Safety Incidents YTD</span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-slate-900">
              {mockCompanies.reduce((acc, c) => acc + c.safetyIncidents, 0)}
            </span>
            <span className="text-sm font-medium text-red-600 flex items-center">+3 vs LY</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Upcoming Audits</span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-slate-900">4</span>
            <span className="text-sm font-medium text-slate-500 flex items-center"><Calendar className="w-4 h-4 mr-1" /> Next: 14 Days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Top Critical Risks */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-base font-semibold text-slate-900 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
              Top Critical Risks (High Impact & Likelihood)
            </h2>
          </div>
          <div className="p-0 overflow-y-auto flex-1">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50 sticky top-0">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Title</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Owner</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {criticalRisks.map(risk => (
                  <tr key={risk.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="text-sm font-semibold text-slate-900">{risk.companyName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{risk.companySector}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-semibold text-slate-900">{risk.title}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{risk.category}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{risk.owner}</td>
                  </tr>
                ))}
                {criticalRisks.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-500">No critical risks currently registered.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Watchlist */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-base font-semibold text-slate-900 flex items-center">
              <ShieldAlert className="w-4 h-4 mr-2 text-amber-500" />
              Compliance Watchlist
            </h2>
          </div>
          <div className="p-0 overflow-y-auto flex-1">
            <ul className="divide-y divide-slate-100">
              {lowCompliance.map((company, i) => (
                <li key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{company.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Score below target (95)</p>
                  </div>
                  <div className={cn("px-3 py-1 rounded-full text-xs font-bold", company.score < 70 ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800")}>
                    {company.score}
                  </div>
                </li>
              ))}
              {lowCompliance.length === 0 && (
                <li className="p-8 text-center text-sm text-slate-500">All companies meet compliance targets.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
