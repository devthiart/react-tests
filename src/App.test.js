import React from 'react';
import App, { calcularNovoSaldo } from './App';

import { fireEvent, render, screen } from '@testing-library/react';

describe('Componente principal', () => {
  describe('Quando eu realizo uma transação ', () => {
    test('que é um saque, o valor vai diminuir', () => {
      const saldo = 150;
      const operacao = {
        transacao: 'saque',
        valor: 50
      }
      const novoSaldo = calcularNovoSaldo(operacao, saldo);

      expect(novoSaldo).toBe(100);
    });

    test('que é um saque, a transação deve ser realizada', () => {
      render(<App />);

      const saldo = screen.getByText('R$ 1000');
      const transacao = screen.getByLabelText('Saque');
      const valor = screen.getByTestId('valor');
      const botaoTransacao = screen.getByText('Realizar operação');

      expect(saldo.textContent).toBe('R$ 1000');

      fireEvent.click(transacao, { target: { value: 'saque' }} );
      fireEvent.change(valor, { target: { value: 10 } });
      fireEvent.click(botaoTransacao);
      
      expect(saldo.textContent).toBe('R$ 990');
    });
  });

  describe('Quando o App do banco for aberto', () => {
    test('O nome do banco deve ser exibido.', () => {
      render(<App />);

      expect(screen.getByText('ByteBank')).toBeInTheDocument();
    });

    test('O saldo deve ser exibido', () => {
      render(<App />);

      expect(screen.getByText('Saldo:')).toBeInTheDocument();
    });

    test('O botão de realizar operação deve ser exibido.', () => {
      render(<App />);

      expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    });
  });
});
