import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockCompanies, Sector, Region, Status } from '../data/mockData';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { useAppStore } from '../store/appStore';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function Portfolio() {
  const { currency } = useAppStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState<Sector | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<Status | 'All'>('All');

  const filteredCompanies = mockCompanies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'All' || c.sector === sectorFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesSector && matchesStatus;
  });

  const getHealthIcon = (health: 'Green' | 'Amber' | 'Red') => {
    switch (health) {
      case 'Green': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'Amber': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'Red': return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case 'Normal': return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Normal</span>;
      case 'Watch': return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">Watch</span>;
      case 'Intervention': return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Intervention</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Portfolio Companies</h1>
          <p className="text-sm text-slate-500 mt-1">All operating companies and subsidiaries</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center shrink-0">
        <div className="relative flex-1 min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value as Sector | 'All')}
            className="block w-40 pl-3 pr-10 py-2 text-base border-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="All">All Sectors</option>
            <option value="Resources">Resources</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="FMCG">FMCG</option>
            <option value="Logistics">Logistics</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Financial Services">Financial Services</option>
            <option value="Telecom/Tech">Telecom/Tech</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status | 'All')}
            className="block w-40 pl-3 pr-10 py-2 text-base border-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="All">All Statuses</option>
            <option value="Normal">Normal</option>
            <option value="Watch">Watch</option>
            <option value="Intervention">Intervention</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                <th scope="col" className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Revenue YTD</th>
                <th scope="col" className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">EBITDA Margin</th>
                <th scope="col" className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Cash Days</th>
                <th scope="col" className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Health</th>
                <th scope="col" className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Compliance</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredCompanies.map((company) => (
                <tr 
                  key={company.id} 
                  onClick={() => navigate(`/company/${company.id}`)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-0">
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{company.name}</div>
                        <div className="text-xs text-slate-500">{company.sector} • {company.region}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(company.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium text-right font-mono">
                    {formatCurrency(company.revenueYTD, currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium text-right font-mono">
                    {formatPercent((company.ebitdaYTD / company.revenueYTD) * 100)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium text-right font-mono">
                    {Math.round((company.cash / (company.revenueYTD / 365)))}d
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center">
                      {getHealthIcon(company.overallHealth)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium text-right font-mono">
                    {company.complianceScore}/100
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCompanies.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-500 text-sm">No companies found matching your filters.</p>
            </div>
          )}
        </div>
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-sm text-slate-500">Showing {filteredCompanies.length} of {mockCompanies.length} companies</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-slate-200 rounded text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
