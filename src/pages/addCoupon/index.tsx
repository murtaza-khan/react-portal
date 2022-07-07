import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import BeatLoader from 'react-spinners/BeatLoader';
import { toast } from 'react-toastify';
import { NavBar } from 'src/components/navbar';
import { SideBar } from 'src/components/sidebar';
import { COMPANY } from 'src/constants/company-ids';
import { COUPON_TYPES, COUPON_USERS, FORM_FIELDS } from 'src/constants/coupons';
import { getBusinessUnits, getAllLocations } from 'src/store/selectors/entities/app';
import { getSkuIds } from 'src/store/selectors/entities/sku';
import { getCustomerIds } from 'src/store/selectors/entities/customer';
import { getIsLoading } from 'src/store/selectors/features/coupon';
import { resetLocations } from 'src/store/slices/entities/app';
import { createCoupon, fetchAllLocations, fetchBusinessUnits, fetchCustomerIds, fetchSkuIds } from 'src/store/thunks';
import { checkCreateApiData } from 'src/utils/coupon'
import { SelectCustomers } from '../selectCustomers';
import { setSelectedCustomers } from 'src/store/slices/features/app';
import { getSelectedCustomers } from 'src/store/selectors/features/app';
import { resetCustomerData } from '../../store/slices/entities/customer';
import { resetSkuData } from '../../store/slices/entities/sku';
// @ts-ignore
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { COUPON_MESSAGES } from 'src/constants/toast-messages';
import { CUSTOMER_OPTION, SKU_TYPE } from 'src/constants/misc';


