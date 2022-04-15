/* eslint-disable padding-line-between-statements */
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCouponDetail } from 'src/store/selectors/entities/coupon';
import { getSearchValue, getSelectedLocationId } from 'src/store/selectors/features/app';
import { getCouponsPage } from 'src/store/selectors/features/coupon';
import { updateSearchValue, updateSelectedLocationId } from 'src/store/slices/features/app';
import { updateCurrentPage } from 'src/store/slices/features/coupon';
import { updateCoupon } from 'src/store/thunks';
import { fetchInitialData } from 'src/store/thunks/app';

interface UpdateCouponProps {
  row: DetailRow;
  onCancel: (row: number) => void;
}

export const UpdateCoupon: React.FC<UpdateCouponProps> = ({
  row: { parentId},
  onCancel,
} ) => {
  const dispatch = useDispatch();
  const coupon = useSelector(state => getCouponDetail(state as TReduxState, parentId));
  const {
    name, startDate, endDate, description, language, languageDescription, discountType, userType, discountValue,
    minCouponLimit, maxDiscountValue, maxUsagePerCustomer, couponCustomerOption, disabled, hideOnWallet,
  } = coupon || {};
  const [couponDescription, setCouponDescription] = useState(description);
  const [disable, setDisable] = useState(disabled);
  const [hide, setHide] = useState(hideOnWallet);

  const selectedLocationId = useSelector(getSelectedLocationId);
  const searchValue = useSelector(getSearchValue);
  const currentPage = useSelector(getCouponsPage);

  const handleCancel = () => {
    onCancel(parentId);
  }
  const handleRefresh = useCallback(() => {
    selectedLocationId && dispatch(updateSelectedLocationId(''));
    searchValue && dispatch(updateSearchValue(''));
    currentPage !== 1 && dispatch(updateCurrentPage(1));
    dispatch(fetchInitialData());
  }, [currentPage, dispatch, searchValue, selectedLocationId]);

  const handleUpdate = useCallback(async() => {
    await dispatch(updateCoupon({id: parentId, description: couponDescription, disabled: disable, hideOnWallet: hide}))
    handleRefresh();
  }, [couponDescription, disable, dispatch, handleRefresh, hide, parentId]);


  return (
    <div className="px-3.5 py-5">
      <div className="flex flex-wrap">
        <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral bg rounded-md">
          <label className="label p-0">
            <span className="label-text font-bold text-black-dark text-xs">Name</span>
          </label>
          <input
            type="text"
            value={name}
            className="input border-none w-full h-auto p-0 rounded-none focus:outline-none disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
            disabled
          />
        </div>
        <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
          <label className="label p-0">
            <span className="label-text font-bold text-black-dark text-xs">Start Date</span>
          </label>
          <input
            type="text"
            value={startDate}
            className="input border-none w-full h-auto p-0 rounded-none focus:outline-none disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
            disabled
          />
        </div>
        <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
          <label className="label p-0">
            <span className="label-text font-bold text-black-dark text-xs">End Date</span>
          </label>
          <input
            type="text"
            value={endDate}
            className="input border-none w-full h-auto p-0 rounded-none focus:outline-none disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
            disabled
          />
        </div>
        <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
          <label className="label p-0">
            <span className="label-text font-bold text-black-dark text-xs">
              Description
              <small> [Use "|" for line break and "|-" for bullet points]</small>
            </span>
          </label>
          <input
            type="text"
            value={couponDescription}
            className="input border-none w-full h-auto p-0 rounded-none focus:outline-none disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
            onChange={(e) => setCouponDescription(e.target.value)}
          />
        </div>
        <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
          <label className="label p-0">
            <span className="label-text font-bold text-black-dark text-xs">Languages</span>
          </label>
          <input
            type="text"
            value={language}
            className="input border-none w-full h-auto p-0 rounded-none focus:outline-none disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
            disabled
          />
        </div>
        <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
          <label className="label p-0">
            <span className="label-text font-bold text-black-dark text-xs">Language Description</span>
          </label>
          <input
            type="text"
            value={languageDescription}
            className="input border-none w-full h-auto p-0 rounded-none focus:outline-none disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
            disabled
          />
        </div>
        <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
          <label className="label p-0">
            <span className="label-text font-bold text-black-dark text-xs">Coupon Type</span>
          </label>
          <input
            type="text"
            value={discountType}
            className="input border-none w-full h-auto p-0 rounded-none focus:outline-none disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
            disabled
          />
        </div>
        <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
          <label className="label p-0">
            <span className="label-text font-bold text-black-dark text-xs">Coupon User</span>
          </label>
          <input
            type="text"
            value={userType}
            className="input border-none w-full h-auto p-0 rounded-none focus:outline-none disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
            disabled
          />
        </div>
        <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
          <label className="label p-0">
            <span className="label-text font-bold text-black-dark text-xs">Discount Value</span>
          </label>
          <input
            type="text"
            value={discountValue}
            className="input border-none w-full h-auto p-0 rounded-none focus:outline-none disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
            disabled
          />
        </div>
        <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
          <label className="label p-0">
            <span className="label-text font-bold text-black-dark text-xs">Min Coupon Limit</span>
          </label>
          <input
            type="text"
            value={minCouponLimit}
            className="input border-none w-full h-auto p-0 rounded-none focus:outline-none disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
            disabled
          />
        </div>
        <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
          <label className="label p-0">
            <span className="label-text font-bold text-black-dark text-xs">Max Discount Value</span>
          </label>
          <input
            type="text"
            value={maxDiscountValue}
            className="input border-none w-full h-auto p-0 rounded-none focus:outline-none disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
            disabled
          />
        </div>
        <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
          <label className="label p-0">
            <span className="label-text font-bold text-black-dark text-xs">Coupon Max Usage</span>
          </label>
          <input
            type="text"
            value={maxUsagePerCustomer}
            className="input border-none w-full h-auto p-0 rounded-none focus:outline-none disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
            disabled
          />
        </div>
        <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
          <label className="label p-0">
            <span className="label-text font-bold text-black-dark text-xs">Customer Eligibility</span>
          </label>
          <input
            type="text"
            value={couponCustomerOption}
            className="input border-none w-full h-auto p-0 rounded-none focus:outline-none disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
            disabled
          />
        </div>
      </div>
      <div className="flex mt-3 h-[55px]">
        <div className="md:w-[32%] mb-5 md:mr-3">
          <h6 className="text-left input font-semibold h-8">Disable/Enable Coupon</h6>
          <div className="flex flex-row">
            <p className="input font-normal pr-0 leading-6">Disable</p>
            <input type="checkbox" className={`ml-4 toggle toggle-primary ${disable ? "focus:bg-base-300" : "focus:bg-primary"} bg-base-300`} checked={!disable} onChange={() => setDisable(!disable)} />
            <p className="input font-normal leading-6">Enable</p>
          </div>
        </div>
        <div className="md:w-[32%] mb-5 md:mr-3">
          <h6 className="text-left input font-semibold h-8">Hide/Show on Coupon Wallet</h6>
          <div className="flex flex-row">
            <p className="input font-normal pr-0 leading-6">Hide</p>
            <input type="checkbox" className={`ml-4 toggle toggle-primary ${hide ? "focus:bg-base-300" : "focus:bg-primary"} bg-base-300`} checked={!hide} onChange={() => setHide(!hide)} />
            <p className="input font-normal h-0 leading-6">Show</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6 w-[98%] h-[55px]">
        <button
          type="button"
          className="btn mr-3 normal-case px-8 bg-white border-primary text-primary min-h-0 h-[38px]
          hover:bg-white hover:border-primary"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn normal-case px-8 bg-primary border-primary text-white min-h-0 h-[38px]
          hover:bg-orange-dark hover:border-orange-dark"
          onClick={handleUpdate}
        >
          Update Coupon
        </button>
      </div>
    </div>
)};
