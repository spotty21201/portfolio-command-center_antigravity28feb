import { useState } from 'react';
import { mockCompanies, Sector } from '../data/mockData';
import { 
  Search, 
  Filter, 
  Plus,
  Clock,
  User,
  AlertTriangle
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function Initiatives() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState<Sector | 'All'>('All');

  // Flatten all initiatives
  const allInitiatives = mockCompanies.flatMap(c => 
    c.initiatives.map(i => ({ ...i, companyName: c.name, companySector: c.sector }))
  );

  const filteredInitiatives = allInitiatives.filter(i => {
    const matchesSearch = i.title.toLowerCase().includes(searchTerm.toLowerCase()) || i.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'All' || i.companySector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  const statuses = ['Not Started', 'In Progress', 'Delayed', 'Completed'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Transformation Initiatives</h1>
          <p className="text-sm text-slate-500 mt-1">Group-wide strategic projects and milestones</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Initiative
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
            placeholder="Search initiatives or companies..."
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
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex space-x-6 h-full min-w-max">
          {statuses.map(status => {
            const columnInitiatives = filteredInitiatives.filter(i => i.status === status);
            return (
              <div key={status} className="w-80 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4 shrink-0">
                  <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">{status}</h3>
                  <span className="bg-slate-200 text-slate-600 py-0.5 px-2 rounded-full text-xs font-medium">{columnInitiatives.length}</span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-2">
                  {columnInitiatives.map(init => (
                    <div key={init.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow cursor-pointer">
                      <div className={cn("h-1.5 w-full", init.health === 'Green' ? "bg-emerald-500" : init.health === 'Amber' ? "bg-amber-500" : "bg-red-500")} />
                      <div className="p-4">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{init.companyName}</div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight mb-3">{init.title}</h4>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-xs font-medium text-slate-500">
                            <span>Budget Burn</span>
                            <span className={init.budgetBurn > 100 ? "text-red-600" : ""}>{init.budgetBurn}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div className={cn("h-1.5 rounded-full", init.budgetBurn > 100 ? "bg-red-500" : "bg-indigo-500")} style={{ width: `${Math.min(init.budgetBurn, 100)}%` }}></div>
                          </div>
                        </div>

                        <div className="text-xs text-slate-600 flex items-center mb-3">
                          <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                          <span className="truncate">Next: {init.nextMilestone}</span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div className="flex items-center text-xs text-slate-500 font-medium">
                            <User className="w-3.5 h-3.5 mr-1" />
                            {init.owner}
                          </div>
                          {init.decisionRequired && (
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {columnInitiatives.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                      No initiatives
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
