export const HOST = process.env.NEXT_PUBLIC_HOST || "http://localhost:8080";
export const DETAIL_ROUTE = `${HOST}/detail`;

export const COMPANY_API = `${HOST}/api/companies`;
export const PRODUCT_API = `${HOST}/api/products`;
export const UPLOADS_API = `${HOST}/api/uploads`;
export const REPORT_API = `${HOST}/api/report`;

export const GET_ALL_COMPANIES_ROUTE = `${COMPANY_API}/companies`;
export const CREATE_COMPANY_ROUTE = `${COMPANY_API}/create-company`;
export const UPDATE_COMPANY_ROUTE = `${COMPANY_API}/update-company`;
export const DELETE_COMPANY_ROUTE = `${COMPANY_API}/delete-company`;
export const RESTORE_COMPANY_ROUTE = `${COMPANY_API}/restore-company`;
export const GET_ACCESSING_REPORT = `${REPORT_API}/analytic`;

export const GET_ALL_COMPANY_PRODUCT = `${PRODUCT_API}/products?company_id=`;
export const GET_PRODUCT_BY_ID = `${PRODUCT_API}/get-product?product_id=`;
export const CREATE_PRODUCT_ROUTE = `${PRODUCT_API}/create-product?company_id=`;