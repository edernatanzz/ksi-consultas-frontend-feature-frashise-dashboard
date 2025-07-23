import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { User } from '@/types/user';

interface NotificationsSectionProps {
  formData: Partial<User>;
  isReadOnly: boolean;
  onInputChange: <T extends keyof User>(field: T, value: User[T]) => void;
}

interface NotificationType {
  id: string;
  name: string;
  icon: React.ComponentType<{ size: number; className: string }> | null;
}

const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  formData,
  isReadOnly,
  onInputChange
}) => {
  const defaultNotifications = {
    quotaReached: false,
    apiDown: false,
    newReport: false,
    systemUpdates: false,
  };

  const notificationTypes: NotificationType[] = [
    { id: 'quotaReached', name: 'Limite de quota atingido', icon: null },
    { id: 'apiDown', name: 'API fora do ar', icon: null },
    { id: 'newReport', name: 'Novo relatório disponível', icon: null },
    { id: 'systemUpdates', name: 'Atualizações do sistema', icon: null }
  ];

  const notificationMethods = [
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'sms', name: 'SMS', icon: MessageSquare }
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-lg font-bold text-gray-700 mb-4">
          Tipos de Notificação
        </label>
        <div className="grid grid-cols-1 gap-4">
          {notificationTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <label
                key={type.id}
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={formData.notifications?.[type.id as keyof typeof formData.notifications] || false}
                  onChange={(e) => {
                    const currentNotifications = {
                      ...defaultNotifications,
                      ...(formData.notifications || {}),
                    };

                    const updatedNotifications = {
                      ...currentNotifications,
                      [type.id]: e.target.checked,
                    };

                    onInputChange('notifications', updatedNotifications as User['notifications']);
                  }}
                  disabled={isReadOnly}
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                {IconComponent && <IconComponent size={16} className="text-gray-500" />}
                <span className="text-sm font-medium text-gray-700">{type.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-lg font-bold text-gray-700 mb-4">
          Método de Envio
        </label>
        <div className="grid grid-cols-1 gap-4">
          {notificationMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <label
                key={method.id}
                className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.notificationMethod === method.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${isReadOnly ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              >
                <input
                  type="radio"
                  name="notificationMethod"
                  value={method.id}
                  checked={formData.notificationMethod === method.id}
                  onChange={(e) => onInputChange('notificationMethod', e.target.value as User['notificationMethod'])}
                  disabled={isReadOnly}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <IconComponent size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{method.name}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationsSection; 