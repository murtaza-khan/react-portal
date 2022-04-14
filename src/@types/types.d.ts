/**
 * Defined some of the common types
 */
type ReactNode = import('react').ReactNode
type ReactChild = import('react').ReactChild
type ReactChildren = import('react').ReactChildren
type Component = import('react').Component
type TFunction = () => void
type TObject = Record<string, number, string, undefined, boolean, TFunction>
type TArrayOfObjects = Array<string, TObject>
type TNumberOrString = number | string
type TFunctionOrObject = TFunction | TObject

/**
 * Redux Store types
 */
type TDispatch = import('../store/index').AppDispatch
type TReduxState = import('../store/index').ReduxState

/**
 * Defined an interfce example
 */
interface ILoginDataProps {
  username: string,
  password: string,
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

interface ICoupon {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  language: string;
  languageDescription: string;
  discountType: string;
  userType: string;
  discountValue: string;
  minCouponLimit: number;
  maxDiscountValue: number;
  maxUsagePerCustomer: number;
  couponCustomerOption: string;
  disabled: boolean;
  hideOnWallet: boolean;
  [key:string]: any;
}

