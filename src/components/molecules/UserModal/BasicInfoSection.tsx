import React, { useState, useEffect, useRef } from 'react';
import { User as UserIcon, Upload, Eye, EyeOff, Copy, RefreshCw } from 'lucide-react';
import Button from '../../atoms/Button/Button';
import { User } from '@/types/user';
import { getInitials } from '@/utils/user';
import ImageCropperModal from '../ImageCropperModal/ImageCropperModal';
import Image from 'next/image';

interface BasicInfoSectionProps {
  formData: Partial<User>;
  isReadOnly: boolean;
  showPassword: boolean;
  generatedPassword: string;
  onInputChange: <T extends keyof User>(field: T, value: User[T]) => void;
  onTogglePassword: () => void;
  onGeneratePassword: () => void;
  onCopyPassword: () => void;
  onImageChange: (file: File | null) => void;
  setGeneratedPassword: React.Dispatch<React.SetStateAction<string>>;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  isReadOnly,
  showPassword,
  generatedPassword,
  onInputChange,
  onTogglePassword,
  onGeneratePassword,
  onCopyPassword,
  onImageChange,
  setGeneratedPassword
}) => {
  const departments = ['TI', 'Financeiro', 'Suporte', 'Desenvolvimento', 'Marketing', 'Comercial'];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(formData.profileImageUrl || null);
  const [isCropperModalOpen, setIsCropperModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);

  useEffect(() => {
    if (formData.profileImageUrl) {
      setSelectedImage(formData.profileImageUrl);
    }
  }, [formData.profileImageUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageToCrop(reader.result?.toString() || null);
        setIsCropperModalOpen(true);
      });
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      onImageChange(null);
      setImageToCrop(null);
      setIsCropperModalOpen(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleCropDone = (croppedFile: File | null) => {
    if (croppedFile) {
      setSelectedImage(URL.createObjectURL(croppedFile));
      onImageChange(croppedFile);
    } else {
      setSelectedImage(null);
      onImageChange(null);
    }
    setIsCropperModalOpen(false);
    setImageToCrop(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 bg-secondary-200 rounded-full flex items-center justify-center overflow-hidden">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="User Avatar"
              className="w-full h-full object-cover"
              width={80}
              height={80}
              priority
            />
          ) : formData.name ? (
            <span className="text-secondary-800 font-bold text-lg">
              {getInitials(formData.name)}
            </span>
          ) : (
            <UserIcon size={24} className="text-secondary-800" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          size="medium"
          icon={Upload}
          className="border-gray-300 text-gray-800 hover:bg-gray-100"
          onClick={handleButtonClick}
        >
          Alterar Foto
        </Button>
      </div>

      <ImageCropperModal
        isOpen={isCropperModalOpen}
        imgSrc={imageToCrop}
        onClose={() => setIsCropperModalOpen(false)}
        onCropDone={handleCropDone}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            disabled={isReadOnly}
            className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none disabled:bg-gray-50 shadow-sm"
            placeholder="Digite o nome completo"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Email Corporativo *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            disabled={isReadOnly}
            className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none disabled:bg-gray-50 shadow-sm"
            placeholder="usuario@ksi.com.br"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            CPF
          </label>
          <input
            type="text"
            value={formData.cpf}
            onChange={(e) => onInputChange('cpf', e.target.value)}
            disabled={isReadOnly}
            className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none disabled:bg-gray-50 shadow-sm"
            placeholder="123.456.789-00"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Telefone
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            disabled={isReadOnly}
            className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none disabled:bg-gray-50 shadow-sm"
            placeholder="(11) 99999-9999"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Departamento *
          </label>
          <select
            value={formData.department}
            onChange={(e) => onInputChange('department', e.target.value)}
            disabled={isReadOnly}
            className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none disabled:bg-gray-50 shadow-sm"
          >
            <option value="">Selecione o departamento</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Cargo
          </label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => onInputChange('position', e.target.value)}
            disabled={isReadOnly}
            className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none disabled:bg-gray-50 shadow-sm"
            placeholder="Ex: Analista Senior"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Status
        </label>
        <div className="flex items-center space-x-4">
          {[
            { value: 'active', label: 'Ativo', color: 'bg-green-100 text-green-800' },
            { value: 'inactive', label: 'Inativo', color: 'bg-gray-100 text-gray-800' },
            { value: 'blocked', label: 'Bloqueado', color: 'bg-red-100 text-red-800' },
            { value: 'pending', label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' }
          ].map((status) => (
            <label key={status.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value={status.value}
                checked={formData.status === status.value}
                onChange={(e) => onInputChange('status', e.target.value as User['status'])}
                disabled={isReadOnly}
                className="text-primary-500 focus:ring-primary-500"
              />
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${status.color}`}>
                {status.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {!formData.id && (
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Senha Temporária
          </label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                type={showPassword ? 'text' : 'password'}
                value={generatedPassword}
                onChange={(e) => setGeneratedPassword(e.target.value)}
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
              <Button
                type="button"
                onClick={onTogglePassword}
                variant="ghost"
                icon={showPassword ? EyeOff : Eye}
                iconOnly={true}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="small"
              icon={RefreshCw}
              onClick={onGeneratePassword}
            />
            <Button
              type="button"
              variant="outline"
              size="small"
              onClick={onCopyPassword}
              icon={Copy}
              className="border-gray-300 text-gray-800 hover:bg-gray-100"
            >
              Copiar
            </Button>
          </div>
          <div className="mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                defaultChecked
              />
              <span className="text-sm text-gray-600">Enviar credenciais por email</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfoSection; 