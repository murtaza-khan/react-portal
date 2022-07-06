/* eslint-disable padding-line-between-statements */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { getCouponDetail } from 'src/store/selectors/entities/coupon';
import { updateCoupon, handleRefresh } from 'src/store/thunks';
import { getFormattedDate } from 'src/utils/common';
import { FORM_FIELDS } from 'src/constants/coupons';

interface UpdateCouponProps {
  row: DetailRow;
  onCancel: (row: number) => void;
}

export const UpdateCoupon: React.FC<UpdateCouponProps> = ({
  row: { parentId },
  onCancel,
}) => {
  const dispatch = useDispatch();
  const coupon = useSelector(state => getCouponDetail(state as TReduxState, parentId));
  const {
    name, startDate, endDate, description, language, languageDescription, discountType, userType, discountValue,
    minCouponLimit, maxDiscountValue, maxUsagePerCustomer, couponCustomerOption, disabled, hideOnWallet,
  } = coupon || {};
  const { handleSubmit, watch, control } = useForm();
  const couponDescription = watch('couponDescription');
  const couponDisabled = watch('couponDisabled');
  const couponHideOnWallet = watch('couponHideOnWallet');

  const handleCancel = () => {
    onCancel(parentId);
  }

  const handleUpdate = async () => {
    await dispatch(updateCoupon({
      id: parentId, description: couponDescription, disabled: !couponDisabled, hideOnWallet: !couponHideOnWallet,
    }))
    dispatch(handleRefresh());
  };

  return (
    <div className="px-3.5 py-5 overflow-auto h-[565px]">
      <form
        onSubmit={handleSubmit(handleUpdate)}
        onKeyDown={(e) => { if (e.code === 'Enter') e.preventDefault() }}
      >
        <div className="flex flex-wrap">
          <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral bg rounded-md">
            <label className="label p-0">
              <span className="label-text font-bold text-black-dark text-xs">{ FORM_FIELDS.NAME }</span>
            </label>
            <input
              type="text"
              value={name}
              className="input border-none w-full h-auto p-0 rounded-none focus:outline-none
               disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
              disabled
            />
          </div>
          <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
            <label className="label p-0">
              <span className="label-text font-bold text-black-dark text-xs">{ FORM_FIELDS.START_DATE }</span>
            </label>
            <input
              type="text"
              value={getFormattedDate(startDate || '')}
              className="input border-none w-full h-auto p-0 rounded-none focus:outline-none
               disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
              disabled
            />
          </div>
          <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
            <label className="label p-0">
              <span className="label-text font-bold text-black-dark text-xs">{ FORM_FIELDS.END_DATE }</span>
            </label>
            <input
              type="text"
              value={getFormattedDate(endDate || '')}
              className="input border-none w-full h-auto p-0 rounded-none focus:outline-none
               disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
              disabled
            />
          </div>
          <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
            <label className="label p-0">
              <span className="label-text font-bold text-black-dark text-xs">
                { FORM_FIELDS.DESCRIPTION }
                <small>{ FORM_FIELDS.DESCRIPTION_SMALL }</small>
              </span>
            </label>
            <Controller
              control={control}
              name="couponDescription"
              defaultValue={description}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="input border-none w-full h-auto p-0 rounded-none focus:outline-none
                   disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
                  checked={field.value}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              )}
            />
          </div>
          <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
            <label className="label p-0">
              <span className="label-text font-bold text-black-dark text-xs">{ FORM_FIELDS.LANGUAGES }</span>
            </label>
            <input
              type="text"
              value={language}
              className="input border-none w-full h-auto p-0 rounded-none focus:outline-none
               disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
              disabled
            />
          </div>
          <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
            <label className="label p-0">
              <span className="label-text font-bold text-black-dark text-xs">{ FORM_FIELDS.LANGUAGE_DESCRIPTION }</span>
            </label>
            <input
              type="text"
              value={languageDescription}
              className="input border-none w-full h-auto p-0 rounded-none focus:outline-none
               disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
              disabled
            />
          </div>
          <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
            <label className="label p-0">
              <span className="label-text font-bold text-black-dark text-xs">{ FORM_FIELDS.COUPON_TYPE }</span>
            </label>
            <input
              type="text"
              value={discountType}
              className="input border-none w-full h-auto p-0 rounded-none focus:outline-none
               disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
              disabled
            />
          </div>
          <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
            <label className="label p-0">
              <span className="label-text font-bold text-black-dark text-xs">{ FORM_FIELDS.COUPON_USER }</span>
            </label>
            <input
              type="text"
              value={userType}
              className="input border-none w-full h-auto p-0 rounded-none focus:outline-none
               disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
              disabled
            />
          </div>
          <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
            <label className="label p-0">
              <span className="label-text font-bold text-black-dark text-xs">{ FORM_FIELDS.DISCOUNT_VALUE }</span>
            </label>
            <input
              type="text"
              value={discountValue}
              className="input border-none w-full h-auto p-0 rounded-none focus:outline-none
               disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
              disabled
            />
          </div>
          <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
            <label className="label p-0">
              <span className="label-text font-bold text-black-dark text-xs">{ FORM_FIELDS.MIN_COUPON_LIMIT }</span>
            </label>
            <input
              type="text"
              value={minCouponLimit}
              className="input border-none w-full h-auto p-0 rounded-none focus:outline-none
               disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
              disabled
            />
          </div>
          <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
            <label className="label p-0">
              <span className="label-text font-bold text-black-dark text-xs">{ FORM_FIELDS.MAX_DISCOUNT_VALUE }</span>
            </label>
            <input
              type="text"
              value={maxDiscountValue}
              className="input border-none w-full h-auto p-0 rounded-none focus:outline-none
               disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
              disabled
            />
          </div>
          <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
            <label className="label p-0">
              <span className="label-text font-bold text-black-dark text-xs">{ FORM_FIELDS.COUPON_MAX_USAGE }</span>
            </label>
            <input
              type="text"
              value={maxUsagePerCustomer}
              className="input border-none w-full h-auto p-0 rounded-none focus:outline-none
               disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
              disabled
            />
          </div>
          <div className="form-control md:w-[32%] mb-5 md:mr-3 py-1.5 px-3 text-black-light h-[55px]
          text-base border-[1px] border-solid border-neutral rounded-md">
            <label className="label p-0">
              <span className="label-text font-bold text-black-dark text-xs">{ FORM_FIELDS.CUSTOMER_ELIGIBILITY }</span>
            </label>
            <input
              type="text"
              value={couponCustomerOption}
              className="input border-none w-full h-auto p-0 rounded-none focus:outline-none
               disabled:bg-white disabled:cursor-default disabled:text-gray-gray5 selection:bg-blue-skyblue"
              disabled
            />
          </div>
        </div>
        <div className="flex mt-3 h-[55px]">
          <div className="md:w-[32%] mb-5 md:mr-3">
            <h6 className="text-left input font-semibold h-8">{ FORM_FIELDS.COUPON_DISABLE_ENABLE }</h6>
            <div className="flex flex-row">
              <p className="input font-normal pr-0 leading-6">{ FORM_FIELDS.DISABLE }</p>
              <Controller
                control={control}
                name="couponDisabled"
                defaultValue={!disabled}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    {...field}
                    className={`ml-4 toggle toggle-primary ${
                      couponDisabled ? 'focus:bg-primary' : 'focus:bg-base-300'
                    } bg-base-300`}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <p className="input font-normal leading-6">{ FORM_FIELDS.ENABLE }</p>
            </div>
          </div>
          <div className="md:w-[32%] mb-5 md:mr-3">
            <h6 className="text-left input font-semibold h-8">{ FORM_FIELDS.COUPON_HIDE_SHOW }</h6>
            <div className="flex flex-row">
              <p className="input font-normal pr-0 leading-6">{ FORM_FIELDS.HIDE }</p>
              <Controller
                control={control}
                name="couponHideOnWallet"
                defaultValue={!hideOnWallet}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    {...field}
                    className={`ml-4 toggle toggle-primary ${
                      couponHideOnWallet ? 'focus:bg-primary' : 'focus:bg-base-300'
                    } bg-base-300`}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <p className="input font-normal h-0 leading-6">{ FORM_FIELDS.SHOW }</p>
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
            type="submit"
            className="btn normal-case px-8 bg-primary border-primary text-white min-h-0 h-[38px]
          hover:bg-orange-dark hover:border-orange-dark"
          >
            Update Coupon
          </button>
        </div>
      </form>
    </div>
  )
};
