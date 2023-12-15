import classes from './Paginator.module.css'

export interface PaginatorProps {
    currentPage: number
    totalPages: number
    setPage: (page: number) => void
}
 
export default function Paginator({ currentPage, totalPages, setPage }: PaginatorProps) {

    const pages = Array.from(Array(totalPages).keys()).map(i => i + 1)

  return (
    <div className={classes.pagination}>
        {pages.map(page => (
            <button key={page} className={page === currentPage ? classes.active : ''} onClick={() => setPage(page)}>
                {page}
            </button>
        ))}
    </div>
  )
}
