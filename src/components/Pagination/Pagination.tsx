import React from "react";
import { Pagination } from "antd";
import { Props } from "../../interfaces/PropInterface";


const PaginationComponent: React.FC<Props> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onChangePage,
}) => {
  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={totalItems}
        onChange={onChangePage}
      />
    </div>
  );
};

export default PaginationComponent;
