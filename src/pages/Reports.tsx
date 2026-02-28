import { FileText, Download, Calendar, Filter, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export function Reports() {
  const { role } = useAppStore();

  const reports = [
    { id: 1, title: 'Weekly CEO Brief', desc: '1-2 page summary of portfolio movements, critical alerts, and cash position.', frequency: 'Weekly', format: 'PDF', lastGenerated: 'Today, 08:00 AM' },
    { id: 2, title: 'Monthly Holding Pack', desc: 'Comprehensive financial and operational review across all sectors.', frequency: 'Monthly', format: 'PDF/PPTX', lastGenerated: 'Oct 1, 2026' },
    { id: 3, title: 'Risk & Compliance Register', desc: 'Full export of all open risks, incidents, and compliance scores.', frequency: 'On-demand', format: 'CSV/Excel', lastGenerated: 'Yesterday, 14:30 PM' },
    { id: 4, title: 'Initiatives Burn Rate', desc: 'Budget vs actuals for all transformation initiatives.', frequency: 'Bi-weekly', format: 'CSV', lastGenerated: 'Oct 15, 2026' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reports & Exports</h1>
          <p className="text-sm text-slate-500 mt-1">Prebuilt templates and data extracts</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Custom Report Builder
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Templates List */}
        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-base font-semibold text-slate-900 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-indigo-500" />
              Standard Reports
            </h2>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select className="text-xs border-slate-200 rounded-md text-slate-600 py-1 pl-2 pr-6 focus:ring-indigo-500 focus:border-indigo-500">
                <option>All Formats</option>
                <option>PDF</option>
                <option>CSV / Excel</option>
              </select>
            </div>
          </div>
          <div className="p-0 overflow-y-auto flex-1">
            <ul className="divide-y divide-slate-100">
              {reports.map((report) => (
                <li key={report.id} className="p-5 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{report.title}</h3>
                    <p className="text-xs text-slate-500 mb-2">{report.desc}</p>
                    <div className="flex items-center space-x-4 text-[11px] font-medium text-slate-400">
                      <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {report.frequency}</span>
                      <span className="flex items-center"><FileText className="w-3 h-3 mr-1" /> {report.format}</span>
                      <span>Last generated: {report.lastGenerated}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 shrink-0">
                    <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-md text-xs font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center">
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download
                    </button>
                    <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md text-xs font-medium hover:bg-indigo-100 transition-colors shadow-sm">
                      Generate Now
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Audit Trail & Settings */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-base font-semibold text-slate-900">Data Freshness</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">ERP Integration (SAP)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">HRIS (Workday)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Treasury System</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500">All automated feeds are operating normally. Next scheduled sync in 45 minutes.</p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-indigo-900 mb-2">Automated Delivery</h3>
            <p className="text-xs text-indigo-700 mb-4">You are currently subscribed to receive the Weekly CEO Brief every Monday at 08:00 AM.</p>
            <button className="w-full px-4 py-2 bg-white border border-indigo-200 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors shadow-sm">
              Manage Subscriptions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
