/* eslint-disable padding-line-between-statements */
import React, { useCallback, useEffect, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies, getAllLocations, getBusinessUnits } from 'src/store/selectors/entities/app';
import { getSearchValue, getSelectedLocationId } from 'src/store/selectors/features/app';
import { getCouponsPage } from 'src/store/selectors/features/coupon';
import { resetBusinessUnits, resetLocations } from 'src/store/slices/entities/app';
import { updateSearchValue, updateSelectedLocationId } from 'src/store/slices/features/app';
import { updateCurrentPage } from 'src/store/slices/features/coupon';
import { fetchAllLocations, fetchBusinessUnits, fetchCoupons } from 'src/store/thunks';

export const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const companies = useSelector(getAllCompanies);
  const businessUnits = useSelector(getBusinessUnits);
  const locations = useSelector(getAllLocations);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedBusinessUnitId, setSelectedBusinessUnitId] = useState('');
  const selectedLocationId = useSelector(getSelectedLocationId);
  const page = useSelector(getCouponsPage);

  const searchValue = useSelector(getSearchValue);
  const [typedSearch, setTypedSearch] = useState(searchValue);

  const handleCompanySelection = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedCompanyId === e.target.value) return;
    if (!e.target.value) {
      dispatch(resetBusinessUnits());
      setSelectedBusinessUnitId('');
    } else {
      dispatch(fetchBusinessUnits(e.target.value));
    }
    setSelectedCompanyId(e.target.value);
    dispatch(resetLocations());
    dispatch(updateSelectedLocationId(''));
  }, [dispatch, selectedCompanyId]);

  const handleBusinessUnitSelection = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedBusinessUnitId === e.target.value) return;
    if (!e.target.value) {
      dispatch(resetLocations());
      dispatch(updateSelectedLocationId(''));
    } else {
      dispatch(fetchAllLocations({
        companyId: selectedCompanyId,
        businessUnitId: e.target.value
      }));
    }
    setSelectedBusinessUnitId(e.target.value)
  }, [dispatch, selectedBusinessUnitId, selectedCompanyId]);

  const handleLocationSelection = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedLocationId === e.target.value) return;
    dispatch(updateSelectedLocationId(e.target.value));
  }, [dispatch, selectedLocationId]);

  const handleFetchCoupons = useCallback(() => {
    if (page !== 1) dispatch(updateCurrentPage(1)); // Resetting Page
    dispatch(fetchCoupons({}));
  }, [dispatch, page]);

  const handleSearchEnter = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch(updateSearchValue(typedSearch));
      handleFetchCoupons();
    }
  }, [dispatch, handleFetchCoupons, typedSearch]);

  const handleSearchValueUpdation = useCallback(() => {
    if (typedSearch === searchValue) return;
    dispatch(updateSearchValue(typedSearch))
  }, [dispatch, searchValue, typedSearch]);

  useEffect(() => {
    // Resetting local states as per the change in our 'searchValue' variable,
    // after Refresh icon is clicked (present in Coupon Component)
    if (!searchValue && typedSearch) {
      setTypedSearch('');
      setSelectedCompanyId('');
      setSelectedBusinessUnitId('');
    }
  }, [searchValue]);


  return (
    <>
      <div className="form-control relative mb-5 w-full md:w-[355px]">
        <input
          type='type'
          placeholder="Search"
          value={typedSearch}
          onChange={e => setTypedSearch(e.target.value)}
          onBlur={handleSearchValueUpdation}
          onKeyDown= {handleSearchEnter}
          className="input bg-white text-black-black4 h-[38px] text-base border-[1px] border-solid border-gray-grey14
          focus:outline-none focus:border-orange-orange3"
        />
        <GrFormClose
          className="absolute w-[40px] text-xl right-0 top-[9px] my-auto cursor-pointer"
          onClick={() => {
            setTypedSearch('');
            dispatch(updateSearchValue(''));
            handleFetchCoupons();
          }}
        />
      </div>
      <div className="flex flex-wrap">
        <div className="form-control w-full md:w-1/5 mb-5 md:pr-3">
          <label className="label">
            <span className="label-text font-bold text-black-black2 text-xs">Select Company:</span>
          </label>
          <select
            value={selectedCompanyId}
            className="select select-bordered min-h-0 font-normal text-black-black4 h-[38px]
            text-base border-[1px] border-solid border-gray-grey14"
            onChange={handleCompanySelection}
          >
            <option value=''>All</option>
            { companies.map(company => <option key={company.id} value={company.id}>{company.name}</option>)}
          </select>
        </div>
        <div className="form-control w-full md:w-1/5 mb-5 md:pr-3">
          <label className="label">
            <span className="label-text font-bold text-black-black2 text-xs">Select Business Unit:</span>
          </label>
          <select
            value={selectedBusinessUnitId}
            className="select select-bordered min-h-0 font-normal text-black-black4 h-[38px]
            text-base border-[1px] border-solid border-gray-grey14"
            onChange={handleBusinessUnitSelection}
          >
            <option value=''>All</option>
            { businessUnits.map(businessUnit => <option key={businessUnit.id} value={businessUnit.id}>{businessUnit.name}</option>)}
          </select>
        </div>
        <div className="form-control w-full md:w-1/5 mb-5 md:pr-3">
          <label className="label">
            <span className="label-text font-bold text-black-black2 text-xs">Select Cell:</span>
          </label>
          <select
            value={selectedLocationId}
            className="select select-bordered min-h-0 font-normal text-black-black4 h-[38px]
            text-base border-[1px] border-solid border-gray-grey14"
            onChange={handleLocationSelection}
          >
            <option value=''>All</option>
            { locations.map(location => <option key={location.id} value={location.id}>{location.name}</option>)}
          </select>
        </div>
        <div className="form-control w-full md:w-2/5 mb-5 justify-end">
          <button
            type="button"
            className="btn text-base px-8 bg-orange-orange4 border-orange-orange4 text-white min-h-0 h-[38px]
            max-w-[85px] hover:bg-orange-orange3 hover:border-orange-orange3"
            onClick={handleFetchCoupons}
          >
            Go
          </button>
        </div>
      </div>
    </>
)};
