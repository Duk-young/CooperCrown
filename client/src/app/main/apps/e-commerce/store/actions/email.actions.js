export const GET_EMAIL_FILTERS = '[E-COMMERCE APP] GET EMAIL FILTERS';


export function getSelectedFilters(data) {
  return {
    type: GET_EMAIL_FILTERS,
    selectedFilters: data
  }
}