import { screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';


describe('Testando a página de Login', () => {
  test('Testa se o formulário e a imagem de logo são renderizados na tela de Login', () => {
    renderWithRouterAndRedux(<App />);
    const Logo = screen.getByAltText('Logo');
    const imputEmail = screen.getByPlaceholderText('Digite seu email aqui');
    const imputPassword = screen.getByPlaceholderText('Digite sua senha aqui');
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(Logo).toBeInTheDocument();
    expect(imputEmail).toBeInTheDocument();
    expect(imputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })

  
  test('Testa se  o botão está desabilitado caso um dos campos não esteja preenchido', () => {
    renderWithRouterAndRedux(<App />);
    const imputPassword = screen.getByPlaceholderText('Digite sua senha aqui');
    const imputEmail = screen.getByPlaceholderText('Digite seu email aqui');
    const button = screen.getByRole('button', { name: 'Entrar' });
    
    userEvent.type(imputPassword, 'ro');
    userEvent.type(imputEmail, 'algum@email.com');
    expect(button).toBeDisabled();
    
    userEvent.type(imputPassword, 'root');
    userEvent.type(imputEmail, 'algum@email.com');
    expect(button).toBeDisabled();
    
    userEvent.type(imputPassword, 'root12');
    userEvent.type(imputEmail, 'algum@email.com');
    expect(button).toBeEnabled();
    
    userEvent.type(imputPassword, 'root123');
    userEvent.type(imputEmail, 'algum@email.com');
    expect(button).toBeEnabled();
    
    userEvent.type(imputPassword, 'root123');
    userEvent.type(imputEmail, 'algumemail.com');
    expect(button).toBeDisabled();
    
    userEvent.type(imputPassword, 'root123');
    userEvent.type(imputEmail, 'algum@email.br');
    expect(button).toBeDisabled();
     
  })
  
  test('Testa se ao clicar no botão settings é redirecionado para rota /settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const Button = screen.getByRole('button', { name: 'Entrar' });
    const imputPassword = screen.getByPlaceholderText('Digite sua senha aqui');
    const imputEmail = screen.getByPlaceholderText('Digite seu email aqui');
    
    userEvent.type(imputPassword, 'root123');
    userEvent.type(imputEmail, 'algum@email.com');
    fireEvent.click(Button);
     expect(history.location.pathname).toBe('/carteira');
  }); 
})