import ReactPaginate from "react-paginate";


const Pagination = ({ itemsLength, itemsPerPage, onPageChange, pageCount }) => {
    if (itemsLength <= itemsPerPage) return null;
  
    return (
      <div className="mt-8 flex justify-center flex-wrap">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next>"
          onPageChange={onPageChange}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<Prev"
          containerClassName="flex items-center gap-2"
          pageClassName="px-3 py-1 border rounded cursor-pointer"
          activeClassName="bg-black text-white"
          previousClassName="px-3 py-1 border rounded cursor-pointer"
          nextClassName="px-3 py-1 border rounded cursor-pointer"
          breakClassName="px-3 py-1"
        />
      </div>
    );
  };
  export default Pagination
  