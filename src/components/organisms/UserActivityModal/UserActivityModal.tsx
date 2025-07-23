import React, { useState } from 'react';
import { 
  X, 
  Activity, 
  Clock, 
  DollarSign, 
  Search, 
  Filter,
  TrendingUp,
  Eye,
  Download,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface User {
  id: string;
  name: string;
  email: string;
  profile: string;
  department: string;
}

interface UserActivityModalProps {
  user: User;
  onClose: () => void;
  isOpen: boolean;
}

const UserActivityModal: React.FC<UserActivityModalProps> = ({ user, onClose }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [activityFilter, setActivityFilter] = useState('all');

  // Mock activity data
  const activityData = [
    { date: '2024-01-01', queries: 45, cost: 22.50, logins: 3 },
    { date: '2024-01-02', queries: 52, cost: 26.00, logins: 2 },
    { date: '2024-01-03', queries: 38, cost: 19.00, logins: 4 },
    { date: '2024-01-04', queries: 61, cost: 30.50, logins: 2 },
    { date: '2024-01-05', queries: 47, cost: 23.50, logins: 3 },
    { date: '2024-01-06', queries: 0, cost: 0, logins: 0 },
    { date: '2024-01-07', queries: 0, cost: 0, logins: 0 },
    { date: '2024-01-08', queries: 55, cost: 27.50, logins: 2 },
    { date: '2024-01-09', queries: 43, cost: 21.50, logins: 3 },
    { date: '2024-01-10', queries: 49, cost: 24.50, logins: 2 },
  ];

  const timelineActivities = [
    {
      id: 1,
      type: 'query',
      description: 'Consulta CPF realizada',
      details: 'API: Serasa PF - Custo: R$ 0,45',
      timestamp: '2024-01-15 16:45:32',
      status: 'success'
    },
    {
      id: 2,
      type: 'report',
      description: 'Relatório de custos gerado',
      details: 'Período: Janeiro 2024',
      timestamp: '2024-01-15 16:30:15',
      status: 'success'
    },
    {
      id: 3,
      type: 'login',
      description: 'Login realizado',
      details: 'IP: 192.168.1.100',
      timestamp: '2024-01-15 14:20:45',
      status: 'success'
    },
    {
      id: 4,
      type: 'query',
      description: 'Consulta CNPJ realizada',
      details: 'API: SPC PJ - Custo: R$ 0,41',
      timestamp: '2024-01-15 14:15:22',
      status: 'success'
    },
    {
      id: 5,
      type: 'error',
      description: 'Erro na consulta',
      details: 'API: Receita Federal - Timeout',
      timestamp: '2024-01-15 13:45:10',
      status: 'error'
    },
    {
      id: 6,
      type: 'config',
      description: 'Configuração alterada',
      details: 'Limite diário aumentado para 5000',
      timestamp: '2024-01-15 09:30:00',
      status: 'info'
    }
  ];

  const stats = {
    totalQueries: 2450,
    totalCost: 1230.50,
    avgQueriesPerDay: 82,
    avgCostPerQuery: 0.50,
    successRate: 98.5,
    avgSessionTime: '45min'
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'query':
        return <Search size={16} className="text-blue-500" />;
      case 'report':
        return <Download size={16} className="text-green-500" />;
      case 'login':
        return <Eye size={16} className="text-purple-500" />;
      case 'config':
        return <Filter size={16} className="text-orange-500" />;
      case 'error':
        return <X size={16} className="text-red-500" />;
      default:
        return <Activity size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const filteredActivities = timelineActivities.filter(activity => {
    if (activityFilter === 'all') return true;
    return activity.type === activityFilter;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-poppins font-semibold text-gray-800">
              Atividades do Usuário
            </h2>
            <p className="text-gray-600 mt-1">{user.name} - {user.email}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ksi-red focus:border-ksi-red outline-none w-full sm:w-auto"
              >
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
                <option value="custom">Personalizado</option>
              </select>

              <select
                value={activityFilter}
                onChange={(e) => setActivityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ksi-red focus:border-ksi-red outline-none w-full sm:w-auto"
              >
                <option value="all">Todas as Atividades</option>
                <option value="query">Consultas</option>
                <option value="report">Relatórios</option>
                <option value="login">Logins</option>
                <option value="config">Configurações</option>
                <option value="error">Erros</option>
              </select>
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto">
              <Download size={16} />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[60vh]">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Search size={20} className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-800">{stats.totalQueries.toLocaleString()}</p>
              <p className="text-xs text-blue-600">Total de Consultas</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign size={20} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-800">R$ {stats.totalCost.toFixed(2)}</p>
              <p className="text-xs text-green-600">Custo Total</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Activity size={20} className="text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-800">{stats.avgQueriesPerDay}</p>
              <p className="text-xs text-purple-600">Média/Dia</p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp size={20} className="text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-800">R$ {stats.avgCostPerQuery.toFixed(2)}</p>
              <p className="text-xs text-orange-600">Custo/Consulta</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp size={20} className="text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-800">{stats.successRate}%</p>
              <p className="text-xs text-red-600">Taxa de Sucesso</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock size={20} className="text-gray-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.avgSessionTime}</p>
              <p className="text-xs text-gray-600">Sessão Média</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Activity Chart */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Atividade Diária
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                    formatter={(value, name) => [
                      name === 'queries' ? `${value} consultas` : 
                      name === 'cost' ? `R$ ${value}` : value,
                      name === 'queries' ? 'Consultas' : 
                      name === 'cost' ? 'Custo' : 'Logins'
                    ]}
                  />
                  <Line type="monotone" dataKey="queries" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="cost" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Cost Distribution */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Distribuição de Custos por API
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { name: 'Serasa PF', cost: 450.25 },
                  { name: 'SPC PJ', cost: 320.50 },
                  { name: 'Receita', cost: 280.75 },
                  { name: 'Junta', cost: 179.00 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value}`, 'Custo']} />
                  <Bar dataKey="cost" fill="#E02725" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Timeline de Atividades
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`flex items-start space-x-4 p-4 border rounded-lg ${getStatusColor(activity.status)}`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-800">{activity.description}</p>
                      <span className="text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-4 md:p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserActivityModal; 