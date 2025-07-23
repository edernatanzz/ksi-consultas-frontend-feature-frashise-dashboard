'use client';
import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import EmptyState from '../EmptyStates/EmptyState';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  icon?: React.ReactNode;
  colorHeader?: string;
  colorTextHeader?: string;
  colorLine?: string;
  render?: (value: React.ReactNode, row: Record<string, React.ReactNode>) => React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: Record<string, React.ReactNode>[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => (
  <TableContainer component={Paper}>
    <MuiTable size="small">
      <TableHead>
        <TableRow className={columns[0].colorHeader || 'bg-secondary-800'}>
          {columns.map(col => (
            <TableCell 
              key={col.key} 
              align={col.align || 'left'}
              className={`font-bold ${col.colorTextHeader || 'text-white'}`}
            >
                {col.icon && col.icon}
                {col.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} align="center">
              <EmptyState
                icon="table_chart"
                title="Nenhum dado encontrado"
                message="Não há registros para exibir nesta tabela."
                showAnimation={false}/>
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, idx) => (
            <TableRow 
              key={idx}
              className={idx % 2 === 0 ? (columns[0].colorLine || 'bg-secondary-100') : 'bg-white'}
            >
              {columns.map(col => (
                <TableCell key={col.key} align={col.align || 'left'}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </MuiTable>
  </TableContainer>
);

export default Table;