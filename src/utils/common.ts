export const getRowCount = (itemsPerPage: number, currentPage: number, index: number) => {
  return itemsPerPage * (currentPage - 1) + 1 + index;
}

export const getDateWithOutTime = (date: string | Date) => {
  const updatedDate = new Date(date);
  updatedDate.setHours(0, 0, 0, 0);
  return updatedDate;
}

export const getFormattedDate = (date: string) => {
  const updatedDate = getDateWithOutTime(date);
  return (updatedDate.getDate() + "-" + updatedDate.toLocaleString('default', { month: 'short' }) + "-" + updatedDate.getFullYear());
}
