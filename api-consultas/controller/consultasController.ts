// import { Request, Response } from 'express';
// import { findDataByCNPJ, findDataByCPF } from '../data/mockdata';


// const formatDocument = (doc: string): string => {
//   return doc.replace(/[^\d]/g, '');
// };

// const isValidCPF = (cpf: string): boolean => {
//   const cleanCPF = formatDocument(cpf);
  
//   if (cleanCPF.length !== 11) return false;
  
//   if (/^(\d)\1+$/.test(cleanCPF)) return false;
  
//   return true;
// };

// const isValidCNPJ = (cnpj: string): boolean => {
//   const cleanCNPJ = formatDocument(cnpj);
  
//   if (cleanCNPJ.length !== 14) return false;
  
//   if (/^(\d)\1+$/.test(cleanCNPJ)) return false;
  
//   return true;
// };

// export const consultarCPF = (req: Request, res: Response): void => {
//   try {
//     const { cpf } = req.params;
    
//     if (!cpf) {
//       res.status(400).json({ success: false, message: 'CPF não informado' });
//       return;
//     }
    
//     if (!isValidCPF(cpf)) {
//       res.status(400).json({ success: false, message: 'CPF inválido' });
//       return;
//     }
    
//     const result = findDataByCPF(cpf);
    
//     if (!result.success) {
//       res.status(404).json(result);
//       return;
//     }
    
//     res.status(200).json(result);
//   } catch (error) {
//     console.error('Erro ao consultar CPF:', error);
//     res.status(500).json({ success: false, message: 'Erro interno do servidor' });
//   }
// };

// export const consultarCNPJ = (req: Request, res: Response): void => {
//   try {
//     const { cnpj } = req.params;
    
//     if (!cnpj) {
//       res.status(400).json({ success: false, message: 'CNPJ não informado' });
//       return;
//     }
    
//     if (!isValidCNPJ(cnpj)) {
//       res.status(400).json({ success: false, message: 'CNPJ inválido' });
//       return;
//     }
    
//     const result = findDataByCNPJ(cnpj);
    
//     if (!result.success) {
//       res.status(404).json(result);
//       return;
//     }
    
//     res.status(200).json(result);
//   } catch (error) {
//     console.error('Erro ao consultar CNPJ:', error);
//     res.status(500).json({ success: false, message: 'Erro interno do servidor' });
//   }
// };