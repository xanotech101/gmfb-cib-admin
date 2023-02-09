import { PlusIcon } from '@heroicons/react/20/solid';
import { Button } from 'components/Button/Button';
import { Heading } from 'components/Common/Header/Heading';
import { Container } from 'components/Container/Container';

export const EmptyState = () => {
  return (
    <div className="py-5 pl-6 pr-7">
      <Container>
        <Heading>Create new Project</Heading>
        <div className="h-96 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true">
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
          <div className="mt-6 flex justify-center">
            <Button>
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Project
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
