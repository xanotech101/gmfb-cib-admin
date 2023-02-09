import { DocumentIcon } from '@heroicons/react/24/outline';
import { truncateText } from 'utils';
import { Label } from '../Label/Label';

export const FileUpload = (props) => {
  // TODO: add react dnd for drag and drop

  const {
    Icon = DocumentIcon,
    infoText,
    label,
    accept,
    id,
    onChange,
    file,
    removeFile,
    children
  } = props;

  return (
    <>
      {label && <Label label={label} />}
      <div className="flex justify-center items-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 h-[250px]">
        <div className="space-y-1 text-center">
          <Icon className="mx-auto h-14 w-14 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={id}
              className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none"
            >
              <span>Upload a file</span>
              <input
                id={id}
                name={id}
                type="file"
                className="sr-only"
                accept={accept}
                onChange={onChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <div className="pt-2">
            {file ? (
              <>
                <span className="inline-flex items-center rounded-full bg-gray-50 py-1 px-2 text-xs font-medium text-gray-700 border border-gray-300">
                  {truncateText(file.name, 20)}
                  <button
                    type="button"
                    onClick={removeFile}
                    className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-500 bg-gray-200 hover:bg-red-100 hover:text-red-700 focus:bg-red-100 focus:text-red-400 focus:outline-none"
                  >
                    <span className="sr-only">Remove small option</span>
                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                      <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                    </svg>
                  </button>
                </span>
                {children}
              </>
            ) : (
              <p className="text-sm text-gray-500">{infoText}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
