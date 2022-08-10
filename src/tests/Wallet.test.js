import { screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import Wallet from '../pages/Wallet';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

test('Teste se é renderizado um Header na pagina wallet:', () => {
  renderWithRouterAndRedux(<Wallet />);
  
  expect(screen.getByText('Email:')).toBeInTheDocument();
  expect(screen.getByText('Despesa Total:')).toBeInTheDocument();
  expect(screen.getByText('BRL')).toBeInTheDocument();
  });

  test('Teste se é renderizado um formulário na pagina wallet:', () => {
    renderWithRouterAndRedux(<Wallet />);
    
    expect(screen.getByLabelText('Valor:')).toBeInTheDocument();
    expect(screen.getByLabelText('Moeda:')).toBeInTheDocument();
    expect(screen.getByLabelText('Metodo:')).toBeInTheDocument();
    expect(screen.getByLabelText('Categoria:')).toBeInTheDocument();
    expect(screen.getByLabelText('Descrição:')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Adicionar despesa' })).toBeInTheDocument();
  });
  
  test('Teste se é renderizado uma tabela na pagina wallet:', () => {
    renderWithRouterAndRedux(<Wallet />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(9);
    expect(screen.getByRole('columnheader', {name: 'Descrição'})).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {name: 'Tag'})).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {name: 'Método de pagamento'})).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {name: 'Valor'})).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {name: 'Moeda'})).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {name: 'Câmbio utilizado'})).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {name: 'Valor convertido'})).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {name: 'Moeda de conversão'})).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {name: 'Editar/Excluir'})).toBeInTheDocument();
  });
  
  test('Teste se é possivel adicionar uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);
    
    const valor = screen.getByLabelText('Valor:');
    const moeda = screen.getByLabelText('Moeda:');
    const metodo = screen.getByLabelText('Metodo:');
    const categoria = screen.getByLabelText('Categoria:');
    const Descrição = screen.getByLabelText('Descrição:');
    const button = screen.getByRole('button', {name: 'Adicionar despesa' });
    
    fireEvent.change(valor, { target: { value: 10.50 }});
    fireEvent.change(Descrição, { target: { value: "Sorvete" }});
    fireEvent.click(button);
    await waitFor (()=> 
      expect(screen.getAllByRole('row')).toHaveLength(2),
    {timeout: 3000});
    await waitFor (()=> 
    expect(screen.getByText("Sorvete")).toBeInTheDocument(),
    {timeout: 3000});
    
    await waitFor (()=> 
    expect(screen.getByText("10.50")).toBeInTheDocument(),
    {timeout: 3000});
    
    await waitFor (()=> 
    expect(screen.getByRole('button', {name: 'Excluir' })).toBeInTheDocument(),
    {timeout: 3000});
    
  });