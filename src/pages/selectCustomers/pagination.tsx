/* eslint-disable padding-line-between-statements */
import React, { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerPage, getCustomerPerPage, getCustomerTotalCount, } from 'src/store/selectors/features/app';
import { updateCustomerCurrentPage } from 'src/store/slices/features/app';
import { fetchCustomersByLocation } from 'src/store/thunks';

interface Props {
    companyId: string | number
}
export const Pagination: React.FC<Props> = ({ companyId }) => {
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = useState(0);

  const totalCount = useSelector(getCustomerTotalCount);
  const page = useSelector(getCustomerPage);
  const perPage = useSelector(getCustomerPerPage);

  useEffect(() => {
    setPageCount(Math.ceil(totalCount / perPage));
  }, [perPage, totalCount]);

  const handlePageChange = useCallback((selectedItem: { selected: number; }) => {
    const { selected: selectedPageNumber } = selectedItem;
    if (selectedPageNumber === page - 1) return;
    dispatch(updateCustomerCurrentPage(selectedPageNumber + 1))
    dispatch(fetchCustomersByLocation(companyId))
  }, [dispatch, page]);

  return (
    <>
      <ReactPaginate
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        forcePage={page - 1}
        breakLabel="..."
        previousLabel="<< Previous"
        nextLabel="Next >>"
        className="flex w-50 mt-8 mb-10 overflow-auto"
        pageClassName="py-1.5 px-2.5 text-sm rounded-md"
        pageLinkClassName="py-1.5 px-2.5 text-sm rounded-md"
        breakClassName="py-1.5 px-2.5 text-sm rounded-md"
        breakLinkClassName="py-1.5 px-2.5 text-sm rounded-md"
        previousClassName="py-1.5 px-2.5 text-sm rounded-md"
        previousLinkClassName="py-1.5 px-2.5 text-sm rounded-md"
        nextClassName="py-1.5 px-2.5 text-sm rounded-md"
        nextLinkClassName="py-1.5 px-2.5 text-sm rounded-md"
        activeLinkClassName="text-white bg-orange-orange3"
        disabledLinkClassName="text-gray-grey3"
      />
    </>
  );
}
