import { DocumentIcon } from '@heroicons/react/24/outline';
import { truncateText } from 'utils';
import { Label } from '../Label/Label';
import { useRef, useEffect, useState } from 'react';

export const FileUpload = (props) => {
  const dragAndDropRef = useRef();
  const [isDragActive, setIsDragActive] = useState(false);
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

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    if (files && files.length > 0) {
      onChange({
        ...e,
        target: { files }
      });
    }
    e.dataTransfer.clearData();
    setIsDragActive(false);
  };

  useEffect(() => {
    const dropContainer = dragAndDropRef.current;
    if (dropContainer) {
      dropContainer.addEventListener('dragenter', handleDragEnter);
      dropContainer.addEventListener('dragleave', handleDragLeave);
      dropContainer.addEventListener('dragover', handleDragOver);
      dropContainer.addEventListener('drop', handleDrop);
    }
    return () => {
      if (dropContainer) {
        dropContainer.removeEventListener('dragenter', handleDragEnter);
        dropContainer.removeEventListener('dragleave', handleDragLeave);
        dropContainer.removeEventListener('dragover', handleDragOver);
        dropContainer.removeEventListener('drop', handleDrop);
      }
    };
  }, [dragAndDropRef]);

  const opacity = isDragActive ? '0.5' : '1';

  return (
    <>
      {label && <Label label={label} />}
      <div
        className="flex justify-center items-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 h-[250px] w-full"
        ref={dragAndDropRef}
        style={{ opacity }}>
        <div className="space-y-1 w-full">
          <Icon className="mx-auto h-14 w-14 text-gray-400" />
          <div className="flex text-sm text-gray-600 justify-center text-center">
            <label
              htmlFor={id}
              className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none">
              {!file && <span>Upload a file</span>}
              <input
                id={id}
                name={id}
                type="file"
                className="sr-only"
                accept={accept}
                onChange={onChange}
              />
            </label>
            {!file && <p className="pl-1">or drag and drop</p>}
          </div>
          <div className="pt-2">
            {file ? (
              <>
                <div className="flex justify-center w-full">
                  <span className="inline-flex items-center rounded-full bg-gray-50 py-1 px-2 text-xs font-medium text-gray-700 border border-gray-300 text-center justify-center">
                    {truncateText(file.name, 20)}
                    <button
                      type="button"
                      onClick={removeFile}
                      className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-500 bg-gray-200 hover:bg-red-100 hover:text-red-700 focus:bg-red-100 focus:text-red-400 focus:outline-none">
                      <span className="sr-only">Remove small option</span>
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                </div>
                {children}
              </>
            ) : (
              <p className="text-sm text-gray-500 text-center">{infoText}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
