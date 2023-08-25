export interface Props {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onChangePage: (page: number) => void;
}