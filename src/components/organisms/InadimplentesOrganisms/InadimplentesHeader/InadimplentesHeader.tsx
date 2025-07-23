'use client'
import React, { useState } from 'react';
import SearchSection from '@/components/molecules/SearchSection/SeachSection'
import Navigation from '@/components/atoms/Navigation/Navigation'
import Button from '@/components/atoms/Button/Button'
import Modal from '@/components/atoms/Modal/Modal';
import ButtonsSwitch from '@/components/molecules/ButtonsSwitch/ButtonsSwitch';
import BasicSelect, { BasicSelectOption } from '@/components/atoms/BasicSelect/BasicSelect';
import InputField from '@/components/atoms/InputField/InputField';
import type { Inadimplente } from '@/app/inadimplentes/page';

interface InadimplentesHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  resultCount?: number;
  isSearchActive: boolean;
  navigationItems: { label: string; isActive?: boolean; onClick?: () => void }[];
  pageTitle: string;
  pageSubtitle: string | null;
}

const tipoPessoaOptions: BasicSelectOption[] = [
  { label: 'Pessoa Física', value: 'F' },
  { label: 'Pessoa Jurídica', value: 'J' },
];

const InadimplentesHeader: React.FC<InadimplentesHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSearchClear,
  resultCount,
  isSearchActive,
  navigationItems,
  pageTitle,
  pageSubtitle,
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Inadimplente | null>(null);
  const [modalTab, setModalTab] = useState<'devedor' | 'divida'>('devedor');

  const handleOpenModal = () => {
    setFormData({
      id: 0,
      nome: '',
      tipoDocumento: '',
      documento: '',
      dataInclusao: '',
      // Adicione os demais campos necessários com valores padrão
    });
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setFormData(null);
    setModalTab('devedor');
  };

  return (
    <>
      <Navigation items={navigationItems} />

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 sm:mb-8 gap-4 lg:gap-0">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-medium text-black break-words">
            {pageTitle}
          </h1>
          {pageSubtitle && (
            <p className="text-gray-600 mt-1 text-sm break-words">
              {pageSubtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between items-stretch gap-2">
        <div
          data-testid="buttons-container"
          className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2 lg:mt-0 items-stretch"
        >
            <Button
              variant="primary"
              size="small"
              startIcon={<span className="material-icons text-[20px]">add_circle</span>}
              className="w-full sm:w-auto h-12"
              onClick={handleOpenModal}
            >
              Incluir Inadimplentes
            </Button>
            <Button
              variant="secondary"
              size="small"
              startIcon={<span className="material-icons text-[20px]">print</span>}
              className="w-full sm:w-auto h-12"
            >
              Imprimir
            </Button>
            <Button
              variant="secondary"
              size="small"
              startIcon={<span className="material-icons text-[20px]">table_view</span>}
              className="w-full sm:w-auto h-12"
            >
              Gerar Excel
            </Button>
        </div>
        <div className="flex-1 max-w-xs">
          <SearchSection
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            onSearchClear={onSearchClear}
            resultCount={isSearchActive ? resultCount : undefined}
            isSearchActive={isSearchActive}
          />
        </div>
      </div>

      <Modal isOpen={open} onClose={handleCloseModal}>
        {formData && (
          <div className="p-4 min-w-[300px] flex flex-col gap-4">
            <h2 className="text-xl font-bold">Negativar Devedor</h2>

            <div className="w-full">
              <ButtonsSwitch
                options={[
                  { label: 'Dados do Devedor', value: 'devedor' },
                  { label: 'Dados da Dívida', value: 'divida' },
                ]}
                value={modalTab}
                onChange={(value) => setModalTab(value as 'devedor' | 'divida')}
              />
            </div>

            {/* Conteúdo condicional */}
            {modalTab === 'devedor' && (
              <>
                <BasicSelect
                  label="Tipo de Pessoa"
                  value={formData.tipoDocumento ?? ''}
                  onChange={(newValue) =>
                    setFormData({ ...formData, tipoDocumento: String(newValue) })
                  }
                  options={tipoPessoaOptions}
                />

                <div className="flex gap-4">
                  <InputField
                    label="Nome"
                    value={formData.nome}
                    onChange={(value: string) =>
                      setFormData({ ...formData, nome: value })
                    }
                  />
                  <InputField
                    label="Documento"
                    value={formData.documento}
                    onChange={(value: string) =>
                      setFormData({ ...formData, documento: value })
                    }
                  />
                </div>

                <div className="flex gap-4">
                  <InputField
                    label="CEP"
                    value={formData.cep || ''}
                    onChange={(value: string) =>
                      setFormData({ ...formData, cep: value })
                    }
                  />
                  <InputField
                    label="Endereço"
                    value={formData.logradouro || ''}
                    onChange={(value: string) =>
                      setFormData({ ...formData, logradouro: value })
                    }
                  />
                </div>

                <div className="flex gap-4">
                  <InputField
                    label="Bairro"
                    value={formData.bairro || ''}
                    onChange={(value: string) =>
                      setFormData({ ...formData, bairro: value })
                    }
                  />
                  <InputField
                    label="Cidade"
                    value={formData.cidade || ''}
                    onChange={(value: string) =>
                      setFormData({ ...formData, cidade: value })
                    }
                  />
                  <InputField
                    label="Estado"
                    value={formData.uf || ''}
                    onChange={(value: string) =>
                      setFormData({ ...formData, uf: value })
                    }
                  />
                </div>
              </>
            )}

            {modalTab === 'divida' && (
              <>
                {/* Exemplo: campos de dívida */}
                <div className="flex gap-4">
                  <InputField
                    label="Tipo de Devedor"
                    value={formData.tipoDevedor || ''}
                    onChange={(value: string) =>
                      setFormData({ ...formData, tipoDevedor: value })
                    }
                  />
                  <InputField
                    label="Natureza da Operação"
                    value={formData.naturezaOperacao || ''}
                    onChange={(value: string) =>
                      setFormData({ ...formData, naturezaOperacao: value })
                    }
                  />
                </div>
                <div className="flex gap-4">
                  <InputField
                    label="Contrato"
                    value={formData.contrato || ''}
                    onChange={(value: string) =>
                      setFormData({ ...formData, contrato: value })
                    }
                  />
                  <InputField
                    label="N° de Parcelas"
                    value={formData.nParcela || ''}
                    onChange={(value: string) =>
                      setFormData({ ...formData, nParcela: value })
                    }
                  />
                  <InputField
                    label="Valor"
                    value={formData.valor || ''}
                    onChange={(value: string) =>
                      setFormData({ ...formData, valor: value })
                    }
                  />
                </div>
                <div className="flex gap-4">
                  <InputField
                    label="Data da Venda"
                    value={formData.dataVenda || ''}
                    onChange={(value: string) =>
                      setFormData({ ...formData, dataVenda: value })
                    }
                  />
                  <InputField
                    label="Data de Vencimento"
                    value={formData.dataVencimento || ''}
                    onChange={(value: string) =>
                      setFormData({ ...formData, dataVencimento: value })
                    }
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-end gap-2 mt-4">
              <Button variant="secondary" size="small" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                startIcon={<span className="material-icons text-[20px]">save</span>}
                size="small"
                onClick={() => {
                  console.log('Salvar formData', formData);
                  // Chamar API ou salvar
                }}
              >
                Negativar Devedor
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default InadimplentesHeader;