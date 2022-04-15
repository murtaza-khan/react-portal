import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import BeatLoader from "react-spinners/BeatLoader";
import { fetchCustomersByLocation } from "src/store/thunks";
import {} from "src/store/selectors/entities/app";
import { updateCustomerCurrentPage } from "src/store/slices/features/app";
import { getIsCustomerLoading } from "src/store/selectors/features/app";
import { Pagination } from "./pagination";
import { CustomerList } from './customer-list';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    border: "none",
    backgroundColor: "transparent",
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(16, 16, 34, 0.8)",
    padding: "0px",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
};

export interface Props {
  isOpen: boolean;
  closeModal: () => void;
  companyId: number | string;
}

export const SelectCustomers: React.FC<Props> = ({
  isOpen,
  closeModal,
  companyId,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsCustomerLoading);
  useEffect(() => {
    dispatch(updateCustomerCurrentPage(1));
    dispatch(fetchCustomersByLocation({ companyId }));
  }, [dispatch]);

  return (
    <>
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="modal-box w-full max-w-5xl">
            {isLoading ? (
              <div className="absolute z-10 top-[42%] left-[42%]">
                <BeatLoader />
              </div>
            ) : null}
            <p className="text-xl font-semibold">Select Customers</p>
            <div>
              <CustomerList />
            </div>
            <div className="modal-action justify-center">
              <button onClick={closeModal} className="btn btn-primary">
                Update Coupon Customers
              </button>
            </div>
            <Pagination companyId={companyId} />
          </div>
        </Modal>
      </div>
    </>
  );
};
