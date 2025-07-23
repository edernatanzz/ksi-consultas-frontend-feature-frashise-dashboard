import { z } from 'zod';

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

export const consultaFormSchema = z.object({
  personType: z.enum(['fisica', 'juridica'], {
    required_error: 'Selecione o tipo de pessoa',
  }),
  document: z.string()
    .min(1, 'O documento é obrigatório')
    .refine((value) => {
      const cleanValue = value.replace(/\D/g, '');
      return cleanValue.length === 11 || cleanValue.length === 14;
    }, (val) => ({
      message: val.replace(/\D/g, '').length < 11 ? 'Digite o documento completo' : 'Documento inválido'
    }))
    .refine((value) => {
      return cpfRegex.test(value) || cnpjRegex.test(value);
    }, 'Formato de documento inválido'),
  newConsultation: z.boolean(),
});

export type ConsultaFormData = z.infer<typeof consultaFormSchema>;