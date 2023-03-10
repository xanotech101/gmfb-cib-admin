import React from 'react'
import { KeyIcon } from '@heroicons/react/24/outline'
import { Input } from 'components/Form/Input/Input'
import { Button } from 'components/Button/Button'
import { useNavigate } from 'react-router-dom'
export const DeleteCorperateAuthForm = () => {
    const navigate= useNavigate()
  return (
    <div>
        <form action="">
           <div className='mb-5'>
           <Input type="text" label={<p className='flex items-center gap-2'>Enter Password <KeyIcon width="15px"/></p>}/>
           </div>
            <Button isFullWidth onClick={()=>navigate("/corporate")}>Submit</Button>
        </form>
    </div>
  )
}
