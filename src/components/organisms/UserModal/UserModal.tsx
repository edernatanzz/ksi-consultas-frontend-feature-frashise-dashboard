import React, { useState, useEffect, useCallback } from 'react';
import { User } from '@/types/user';
import Modal from '../../atoms/Modal/Modal';
import UserModalHeader from '../../atoms/UserModal/UserModalHeader';
import UserModalTabs from '../../atoms/UserModal/UserModalTabs';
import UserModalFooter from '../../atoms/UserModal/UserModalFooter';
import BasicInfoSection from '../../molecules/UserModal/BasicInfoSection';
import PermissionsSection from '../../molecules/UserModal/PermissionsSection';
import LimitsSection from '../../molecules/UserModal/LimitsSection';
import NotificationsSection from '../../molecules/UserModal/NotificationsSection';

interface UserModalProps {
  user: User | null;
  mode: 'create' | 'edit' | 'view';
  onClose: () => void;
  onSave: (userData: Partial<User>, imageFile: File | null) => void;
  isOpen: boolean;
}

const UserModal: React.FC<UserModalProps> = ({ user, mode, onClose, onSave, isOpen }) => {
  const [formData, setFormData] = useState<Partial<User> & {
    allowedAPIs: {
      cpf: boolean;
      cnpj: boolean;
      vehicular: boolean;
      score: boolean;
      judicial: boolean;
    };
    workingHours: {
      start: string;
      end: string;
    };
    allowedIPs: string[];
    notifications: {
      quotaReached: boolean;
      apiDown: boolean;
      newReport: boolean;
      systemUpdates: boolean;
    };
    notificationMethod: 'email' | 'sms' | 'system';
  }>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    department: '',
    position: '',
    profile: 'support',
    status: 'active',
    hasCustomPermissions: false,
    dailyQueryLimit: 1000,
    monthlyCostLimit: 500,
    allowedAPIs: {
      cpf: true,
      cnpj: true,
      vehicular: false,
      score: false,
      judicial: false
    },
    workingHours: {
      start: '08:00',
      end: '18:00'
    },
    allowedIPs: [''],
    notifications: {
      quotaReached: true,
      apiDown: true,
      newReport: false,
      systemUpdates: false
    },
    notificationMethod: 'email'
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [customPermissions, setCustomPermissions] = useState<string[]>([]);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        allowedAPIs: user.allowedAPIs || { cpf: true, cnpj: true, vehicular: false, score: false, judicial: false },
        workingHours: user.workingHours || { start: '08:00', end: '18:00' },
        allowedIPs: user.allowedIPs || [''],
        notifications: user.notifications || { quotaReached: true, apiDown: true, newReport: false, systemUpdates: false },
        notificationMethod: user.notificationMethod || 'email'
      });
      setCustomPermissions(user.customPermissions || []);
    } else {
      generatePassword();
    }
  }, [user]);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(password);
  };

  const handleInputChange = <T extends keyof User>(field: T, value: User[T]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileChange = (profile: User['profile']) => {
    setFormData(prev => ({
      ...prev,
      profile: profile,
      hasCustomPermissions: false
    }));
    setCustomPermissions([]);
  };

  const toggleCustomPermissions = (enabled: boolean) => {
    setFormData(prev => ({
      ...prev,
      hasCustomPermissions: enabled
    }));
    if (!enabled) {
      setCustomPermissions([]);
    }
  };

  const togglePermission = (moduleId: string) => {
    setCustomPermissions(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const addIPField = () => {
    setFormData(prev => ({
      ...prev,
      allowedIPs: [...prev.allowedIPs, '']
    }));
  };

  const updateIP = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      allowedIPs: prev.allowedIPs.map((ip, i) => i === index ? value : ip)
    }));
  };

  const removeIP = (index: number) => {
    setFormData(prev => ({
      ...prev,
      allowedIPs: prev.allowedIPs.filter((_, i) => i !== index)
    }));
  };

  const handleSave = useCallback(() => {
    onSave({
      ...formData,
      ...(formData.hasCustomPermissions && { customPermissions: customPermissions })
    }, selectedImageFile);
  }, [formData, customPermissions, onSave, selectedImageFile]);

  const isReadOnly = mode === 'view';

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-[900px] max-h-[90vh] overflow-hidden">
        <UserModalHeader
          mode={mode}
          user={user}
          onClose={onClose}
        />

        <div className="bg-gray-50 border-b border-gray-200">
          <UserModalTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <div className="p-4 md:p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'basic' && (
            <BasicInfoSection
              formData={formData}
              isReadOnly={isReadOnly}
              showPassword={showPassword}
              generatedPassword={generatedPassword}
              onInputChange={handleInputChange}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onGeneratePassword={generatePassword}
              onCopyPassword={() => navigator.clipboard.writeText(generatedPassword)}
              onImageChange={setSelectedImageFile}
              setGeneratedPassword={setGeneratedPassword}
            />
          )}

          {activeTab === 'permissions' && (
            <PermissionsSection
              formData={formData}
              isReadOnly={isReadOnly}
              customPermissions={customPermissions}
              onProfileChange={handleProfileChange}
              onToggleCustomPermissions={toggleCustomPermissions}
              onTogglePermission={togglePermission}
            />
          )}

          {activeTab === 'limits' && (
            <LimitsSection
              formData={formData}
              isReadOnly={isReadOnly}
              onInputChange={handleInputChange}
              onAddIP={addIPField}
              onUpdateIP={updateIP}
              onRemoveIP={removeIP}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationsSection
              formData={formData}
              isReadOnly={isReadOnly}
              onInputChange={handleInputChange}
            />
          )}
        </div>

        <UserModalFooter
          isReadOnly={isReadOnly}
          mode={mode}
          onClose={onClose}
          onSave={handleSave}
        />
      </div>
    </Modal>
  );
};

export default UserModal;