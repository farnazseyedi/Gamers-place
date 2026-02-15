interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  hasNext: boolean;
}

export const Pagination = ({ page, setPage, hasNext }: PaginationProps) => (
  <div className="flex justify-center gap-4 mt-8">
    <button
      onClick={() => setPage(Math.max(1, page - 1))}
      disabled={page === 1}
      className="border px-4 py-2 rounded"
    >
      Prev
    </button>
    <span className="font-bold">{page}</span>
    <button
      onClick={() => setPage(page + 1)}
      disabled={!hasNext}
      className="border px-4 py-2 rounded"
    >
      Next
    </button>
  </div>
);
