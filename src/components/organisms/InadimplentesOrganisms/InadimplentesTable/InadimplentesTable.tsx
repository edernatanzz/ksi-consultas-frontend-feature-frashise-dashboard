'use client';

import React, { useState } from 'react';
import TableSection from '@/components/molecules/TableSection/TableSection';
import BasicMenu from '@/components/atoms/BasicMenu/BasicMenu';
import Modal from '@/components/atoms/Modal/Modal';
import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/atoms/InputField/InputField';
import BasicSelect, { BasicSelectOption } from '@/components/atoms/BasicSelect/BasicSelect';
import ButtonsSwitch from '@/components/molecules/ButtonsSwitch/ButtonsSwitch';
import Badge from '@/components/atoms/Badge/Badge';
import type { Inadimplente } from '@/app/inadimplentes/page';

interface InadimplentesTableProps {
  data: Inadimplente[];
}

const InadimplentesTable: React.FC<InadimplentesTableProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Inadimplente | null>(null);
  const [modalTab, setModalTab] = useState<'devedor' | 'divida'>('devedor');

  const tipoPessoaOptions: BasicSelectOption[] = [
    { label: 'Pessoa Física', value: 'F' },
    { label: 'Pessoa Jurídica', value: 'J' },
  ];

  const handleOpenModal = (row: Inadimplente) => {
    setFormData({ ...row });
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  // Exemplo de colunas
  const columns = [
    { key: 'id', label: '#' },
    { key: 'nome', label: 'Inadimplente' },
    { key: 'documento', label: 'Documento' },
    { key: 'dataInclusao', label: 'Data de Inclusão' },
    {
      key: 'dataBaixa',
      label: 'Data de Baixa',
      render: (value: React.ReactNode) =>
        value && value !== '' ? value : '---',
    },
    {
      key: 'status',
      label: 'Situação',
      render: (value: React.ReactNode) =>
        value === 'Baixado' ? (
          <Badge variant="status" type="active">
            Baixado
          </Badge>
        ) : (
          <Badge variant="status" type="blocked">
            Inadimplente
          </Badge>
        ),
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (_value: React.ReactNode, row: Record<string, React.ReactNode>) => (
        <BasicMenu
          options={[
            {
              label: 'Visualizar Inclusão',
              icon: <span className="material-icons text-[20px]">visibility</span>,
              onClick: () => handleOpenModal(row as Inadimplente),
            },
            {
              label: 'Visualizar Baixa',
              icon: <span className="material-icons text-[20px]">download</span>,
              onClick: () => console.log('Visualizar ID:', row.id),
            },
          ]}
          iconButtonProps={{ size: 'small' }}
        />
      ),
    },
  ];

  // Ajusta data para mostrar status
  const tableData = data.map(item => ({
    ...item,
    status: item.dataBaixa && item.dataBaixa !== '' ? 'Baixado' : 'Inadimplente',
  }));

  return (
    <>
      <TableSection title="Lista de Inadimplentes" columns={columns} data={tableData} />

      <Modal isOpen={open} onClose={handleCloseModal}>
        {formData && (
          <div className="p-4 min-w-[300px] flex flex-col gap-4">
            <h2 className="text-xl font-bold">Detalhes do Inadimplente</h2>

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
                Salvar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default InadimplentesTable;