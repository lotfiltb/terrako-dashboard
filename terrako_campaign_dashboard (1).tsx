import React, { useState, useMemo } from 'react';
import { Download, TrendingUp, Eye, DollarSign } from 'lucide-react';

export default function TerrakoDashboard() {
  const [sortBy, setSortBy] = useState('cost_asc');
  const [filterType, setFilterType] = useState('all');

  const campaignData = [
    { platform: 'Facebook', adset: '🔧 Tired of wasting time searching for Kubota parts?', metric: 'Post Engagement', spent: 20.94, impressions: 853, reach: 738, freq: 1.16, cost_per: 0.10, results: 203 },
    { platform: 'Instagram', adset: 'From Terrako to expert hands. 🤝', metric: 'Profile Visits', spent: 13.93, impressions: 1881, reach: 1370, freq: 1.37, cost_per: 0.46, results: 30 },
    { platform: 'Instagram', adset: 'Find your Kverneland parts...', metric: 'Profile Visits', spent: 20.9, impressions: 4542, reach: 3226, freq: 1.41, cost_per: 0.33, results: 64 },
    { platform: 'Facebook', adset: 'Easily find the parts you need — anytime, anywhere. 🔍', metric: 'Link Clicks', spent: 20.92, impressions: 16094, reach: 11885, freq: 1.35, cost_per: 0.40, results: 52 },
    { platform: 'Instagram', adset: 'Find your Kverneland parts...', metric: 'Profile Visits', spent: 5.97, impressions: 1372, reach: 1200, freq: 1.14, cost_per: 0.43, results: 14 },
    { platform: 'Instagram', adset: 'Find your Kubota parts anytime...', metric: 'Profile Visits', spent: 23.87, impressions: 5230, reach: 3826, freq: 1.37, cost_per: 0.44, results: 54 },
    { platform: 'Facebook', adset: 'Find the Kubota parts you need — anytime, anywhere. 🔧', metric: 'Link Clicks', spent: 13.93, impressions: 23795, reach: 17042, freq: 1.40, cost_per: 0.23, results: 60 },
    { platform: 'Facebook', adset: 'From Terrako to expert hands. 👨‍🔧', metric: 'Post Engagement', spent: 20.83, impressions: 2335, reach: 1811, freq: 1.29, cost_per: 0.11, results: 186 },
    { platform: 'Instagram', adset: '100% genuine. 100% Kubota. 🔧🚜', metric: 'Profile Visits', spent: 20.75, impressions: 2435, reach: 1679, freq: 1.45, cost_per: 0.61, results: 34 },
    { platform: 'Instagram', adset: 'From Terrako to expert hands. 🤝', metric: 'Profile Visits', spent: 13.88, impressions: 2984, reach: 2330, freq: 1.28, cost_per: 0.30, results: 47 },
    { platform: 'Instagram', adset: 'Get ready for the chopping...', metric: 'Profile Visits', spent: 27.82, impressions: 9775, reach: 6156, freq: 1.59, cost_per: 0.40, results: 69 },
    { platform: 'Facebook', adset: 'Get ready for the chopping season! 🌾', metric: 'Post Engagement', spent: 11.88, impressions: 2335, reach: 1739, freq: 1.34, cost_per: 0.11, results: 106 },
    { platform: 'Instagram', adset: 'Ready for the spreading season? 🌾', metric: 'Profile Visits', spent: 22.52, impressions: 8992, reach: 6986, freq: 1.29, cost_per: 0.27, results: 82 },
  ];

  const filteredData = useMemo(() => {
    let filtered = campaignData;
    if (filterType !== 'all') {
      filtered = filtered.filter(d => d.platform === filterType);
    }
    
    const sorted = [...filtered];
    if (sortBy === 'cost_asc') {
      sorted.sort((a, b) => a.cost_per - b.cost_per);
    } else if (sortBy === 'results_desc') {
      sorted.sort((a, b) => b.results - a.results);
    } else if (sortBy === 'impressions_desc') {
      sorted.sort((a, b) => b.impressions - a.impressions);
    }
    return sorted;
  }, [sortBy, filterType]);

  const totals = useMemo(() => ({
    spent: filteredData.reduce((sum, d) => sum + d.spent, 0),
    results: filteredData.reduce((sum, d) => sum + d.results, 0),
    impressions: filteredData.reduce((sum, d) => sum + d.impressions, 0),
    avgCost: filteredData.length > 0 ? filteredData.reduce((sum, d) => sum + d.cost_per, 0) / filteredData.length : 0,
  }), [filteredData]);

  const downloadExcel = () => {
    // Create Excel-compatible CSV
    const headers = ['Platform', 'Ad Set', 'Metric Type', 'Results', 'Cost per Result (EUR)', 'Impressions', 'Reach', 'Frequency', 'Amount Spent (EUR)'];
    const rows = filteredData.map(d => [
      d.platform,
      d.adset,
      d.metric,
      d.results,
      d.cost_per.toFixed(2),
      d.impressions,
      d.reach,
      d.freq.toFixed(2),
      d.spent.toFixed(2)
    ]);
    
    // Create CSV content with proper formatting
    let csv = '\uFEFF' + headers.join('\t') + '\n';
    csv += rows.map(row => row.join('\t')).join('\n');
    
    // Create blob with correct MIME type for Excel
    const blob = new Blob([csv], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' });
    
    // Create download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'Terrako_Campaign_Performance.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Terrako Campaign Dashboard</h1>
          <p className="text-green-100">Marketing performance insights & ROI analysis</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <p className="text-gray-500 text-sm">Total Spent</p>
            <p className="text-3xl font-bold text-green-600">€{totals.spent.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <p className="text-gray-500 text-sm">Total Results</p>
            <p className="text-3xl font-bold text-green-600">{totals.results}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <p className="text-gray-500 text-sm">Total Impressions</p>
            <p className="text-3xl font-bold text-green-600">{totals.impressions.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <p className="text-gray-500 text-sm">Avg Cost/Result</p>
            <p className="text-3xl font-bold text-green-600">€{totals.avgCost.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600">
              <option value="cost_asc">Cost per Result (Low to High)</option>
              <option value="results_desc">Results (High to Low)</option>
              <option value="impressions_desc">Impressions (High to Low)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Platform:</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600">
              <option value="all">All Platforms</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
            </select>
          </div>
          <button onClick={downloadExcel} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2">
            <Download size={20} />
            Download XLSX
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Platform</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Ad Set</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Results</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Cost/Result</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Impressions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Reach</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm font-medium">{row.platform}</td>
                    <td className="px-6 py-4 text-sm">{row.adset}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">{row.results}</td>
                    <td className="px-6 py-4 text-sm">€{row.cost_per.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">{row.impressions.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">{row.reach.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">€{row.spent.toFixed(2)}</td>
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