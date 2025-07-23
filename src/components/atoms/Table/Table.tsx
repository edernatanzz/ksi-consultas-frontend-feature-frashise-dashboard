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

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
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
        <TableRow>
          {columns.map(col => (
            <TableCell key={col.key} align={col.align || 'left'}>
              {col.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} align="center">
              Nenhum dado encontrado.
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, idx) => (
            <TableRow key={idx}>
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