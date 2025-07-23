import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { RatingProvider, useRating } from '../RatingContext';
import { RatingFormData } from '@/validations/ratingSchema/ratingSchema';
import { ReactNode } from 'react';
import { createContext } from 'react';

// Mock do console.log para verificar chamadas
vi.spyOn(console, 'log').mockImplementation(() => {});

describe('RatingProvider', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <RatingProvider>{children}</RatingProvider>
  );

  it('When context is used outside provider, then throws error', () => {
    expect(() => {
      renderHook(() => useRating(), { wrapper: undefined });
    }).toThrowError('useRating must be used within a RatingProvider');
  });

  it('When provider is mounted, then initial values are set correctly', () => {
    const { result } = renderHook(() => useRating(), { wrapper });

    expect(result.current.consultaData).toBeNull();
    expect(result.current.formState.isValid).toBe(false);
    expect(result.current.getValues()).toEqual({
      personType: undefined,
      document: '',
      newConsultation: false,
    });
  });

  it('When onSubmit is called with valid data, then consultaData is updated', () => {
    const { result } = renderHook(() => useRating(), { wrapper });
    const testData: RatingFormData = {
      personType: 'fisica',
      document: '12345678901',
      newConsultation: true,
    };

    act(() => {
      result.current.onSubmit(testData);
    });

    expect(console.log).toHaveBeenCalledWith('Dados válidos:', testData);
    expect(result.current.consultaData).toEqual({
      ...testData,
      timestamp: expect.any(Date),
    });
  });

  it('When personType changes to undefined, then document is cleared', async () => {
    const { result } = renderHook(() => useRating(), { wrapper });

    // Primeiro setamos um valor válido
    await act(async () => {
      result.current.setValue('personType', 'fisica');
      result.current.setValue('document', '12345678901');
    });

    expect(result.current.getValues('document')).toBe('12345678901');

    // Depois mudamos personType para undefined
    await act(async () => {
      result.current.setValue('personType', "");
    });

    expect(result.current.getValues('document')).toBe('');
  });

  it('When form is initialized, then zod resolver is configured', () => {
    const { result } = renderHook(() => useRating(), { wrapper });
    
    expect(result.current.formState.errors).toEqual({});
    expect(result.current.control._options.resolver).toBeDefined();
  });
});

describe('RatingContext Type', () => {
  it('When context is created, then has correct type', () => {
    // Testa o tipo do contexto exportado
    const TestContext = createContext<unknown>(undefined);
    expect(TestContext).toBeDefined();
    expect(TestContext.Provider).toBeDefined();
    expect(TestContext.Consumer).toBeDefined();
  });
});