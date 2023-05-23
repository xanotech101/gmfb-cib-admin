import { Button } from 'components/Button/Button';
import ContentLoader from 'react-content-loader';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'components/Container/Container';
import { UsersTable } from './UsersTable';
import { useModal } from 'hooks';
import { useQuery } from '@tanstack/react-query';
import { userService } from 'services';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { usePrivilege } from 'hooks';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import { DiscardChanges } from '../DiscardChanges';
export const CorporateUsers = () => {
  const { showModal, Modal } = useModal();
  const navigate = useNavigate();
  const { hasPrivilege } = usePrivilege();

  const hasAdminPrivilege = !!hasPrivilege(['admin']);

  const { data, isLoading } = useQuery({
    queryKey: ['getMyBranchUsers'],
    queryFn: () =>
      userService.getBranchUsers({
        withPagination: true
      })
  });

  const Render = () => {
    if (data?.users?.length === 0) {
      return (
        <EmptyState
          title="No Users found"
          description="There are no users in this branch. Click the button below to create one."
          showWAction={hasAdminPrivilege}
          action={{
            label: 'Create user',
            onClick: () => navigate('/settings/users/create-user')
          }}
        />
      );
    } else {
      return <UsersTable users={data?.users ?? []} decline={() => showModal()} />;
    }
  };

  return (
    <div>
      <Container>
        <div className="lg:flex items-center md:block">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700"> List of users created in GMFB system</p>
          </div>
          <div className="w-25 mt-4">
            {hasAdminPrivilege && (
              <Link to="create-user">
                <Button>
                  Add user <UserPlusIcon width="20px" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <SearchFilter placeholder={'Search for  users....'} />
        {isLoading ? (
          <div className="mt-5">
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
            </ContentLoader>
          </div>
        ) : (
          <Render />
        )}
      </Container>
      {Modal({
        children: (
          <DiscardChanges disable={() => showModal(false)}>
            Are you sure you want to disable corporate user?
          </DiscardChanges>
        ),
        size: 'sm'
      })}
    </div>
  );
};
