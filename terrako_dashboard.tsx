import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, MousePointer, DollarSign, Eye, Target } from 'lucide-react';

const TerrakoDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Brand colors from Terrako
  const colors = {
    primary: '#00D563', // Green
    dark: '#1a1a1a',
    lightGray: '#f5f5f5',
    mediumGray: '#666'
  };

  // Processed data
  const campaigns = [
    { name: 'Kubota Parts Search', platform: 'Facebook', reach: 738, engagement: 203, clicks: 5, spent: 20.94, cpr: 0.10 },
    { name: 'Expert Hands', platform: 'Instagram', reach: 1370, engagement: 30, clicks: 22, spent: 13.93, cpr: 0.46 },
    { name: 'Kverneland Parts', platform: 'Instagram', reach: 3226, engagement: 64, clicks: 59, spent: 20.9, cpr: 0.33 },
    { name: 'Easy Parts Finding', platform: 'Facebook', reach: 11885, engagement: 52, clicks: 51, spent: 20.92, cpr: 0.40 },
    { name: 'Welcome to Terrako', platform: 'Instagram Reel', reach: 15224, engagement: 2055, clicks: 0, spent: 1.44, cpr: 0.001 },
    { name: 'Chopping Season', platform: 'Facebook', reach: 1739, engagement: 106, clicks: 2, spent: 11.88, cpr: 0.11 },
    { name: 'Bale Chopper', platform: 'Campaign', reach: 10848, engagement: 154, clicks: 173, spent: 34.94, cpr: 0.23 }
  ];

  // Summary metrics
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalReach = campaigns.reduce((sum, c) => sum + c.reach, 0);
  const totalEngagement = campaigns.reduce((sum, c) => sum + c.engagement, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const avgCPR = totalSpent / totalEngagement;

  // Platform performance
  const platformData = [
    { name: 'Instagram', value: campaigns.filter(c => c.platform.includes('Instagram')).reduce((sum, c) => sum + c.reach, 0) },
    { name: 'Facebook', value: campaigns.filter(c => c.platform === 'Facebook').reduce((sum, c) => sum + c.reach, 0) },
    { name: 'Campaign', value: campaigns.filter(c => c.platform === 'Campaign').reduce((sum, c) => sum + c.reach, 0) }
  ];

  // Top performers
  const topPerformers = [...campaigns]
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 5);

  const COLORS = [colors.primary, '#00B050', '#008040', '#006030', '#004020'];

  const MetricCard = ({ icon: Icon, title, value, subtitle, trend }) => (
    <div className="bg-white rounded-lg p-6 shadow-lg border-t-4" style={{ borderTopColor: colors.primary }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2" style={{ color: colors.dark }}>{value}</p>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: colors.primary + '20' }}>
          <Icon size={24} style={{ color: colors.primary }} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <TrendingUp size={16} style={{ color: colors.primary }} className="mr-1" />
          <span style={{ color: colors.primary }}>{trend}</span>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ backgroundColor: colors.lightGray }} className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: colors.dark }}>
          <span style={{ color: colors.primary }}>TERRAKO</span> Social Media Performance
        </h1>
        <p className="text-gray-600">Campaign Period: Sep 24, 2025 - Jan 09, 2026</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {['overview', 'campaigns', 'platforms'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-6 py-3 rounded-lg font-semibold transition-all capitalize"
            style={{
              backgroundColor: activeTab === tab ? colors.primary : 'white',
              color: activeTab === tab ? 'white' : colors.dark
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              icon={DollarSign}
              title="Total Spend"
              value={`€${totalSpent.toFixed(2)}`}
              subtitle="Across all campaigns"
            />
            <MetricCard
              icon={Users}
              title="Total Reach"
              value={totalReach.toLocaleString()}
              subtitle="Unique users reached"
              trend="Excellent coverage"
            />
            <MetricCard
              icon={Target}
              title="Total Engagement"
              value={totalEngagement.toLocaleString()}
              subtitle="Actions taken"
              trend="High interaction"
            />
            <MetricCard
              icon={MousePointer}
              title="Link Clicks"
              value={totalClicks.toLocaleString()}
              subtitle={`€${(totalSpent / totalClicks).toFixed(2)} per click`}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Platform Distribution */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.dark }}>Reach by Platform</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Top Performers */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.dark }}>Top 5 Campaigns</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topPerformers} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Bar dataKey="engagement" fill={colors.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Highlights */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.dark }}>
              🌟 Key Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: colors.primary + '10' }}>
                <p className="font-semibold mb-2" style={{ color: colors.primary }}>Best Engagement</p>
                <p className="text-2xl font-bold">Welcome to Terrako Reel</p>
                <p className="text-sm text-gray-600">2,055 engagements at only €0.001 CPR</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: colors.primary + '10' }}>
                <p className="font-semibold mb-2" style={{ color: colors.primary }}>Best Reach</p>
                <p className="text-2xl font-bold">Welcome to Terrako</p>
                <p className="text-sm text-gray-600">15,224 people reached</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: colors.primary + '10' }}>
                <p className="font-semibold mb-2" style={{ color: colors.primary }}>Most Clicks</p>
                <p className="text-2xl font-bold">Bale Chopper Campaign</p>
                <p className="text-sm text-gray-600">173 link clicks</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: colors.dark }}>
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Campaign</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Platform</th>
                  <th className="px-6 py-4 text-right text-white font-semibold">Reach</th>
                  <th className="px-6 py-4 text-right text-white font-semibold">Engagement</th>
                  <th className="px-6 py-4 text-right text-white font-semibold">Clicks</th>
                  <th className="px-6 py-4 text-right text-white font-semibold">Spent</th>
                  <th className="px-6 py-4 text-right text-white font-semibold">CPR</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{campaign.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm" style={{
                        backgroundColor: colors.primary + '20',
                        color: colors.primary
                      }}>
                        {campaign.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">{campaign.reach.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-semibold">{campaign.engagement}</td>
                    <td className="px-6 py-4 text-right">{campaign.clicks}</td>
                    <td className="px-6 py-4 text-right">€{campaign.spent.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">€{campaign.cpr.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Platforms Tab */}
      {activeTab === 'platforms' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {['Instagram', 'Facebook', 'Campaign'].map(platform => {
            const platformCampaigns = campaigns.filter(c => c.platform.includes(platform));
            const totalReach = platformCampaigns.reduce((sum, c) => sum + c.reach, 0);
            const totalSpent = platformCampaigns.reduce((sum, c) => sum + c.spent, 0);
            const totalEng = platformCampaigns.reduce((sum, c) => sum + c.engagement, 0);

            return (
              <div key={platform} className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>{platform}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm">Total Campaigns</p>
                    <p className="text-3xl font-bold">{platformCampaigns.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Reach</p>
                    <p className="text-2xl font-bold">{totalReach.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Engagement</p>
                    <p className="text-2xl font-bold">{totalEng.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Spent</p>
                    <p className="text-2xl font-bold">€{totalSpent.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Avg CPR</p>
                    <p className="text-xl font-bold">€{(totalSpent / totalEng).toFixed(3)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TerrakoDashboard;