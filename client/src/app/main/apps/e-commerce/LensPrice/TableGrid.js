import React, { useState } from 'react';
import ReactDataGrid from 'react-data-grid';
import { createColData, tableRows } from './Grid';

function LensGrid() {
  // const columns = createColData(42);

  const [rows, setRow] = useState(tableRows);
  const [columns, setColumns] = useState(createColData(42));

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const newRows = rows;

    setRow(() => {
      for (let i = fromRow; i <= toRow; i++) {
        newRows[i] = { ...newRows[i], ...updated };
      }
      return [...newRows];
    });
  };

  return (
    <div>
      <ReactDataGrid
        columns={columns}
        rowGetter={(i) => rows[i]}
        rowsCount={rows.length}
        minHeight={550}
        enableCellSelect={true}
        onGridRowsUpdated={onGridRowsUpdated}
      />
    </div>
  );
}

export default LensGrid;
