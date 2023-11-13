export const HOST = "http://dntu-api.iotdongnai.com";
export const DETAIL_ROUTE = `${HOST}/detail`;

export const COMPANY_API = `${HOST}/api/companies`;
export const PRODUCT_API = `${HOST}/api/products`;
export const UPLOADS_API = `${HOST}/api/uploads`;

export const GET_ALL_COMPANIES_ROUTE = `${COMPANY_API}/companies`;
export const CREATE_COMPANY_ROUTE = `${COMPANY_API}/create-company`;
export const UPDATE_COMPANY_ROUTE = `${COMPANY_API}/update-company`;
export const DELETE_COMPANY_ROUTE = `${COMPANY_API}/delete-company`;
export const RESTORE_COMPANY_ROUTE = `${COMPANY_API}/restore-company`;

export const GET_ALL_COMPANY_PRODUCT = `${PRODUCT_API}/products?company_id=`;
export const CREATE_PRODUCT_ROUTE = `${PRODUCT_API}/create-product?company_id=`;