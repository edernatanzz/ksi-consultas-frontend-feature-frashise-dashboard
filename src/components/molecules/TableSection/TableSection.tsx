'use client'
import React from 'react';
import Table, { TableColumn } from '@/components/atoms/Table/Table';

export interface TableSectionProps {
  title?: string;
  columns: TableColumn[];
  data: Record<string, React.ReactNode>[];
}

const TableSection: React.FC<TableSectionProps> = ({ title, columns, data }) => (
  <section>
    {title && (
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
    )}
    <Table columns={columns} data={data} />
  </section>
);

export default TableSection;