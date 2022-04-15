import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from 'react-toastify';
import { NavBar } from "src/components/navbar";
import { SideBar } from "src/components/sidebar";
import { COMPANY } from 'src/constants/company-ids';
import { COUPON_TYPES, COUPON_USERS } from 'src/constants/coupons';
import { getBusinessUnits, getAllLocations } from 'src/store/selectors/entities/app';
import { getSkuIds } from 'src/store/selectors/entities/sku';
import { getIsLoading } from 'src/store/selectors/features/coupon';
import { resetLocations } from 'src/store/slices/entities/app';
import { fetchAllLocations, fetchBusinessUnits } from 'src/store/thunks/app';
import { createCoupon } from 'src/store/thunks/coupon'
import { fetchSkuIds } from 'src/store/thunks/sku'
import { checkCreateApiData } from 'src/utils/coupon'
import { Pagination } from 'src/components/pagination';
import DataGrid from 'react-data-grid';
import { SelectCustomers } from '../selectCustomers';
import { setSelectedCustomers } from "src/store/slices/features/app";
import { getSelectedCustomers } from "src/store/selectors/features/app";
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddCoupon: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [discountValue, setDiscountValue] = useState<number | null>(null);
  const [maxUsagePerCustomer, setMaxUsagePerCustomer] = useState<number | null>(null);
  const [discountTypeId, setDiscountTypeId] = useState(1);
  const [userTypeId, setUserTypeId] = useState("[8]");
  const [minCouponLimit, setMinCouponLimit] = useState<number | null>(null);
  const [maxDiscountValue, setMaxDiscountValue] = useState<number | null>(null);
  const [businessUnitId, setBusinessUnitId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [couponCustomer, setCouponCustomer] = useState("1");
  const [couponSku, setCouponSku] = useState("0");
  const [disabled, setDisabled] = useState(false);
  const [hideOnWallet, setHideOnWallet] = useState(false);
  const [couponProductIds, setCouponProductIds] = useState<Array<number>>([]);
  const [showSelectCustomers, setShowSelectCustomers] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const selectedCustomers = useSelector(getSelectedCustomers);
  const businessUnits = useSelector(getBusinessUnits);
  const locations = useSelector(getAllLocations);
  const couponProducts = useSelector(getSkuIds);
  const isLoading = useSelector(getIsLoading);
  const customerFile = useRef<HTMLInputElement>(null);
  const whitelistFile = useRef<HTMLInputElement>(null);
  const blacklistFile = useRef<HTMLInputElement>(null);




  useEffect(() => {
    dispatch(fetchBusinessUnits(COMPANY.RETAILO));
  }, [dispatch]);

  const handleBusinessUnitSelection = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (businessUnitId === e.target.value) return;
    dispatch(resetLocations());
    dispatch(fetchAllLocations({
      businessUnitId: e.target.value
    }));

    setBusinessUnitId(e.target.value)
  }, [dispatch, businessUnitId]);

  const handleLocationSelection = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (locationId === e.target.value) return;
    setLocationId(e.target.value)
  }, [locationId]);

  const clearFile = (file: any) => {
    file.current.value = "";

    if (file.current.name === "customer") {
      // couponCustomerIds = [];
    }

    if (file.current.name === "sku") {
      setCouponProductIds([]);
    }
  }

  const handleFileSubmission = (file: any, type: string) => {
    if (!locationId) {
      toast.error('Please select location for coupon first');

      if (type === "customer") {
        clearFile(customerFile);
      } else {
        if (couponSku === "1") {
          clearFile(whitelistFile);
        } else {
          clearFile(blacklistFile);
        }
      }
    } else {

      const reader: FileReader = new FileReader();

      if (file) {
        reader.readAsText(file[0]);

        reader.onload = () => {
          const csvData = reader?.result;

          const csvArray = (csvData as string).split("\n")
            .filter(item => item != "")
            .map(item => { return item.trim() })
            .slice(1);

          if (type === "customer") {
            console.log('');
          } else if (type === "sku") {
            const skuString = csvArray.toString();
            const sku = '["' + skuString.replaceAll(',', '","') + '"]'
            dispatch(fetchSkuIds({
              sku,
              locationId,
              select: '["id"]'
            }));

            const productIds = couponProducts?.map((product: any) => product?.id);
            setCouponProductIds(productIds!)
          }
        }
      }
    }

    return undefined;
  };

  const removeCustomer = (id: number) => {
    const selectedIndex = selectedCustomers.findIndex((cust) => cust.id === id);

    if (selectedIndex >= 0) {
      const updatedSelectedCustomers = [...selectedCustomers];
      updatedSelectedCustomers.splice(selectedIndex, 1);
      dispatch(setSelectedCustomers(updatedSelectedCustomers));
    }
  };

  const handleCreate = () => {
    const apiData = {
      name,
      description,
      startDate,
      endDate,
      discountValue,
      maxUsagePerCustomer,
      discountTypeId,
      userTypeId,
      minCouponLimit,
      maxDiscountValue,
      locationId,
      disabled,
      hideOnWallet,
      couponCustomerOptionId: +couponCustomer,
      // couponCustomerIds,
      productsListType: +couponSku,
      couponProductIds,
      businessUnitId,
      companyId: COMPANY.RETAILO
    }

    const success = checkCreateApiData(apiData);

    if (success) {
      dispatch(createCoupon(apiData));
    } else {
      toast.error(success);
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

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Name *</span>
                </label>
                <input type="text" placeholder="Enter Coupon Name"
                  className="input input-bordered w-full"
                  onChange={(e) => setName(e.target.value)} />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Description</span>
                  <span className="label-text" style={{ fontSize: "0.58rem" }}>[Use "|" for line break and "|-" for bullet points]</span>
                </label>
                <input type="text" placeholder="Enter Coupon Description"
                  className="input input-bordered w-full"
                  onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div>
                <label className="label">
                  <span className="label-text ">Start Date</span>
                </label>
                <div className="input input-bordered w-full grid content-center">
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">End Date</span>
                </label>
                <div className="input input-bordered w-full grid content-center">
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text ">Discount Value *</span>
                </label>
                <input type="number" onKeyDown={(e) => e.key === "e" && e.preventDefault()}
                  placeholder="Enter Discount Amount" className="input input-bordered w-full"
                  onChange={(e) => setDiscountValue(+e.target.value)} />
              </div>

              <div>
                <label className="label">
                  <span className="label-text ">Coupon Max Usage *</span>
                </label>
                <input type="number" onKeyDown={(e) => e.key === "e" && e.preventDefault()}
                  placeholder="Enter Max Limit of Coupon Usage" className="input input-bordered w-full"
                  onChange={(e) => setMaxUsagePerCustomer(+e.target.value)} />
              </div>

              <div className="dropdown">
                <label className="label">
                  <span className="label-text">Select Coupon Type</span>
                </label>
                <select className="select select-bordered w-full font-normal">
                  {COUPON_TYPES.map(type =>
                    <option value={type.name} key={type.id} onChange={() => setDiscountTypeId(type.id)}>{type.name}</option>
                  )};
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text ">Select Coupon User</span>
                </label>
                <select className="select select-bordered w-full font-normal">
                  {COUPON_USERS.map(user =>
                    <option value={user.name} key={user.id} onChange={() => setUserTypeId(user.value)}>{user.name}</option>
                  )};
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text ">
                    Coupon Min Discount Limit *
                  </span>
                </label>
                <input type="number" onKeyDown={(e) => e.key === "e" && e.preventDefault()}
                  placeholder="Enter Minimum Discount Limit" className="input input-bordered w-full"
                  onChange={(e) => setMinCouponLimit(+e.target.value)} />
              </div>

              <div>
                <label className="label">
                  <span className="label-text ">
                    Coupon Max Discount Value *
                  </span>
                </label>
                <input type="number" onKeyDown={(e) => e.key === "e" && e.preventDefault()}
                  placeholder="Enter Maximum Discount Value" className="input input-bordered w-full"
                  onChange={(e) => setMaxDiscountValue(+e.target.value)} />
              </div>

              <div className="dropdown">
                <label className="label">
                  <span className="label-text">Select Business Unit</span>
                </label>
                <select
                  value={businessUnitId}
                  className="select select-bordered w-full font-normal"
                  onChange={handleBusinessUnitSelection}
                >
                  <option value="" disabled></option>
                  {businessUnits.map((businessUnit) => (
                    <option key={businessUnit.id} value={businessUnit.id}>
                      {businessUnit.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="dropdown">
                <label className="label">
                  <span className="label-text">Select Location</span>
                </label>
                <select
                  value={locationId}
                  className="select select-bordered w-full font-normal"
                  onChange={handleLocationSelection}
                >
                  <option value='' disabled></option>
                  {locations.map(location => <option key={location?.id} value={location.id}>{location.name}</option>)}
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
                        value="1"
                        type="radio"
                        checked={couponCustomer === "1"}
                        onClick={() => setCouponCustomer("1")}
                        onChange={e => { e }}
                      />
                      <span className="input font-normal">Everyone</span>
                    </div>

                    <div>
                      <input
                        value="2"
                        type="radio"
                        checked={couponCustomer === "2"}
                        onClick={() => setCouponCustomer("2")}
                        onChange={e => { e }}
                      />
                      <span className="input font-normal">Selected Customers</span>
                      {couponCustomer === "2" ? <div>
                        <button className="btn btn-primary mt-2 ml-7"
                          onClick={() => setShowSelectCustomers(true)}>Select Customers</button>
                      </div> : null}
                    </div>

                    <div>
                      <input
                        value="3"
                        name="customer"
                        type="radio"
                        checked={couponCustomer === "3"}
                        onClick={() => setCouponCustomer("3")}
                        onChange={e => { e }}
                      />
                      <span className="input font-normal">Upload Customer File</span>
                      {couponCustomer === "3" ? <div>
                        <input className="mt-2 ml-7" type="file" name="customer" ref={customerFile}
                          onChange={(e) => handleFileSubmission(e.target.files, "customer")} />
                        <div className="w-24">
                          <button className="btn btn-primary btn-block mt-3 ml-7"
                            onClick={() => { clearFile(customerFile) }}>Clear File</button>
                        </div>
                      </div> : null}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-l font-semibold mt-6">SKU Eligibility</p>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div>
                      <input
                        value="0"
                        type="radio"
                        checked={couponSku === "0"}
                        onClick={() => setCouponSku("0")}
                        onChange={e => { e }}
                      />
                      <span className="input font-normal">All SKUs</span>
                    </div>

                    <div>
                      <input
                        value="1"
                        name="sku"
                        type="radio"
                        checked={couponSku === "1"}
                        onClick={() => setCouponSku("1")}
                        onChange={e => { e }}
                      />
                      <span className="input font-normal">Whitelist SKUs</span>
                      {couponSku === "1" ? <div>
                        <input className="mt-2 ml-7" type="file" name="file" ref={whitelistFile}
                          onChange={(e) => handleFileSubmission(e.target.files, "sku")} />
                        <div className="w-24">
                          <button className="btn btn-primary btn-block mt-3 ml-7"
                            onClick={() => { clearFile(whitelistFile) }}>Clear File</button>
                        </div>
                      </div> : null}
                    </div>

                    <div>
                      <input
                        value="2"
                        name="sku"
                        type="radio"
                        checked={couponSku === "2"}
                        onClick={() => setCouponSku("2")}
                        onChange={e => { e }}
                      />
                      <span className="input font-normal">Blacklist SKUs</span>
                      {couponSku === "2" ? <div>
                        <input className="mt-2 ml-7" type="file" name="file" ref={blacklistFile}
                          onChange={(e) => handleFileSubmission(e.target.files, "sku")} />
                        <div className="w-24">
                          <button className="btn btn-primary btn-block mt-3 ml-7"
                            onClick={() => { clearFile(blacklistFile) }}>Clear File</button>
                        </div>
                      </div> : null}
                    </div>
                  </div>
                </div>
                {selectedCustomers.length ? (
                  <div className="flex flex-col">
                    {selectedCustomers.map((sc) => (
                      <div className="indicator p-1 m-2">
                        <button
                          onClick={() => removeCustomer(sc.id)}
                          className="indicator-item badge btn btn-xs p-1"
                        >
                          x
                        </button>
                        <span className="badge badge-primary">{`${sc.name} ${sc.phone}`}</span>
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
                  <input type="checkbox" className={`ml-4 toggle toggle-primary ${disabled ? "focus:bg-base-300" : "focus:bg-primary"} bg-base-300`} checked={disabled === false} onChange={() => setDisabled(!disabled)} />
                  <p className="input font-normal leading-6">Enable</p>
                </div>
                <p className="input font-semibold h-8">
                  Hide/Show on Coupon Wallet
                </p>
                <div className="flex flex-row">
                  <div className="w-16">
                    <p className="input font-normal pr-0 leading-6">Hide</p>
                  </div>
                  <input type="checkbox" className={`ml-4 toggle toggle-primary ${hideOnWallet ? "focus:bg-base-300" : "focus:bg-primary"} bg-base-300`} checked={hideOnWallet === false} onChange={() => setHideOnWallet(!hideOnWallet)} />
                  <p className="input font-normal h-0 leading-6">Show</p>
                </div>
                <div className="mt-8 w-40">
                  <button className="btn btn-primary btn-block mt-2 ml-4" onClick={handleCreate}>Create</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSelectCustomers ? <SelectCustomers companyId={COMPANY.RETAILO} isOpen={showSelectCustomers} closeModal={() => setShowSelectCustomers(false)} /> : null}
    </>
  );
};
