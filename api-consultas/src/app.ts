// import express, { Application, Request, Response, NextFunction } from 'express';
// import cors from 'cors';
// import consultaRoutes from '../routes/consultaRoutes';

// const app: Application = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   next();
// });

// app.use('/api/consulta', consultaRoutes);

// app.get('/', (req: Request, res: Response) => {
//   res.json({
//     message: 'API de Consultas - Use os endpoints /api/consulta/cpf/:cpf ou /api/consulta/cnpj/:cnpj'
//   });
// });

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error('Erro:', err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Erro interno do servidor'
//   });
// });

// app.use((req: Request, res: Response) => {
//   res.status(404).json({
//     success: false,
//     message: 'Endpoint não encontrado'
//   });
// });

// export default app;