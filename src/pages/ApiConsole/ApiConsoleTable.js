import { useEffect, useState } from 'react';
import { Enquiry } from 'services/api_console.service';
import { ApiTable } from './Table';
import Pagination from 'components/Pagination/Pagination';

export const ApiConsole = () => {
  const [request, setRequest] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const fetcher = async () => {
    const data = await Enquiry.getApiConsole();
    setRequest(data?.results);
    setTotal(data?.totalPages);
    console.log(page);
    console.log(data);
  };
  useEffect(() => {
    fetcher();
    console.log('true');
  }, []);

  return (
    <>
      <ApiTable data={request ?? []} />
      <Pagination totalItems={total} handlePageClick={setPage} />
    </>
  );
};
