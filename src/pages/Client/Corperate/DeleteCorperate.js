import React from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { ModalButton } from 'components/Button/Button'
export const DeleteCorperate = ({deleteUser}) => {
  return (
    <div className='text-center p-7'>
        <p>Are you sure you want to permanently delete corperate user?</p>
        <p className='flex items-center gap-2 justify-center mt-2 mb-2'><ExclamationTriangleIcon width="30px" className='text-red-700'/> Note this change is ireversible</p>
        <div className='flex items-center gap-4 justify-center'>
            <ModalButton>Cancel</ModalButton>
            <ModalButton bg="bg-red-700 text-white" onClick={deleteUser}>Delete</ModalButton>
        </div>
    </div>
  )
}
