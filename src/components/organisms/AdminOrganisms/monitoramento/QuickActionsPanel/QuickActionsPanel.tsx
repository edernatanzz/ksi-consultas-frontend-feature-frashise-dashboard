import React from 'react';
import { AlertTriangle, Wifi, Server } from 'lucide-react';
import ActionButton from '../../../../atoms/ActionButton/ActionButton';

const QuickActionsPanel: React.FC = () => {
  const handleRestartAPIs = () => {
    console.log('Reiniciar APIs Lentas');
    // Lógica para reiniciar APIs
  };

  const handleTestConnectivity = () => {
    console.log('Testar Conectividade');
    // Lógica para testar conectividade
  };

  const handleProviderStatus = () => {
    console.log('Status de Fornecedores');
    // Lógica para verificar status de fornecedores
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-4">
        Ações Rápidas
      </h3>
      
      <div className="space-y-3">
        <ActionButton
          icon={AlertTriangle}
          label="Reiniciar APIs Lentas"
          variant="error"
          onClick={handleRestartAPIs}
        />
        
        <ActionButton
          icon={Wifi}
          label="Testar Conectividade"
          variant="info"
          onClick={handleTestConnectivity}
        />
        
        <ActionButton
          icon={Server}
          label="Status de Fornecedores"
          variant="success"
          onClick={handleProviderStatus}
        />
      </div>
    </div>
  );
};

export default QuickActionsPanel; 