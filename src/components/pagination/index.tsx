/* eslint-disable padding-line-between-statements */
import React, { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { getCouponPerPage, getCouponsPage, getTotalCount } from 'src/store/selectors/features/coupon';
import { updateCurrentPage } from 'src/store/slices/features/coupon';
import { fetchCoupons } from 'src/store/thunks';

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = useState(0);

  const totalCount = useSelector(getTotalCount);
  const page = useSelector(getCouponsPage);
  const perPage = useSelector(getCouponPerPage);

  useEffect(() => {
    setPageCount(Math.ceil(totalCount / perPage));
  }, [perPage, totalCount]);

  const handlePageChange = useCallback((selectedItem: { selected: number; }) => {
    const { selected: selectedPageNumber } = selectedItem;
    if (selectedPageNumber === page - 1) return;
    dispatch(updateCurrentPage(selectedPageNumber + 1))
    dispatch(fetchCoupons({}))
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
        activeLinkClassName="text-white bg-primary"
        disabledLinkClassName="text-neutral"
      />
    </>
  );
}
