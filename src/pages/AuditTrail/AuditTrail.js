import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Container } from 'components/Container/Container';
import { Heading } from 'components/Common/Header/Heading';
import { Button } from 'components/Button/Button';
import { Checkbox } from 'components/Form/Checkbox/Checkbox';
import { auditService } from 'services';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { AuditData } from './AuditData';
import Pagination from 'components/Pagination/Pagination';

export const Audit = ({ style = 'py-5 pl-5 pr-4' }) => {
  const [page, setPage] = useState(1);
  const { data, meta } = useQuery({
    queryKey: ['getOrganizationAuditTrails', { page }],
    queryFn: () => auditService.getOrganizationAuditTrails({ page })
  });

  const [filterTags, setFilterTags] = useState([]);
  const [Dropdown, setDropdown] = useState('hidden');

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };
  let toggle = !Dropdown ? 'block' : '';
  let toggleArrow = !Dropdown ? (
    <ChevronUpIcon width="15px" className="ml-5 mt-1" />
  ) : (
    <ChevronDownIcon width="15px" className="ml-5 mt-1" />
  );

  const filteredDATA = data?.trails.filter((node) =>
    filterTags.length > 0
      ? filterTags.every((filterTag) => node.type.includes(filterTag))
      : data?.trails
  );

  const filterHandler = (event) => {
    if (event.target.checked) {
      setFilterTags([...filterTags, event.target.value]);
    } else {
      setFilterTags(filterTags.filter((filterTag) => filterTag !== event.target.value));
    }
  };

  return (
    <div className={`${style}`}>
      <Container>
        <Heading>Audit Trail</Heading>
        <div className="flex md:flex-col sm:flex-col lg:flex-row flex-col justify-between items-start md:items-start sm:items-start lg:items-center ">
          <p className="mb-3">Filter your recent and previous activities</p>
          <div>
            <Button onClick={handleDropdown}>
              <span>Filter recent activity</span>
              <span>{toggleArrow}</span>
            </Button>
            <div
              className={`bg-white shadow-md border absolute z-10 w-48 mt-4 p-4 hidden${toggle}`}>
              <p className="flex items-center gap-1 mb-3 font-medium">
                Filter by action <AdjustmentsHorizontalIcon width="15px" />
              </p>
              <Checkbox
                onChange={filterHandler}
                value="Authorisation"
                id="Authorisation"
                title="Authorisation"
                name="Category"
              />
              <Checkbox
                onChange={filteredDATA}
                value="Authentication"
                id="Authentication"
                title="Authentication"
                name="Category"
              />
              <Checkbox
                onChange={filteredDATA}
                value="Initiate"
                id="Initiate"
                title="Initiate"
                name="Category"
              />
            </div>
          </div>
        </div>
        <div className="user-list">
          <AuditData data={data} />
        </div>
        <Pagination totalItems={meta?.total} handlePageClick={setPage} />
      </Container>
    </div>
  );
};
