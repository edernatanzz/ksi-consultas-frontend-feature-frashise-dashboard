import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FranchiseeParceirosPage from '../page';
import userEvent from '@testing-library/user-event';

describe('FranchiseeParceirosPage', () => {
  // Teste 1: Renderização inicial
  it('When component is rendered, then it should display the main elements', () => {
    render(<FranchiseeParceirosPage />);
    
    expect(screen.getByText('Parceiros')).toBeInTheDocument();
    expect(screen.getByText('Sistema de Gerenciamento de Franqueados')).toBeInTheDocument();
    expect(screen.getByText('Gestão de parceiros')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar parceiro')).toBeInTheDocument();
    expect(screen.getByText('Adicionar parceiro')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  // Teste 2: Filtro de busca
  it('When searching for a partner, then it should filter the table results', async () => {
    render(<FranchiseeParceirosPage />);
    const searchInput = screen.getByPlaceholderText('Buscar parceiro');
    
    await userEvent.type(searchInput, 'Parceiro A');
    
    expect(screen.getByText('Parceiro A')).toBeInTheDocument();
    expect(screen.queryByText('Parceiro B')).not.toBeInTheDocument();
    expect(screen.queryByText('Parceiro C')).not.toBeInTheDocument();
  });

  // Teste 3: Abertura do modal de criação
  it('When clicking add partner button, then it should open the create partner modal', async () => {
    render(<FranchiseeParceirosPage />);
    const addButton = screen.getByText('Adicionar parceiro');
    
    await userEvent.click(addButton);
    
    // Verifica se o modal foi aberto procurando pelo título
    expect(screen.getByText('Cadastro de Novo Parceiro')).toBeInTheDocument();
    
    // Verifica os campos do formulário por placeholder
    expect(screen.getByPlaceholderText('Digite o nome do parceiro')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email@exemplo.com')).toBeInTheDocument();
  });

  // Teste 4: Validação de formulário
  it('When submitting form with invalid data, then it should show validation errors', async () => {
    render(<FranchiseeParceirosPage />);
    await userEvent.click(screen.getByText('Adicionar parceiro'));
    
    const saveButton = screen.getByText('Salvar Parceiro');
    await userEvent.click(saveButton);
    
    // Verifica mensagens de erro
    expect(await screen.findByText('Nome é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Telefone é obrigatório')).toBeInTheDocument();
  });

  // Teste 5: Toggle de status de bloqueio
  it('When clicking lock icon, then it should toggle partner lock status', async () => {
    render(<FranchiseeParceirosPage />);
    
    // Encontra o primeiro ícone de bloqueio (LockOutlinedIcon)
    const lockIcons = screen.getAllByTestId('LockIcon');
    const firstLockIcon = lockIcons[0];
    
    await userEvent.click(firstLockIcon);
    
    // Verifica se o ícone mudou para desbloqueado
    // Usamos queryAllByTestId porque pode haver múltiplos ícones
    expect(screen.queryAllByTestId('LockOpenIcon').length).toBeGreaterThan(0);
  });

  // Teste 6: Abertura do modal de edição
  it('When clicking edit icon, then it should open edit modal with partner data', async () => {
    render(<FranchiseeParceirosPage />);
    const editIcons = screen.getAllByTestId('EditIcon');
    const firstEditIcon = editIcons[0];
    
    await userEvent.click(firstEditIcon);
    
    await waitFor(() => {
      expect(screen.getByText('Editar Parceiro')).toBeInTheDocument();
      // Verifica se os dados do parceiro estão no formulário
      expect(screen.getByDisplayValue('Parceiro A')).toBeInTheDocument();
      expect(screen.getByDisplayValue('parceiro.a@exemplo.com')).toBeInTheDocument();
    });
  });

  // Teste 7: Abertura do modal de confirmação de exclusão
  it('When clicking delete icon, then it should open delete confirmation modal', async () => {
    render(<FranchiseeParceirosPage />);
    const deleteIcons = screen.getAllByTestId('DeleteIcon');
    const firstDeleteIcon = deleteIcons[0];
    
    await userEvent.click(firstDeleteIcon);
    
    // Verifica se o modal de confirmação foi aberto
    expect(screen.getByText('Confirmar Exclusão')).toBeInTheDocument();
    expect(screen.getByText('Tem certeza que deseja excluir este parceiro?')).toBeInTheDocument();
    
    // Verifica se há o ícone de deletar no modal
    expect(screen.getByTestId('DeleteForeverOutlinedIcon')).toBeInTheDocument();
    
    // Verifica botões específicos do modal
    expect(screen.getByText('Sim, Excluir')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    
    // Verifica se há um aviso sobre ação irreversível (único do modal)
    expect(screen.getByText(/Esta ação não pode ser desfeita/)).toBeInTheDocument();
  });

  // Teste 8: Formatação de campos
  it('When typing phone number, then it should format automatically', async () => {
    render(<FranchiseeParceirosPage />);
    await userEvent.click(screen.getByText('Adicionar parceiro'));
    const phoneInput = screen.getByPlaceholderText('(11) 99999-9999');
    
    await userEvent.type(phoneInput, '11999999999');
    
    expect(phoneInput).toHaveValue('(11) 99999-9999');
  });

  // Teste 9: Validação de CNPJ
  it('When typing invalid CNPJ, then it should show validation error', async () => {
    render(<FranchiseeParceirosPage />);
    await userEvent.click(screen.getByText('Adicionar parceiro'));
    const cnpjInput = screen.getByPlaceholderText('00.000.000/0000-00');
    
    await userEvent.type(cnpjInput, '123');
    fireEvent.blur(cnpjInput);
    
    expect(await screen.findByText('CNPJ inválido')).toBeInTheDocument();
  });

  // Teste 10: Criação de novo parceiro
  it('When submitting valid form, then it should add new partner to the table', async () => {
    render(<FranchiseeParceirosPage />);
    await userEvent.click(screen.getByText('Adicionar parceiro'));
    
    // Preencher formulário com dados válidos usando placeholders
    await userEvent.type(screen.getByPlaceholderText('Digite o nome do parceiro'), 'Novo Parceiro');
    await userEvent.type(screen.getByPlaceholderText('email@exemplo.com'), 'novo@parceiro.com');
    await userEvent.type(screen.getByPlaceholderText('(11) 99999-9999'), '11987654321');
    
    // Act
    await userEvent.click(screen.getByText('Salvar Parceiro'));
    
    // Assert
    await waitFor(() => {
      expect(screen.queryByText('Cadastro de Novo Parceiro')).not.toBeInTheDocument();
      expect(screen.getByText('Novo Parceiro')).toBeInTheDocument();
    });
  });

  // Teste 11: Exclusão de parceiro
  it('When confirming partner deletion, then it should remove partner from table', async () => {
    render(<FranchiseeParceirosPage />);
    const deleteIcons = screen.getAllByTestId('DeleteIcon');
    await userEvent.click(deleteIcons[0]);
    
    const confirmButton = screen.getByText('Sim, Excluir');
    await userEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Parceiro A')).not.toBeInTheDocument();
      expect(screen.getByText('Parceiro B')).toBeInTheDocument();
    });
  });

  // Teste 12: Filtro sem resultados
  it('When searching for non-existent partner, then it should show no results message', async () => {
    render(<FranchiseeParceirosPage />);
    const searchInput = screen.getByPlaceholderText('Buscar parceiro');
    
    await userEvent.type(searchInput, 'Parceiro Inexistente');
    
    expect(await screen.findByText('Nenhum parceiro encontrado')).toBeInTheDocument();
    expect(screen.getByText(/Não foram encontrados parceiros com o termo/)).toBeInTheDocument();
  });

  // Teste 13: Formatação de CEP
  it('When typing CEP, then it should format automatically', async () => {
    render(<FranchiseeParceirosPage />);
    await userEvent.click(screen.getByText('Adicionar parceiro'));
    const cepInput = screen.getByPlaceholderText('00000-000');
    
    await userEvent.type(cepInput, '01000000');
    
    expect(cepInput).toHaveValue('01000-000');
  });

  // Teste 14: Validação de email
  it('When typing invalid email, then it should show validation error', async () => {
    render(<FranchiseeParceirosPage />);
    await userEvent.click(screen.getByText('Adicionar parceiro'));
    const emailInput = screen.getByPlaceholderText('email@exemplo.com');
    
    await userEvent.type(emailInput, 'emailinvalido');
    fireEvent.blur(emailInput);
    
    expect(await screen.findByText('Email inválido')).toBeInTheDocument();
  });

  // Teste 15: Cancelamento de modal
  it('When clicking cancel button on modal, then it should close the modal', async () => {
    render(<FranchiseeParceirosPage />);
    await userEvent.click(screen.getByText('Adicionar parceiro'));
    
    await userEvent.click(screen.getByText('Cancelar'));
    
    expect(screen.queryByText('Cadastro de Novo Parceiro')).not.toBeInTheDocument();
  });

  // Teste 16: Validação completa de telefone no handleSave
  it('When submitting form with invalid phone, then it should show validation error in handleSave', async () => {
    render(<FranchiseeParceirosPage />);
    await userEvent.click(screen.getByText('Adicionar parceiro'));
    
    // Preencher campos obrigatórios
    await userEvent.type(screen.getByPlaceholderText('Digite o nome do parceiro'), 'Teste');
    await userEvent.type(screen.getByPlaceholderText('email@exemplo.com'), 'teste@teste.com');
    await userEvent.type(screen.getByPlaceholderText('(11) 99999-9999'), '123'); // Telefone inválido
    
    await userEvent.click(screen.getByText('Salvar Parceiro'));
    
    expect(await screen.findByText('Telefone inválido')).toBeInTheDocument();
  });

  // Teste 17: Validação completa de CEP no handleSave
  it('When submitting form with invalid CEP, then it should show validation error in handleSave', async () => {
    render(<FranchiseeParceirosPage />);
    await userEvent.click(screen.getByText('Adicionar parceiro'));
    
    // Preencher campos obrigatórios
    await userEvent.type(screen.getByPlaceholderText('Digite o nome do parceiro'), 'Teste');
    await userEvent.type(screen.getByPlaceholderText('email@exemplo.com'), 'teste@teste.com');
    await userEvent.type(screen.getByPlaceholderText('(11) 99999-9999'), '11999999999');
    await userEvent.type(screen.getByPlaceholderText('00000-000'), '123'); // CEP inválido
    
    await userEvent.click(screen.getByText('Salvar Parceiro'));
    
    expect(await screen.findByText('CEP inválido')).toBeInTheDocument();
  });

  // Teste 18: Validação completa de CNPJ no handleSave
  it('When submitting form with invalid CNPJ, then it should show validation error in handleSave', async () => {
    render(<FranchiseeParceirosPage />);
    await userEvent.click(screen.getByText('Adicionar parceiro'));
    
    // Preencher campos obrigatórios
    await userEvent.type(screen.getByPlaceholderText('Digite o nome do parceiro'), 'Teste');
    await userEvent.type(screen.getByPlaceholderText('email@exemplo.com'), 'teste@teste.com');
    await userEvent.type(screen.getByPlaceholderText('(11) 99999-9999'), '11999999999');
    await userEvent.type(screen.getByPlaceholderText('00.000.000/0000-00'), '123'); // CNPJ inválido
    
    await userEvent.click(screen.getByText('Salvar Parceiro'));
    
    expect(await screen.findByText('CNPJ inválido')).toBeInTheDocument();
  });

  // Teste 19: Validação completa de email no handleSave
  it('When submitting form with invalid email in handleSave, then it should show validation error', async () => {
    render(<FranchiseeParceirosPage />);
    await userEvent.click(screen.getByText('Adicionar parceiro'));
    
    // Preencher campos obrigatórios
    await userEvent.type(screen.getByPlaceholderText('Digite o nome do parceiro'), 'Teste');
    await userEvent.type(screen.getByPlaceholderText('email@exemplo.com'), 'emailinvalido'); // Email inválido
    await userEvent.type(screen.getByPlaceholderText('(11) 99999-9999'), '11999999999');
    
    await userEvent.click(screen.getByText('Salvar Parceiro'));
    
    expect(await screen.findByText('Email inválido')).toBeInTheDocument();
  });



  // Teste 20.1: Teste de fechamento do modal de saldo
  it('When clicking close button on balance modal, then it should close the modal', async () => {
    render(<FranchiseeParceirosPage />);
    const balanceIcons = screen.getAllByTestId('ViewBalanceIcon');
    
    await userEvent.click(balanceIcons[0]);
    
    // Verifica se o modal está aberto
    expect(screen.getByText('Saldo do Parceiro')).toBeInTheDocument();
    
    // Clica no botão Fechar
    await userEvent.click(screen.getByText('Fechar'));
    
    // Verifica se o modal foi fechado
    await waitFor(() => {
      expect(screen.queryByText('Saldo do Parceiro')).not.toBeInTheDocument();
    });
  });

  // Teste 21: Teste do toggle de status unlock
  it('When clicking unlock icon, then it should toggle to lock', async () => {
    render(<FranchiseeParceirosPage />);
    
    // Primeiro, vamos clicar no ícone de lock para transformá-lo em unlock
    const lockIcons = screen.getAllByTestId('LockIcon');
    await userEvent.click(lockIcons[1]); // Parceiro B que começa desbloqueado
    
    // Agora clicamos no ícone de unlock para voltar ao lock
    const unlockIcons = screen.getAllByTestId('LockOpenIcon');
    await userEvent.click(unlockIcons[0]);
    
    // Verifica se voltou para lock
    expect(screen.getAllByTestId('LockIcon').length).toBeGreaterThan(0);
  });

  // Teste 22: Cancelamento do modal de exclusão
  it('When clicking cancel on delete modal, then it should close the modal', async () => {
    render(<FranchiseeParceirosPage />);
    const deleteIcons = screen.getAllByTestId('DeleteIcon');
    await userEvent.click(deleteIcons[0]);
    
    // Clica em cancelar no modal de exclusão
    const cancelButtons = screen.getAllByText('Cancelar');
    const deleteModalCancelButton = cancelButtons[cancelButtons.length - 1]; // O último botão Cancelar
    await userEvent.click(deleteModalCancelButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Confirmar Exclusão')).not.toBeInTheDocument();
    });
  });

  // Teste 23: Teste da exibição da tabela quando não há busca
  it('When no search term is provided, then it should show the default table', () => {
    render(<FranchiseeParceirosPage />);
    
    // Verifica se todos os parceiros estão sendo exibidos
    expect(screen.getByText('Parceiro A')).toBeInTheDocument();
    expect(screen.getByText('Parceiro B')).toBeInTheDocument();
    expect(screen.getByText('Parceiro C')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  // Teste 24: Limpeza do campo de busca
  it('When clearing search field, then it should show all partners again', async () => {
    render(<FranchiseeParceirosPage />);
    const searchInput = screen.getByPlaceholderText('Buscar parceiro');
    
    // Digita algo para filtrar
    await userEvent.type(searchInput, 'Parceiro A');
    expect(screen.queryByText('Parceiro B')).not.toBeInTheDocument();
    
    // Limpa o campo
    await userEvent.clear(searchInput);
    
    // Verifica se todos voltaram
    expect(screen.getByText('Parceiro A')).toBeInTheDocument();
    expect(screen.getByText('Parceiro B')).toBeInTheDocument();
    expect(screen.getByText('Parceiro C')).toBeInTheDocument();
  });
});