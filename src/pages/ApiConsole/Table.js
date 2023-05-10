import { ClockIcon } from "@heroicons/react/24/outline"
import Pagination from "components/Pagination/Pagination"
import { useState, useEffect } from "react"
import { Enquiry } from "services/api_console.service"

export const ApiTable=()=>{
  const [request, setRequest]=useState([])
  const [total, setTotal]=useState(0)
  const [page, setPage]=useState(1)
   const fetcher= async()=>{
       const data=await Enquiry.getApiConsole()
       setRequest(data?.results)
        setTotal(data?.totalPages)
        console.log(page);
        console.log(data);
       
   }
   useEffect(()=>{
     fetcher()
     console.log("true");
   }, [])

    return(
        <>
        <div className="">
      <div className="p-1.5 w-full inline-block align-middle">
        <div className="border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                  S/N
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                 Organization Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
               Number of Request
                </th>
               
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                    time created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {request?.map((datum, i) => (
                <tr key={datum?._id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                    {datum?.organization_name}
                  </td>
                  <td className="px-6 py-4 text-sm  font-medium text-gray-800 whitespace-nowrap border">
                    {datum?.requestCount} Request
                  </td>
                  <td className="px-6 py-4 text-sm font-medium  whitespace-nowrap ">
                  <div className="mt-4 flex items-center text-sm text-gray-500 gap-2">
                        <ClockIcon
                          className=" h-5 w-5 flex-shrink-0  grooming-text"
                          aria-hidden="true"
                        />
                        <div>
                          <p> {datum?.updatedAt.substring(0, 10)}</p>
                          <p className="mt-1">{datum?.updatedAt.substr(11, 8)}</p>
                        </div>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Pagination totalItems={total} handlePageClick={setPage}/>
        </>
    )
}