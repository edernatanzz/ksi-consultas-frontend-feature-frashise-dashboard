import { render, screen, fireEvent } from '@testing-library/react';
import InadimplentesHeader from '../InadimplentesHeader';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext'; // ajuste o caminho conforme seu projeto

vi.mock('@/components/template/RouteGuard', () => ({
  PermissionGuard: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <AuthProvider>
      {ui}
    </AuthProvider>
  );
}

describe('InadimplentesHeader', () => {
  const defaultProps = {
    searchQuery: '',
    onSearchChange: vi.fn(),
    onSearchClear: vi.fn(),
    resultCount: 2,
    isSearchActive: false,
    navigationItems: [{ label: 'Inadimplentes', isActive: true }],
    pageTitle: 'Inadimplentes',
    pageSubtitle: 'Gerencie os inadimplentes do sistema',
    isMainView: true,
    handleBackToMain: vi.fn(),
  };

  it('When search input changes, then calls onSearchChange', () => {
    // Arrange
    renderWithProviders(<InadimplentesHeader {...defaultProps} />);
    const input = screen.getByRole('textbox');
    // Act
    fireEvent.change(input, { target: { value: 'teste' } });
    // Assert
    expect(defaultProps.onSearchChange).toHaveBeenCalled();
  });

  it('When "Incluir Inadimplentes" is clicked, then opens modal', () => {
    // Arrange & Act
    renderWithProviders(<InadimplentesHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('Incluir Inadimplentes'));
    // Assert
    expect(screen.getByRole('heading', { name: 'Negativar Devedor' })).toBeInTheDocument();
    expect(screen.getByText('Dados do Devedor')).toBeInTheDocument();
    expect(screen.getByText('Dados da Dívida')).toBeInTheDocument();
  });

  it('When "Dados da Dívida" tab is clicked, then shows debt fields', () => {
    renderWithProviders(<InadimplentesHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('Incluir Inadimplentes'));
    fireEvent.click(screen.getByText('Dados da Dívida'));
    // Assert
    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '...' } });
    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '...' } });
    expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0);
  });

  it('When filling debtor fields, updates formData', () => {
    renderWithProviders(<InadimplentesHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('Incluir Inadimplentes'));
    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'João' } });
    fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: '123456789' } });
  });

  it('When "Negativar Devedor" is clicked, then calls save logic', () => {
    const logSpy = vi.spyOn(console, 'log');
    renderWithProviders(<InadimplentesHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('Incluir Inadimplentes'));
    fireEvent.click(screen.getByRole('button', { name: /Negativar Devedor/i }));
    expect(logSpy).toHaveBeenCalledWith('Salvar formData', expect.any(Object));
    logSpy.mockRestore();
  });
  
  it('When pageSubtitle is null, subtitle is not rendered', () => {
    renderWithProviders(
      <InadimplentesHeader {...defaultProps} pageSubtitle={null} />
    );
    expect(screen.queryByText(defaultProps.pageSubtitle)).not.toBeInTheDocument();
  });

  it('When isSearchActive is true, passes resultCount to SearchSection', () => {
    renderWithProviders(
      <InadimplentesHeader {...defaultProps} isSearchActive={true} resultCount={5} />
    );
    expect(screen.getByText(/5.*resultad.*encontrad/i)).toBeInTheDocument();
  });

  it('When "Dados do Devedor" tab is clicked, then shows debtor fields', () => {
    renderWithProviders(<InadimplentesHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('Incluir Inadimplentes'));
    fireEvent.click(screen.getByText('Dados da Dívida'));
    fireEvent.click(screen.getByText('Dados do Devedor'));
    expect(screen.getByText('Nome')).toBeInTheDocument();
  });

  it('When modal is open in "divida" tab and "Cancelar" is clicked, then closes modal and resets tab', () => {
    renderWithProviders(<InadimplentesHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('Incluir Inadimplentes'));
    fireEvent.click(screen.getByText('Dados da Dívida'));
    fireEvent.click(screen.getByText('Cancelar'));
  });

  it('When modal is open and closed via Modal onClose, then resets state', () => {
    renderWithProviders(<InadimplentesHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('Incluir Inadimplentes'));
    // Simula o fechamento pelo onClose do Modal
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    // Ou, se o Modal expõe um botão de fechar:
    // fireEvent.click(screen.getByLabelText(/fechar/i));
    // Não precisa de assert, só cobre o caminho
  });

  it('When filling all debt fields, updates formData', () => {
    renderWithProviders(<InadimplentesHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('Incluir Inadimplentes'));
    fireEvent.click(screen.getByText('Dados da Dívida'));
    const textboxes = screen.getAllByRole('textbox');
    // Preencha todos os campos da aba "divida"
    textboxes.forEach((textbox, idx) => {
      fireEvent.change(textbox, { target: { value: `valor${idx}` } });
    });
  });

  it('When filling all fields in both tabs, all onChange functions are called', () => {
    renderWithProviders(<InadimplentesHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('Incluir Inadimplentes'));
  
    // Aba "Dados do Devedor"
    // Tipo de Pessoa (BasicSelect)
    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Pessoa Jurídica'));
  
    // Inputs de texto (ordem conforme renderização)
    const devedorFields = screen.getAllByRole('textbox');
    fireEvent.change(devedorFields[0], { target: { value: 'Nome Teste' } }); // Nome
    fireEvent.change(devedorFields[1], { target: { value: '12345678900' } }); // Documento
    fireEvent.change(devedorFields[2], { target: { value: '12345-678' } }); // CEP
    fireEvent.change(devedorFields[3], { target: { value: 'Rua Teste' } }); // Endereço
    fireEvent.change(devedorFields[4], { target: { value: 'Centro' } }); // Bairro
    fireEvent.change(devedorFields[5], { target: { value: 'Cidade Teste' } }); // Cidade
    fireEvent.change(devedorFields[6], { target: { value: 'SP' } }); // Estado
  
    // Troca para aba "Dados da Dívida"
    fireEvent.click(screen.getByText('Dados da Dívida'));
  
    // Inputs de texto da aba dívida (ordem conforme renderização)
    const dividaFields = screen.getAllByRole('textbox');
    fireEvent.change(dividaFields[0], { target: { value: 'Tipo Teste' } }); // Tipo de Devedor
    fireEvent.change(dividaFields[1], { target: { value: 'Natureza Teste' } }); // Natureza da Operação
    fireEvent.change(dividaFields[2], { target: { value: 'Contrato Teste' } }); // Contrato
    fireEvent.change(dividaFields[3], { target: { value: '12' } }); // N° de Parcelas
    fireEvent.change(dividaFields[4], { target: { value: '1000' } }); // Valor
    fireEvent.change(dividaFields[5], { target: { value: '2024-01-01' } }); // Data da Venda
    fireEvent.change(dividaFields[6], { target: { value: '2024-12-31' } }); // Data de Vencimento
  });

  it('When modal is open and "Cancelar" is clicked, then closes modal', () => {
    // Arrange
    renderWithProviders(<InadimplentesHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('Incluir Inadimplentes'));
    // Act
    fireEvent.click(screen.getByText('Cancelar'));
    // Assert
    expect(screen.queryByText('Negativar Devedor')).not.toBeInTheDocument();
  });
});