import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from 'react-toastify';
import { NavBar } from "src/components/navbar";
import { SideBar } from "src/components/sidebar";
import { COMPANY } from 'src/constants/company-ids';
import { COUPON_TYPES, COUPON_USERS } from 'src/constants/coupons';
import { getBusinessUnits, getAllLocations } from 'src/store/selectors/entities/app';
import { getSkuIds } from 'src/store/selectors/entities/sku';
import { getCustomerIds } from 'src/store/selectors/entities/customer';
import { getIsLoading } from 'src/store/selectors/features/coupon';
import { resetLocations } from 'src/store/slices/entities/app';
import { createCoupon, fetchAllLocations, fetchBusinessUnits, fetchCustomerIds, fetchSkuIds } from 'src/store/thunks';
import { checkCreateApiData } from 'src/utils/coupon'
import { SelectCustomers } from '../selectCustomers';
import { setSelectedCustomers } from "src/store/slices/features/app";
import { getSelectedCustomers } from "src/store/selectors/features/app";
import { resetCustomerData } from '../../store/slices/entities/customer';
import { resetSkuData } from '../../store/slices/entities/sku';
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
  const selectedDiscountTypeId = watch("discountTypeId");
  const selectedBusinessUnitId = watch("businessUnitId");
  const selectedLocationId = watch("locationId");
  const selectedCouponCustomerOptionId = watch("couponCustomerOptionId");
  const selectedProductsListType = watch("productsListType");
  const disabled = watch("disabled");
  const hideOnWallet = watch("hideOnWallet");

  useEffect(() => {
    dispatch(fetchBusinessUnits(''));
    dispatch(setSelectedCustomers([]));
    dispatch(resetCustomerData());
    dispatch(resetSkuData());
    resetForm();
  }, []);

  useEffect(() => {
    setValue("locationId", locations[0] ? locations[0].id : "");
  }, [locations])

  const resetForm = () => {
    reset({
      "name": "",
      "description": "",
      "startDate": new Date(),
      "endDate": new Date(),
      "discountTypeId": "1",
      "userTypeId": "[8]",
      "discountValue": null,
      "maxUsagePerCustomer": "0",
      "minCouponLimit": "0",
      "maxDiscountValue": "0",
      "businessUnitId": "",
      "locationId": "",
      "couponCustomerOptionId": "everyone",
      "productsListType": "all",
      "disabled": true,
      "hideOnWallet": true,
    })
  }

  const handleBusinessUnitSelection = useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedBusinessUnitId === e.target.value) return;
    setValue("businessUnitId", e.target.value);
    dispatch(resetLocations());
    await dispatch(fetchAllLocations({
      businessUnitId: e.target.value
    }));
  }, [dispatch, selectedBusinessUnitId]);

  const clearFile = (file: React.RefObject<HTMLInputElement>) => {
    if (file.current) {
      file.current.value = "";

      if (file.current.name === "customer") {
        dispatch(resetCustomerData());
      }

      if (file.current.name === "sku") {
        dispatch(resetSkuData());
      }
    }
  }

  const handleSelectCustomer = () => {
    if (!selectedLocationId) {
      toast.error('Please select location for coupon first');
    } else {
      setShowSelectCustomers(true);
    }
  }

  const handleFileSubmission = (file: FileList | null, type: string) => {
    if (!selectedLocationId) {
      toast.error('Please select location for coupon first');

      if (type === "customer") {
        clearFile(customerFile);
      } else {
        if (selectedProductsListType === "whitelist") {
          clearFile(whitelistFile);
        } else {
          clearFile(blacklistFile);
        }
      }
    } else {
      const reader: FileReader = new FileReader();

      if (file) {
        if (file[0].name.slice(-4) !== '.csv') {
          toast.error('Invalid file format! Please upload the file with .csv extension.');
          return;
        }

        reader.readAsText(file[0]);

        reader.onload = () => {
          const csvData = reader?.result;

          const csvArray = (csvData as string).split("\n")
            .filter(item => item != "")
            .map(item => { return item.trim() })
            .slice(1);

          if (type === "customer") {
            dispatch(fetchCustomerIds({
              select: "id,phone",
              phone: csvArray,
              onError: () => clearFile(customerFile)
            }));
          } else if (type === "sku") {
            dispatch(fetchSkuIds({
              sku: csvArray,
              locationId: selectedLocationId,
              select: "id,sku",
              onError: () => {
                if (selectedProductsListType === "whitelist") {
                  clearFile(whitelistFile);
                }

                if (selectedProductsListType === "blacklist") {
                  clearFile(blacklistFile);
                }
              }
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

    if (selectedCouponCustomerOptionId === "selected") {
      couponCustomerIds = selectedCustomers.map(customer => customer.id);
    }

    if (selectedCouponCustomerOptionId === "file") {
      if (couponCustomers?.length === 0) {
        return [];
      }

      couponCustomerIds = couponCustomers!.map(customer => customer.id);
    }

    return couponCustomerIds;
  }

  const handleCouponCustomerOption = (option: string) => {
    if (option === "all") {
      clearFile(customerFile);
      dispatch(setSelectedCustomers([]));
    }

    if (option === "selected") {
      clearFile(customerFile);
    }

    if (option === "file") {
      dispatch(setSelectedCustomers([]));
    }
  }

  const handleProductListType = (option: string) => {
    dispatch(resetSkuData());

    if (option === "all") {
      clearFile(whitelistFile);
      clearFile(blacklistFile);
    }

    if (option === "whitelist") {
      clearFile(whitelistFile);
    }

    if (option === "blacklist") {
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
    if (option === "2") {
      setValue("productsListType", "all");
      setValue("maxDiscountValue", 0);
      dispatch(resetSkuData());
    }
  }

  const onSubmit = (data: any) => {
    data.discountTypeId = +data.discountTypeId;
    data.discountValue = +data.discountValue;
    data.maxUsagePerCustomer = +data.maxUsagePerCustomer;
    data.minCouponLimit = +data.minCouponLimit;
    data.businessUnitId = +data.businessUnitId;
    data.locationId = +data.locationId;
    data.maxDiscountValue = +data.maxDiscountValue;
    data.couponCustomerOptionId = data.couponCustomerOptionId === "everyone" ? 1 : 2;
    data.disabled = !data.disabled;
    data.hideOnWallet = !data.hideOnWallet;

    switch (data.productsListType) {
      case "whitelist":
        data.productsListType = 1;
        break;
      case "blacklist":
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
        toast.error('Select atleast one customer for coupon')
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
                    <span className="label-text">Name *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter Coupon Name"
                    {...register("name")}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Description</span>
                    <span className="label-text" style={{ fontSize: "0.58rem" }}>
                      [Use "|" for line break and "|-" for bullet points]
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter Coupon Description"
                    {...register("description")}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text ">Start Date</span>
                  </label>
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <div className="input input-bordered w-full grid content-center">
                        <DatePicker
                          placeholderText="Select date"
                          dateFormat="dd-MMM-yyyy"
                          onChange={(date: any) => field.onChange(date)}
                          selected={field.value}
                        />
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text ">End Date</span>
                  </label>
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <div className="input input-bordered w-full grid content-center">
                        <DatePicker
                          placeholderText="Select date"
                          dateFormat="dd-MMM-yyyy"
                          onChange={(date: any) => field.onChange(date)}
                          selected={field.value}
                          minDate={initialDate}
                        />
                      </div>
                    )}
                  />
                </div>

                <div className="dropdown">
                  <label className="label">
                    <span className="label-text ">Select Coupon Type</span>
                  </label>
                  <select
                    className="select select-bordered w-full font-normal"
                    {...register("discountTypeId")}
                    onChange={(e) => {
                      setValue("discountTypeId", e.target.value);
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
                    <span className="label-text ">Select Coupon User</span>
                  </label>
                  <select
                    className="select select-bordered w-full font-normal"
                    {...register("userTypeId")}
                    onChange={(e) => setValue("userTypeId", e.target.value)}
                  >
                    {COUPON_USERS.map(type =>
                      <option value={type.value} key={type.name}>{type.name}</option>
                    )};
                  </select>
                </div>


                <div>
                  <label className="label">
                    <span className="label-text">Discount Value *</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    min={1}
                    className="input input-bordered w-full"
                    placeholder="Enter Discount Amount"
                    onKeyDown={(e) => ["e", "+", "-"].includes(e.key) && e.preventDefault()}
                    {...register("discountValue")}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Coupon Max Usage *</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    className="input input-bordered w-full"
                    placeholder="Enter Max Limit of Coupon Usage"
                    onKeyDown={(e) => ["e", "+", "-"].includes(e.key) && e.preventDefault()}
                    {...register("maxUsagePerCustomer")}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Coupon Min Discount Limit *</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    min={0}
                    className="input input-bordered w-full"
                    placeholder="Enter Max Limit of Coupon Usage"
                    onKeyDown={(e) => ["e", "+", "-"].includes(e.key) && e.preventDefault()}
                    {...register("minCouponLimit")}
                  />
                </div>

                {selectedDiscountTypeId === "1" ? <div>
                  <label className="label">
                    <span className="label-text">Coupon Max Discount Value *</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    min={0}
                    className="input input-bordered w-full"
                    placeholder="Enter Maximum Discount Value"
                    onKeyDown={(e) => ["e", "+", "-"].includes(e.key) && e.preventDefault()}
                    {...register("maxDiscountValue")}
                  />
                </div> : null}

                <div className="dropdown">
                  <label className="label">
                    <span className="label-text ">Select Business Unit *</span>
                  </label>
                  <select
                    className="select select-bordered w-full font-normal"
                    {...register("businessUnitId")}
                    onChange={(e) => handleBusinessUnitSelection(e)}
                  >
                    {businessUnits.map(businessUnit =>
                      <option value={businessUnit.id} key={businessUnit.id}>{businessUnit.name}</option>
                    )};
                  </select>
                </div>

                <div className="dropdown">
                  <label className="label">
                    <span className="label-text ">Select Location *</span>
                  </label>
                  <select
                    className="select select-bordered w-full font-normal"
                    {...register("locationId")}
                    disabled={!selectedBusinessUnitId}
                    onChange={(e) => setValue("locationId", e.target.value)}
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
                    <p className="text-l font-semibold">Customer Eligibility</p>
                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div>
                        <input
                          {...register("couponCustomerOptionId")}
                          value="everyone"
                          type="radio"
                          name="couponCustomerOptionId"
                          onClick={() => handleCouponCustomerOption("everyone")}
                        />
                        <span className="input font-normal">Everyone</span>
                      </div>

                      <div>
                        <input
                          {...register("couponCustomerOptionId")}
                          value="selected"
                          type="radio"
                          name="couponCustomerOptionId"
                          onClick={() => handleCouponCustomerOption("selected")}
                        />
                        <span className="input font-normal">Selected Customers</span>
                        {selectedCouponCustomerOptionId === "selected" ? <div>
                          <input type="button" value="Select Customers" className="btn btn-primary mt-2 ml-7"
                            onClick={handleSelectCustomer} />
                        </div> : null}
                      </div>

                      <div>
                        <input
                          {...register("couponCustomerOptionId")}
                          value="file"
                          type="radio"
                          name="couponCustomerOptionId"
                          onClick={() => handleCouponCustomerOption("file")}
                        />
                        <span className="input font-normal">Upload Customer File</span>
                        {selectedCouponCustomerOptionId === "file" ? <div>
                          <input className="mt-2 ml-7" type="file" name="customer" ref={customerFile}
                            onChange={(e) => handleFileSubmission(e.target.files!, "customer")} />
                          <div className="w-24">
                            <button className="btn btn-primary btn-block mt-3 ml-7"
                              onClick={() => { clearFile(customerFile) }}>Clear File</button>
                          </div>
                        </div> : null}
                      </div>
                    </div>
                  </div>

                  {selectedDiscountTypeId === "1" ?
                    <div>
                      <p className="text-l font-semibold mt-6">SKU Eligibility</p>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <input
                            {...register("productsListType")}
                            value="all"
                            type="radio"
                            name="productsListType"
                            onClick={() => handleProductListType("all")}
                          />
                          <span className="input font-normal">All SKUs</span>
                        </div>

                        <div>
                          <input
                            {...register("productsListType")}
                            value="whitelist"
                            type="radio"
                            name="productsListType"
                            onClick={() => handleProductListType("whitelist")}
                          />
                          <span className="input font-normal">Whitelist SKUs</span>
                          {selectedProductsListType === "whitelist" ? <div>
                            <input className="mt-2 ml-7" type="file" name="sku" ref={whitelistFile}
                              onChange={(e) => handleFileSubmission(e.target.files, "sku")} />
                            <div className="w-24">
                              <button className="btn btn-primary btn-block mt-3 ml-7"
                                onClick={() => { clearFile(whitelistFile) }}>Clear File</button>
                            </div>
                          </div> : null}
                        </div>

                        <div>
                          <input
                            {...register("productsListType")}
                            value="blacklist"
                            type="radio"
                            name="productsListType"
                            onClick={() => handleProductListType("blacklist")}
                          />
                          <span className="input font-normal">Blacklist SKUs</span>
                          {selectedProductsListType === "blacklist" ? <div>
                            <input className="mt-2 ml-7" type="file" name="sku" ref={blacklistFile}
                              onChange={(e) => handleFileSubmission(e.target.files, "sku")} />
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
                        <div className="">
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
                  <p className="input font-semibold h-8">Disable/Enable Coupon</p>
                  <div className="flex flex-row">
                    <div className="w-16">
                      <p className="input font-normal pr-0 leading-6">Disable</p>
                    </div>
                    <input
                      type="checkbox"
                      className={`ml-4 toggle toggle-primary ${disabled ? "focus:bg-primary" : "focus:bg-base-300"} bg-base-300`}
                      {...register("disabled")}
                      onChange={() => setValue("disabled", !disabled)} />
                    <p className="input font-normal leading-6">Enable</p>
                  </div>
                  <p className="input font-semibold h-8">
                    Hide/Show on Coupon Wallet
                  </p>
                  <div className="flex flex-row">
                    <div className="w-16">
                      <p className="input font-normal pr-0 leading-6">Hide</p>
                    </div>
                    <input
                      type="checkbox"
                      className={`ml-4 toggle toggle-primary ${hideOnWallet ? "focus:bg-primary" : "focus:bg-base-300"} bg-base-300`}
                      {...register("hideOnWallet")}
                      onChange={() => setValue("hideOnWallet", !hideOnWallet)} />
                    <p className="input font-normal h-0 leading-6">Show</p>
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
      {showSelectCustomers ? <SelectCustomers companyId={COMPANY.RETAILO} isOpen={showSelectCustomers} closeModal={() => setShowSelectCustomers(false)} /> : null}
    </>
  );
};
