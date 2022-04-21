/* eslint-disable padding-line-between-statements */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataGrid, { Column } from "react-data-grid";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { fetchCustomersByLocation } from "src/store/thunks";
import { COMPANY } from "src/constants/company-ids";
import { getCustomerList } from "src/store/selectors/entities/app";
import { getSelectedCustomers } from "src/store/selectors/features/app";
import {
  setSelectedCustomers,
  updateCustomerCurrentPage,
  updateCustomerfilter,
} from "src/store/slices/features/app";

interface CustomerListProps {
  onClose: () => void;
}

export const CustomerList: React.FC<CustomerListProps> = ({ onClose }) => {
  const customerList = useSelector(getCustomerList);
  const selectedCustomers = useSelector(getSelectedCustomers);
  const dispatch = useDispatch();
  const [rows, setRows] = useState<ICustomerRow[]>(customerList);
  const [selectedRows, setSelectedRows] = useState(selectedCustomers);

  useEffect(() => {
    const selectedCustomerIds = selectedRows.map((customer) => customer.id);
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
      const selectedIndex = selectedRows.findIndex(
        (customer) => customer.id === id
      );
      const customerItem = customerList.find((customer) => customer.id === id);
      if (customerItem) {
        const updatedSelectedCustomers = [...selectedRows];
        if (selectedIndex >= 0) {
          updatedSelectedCustomers.splice(selectedIndex, 1);
        } else {
          updatedSelectedCustomers.push(customerItem);
        }
        setSelectedRows(updatedSelectedCustomers);
      }
    },
    [rows, selectedRows]
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

  const handleUpdateCustomer = () => {
    dispatch(setSelectedCustomers(selectedRows));
    onClose();
  };

  const handleSearch = debounce((e: { target: { value: string } }) => {
    const search = e.target.value?.trim();
    dispatch(updateCustomerCurrentPage(1));
    dispatch(updateCustomerfilter(search));
    dispatch(fetchCustomersByLocation({ companyId: COMPANY.RETAILO }));
  }, 500);

  return (
    <>
      <div>
        <input
          className="input input-bordered w-full max-w-xxs mt-4 mb-6"
          onChange={handleSearch}
          type="text"
          placeholder="Search by Name or Phone"
        />
        <DataGrid
          rowKeyGetter={rowKeyGetter}
          columns={columns}
          rows={rows}
          headerRowHeight={45}
          rowHeight={45}
          className="h-full border-none"
          enableVirtualization={false}
        />
      </div>
      {customerList.length ? (
        <div className="modal-action justify-center">
          <button onClick={handleUpdateCustomer} className="btn btn-primary">
            Update Coupon Customers
          </button>
        </div>
      ) : null}
    </>
  );
};
