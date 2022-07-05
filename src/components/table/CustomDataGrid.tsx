/* eslint-disable padding-line-between-statements */
import { useCallback, useEffect, useMemo, useState } from 'react';
import DataGrid, { Column } from 'react-data-grid';
import { useSelector } from 'react-redux';
import { getCouponList } from 'src/store/selectors/entities/coupon';
import { UpdateCoupon } from '../update-coupon';
import { CellExpanderFormatter } from './CellExpanderFormatter';
import { DATA_GRID_ARGS_TYPE, DATA_GRID_ROW_TYPE } from 'src/constants/misc'

type MasterDetailRow = MasterRow | DetailRow;

export const CustomDataGrid: React.FC = () => {
  const couponList = useSelector(getCouponList);
  const [rows, setRows] = useState<MasterRow[]>(couponList);

  useEffect(() => {
    setRows(couponList)
  }, [couponList])

  const onRowsChange = useCallback((id: number) => {
    const localRows = [...rows];
    const index = localRows.findIndex(item => item.id === id);
    const row = localRows[index];

    // Toggling state of 'expanded'
    localRows.splice(index, 1, {
      ...row,
      expanded: !row.expanded,
    });

    // If Detail Row was there, Deleting it
    if (row.expanded) {
      localRows.splice(index + 1, 1);
    } else {
      // Else creating the Detail Row to the next index of Parent
      (localRows as allAnyTypes).splice(index + 1, 0, {
        type: DATA_GRID_ROW_TYPE.DETAIL,
        number: row.number + 100,
        parentId: row.id,
        parentNumber: row.number
      });
    }

    setRows(localRows);
  }, [rows])

  const columns = useMemo((): readonly Column<MasterDetailRow>[] => {
    return [
      {
        key: 'expanded',
        name: '',
        minWidth: 30,
        width: 50,
        colSpan(args) {
          return args.type === DATA_GRID_ARGS_TYPE.ROW && args.row.type === DATA_GRID_ROW_TYPE.DETAIL ? 7 : undefined;
        },
        formatter({ row, isCellSelected }) {
          if (row.type === DATA_GRID_ROW_TYPE.DETAIL) {
            return (
              <UpdateCoupon
                row={row as DetailRow}
                onCancel={onRowsChange}
              />
            );
          }

          return (
            <CellExpanderFormatter
              row={row as MasterRow}
              isCellSelected={isCellSelected}
              onCellExpand={onRowsChange}
            />
          );
        }
      },
      { key: 'number', name: '#' },
      { key: 'id', name: 'ID' },
      { key: 'name', name: 'Name' },
      { key: 'businessUnit', name: 'Business Unit' },
      { key: 'location', name: 'Location' },
      { key: 'status', name: 'Status' },
    ];
  }, [onRowsChange]);

  const rowKeyGetter = (row: MasterDetailRow) => {
    return row.number;
  }

  return (
    <DataGrid
      rowKeyGetter={rowKeyGetter}
      columns={columns}
      rows={rows}
      headerRowHeight={45}
      rowHeight={(args) => (args.type === DATA_GRID_ARGS_TYPE.ROW && args.row.type === DATA_GRID_ROW_TYPE.DETAIL ? 550 : 45)}
      className="h-full border-none bg-white"
      enableVirtualization={false}
    />
  );
}
