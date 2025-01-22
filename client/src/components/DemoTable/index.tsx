'use client';

import { FC } from 'react';
import { DemoTableRow } from '@/types';
import styles from './styles.module.css';

interface DemoTableProps {
  data: DemoTableRow[];
  isLoading: boolean;
  error?: string;
}

export const DemoTable: FC<DemoTableProps> = ({ data, isLoading, error }) => {
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={`${row.id}-${Math.random().toString(36).substr(2, 9)}`}>
                <td className="px-6 py-4 text-black">{row.id}</td>
                <td className="px-6 py-4 text-black">{row.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="px-6 py-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}; 