export const AddCoupon: React.FC = () => {
  const dispatch = useDispatch();
  const [initialDate] = useState(new Date());
  const [showSelectCustomers, setShowSelectCustomers] = useState(false);
  const selectedCustomers = useSelector(getSelectedCustomers);
  const businessUnits = useSelector(getBusinessUnits);
  const locations = useSelector(getAllLocations);
  const couponProducts = useSelector(getSkuIds);
  const couponCustomers = useSelector(getCustomerIds);
  const isLoading = useSelector(getIsLoading);
  const customerFile = useRef<HTMLInputElement>(null);
  const whitelistFile = useRef<HTMLInputElement>(null);
  const blacklistFile = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setValue, watch, reset, control } = useForm();
  const selectedDiscountTypeId = watch('discountTypeId');
  const selectedBusinessUnitId = watch('businessUnitId');
  const selectedLocationId = watch('locationId');
  const selectedCouponCustomerOptionId = watch('couponCustomerOptionId');
  const selectedProductsListType = watch('productsListType');
  const disabled = watch('disabled');
  const hideOnWallet = watch('hideOnWallet');

  const resetForm = () => {
    reset({
      'name': '',
      'description': '',
      'startDate': new Date(),
      'endDate': new Date(),
      'discountTypeId': '1',
      'userTypeId': '[8]',
      'discountValue': null,
      'maxUsagePerCustomer': '0',
      'minCouponLimit': '0',
      'maxDiscountValue': '0',
      'businessUnitId': '',
      'locationId': '',
      'couponCustomerOptionId': 'everyone',
      'productsListType': 'all',
      'disabled': true,
      'hideOnWallet': true,
    })
  }

  useEffect(() => {
    dispatch(fetchBusinessUnits(''));
    dispatch(setSelectedCustomers([]));
    dispatch(resetCustomerData());
    dispatch(resetSkuData());
    resetForm();
  }, []);

  useEffect(() => {
    setValue('locationId', locations[0] ? locations[0].id : '');
  }, [locations])

  const handleBusinessUnitSelection = useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedBusinessUnitId === e.target.value) return;
    setValue('businessUnitId', e.target.value);
    dispatch(resetLocations());
    await dispatch(fetchAllLocations({
      businessUnitId: e.target.value,
    }));
  }, [dispatch, selectedBusinessUnitId]);

  const clearFile = (file: React.RefObject<HTMLInputElement>) => {
    if (file.current) {
      file.current.value = '';

      if (file.current.name === 'customer') {
        dispatch(resetCustomerData());
      }

      if (file.current.name === 'sku') {
        dispatch(resetSkuData());
      }
    }
  }

  const handleSelectCustomer = () => {
    if (!selectedLocationId) {
      toast.error(COUPON_MESSAGES.SELECT_COUPON_LOCATION);
    } else {
      setShowSelectCustomers(true);
    }
  }

  const handleFileSubmission = (file: FileList | null, type: string) => {
    if (!selectedLocationId) {
      toast.error(COUPON_MESSAGES.SELECT_COUPON_LOCATION);

      if (type === 'customer') {
        clearFile(customerFile);
      } else {
        if (selectedProductsListType === SKU_TYPE.WHITELIST) {
          clearFile(whitelistFile);
        } else {
          clearFile(blacklistFile);
        }
      }
    } else {
      const reader: FileReader = new FileReader();

      if (file) {
        if (file[0].name.slice(-4) !== '.csv') {
          toast.error(COUPON_MESSAGES.INVALID_FILE_FORMAT);
          return;
        }

        reader.readAsText(file[0]);

        reader.onload = () => {
          const csvData = reader?.result;

          const csvArray = (csvData as string).split('\n')
            .filter(item => item !== '')
            .map(item => { return item.trim() })
            .slice(1);

          if (type === 'customer') {
            dispatch(fetchCustomerIds({
              select: 'id,phone',
              phone: csvArray,
              onError: () => clearFile(customerFile),
            }));
          } else if (type === 'sku') {
            dispatch(fetchSkuIds({
              sku: csvArray,
              locationId: selectedLocationId,
              select: 'id,sku',
              onError: () => {
                if (selectedProductsListType === SKU_TYPE.WHITELIST) {
                  clearFile(whitelistFile);
                }

                if (selectedProductsListType === SKU_TYPE.BLACKLIST) {
                  clearFile(blacklistFile);
                }
              },
            }));
          }
        }
      }
    }
  };

  const removeCustomer = (id: number) => {
    const selectedIndex = selectedCustomers.findIndex((cust) => cust.id === id);

    if (selectedIndex >= 0) {
      const updatedSelectedCustomers = [...selectedCustomers];
      updatedSelectedCustomers.splice(selectedIndex, 1);
      dispatch(setSelectedCustomers(updatedSelectedCustomers));
    }
  };

  const selectCustomerIds = () => {
    let couponCustomerIds: number[] = [];

    if (selectedCouponCustomerOptionId === CUSTOMER_OPTION.SELECTED) {
      couponCustomerIds = selectedCustomers.map(customer => customer.id);
    }

    if (selectedCouponCustomerOptionId === CUSTOMER_OPTION.FILE) {
      if (couponCustomers?.length === 0) {
        return [];
      }

      couponCustomerIds = couponCustomers!.map(customer => customer.id);
    }

    return couponCustomerIds;
  }

  const handleCouponCustomerOption = (option: string) => {
    if (option === CUSTOMER_OPTION.ALL) {
      clearFile(customerFile);
      dispatch(setSelectedCustomers([]));
    }

    if (option === CUSTOMER_OPTION.SELECTED) {
      clearFile(customerFile);
    }

    if (option === CUSTOMER_OPTION.FILE) {
      dispatch(setSelectedCustomers([]));
    }
  }

  const handleProductListType = (option: string) => {
    dispatch(resetSkuData());

    if (option === SKU_TYPE.ALL) {
      clearFile(whitelistFile);
      clearFile(blacklistFile);
    }

    if (option === SKU_TYPE.WHITELIST) {
      clearFile(whitelistFile);
    }

    if (option === SKU_TYPE.BLACKLIST) {
      clearFile(blacklistFile);
    }
  }

  const mapProductIds = () => {
    if (couponProducts?.length === 0) {
      return undefined;
    } else {
      return couponProducts?.map(product => product.id);
    }
  }

  const handleCouponPercentageOption = (option: string) => {
    if (option === '2') {
      setValue('productsListType', 'all');
      setValue('maxDiscountValue', 0);
      dispatch(resetSkuData());
    }
  }

  const onSubmit = (data: allAnyTypes) => {
    data.discountTypeId = +data.discountTypeId;
    data.discountValue = +data.discountValue;
    data.maxUsagePerCustomer = +data.maxUsagePerCustomer;
    data.minCouponLimit = +data.minCouponLimit;
    data.businessUnitId = +data.businessUnitId;
    data.locationId = +data.locationId;
    data.maxDiscountValue = +data.maxDiscountValue;
    data.couponCustomerOptionId = data.couponCustomerOptionId === 'everyone' ? 1 : 2;
    data.disabled = !data.disabled;
    data.hideOnWallet = !data.hideOnWallet;

    switch (data.productsListType) {
      case SKU_TYPE.WHITELIST:
        data.productsListType = 1;
        break;
      case SKU_TYPE.BLACKLIST:
        data.productsListType = 2;
        break;
      default:
        data.productsListType = 0;
    }

    data.couponCustomers = selectCustomerIds();
    data.productIds = mapProductIds();

    const validate = checkCreateApiData(data);

    if (validate.ok) {
      if (data.couponCustomerOptionId === 2 && !selectedCustomers.length) {
        toast.error(COUPON_MESSAGES.SELECT_CUSTOMER)
      } else {
        dispatch(createCoupon(data));
      }
    } else {
      toast.error(validate.error);
    }
  }


  return (
    <>
      <NavBar />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <SideBar />
        <div className="drawer-content flex flex-col items-center bg-white mt-16">
          {isLoading &&
            <div className="absolute z-10 top-[41%] left-[55%]"><BeatLoader /></div>
          }
          <div className="h-full w-full p-6">
            <div className="h-12 w-full">
              <p className="text-3xl">Create Coupon</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={(e) => { if (e.code === 'Enter') e.preventDefault() }}
            >
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">{ `${ FORM_FIELDS.NAME } *` }</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter Coupon Name"
                    {...register('name')}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">{ FORM_FIELDS.DESCRIPTION }</span>
                    <span className="label-text" style={{ fontSize: '0.58rem' }}>
                      { FORM_FIELDS.DESCRIPTION_SMALL }
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter Coupon Description"
                    {...register('description')}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text ">{ FORM_FIELDS.START_DATE }</span>
                  </label>
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <div className="input input-bordered w-full grid content-center">
                        <DatePicker
                          placeholderText="Select date"
                          dateFormat="dd-MMM-yyyy"
                          onChange={(date: allAnyTypes) => field.onChange(date)}
                          selected={field.value}
                        />
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text ">{ FORM_FIELDS.END_DATE }</span>
                  </label>
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <div className="input input-bordered w-full grid content-center">
                        <DatePicker
                          placeholderText="Select date"
                          dateFormat="dd-MMM-yyyy"
                          onChange={(date: allAnyTypes) => field.onChange(date)}
                          selected={field.value}
                          minDate={initialDate}
                        />
                      </div>
                    )}
                  />
                </div>

                <div className="dropdown">
                  <label className="label">
                    <span className="label-text ">{ `Select ${ FORM_FIELDS.COUPON_TYPE }` }</span>
                  </label>
                  <select
                    className="select select-bordered w-full font-normal"
                    {...register('discountTypeId')}
                    onChange={(e) => {
                      setValue('discountTypeId', e.target.value);
                      handleCouponPercentageOption(e.target.value);
                    }}
                  >
                    {COUPON_TYPES.map(type =>
                      <option value={type.id} key={type.name}>{type.name}</option>
                    )};
                  </select>
                </div>

                <div className="dropdown">
                  <label className="label">
                    <span className="label-text ">{ `Select ${ FORM_FIELDS.COUPON_USER }` }</span>
                  </label>
                  <select
                    className="select select-bordered w-full font-normal"
                    {...register('userTypeId')}
                    onChange={(e) => setValue('userTypeId', e.target.value)}
                  >
                    {COUPON_USERS.map(type =>
                      <option value={type.value} key={type.name}>{type.name}</option>
                    )};
                  </select>
                </div>


                <div>
                  <label className="label">
                    <span className="label-text">{ `${ FORM_FIELDS.DISCOUNT_VALUE } *` }</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    min={1}
                    className="input input-bordered w-full"
                    placeholder="Enter Discount Amount"
                    onKeyDown={(e) => ['e', '+', '-'].includes(e.key) && e.preventDefault()}
                    {...register('discountValue')}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">{ `${ FORM_FIELDS.COUPON_MAX_USAGE } *` }</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    className="input input-bordered w-full"
                    placeholder="Enter Max Limit of Coupon Usage"
                    onKeyDown={(e) => ['e', '+', '-'].includes(e.key) && e.preventDefault()}
                    {...register('maxUsagePerCustomer')}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">{ `${ FORM_FIELDS.MIN_DICOUNT_LIMIT } *` }</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    min={0}
                    className="input input-bordered w-full"
                    placeholder="Enter Max Limit of Coupon Usage"
                    onKeyDown={(e) => ['e', '+', '-'].includes(e.key) && e.preventDefault()}
                    {...register('minCouponLimit')}
                  />
                </div>

                {selectedDiscountTypeId === '1' ? <div>
                  <label className="label">
                    <span className="label-text">{ `Coupon ${ FORM_FIELDS.MAX_DISCOUNT_VALUE } *` }</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    min={0}
                    className="input input-bordered w-full"
                    placeholder="Enter Maximum Discount Value"
                    onKeyDown={(e) => ['e', '+', '-'].includes(e.key) && e.preventDefault()}
                    {...register('maxDiscountValue')}
                  />
                </div> : null}

                <div className="dropdown">
                  <label className="label">
                    <span className="label-text ">{ `${ FORM_FIELDS.SELECT_BUSINESS_UNIT } *` }</span>
                  </label>
                  <select
                    className="select select-bordered w-full font-normal"
                    {...register('businessUnitId')}
                    onChange={(e) => handleBusinessUnitSelection(e)}
                  >
                    {businessUnits.map(businessUnit =>
                      <option value={businessUnit.id} key={businessUnit.id}>{businessUnit.name}</option>
                    )};
                  </select>
                </div>

                <div className="dropdown">
                  <label className="label">
                    <span className="label-text ">{ `${ FORM_FIELDS.SELECT_LOCATION } *` }</span>
                  </label>
                  <select
                    className="select select-bordered w-full font-normal"
                    {...register('locationId')}
                    disabled={!selectedBusinessUnitId}
                    onChange={(e) => setValue('locationId', e.target.value)}
                  >
                    {locations.map(location =>
                      <option value={location.id} key={location.id}>{location.name}</option>
                    )};
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-0">
                <div className="mt-6 col-span-3">
                  <div>
                    <p className="text-l font-semibold">{ FORM_FIELDS.CUSTOMER_ELIGIBILITY }</p>
                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div>
                        <input
                          {...register('couponCustomerOptionId')}
                          value="everyone"
                          type="radio"
                          name="couponCustomerOptionId"
                          onClick={() => handleCouponCustomerOption('everyone')}
                        />
                        <span className="input font-normal">Everyone</span>
                      </div>

                      <div>
                        <input
                          {...register('couponCustomerOptionId')}
                          value={ CUSTOMER_OPTION.SELECTED }
                          type="radio"
                          name="couponCustomerOptionId"
                          onClick={() => handleCouponCustomerOption(CUSTOMER_OPTION.SELECTED)}
                        />
                        <span className="input font-normal">{ FORM_FIELDS.SELECTED_CUSTOMERS }</span>
                        {selectedCouponCustomerOptionId === CUSTOMER_OPTION.SELECTED ? <div>
                          <input type="button" value="Select Customers" className="btn btn-primary mt-2 ml-7"
                            onClick={handleSelectCustomer} />
                        </div> : null}
                      </div>

                      <div>
                        <input
                          {...register('couponCustomerOptionId')}
                          value={ CUSTOMER_OPTION.FILE }
                          type="radio"
                          name="couponCustomerOptionId"
                          onClick={() => handleCouponCustomerOption(CUSTOMER_OPTION.FILE)}
                        />
                        <span className="input font-normal">{ FORM_FIELDS.UPLOAD_FILE }</span>
                        {selectedCouponCustomerOptionId === CUSTOMER_OPTION.FILE ? <div>
                          <input className="mt-2 ml-7" type="file" name="customer" ref={customerFile}
                            onChange={(e) => handleFileSubmission(e.target.files!, 'customer')} />
                          <div className="w-24">
                            <button className="btn btn-primary btn-block mt-3 ml-7"
                              onClick={() => { clearFile(customerFile) }}>Clear File</button>
                          </div>
                        </div> : null}
                      </div>
                    </div>
                  </div>

                  {selectedDiscountTypeId === '1' ?
                    <div>
                      <p className="text-l font-semibold mt-6">{ FORM_FIELDS.SKU_ELIGIBILITY }</p>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <input
                            {...register('productsListType')}
                            value="all"
                            type="radio"
                            name="productsListType"
                            onClick={() => handleProductListType('all')}
                          />
                          <span className="input font-normal capitalize">{ `${SKU_TYPE.ALL} SKUs` }</span>
                        </div>

                        <div>
                          <input
                            {...register('productsListType')}
                            value={ SKU_TYPE.WHITELIST }
                            type="radio"
                            name="productsListType"
                            onClick={() => handleProductListType(SKU_TYPE.WHITELIST)}
                          />
                          <span className="input font-normal capitalize">{ `${SKU_TYPE.WHITELIST} SKUs` }</span>
                          {selectedProductsListType === SKU_TYPE.WHITELIST ? <div>
                            <input className="mt-2 ml-7" type="file" name="sku" ref={whitelistFile}
                              onChange={(e) => handleFileSubmission(e.target.files, 'sku')} />
                            <div className="w-24">
                              <button className="btn btn-primary btn-block mt-3 ml-7"
                                onClick={() => { clearFile(whitelistFile) }}>Clear File</button>
                            </div>
                          </div> : null}
                        </div>

                        <div>
                          <input
                            {...register('productsListType')}
                            value={ SKU_TYPE.BLACKLIST }
                            type="radio"
                            name="productsListType"
                            onClick={() => handleProductListType(SKU_TYPE.BLACKLIST)}
                          />
                          <span className="input font-normal capitalize">{ `${SKU_TYPE.BLACKLIST} SKUs` }</span>
                          {selectedProductsListType === SKU_TYPE.BLACKLIST ? <div>
                            <input className="mt-2 ml-7" type="file" name="sku" ref={blacklistFile}
                              onChange={(e) => handleFileSubmission(e.target.files, 'sku')} />
                            <div className="w-24">
                              <button className="btn btn-primary btn-block mt-3 ml-7"
                                onClick={() => { clearFile(blacklistFile) }}>Clear File</button>
                            </div>
                          </div> : null}
                        </div>
                      </div>
                    </div> : null}

                  {selectedCustomers.length ? (
                    <div className="flex flex-col pb-8">
                      {selectedCustomers.map((sc) => (
                        <div className="" key={ sc.id }>
                          <span className="badge badge-secondary rounded-none">{`${sc.name} ${sc.phone}`}</span>
                          <button
                            onClick={() => removeCustomer(sc.id)}
                            className="badge btn btn-xs btn-primary rounded-none"
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="mt-6">
                  <p className="input font-semibold h-8">{ FORM_FIELDS.COUPON_DISABLE_ENABLE }</p>
                  <div className="flex flex-row">
                    <div className="w-16">
                      <p className="input font-normal pr-0 leading-6">{ FORM_FIELDS.DISABLE }</p>
                    </div>
                    <input
                      type="checkbox"
                      className={
                        `ml-4 toggle toggle-primary ${disabled ? 'focus:bg-primary' : 'focus:bg-base-300'} bg-base-300`
                      }
                      {...register('disabled')}
                      onChange={() => setValue('disabled', !disabled)} />
                    <p className="input font-normal leading-6">{ FORM_FIELDS.ENABLE }</p>
                  </div>
                  <p className="input font-semibold h-8">
                    { FORM_FIELDS.COUPON_HIDE_SHOW }
                  </p>
                  <div className="flex flex-row">
                    <div className="w-16">
                      <p className="input font-normal pr-0 leading-6">{ FORM_FIELDS.HIDE }</p>
                    </div>
                    <input
                      type="checkbox"
                      className={
                        `ml-4 toggle toggle-primary ${
                          hideOnWallet ? 'focus:bg-primary' : 'focus:bg-base-300'
                        } bg-base-300`
                      }
                      {...register('hideOnWallet')}
                      onChange={() => setValue('hideOnWallet', !hideOnWallet)} />
                    <p className="input font-normal h-0 leading-6">{ FORM_FIELDS.SHOW }</p>
                  </div>
                  <div className="mt-8 w-40">
                    <button type="submit" className="btn btn-primary btn-block mt-2 ml-4">Create</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      { showSelectCustomers ?
        <SelectCustomers
          companyId={COMPANY.RETAILO}
          isOpen={showSelectCustomers}
          closeModal={() => setShowSelectCustomers(false)}
        /> : null
      }
    </>
  );
};
