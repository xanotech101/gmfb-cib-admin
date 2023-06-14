import { Badge } from 'components/Badge/Badge';
import { SubHeading } from 'components/Header/SubHeading';
import { DateUtils, DateFormats } from 'utils';
import { naira } from 'utils/currencyFormatter';

export const TransactionDetailsList = ({ details }) => {
  return (
    <>
      {/* customer details */}
      <div className="mb-6 border-b pb-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Customer Details</h3>
      </div>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Amount</dt>
          <dd className="mt-1 text-lg font-bold text-gray-900">
            {details?.amount ? naira.format(details?.amount) : ''}
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Date Created</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {details?.createdAt
              ? DateUtils.dateToString(new Date(details?.createdAt), DateFormats.frontendDateTime)
              : ''}
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Approval Status</dt>
          <dd className="mt-1 text-sm text-gray-900">
            <Badge status={details?.status}>{details?.status}</Badge>
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Transfer Status</dt>
          <dd className="mt-1 text-sm text-gray-900">
            <Badge status={details?.transferStatus}>{details?.transferStatus}</Badge>
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Transaction Reference</dt>
          <dd className="mt-1 text-sm text-gray-900">{details?.transactionReference}</dd>
        </div>
        {details?.meta && (
          <>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Response Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{details?.meta?.ResponseDescription}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Status Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{details?.meta?.StatusDescription}</dd>
            </div>
          </>
        )}
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Narration</dt>
          <dd className="mt-1 text-sm text-gray-900">{details?.narration}</dd>
        </div>
      </dl>

      {/* bank details */}
      <div className="mb-6 border-b pb-5 pt-8">
        <SubHeading>Bank Details</SubHeading>
      </div>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Bank Name</dt>
          <dd className="mt-1 text-sm text-gray-900">{details?.beneficiaryBankName}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Account Name</dt>
          <dd className="mt-1 text-sm text-gray-900">{details?.beneficiaryAccountName}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Account Number</dt>
          <dd className="mt-1 text-sm text-gray-900">{details?.beneficiaryAccountNumber}</dd>
        </div>
      </dl>

      {/* initiator */}
      <div className="mb-6 border-b pb-5 pt-8">
        <SubHeading>Initiator Details</SubHeading>
      </div>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">First Name</dt>
          <dd className="mt-1 text-sm text-gray-900">{details?.initiator?.firstName}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Last Name</dt>
          <dd className="mt-1 text-sm text-gray-900">{details?.initiator?.lastName}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Email</dt>
          <dd className="mt-1 text-sm text-gray-900">{details?.initiator?.email}</dd>
        </div>
      </dl>
    </>
  );
};
