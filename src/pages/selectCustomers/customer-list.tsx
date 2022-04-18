/* eslint-disable padding-line-between-statements */
import { useCallback, useEffect, useMemo, useState } from "react";
import DataGrid, { Column } from "react-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getCustomerList } from "src/store/selectors/entities/app";
import { getSelectedCustomers } from "src/store/selectors/features/app";
import { setSelectedCustomers } from "src/store/slices/features/app";

export const CustomerList: React.FC = () => {
  const customerList = useSelector(getCustomerList);
  const dispatch = useDispatch();
  const selectedCustomers = useSelector(getSelectedCustomers);
  const [rows, setRows] = useState<ICustomerRow[]>(customerList);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const selectedCustomerIds = selectedCustomers.map(
      (customer) => customer.id
    );
    setRows(
      customerList.map((customer) => ({
        ...customer,
        checked: selectedCustomerIds.includes(customer.id),
      }))
    );
  }, [customerList]);

  const onCheckClicked = useCallback(
    (id: number) => {
      const localRows = [...rows];
      const index = localRows.findIndex((item) => item.id === id);
      const row = localRows[index];

      // Toggling state of 'checked'
      localRows.splice(index, 1, {
        ...row,
        checked: !row.checked,
      });
      setRows(localRows);
      const selectedIndex = selectedCustomers.findIndex(
        (customer) => customer.id === id
      );
      const customerItem = customerList.find((customer) => customer.id === id);
      if (customerItem) {
        const updatedSelectedCustomers = [...selectedCustomers];
        if (selectedIndex >= 0) {
          updatedSelectedCustomers.splice(selectedIndex, 1);
        } else {
          updatedSelectedCustomers.push(customerItem);
        }
        dispatch(setSelectedCustomers(updatedSelectedCustomers));
      }
    },
    [rows, selectedCustomers]
  );

  const columns = useMemo((): readonly Column<ICustomerRow>[] => {
    return [
      {
        key: "checked",
        name: "",
        minWidth: 30,
        width: 50,
        formatter({ row }) {
          return (
            <input
              onChange={() => onCheckClicked(row.id)}
              type="checkbox"
              checked={row.checked}
              className="checkbox"
            />
          );
        },
      },
      { key: "number", name: "#" },
      { key: "id", name: "ID" },
      { key: "name", name: "Name" },
      { key: "phone", name: "Phone #" },
    ];
  }, [onCheckClicked]);

  const rowKeyGetter = (row: ICustomerRow) => {
    return row.number;
  };

  const filteredRows = filter
    ? rows.filter(
        (r) =>
          r?.name?.toLowerCase().includes(filter.toLowerCase()) ||
          r?.phone?.toLowerCase()?.includes(filter.toLowerCase())
      )
    : rows;

  return (
    <>
      <input
        className="input input-bordered w-full max-w-xxs mt-4 mb-6"
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        placeholder="Search by Name or Phone"
      />
      <DataGrid
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={filteredRows}
        headerRowHeight={45}
        rowHeight={45}
        className="h-full border-none"
        enableVirtualization={false}
      />
    </>
  );
};
