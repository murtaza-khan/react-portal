/**
 * Defined some of the common types
 */
type ReactNode = import('react').ReactNode;
type ReactChild = import('react').ReactChild;
type ReactChildren = import('react').ReactChildren;
type Component = import('react').Component;
type TFunction = () => void;
type TObject = Record<string, number, string, undefined, boolean, TFunction>;
type TArrayOfObjects = Array<string, TObject>;
type TNumberOrString = number | string;
type TFunctionOrObject = TFunction | TObject;

type isTypeNull = null;
type isTypeArrayOfObjects = Array<string, TObject>;
type isTypeUndefined = undefined;
type functionAndObjects = TFunction | isTypeObject;
type isTypeNumberAndString = number | string;
type allAnyTypes =
  | TObject
  | TFunction
  | boolean
  | isTypeUndefined
  | string
  | number
  | Array
  | isTypeNull;

type isDateOrString = Date | string;

/**
 * Redux Store types
 */
type TDispatch = import('../store/index').AppDispatch;
type TReduxState = import('../store/index').ReduxState;

/**
 * Defined an interfce example
 */
interface ILoginDataProps {
  username: string;
  password: string;
}

interface IHttpRequestOptions {
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
}

interface IActionOptions {
  dispatch?: TDispatch;
  state: TReduxState;
}

interface IActionButton {
  dataCy?: string;
  onClick: TFunction;
  text?: string;
}

interface IError {
  message?: string;
  code?: string;
}

interface ITodo {
  userId: string;
  id: number;
  title: string;
  completed: string;
}

interface TableRow {
  type: string;
  number: number;
}

interface MasterRow extends TableRow {
  id: number;
  name: string;
  businessUnit: string;
  location: string;
  status: string;
  expanded: boolean;
}

interface DetailRow extends TableRow {
  parentId: number;
  parentNumber: number;
}

interface ICustomerRow {
  name: string;
  phone: string;
  number: number;
  id: number;
  checked: boolean;
}

interface ICustomer {
  name: string;
  phone: string;
  id: number;
  [key: string]: allAnyTypes;
}

interface ICoupon {
  name: string;
  startDate: isDateOrString;
  endDate: isDateOrString;
  description: string;
  language?: string;
  languageDescription?: string;
  discountType?: string;
  userType?: string;
  discountValue?: allAnyTypes;
  minCouponLimit: number;
  maxDiscountValue: number;
  maxUsagePerCustomer: number;
  couponCustomerOption?: string;
  disabled: boolean;
  hideOnWallet: boolean;
  [key: string]: allAnyTypes;
}

interface IPrepareResponse<T> {
  data: allAnyTypes;
  error: boolean;
  statusCode: number;
  statusText: string;
  statusMessage?: T;
}

interface IUpdateCouponPayload {
  id: number;
  description: string;
  disabled: boolean;
  hideOnWallet: boolean;
}

interface IFetchCoupons {
  page?: number;
  perPage?: number;
  companyId?: string;
  search?: allAnyTypes;
}

interface IFetchCouponsQueryParams extends IFetchCoupons {
  selectedbusinessUnitId?: string,
  selectedlocationId?: string,
}

interface IFetchCouponsApiData extends IFetchCoupons {
  businessUnitId?: string,
  locationId?: string,
}
