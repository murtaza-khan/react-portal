/* eslint-disable padding-line-between-statements */
import React, { useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import { Filter } from 'src/components/filter';
import { NavBar } from 'src/components/navbar';
import { Pagination } from 'src/components/pagination';
import { SideBar } from 'src/components/sidebar';
import { CustomDataGrid } from 'src/components/table/CustomDataGrid';
import { getSearchValue, getSelectedBusinessUnitId, getSelectedCompanyId, getSelectedLocationId } from 'src/store/selectors/features/app';
import { getCouponsPage, getIsLoading } from 'src/store/selectors/features/coupon';
import { updateSearchValue, updateSelectedBusinessUnitId, updateSelectedCompanyId, updateSelectedLocationId } from 'src/store/slices/features/app';
import { updateCurrentPage } from 'src/store/slices/features/coupon';
import { fetchInitialData } from 'src/store/thunks/app';


export const Coupon: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(getIsLoading);
  const selectedCompanyId = useSelector(getSelectedCompanyId);
  const selectedBusinessUnitId = useSelector(getSelectedBusinessUnitId);
  const selectedLocationId = useSelector(getSelectedLocationId);
  const searchValue = useSelector(getSearchValue);
  const currentPage = useSelector(getCouponsPage);

  const navigateToAddCoupon = () => history.push('/coupon/add');
  const handleRefresh = () => {
    selectedCompanyId && dispatch(updateSelectedCompanyId(''));
    selectedBusinessUnitId && dispatch(updateSelectedBusinessUnitId(''));
    selectedLocationId && dispatch(updateSelectedLocationId(''));
    searchValue && dispatch(updateSearchValue(''));
    currentPage !== 1 && dispatch(updateCurrentPage(1));
    dispatch(fetchInitialData());
  }

  useEffect(() => {
    handleRefresh();
  }, [])

  return (
    <>
      <NavBar />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <SideBar />
        <div className="relative drawer-content flex flex-col bg-white mt-16">
          { isLoading &&
            <div className="absolute z-10 top-[42%] left-[42%]"><BeatLoader /></div>
          }
          <div className="px-10	pt-5 pb-10">
            <div className="flex mb-6 flex-wrap">
              <div className="font-normal text-[28px] mr-5	text-black-dark">
                Coupon Management
              </div>
              <FiRefreshCw className="text-primary w-[40px] my-auto cursor-pointer" onClick={handleRefresh} />
              <button
                onClick={ navigateToAddCoupon }
                className="ml-5 px-[30px] leading-9	rounded-sm border-[1px] border-solid border-neutral text-primary
                hover:bg-primary hover:text-white hover:border-primary"
              >
                Create Coupon
              </button>
            </div>
            <Filter />
            { !isLoading &&
              <div>
                <CustomDataGrid />
                <Pagination />
              </div>
            }
          </div>
        </div>
      </div>
    </>
)};
