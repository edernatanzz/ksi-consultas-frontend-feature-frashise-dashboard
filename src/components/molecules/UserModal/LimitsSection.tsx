import React from 'react';
import { X } from 'lucide-react';
import { User } from '@/types/user';
import Button from '../../atoms/Button/Button';

interface LimitsSectionProps {
  formData: Partial<User>;
  isReadOnly: boolean;
  onInputChange: <T extends keyof User>(field: T, value: User[T]) => void;
  onAddIP: () => void;
  onUpdateIP: (index: number, value: string) => void;
  onRemoveIP: (index: number) => void;
}

const LimitsSection: React.FC<LimitsSectionProps> = ({
  formData,
  isReadOnly,
  onInputChange,
  onAddIP,
  onUpdateIP,
  onRemoveIP
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          APIs Permitidas
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(formData.allowedAPIs || {}).map(([api, allowed]) => (
            <label key={api} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={allowed}
                onChange={(e) => onInputChange('allowedAPIs', {
                  cpf: formData.allowedAPIs?.cpf ?? false,
                  cnpj: formData.allowedAPIs?.cnpj ?? false,
                  vehicular: formData.allowedAPIs?.vehicular ?? false,
                  score: formData.allowedAPIs?.score ?? false,
                  judicial: formData.allowedAPIs?.judicial ?? false,
                  [api]: e.target.checked
                })}
                disabled={isReadOnly}
                className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700 capitalize">
                {api === 'cpf' ? 'CPF' : api === 'cnpj' ? 'CNPJ' : api}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Horário de Acesso Permitido
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Início</label>
            <input
              type="time"
              value={formData.workingHours?.start}
              onChange={(e) => onInputChange('workingHours', {
                start: e.target.value,
                end: formData.workingHours?.end ?? '00:00'
              })}
              disabled={isReadOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Fim</label>
            <input
              type="time"
              value={formData.workingHours?.end}
              onChange={(e) => onInputChange('workingHours', {
                start: formData.workingHours?.start ?? '00:00',
                end: e.target.value
              })}
              disabled={isReadOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none disabled:bg-gray-50"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          IPs Autorizados
        </label>
        <div className="space-y-2">
          {formData.allowedIPs?.map((ip, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={ip}
                onChange={(e) => onUpdateIP(index, e.target.value)}
                disabled={isReadOnly}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none disabled:bg-gray-50"
                placeholder="192.168.1.1"
              />
              {!isReadOnly && formData.allowedIPs && formData.allowedIPs.length > 1 && (
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => onRemoveIP(index)}
                  icon={X}
                  iconOnly={true}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                />
              )}
            </div>
          ))}
          {!isReadOnly && (
            <Button
              variant="ghost"
              size="small"
              onClick={onAddIP}
              className="text-primary-500 hover:text-primary-700 text-sm font-medium"
            >
              + Adicionar IP
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LimitsSection; 