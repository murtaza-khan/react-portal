/* eslint-disable padding-line-between-statements */
import React, { useEffect } from 'react';
import DataGrid from 'react-data-grid';
import { FiRefreshCw } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import { Filter } from 'src/components/filter';
import { NavBar } from 'src/components/navbar';
import { Pagination } from 'src/components/pagination';
import { SideBar } from 'src/components/sidebar';
import { getCouponList } from 'src/store/selectors/entities/coupon';
import { getSearchValue, getSelectedLocationId } from 'src/store/selectors/features/app';
import { getIsLoading } from 'src/store/selectors/features/coupon';
import { updateSearchValue, updateSelectedLocationId } from 'src/store/slices/features/app';
import { fetchInitialData } from 'src/store/thunks/app';


export const Coupon: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(getIsLoading);
  const selectedLocationId = useSelector(getSelectedLocationId);
  const searchValue = useSelector(getSearchValue);
  const rows = useSelector(getCouponList);

  const navigateToAddCoupon = () => history.push('/coupon/add');
  const handleRefresh = () => {
    selectedLocationId && dispatch(updateSelectedLocationId(''));
    searchValue && dispatch(updateSearchValue(''));
    dispatch(fetchInitialData());
  }

  useEffect(() => {
    handleRefresh();
  }, [])

  const columns = [
    { key: 'number', name: '#' },
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' },
    { key: 'businessUnit', name: 'Business Unit' },
    { key: 'location', name: 'Location' },
    { key: 'status', name: 'Status' },
  ];

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
              <div className="font-normal text-[28px] mr-5	text-black-black1">
                Coupon Management
              </div>
              <FiRefreshCw className="text-orange-orange4 w-[40px] my-auto cursor-pointer" onClick={handleRefresh} />
              <button
                onClick={ navigateToAddCoupon }
                className="ml-5 px-[30px] leading-9	rounded-sm border-[1px] border-solid border-gray-grey14 text-orange-orange3
                hover:bg-orange-orange3 hover:text-white hover:border-orange-orange3"
              >
                Create Coupon
              </button>
            </div>
            <Filter />
            { !isLoading &&
              <div>
                <DataGrid
                  className="h-full"
                  columns={columns}
                  rows={rows}
                />
                <Pagination />
              </div>
            }
          </div>
        </div>
      </div>
    </>
)};
