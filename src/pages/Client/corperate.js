import { Heading } from 'components/Common/Header/Heading';
import { Container } from 'components/Container/Container';
import React, { useState } from 'react';
import { CorperateData } from './Corperate/CorperateData';
import { CorperateTable } from './Corperate/CorperateTable';
import { useModal } from 'hooks';
import { DeleteCorperate } from './Corperate/DeleteCorperate';
import { Link } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
export const Corperate = () => {
  const navigate=useNavigate()
  const { showModal, Modal } = useModal();
  const [datas,setData]=useState(CorperateData)
  let text;
  const handleDelete=(id)=>{
      const newData=datas.filter(data=>{
       return data.id !==id
      })
      setData(newData)
      showModal()
  }
  return (
    <div className="flex flex-col mt-7 px-7">
      <Container>
          <div className='flex justify-between items-center'>
          <div className="mb-3">
          <Heading>Corpereate Users</Heading>
          <p>List of all corperste users.</p>
        </div>
        <div>
          <Link to="/createcorperateuser" className='grooming-color flex text-white p-2 rounded font-medium'>Create corperate user <UserPlusIcon width="20px"/></Link>
        </div>
          </div>
        <CorperateTable CorperateData={datas} onClick={handleDelete}/>
        <p>{text}</p>
      </Container>
      {Modal({ children:<DeleteCorperate deleteUser={()=>navigate("/deletecorperateauth")}/>, size: 'lg' })}
    </div>
  );
};
