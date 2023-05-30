import { useQuery } from '@tanstack/react-query';
import { UserIcon } from '@heroicons/react/20/solid';
import { SubHeading } from 'components/Header/SubHeading';
import { Container } from 'components/Container/Container';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ticketService } from 'services';
import { AddResponse } from './AddResponse';
import { DateUtils, DateFormats } from 'utils';

export const RequestTicketingDetails = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['ticket-details', id],
    queryFn: () => ticketService.getTicket(id),
    enabled: !!id
  });

  return (
    <div className="grid grid-cols-12 gap-8 px-8">
      <div className="col-span-12 flex justify-between items-center">
        <div>
          <SubHeading>Ticket Request Details</SubHeading>
        </div>
      </div>
      <div className="col-span-8 space-y-6">
        <Container>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
            <div className="sm:col-span-3 flex justify-between border-b pb-4">
              <dt className="text-sm font-medium text-gray-500">Topic</dt>
              <dd className="mt-1 text-sm text-gray-900">{data?.ticket?.topic}</dd>
            </div>
            <div className="sm:col-span-3 flex justify-between border-b pb-4">
              <dt className="text-sm font-medium text-gray-500">Created By</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data?.ticket?.createdBy?.firstName} {data?.ticket?.createdBy?.lastName}
              </dd>
            </div>
            <div className="sm:col-span-3 flex justify-between border-b pb-4">
              <dt className="text-sm font-medium text-gray-500">Date Created</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data?.ticket?.createdAt
                  ? DateUtils.dateToString(
                      new Date(data?.ticket?.createdAt),
                      DateFormats.frontendDateTime
                    )
                  : ''}
              </dd>
            </div>
            {data?.ticket?.meta?.transactionId && (
              <div className="sm:col-span-3 flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Transaction Id</dt>
                <dd className="mt-1 text-sm text-gray-900">{data?.ticket?.meta?.transactionId}</dd>
              </div>
            )}
            <div className="sm:col-span-3 flex flex-col">
              <dt className="text-sm font-medium text-gray-500">Message</dt>
              <dd className="mt-1 text-sm text-gray-900">{data?.ticket?.message}</dd>
            </div>
          </dl>
        </Container>
        <Container>
          <AddResponse />
        </Container>
      </div>
      {data?.ticket?.response?.length > 0 && (
        <div className="col-span-4">
          <Container>
            <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
              Response
            </h2>
            <div className="flow-root">
              <ul role="list" className="-mb-8 mt-4 py-4">
                {data?.ticket?.response?.map((response) => (
                  <li key={response._id}>
                    <div className="relative pb-6">
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-500">
                            <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <div className="text-base text-gray-800 font-semibold -mt-1">
                              {response?.responseBy?.firstName} {response?.responseBy?.lastName}
                              <p className="text-gray-700 mt-0.5 text-base">{response?.response}</p>
                              <p className="text-gray-500 mt-0.5 text-xs">
                                {response.date
                                  ? DateUtils.dateToString(
                                      new Date(response.date),
                                      DateFormats.frontendDateTime
                                    )
                                  : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};
