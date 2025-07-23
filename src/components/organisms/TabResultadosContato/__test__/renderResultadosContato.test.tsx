import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderResultadosContato } from "@/components/organisms/TabResultadosContato/renderResultadosContato";
import { formatarTelefone } from "../renderResultadosContato";

export const mockData = {
  data: [
    { email: 'teste@teste.com' },
    { email: 'teste2@teste.com' },
    { email: 'teste3@teste.com' },
    { telefone: '11999999999' },
    { telefone: '11999999999' },
  ],
  enderecos: [
    {
      logradouro: 'Rua Teste',
      numero: '123',
      bairro: 'Bairro Teste',
      cidade: 'Cidade Teste',
      estado: 'Estado Teste',
    },
    {
      logradouro: 'Rua Teste',
      numero: '123',
      bairro: 'Bairro Teste',
      cidade: 'Cidade Teste',
      estado: 'Estado Teste',
    },
  ],
  pessoas: [
    {
      nome: 'ELIANE SANTOS PEREIRA',
      documento: '909.738.605-53',
      descricao: 'IRMÃO/IRMÃ',
    },
    {
      nome: 'MARIA ALICE SANTOS',
      documento: '070.455.735-53',
      descricao: 'MÃE',
    },
  ],
};

// Mock dos ícones do Lucide para não quebrar renderização
vi.mock("lucide-react", () => ({
  Mail: () => <svg data-testid="icon-mail" />,
  Phone: () => <svg data-testid="icon-phone" />,
  MapPin: () => <svg data-testid="icon-mappin" />,
  Users: () => <svg data-testid="icon-users" />,
}));

describe("formatarTelefone", () => {
  it("formats 11-digit number correctly", () => {
    expect(formatarTelefone("11999999999")).toBe("(11) 99999-9999");
  });

  it("formats 10-digit number correctly", () => {
    expect(formatarTelefone("1133334444")).toBe("(11) 3333-4444");
  });

  it("returns original string when number has less than 10 digits", () => {
    expect(formatarTelefone("1234567")).toBe("1234567");
  });

  it("returns original string when number has more than 11 digits", () => {
    expect(formatarTelefone("119999999999")).toBe("119999999999");
  });

  it("strips non-digit characters and formats 10-digit number", () => {
    expect(formatarTelefone("(11)3333-4444")).toBe("(11) 3333-4444");
  });

  it("strips non-digit characters and formats 11-digit number", () => {
    expect(formatarTelefone("(11)99999-9999")).toBe("(11) 99999-9999");
  });
});


describe("renderResultadosContato", () => {
  it("When rendered, then displays the correct number of emails", () => {
    // Arrange & Act
    render(renderResultadosContato(mockData));

    // Assert
    expect(screen.getByText("3 emails encontrados")).toBeInTheDocument();
    expect(screen.getByText("teste@teste.com")).toBeInTheDocument();
    expect(screen.getByText("teste2@teste.com")).toBeInTheDocument();
    expect(screen.getByText("teste3@teste.com")).toBeInTheDocument();
  });

  it("When rendered, then displays the correct number of formatted phones", () => {
    // Arrange & Act
    render(renderResultadosContato(mockData));

    // Assert
    expect(screen.getByText("2 telefones encontrados")).toBeInTheDocument();
    expect(screen.getAllByText("(11) 99999-9999")).toHaveLength(2);
  });

  it("When rendered, then displays all address cards", () => {
    // Arrange & Act
    render(renderResultadosContato(mockData));

    // Assert
    expect(screen.getByText("2 endereços encontrados")).toBeInTheDocument();
    expect(
      screen.getAllByText("Rua Teste, 123 - Bairro Teste - Cidade Teste - Estado Teste")
    ).toHaveLength(2);
  });

  it("When rendered, then displays all contact people", () => {
    // Arrange & Act
    render(renderResultadosContato(mockData));

    // Assert
    expect(screen.getByText("2 contatos encontrados")).toBeInTheDocument();
    expect(
      screen.getByText("ELIANE SANTOS PEREIRA - 909.738.605-53 - IRMÃO/IRMÃ")
    ).toBeInTheDocument();
    expect(
      screen.getByText("MARIA ALICE SANTOS - 070.455.735-53 - MÃE")
    ).toBeInTheDocument();
  });

  it("When rendered, then displays all icons correctly", () => {
    // Arrange & Act
    render(renderResultadosContato(mockData));

    // Assert
    expect(screen.getByTestId("icon-mail")).toBeInTheDocument();
    expect(screen.getByTestId("icon-phone")).toBeInTheDocument();
    expect(screen.getByTestId("icon-mappin")).toBeInTheDocument();
    expect(screen.getByTestId("icon-users")).toBeInTheDocument();
  });

  it("When data is empty, then displays 'Nenhum email encontrado'", () => {
    render(renderResultadosContato({ data: [], enderecos: [], pessoas: [] }));
    expect(screen.getByText("Nenhum email encontrado")).toBeInTheDocument();
  });

  it("When data has no phones, then displays 'Nenhum telefone encontrado'", () => {
    render(renderResultadosContato({ data: [{ email: 'only@email.com' }], enderecos: [], pessoas: [] }));
    expect(screen.getByText("Nenhum telefone encontrado")).toBeInTheDocument();
  });

  it("When address list is empty, then displays 'Nenhum endereço encontrado'", () => {
    render(renderResultadosContato({ data: [], enderecos: [], pessoas: [] }));
    expect(screen.getByText("Nenhum endereço encontrado")).toBeInTheDocument();
  });

  it("When contact list is empty, then displays 'Nenhum contato encontrado'", () => {
    render(renderResultadosContato({ data: [], enderecos: [], pessoas: [] }));
    expect(screen.getByText("Nenhum contato encontrado")).toBeInTheDocument();
  });

});
