import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { naira } from 'utils/currencyFormatter';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/20/solid';
import { DateFormats, DateUtils } from 'utils';

export const ReceiptModal = ({
  isOpen,
  setIsOpen,
  invoiceInfo,
  nextReceipt,
  showNextReceiptButton
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById('print');
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = 'annoymous';
        img.src = dataUrl;
        img.onload = () => {
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: [5.5, 8.5]
          });

          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          let pageHeight = pdf.internal.pageSize.getHeight();

          const pageCanvas = document.createElement('canvas');
          const pageCtx = pageCanvas.getContext('2d');
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }

            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = 'white';
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          pdf.save(`invoice-${invoiceInfo.ReferenceID}.pdf`);
        };
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div className="my-8 inline-block w-full max-w-md transform  rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div
                className="absolute -right-2 -top-6 bg-white shadow rounded-full w-10 h-10 flex justify-center items-center cursor-pointer"
                onClick={closeModal}>
                <XMarkIcon className="w-6 h-6" />
              </div>
              <div className="p-4" id="print">
                <div className="flex items-center justify-between gap-4 my-3">
                  <p className=" text-sm font-normal text-gray-900">TRANSACTION RECEIPT</p>
                  <p>
                    <img src={`${process.env.PUBLIC_URL}/gmfb.png`} width="120px" alt="" />
                  </p>
                </div>
                <div className="mt-6 space-y-6 ">
                  <div className="text-center">
                    <div className="grooming-color3 w-11 h-11 rounded-full p-2 m-auto">
                      <div className="grooming-color w-full h-full rounded-full p-1 flex justify-center items-center">
                        <CheckIcon className=" text-white w-6 h-6" />
                      </div>
                    </div>
                    <p className="font-medium text-primary mt-2">SUCCESSFUL</p>
                  </div>
                  <hr />
                  <div className=" flex   items-center space-x-2">
                    <span className="font-bold col-span-5">Amount:</span>
                    <span className="font-normal">{naira.format(invoiceInfo?.Amount / 100)}</span>
                  </div>
                  <hr />
                  <div className=" flex  items-center space-x-2">
                    <span className="font-bold col-span-5">Reference:</span>
                    <span className="font-normal">{invoiceInfo?.ReferenceID}</span>
                  </div>
                  <hr />
                  <div className=" flex items-center space-x-2">
                    <span className="font-bold col-span-5">Date:</span>
                    <span className="font-normal">
                      {invoiceInfo?.CurrentDate &&
                        DateUtils.dateToString(
                          invoiceInfo?.CurrentDate,
                          DateFormats.frontendDateTime
                        )}
                    </span>
                  </div>
                  <hr />
                  <div className=" flex items-center space-x-2">
                    <span className="font-bold col-span-5">Transaction Status:</span>
                    <span className=" font-normal">{invoiceInfo?.RecordType}</span>
                  </div>
                  <hr />
                  <div className=" flex flex-col">
                    <p className="font-bold col-span-5">Narration:</p>
                    <span className="font-normal">{invoiceInfo?.Narration}</span>
                  </div>
                  <hr />
                </div>
              </div>

              <div className="mt-4 flex gap-2 space-x-2 px-4 pb-6">
                <button
                  className="flex w-full items-center justify-center space-x-1 rounded-md border border-g py-2 text-sm text-primary shadow-sm grooming-color4 hover:text-white"
                  onClick={SaveAsPDFHandler}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download</span>
                </button>
                {showNextReceiptButton && (
                  <button
                    onClick={nextReceipt}
                    className="flex w-full items-center justify-center space-x-1 rounded-md grooming-color py-2 text-sm text-white shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                    <span>Next</span>
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
