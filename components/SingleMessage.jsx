import React from 'react'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/context/Global';

const SingleMessage = ({message}) => {
    const [isRead, setIsRead] = useState(message.read);
    const [isDeleted, setIsDeleted] = useState(false);

    const { setUnreadNumber} = useGlobalContext();

    const handleReadClick = async() => {
        try{
         const res = await fetch(`/api/messages/${message._id}`, {
            method: 'PUT'
         });
         if(res.status === 200){
        
            const {read} = await res.json();
            setIsRead(read);
            setUnreadNumber((prevNum)=> (read ? prevNum - 1 : prevNum + 1) )
            if(read) {
                toast.success('Marked as read');
            }else{
                toast.success('Marked as new');
            }
         }
        }catch(error){
          console.log(error);
          toast.error('Something went wrong');
        }
    }


    const handleDeleteClick = async() => {
       try {
        const res = await fetch(`/api/messages/${message._id}`, {
          method: 'DELETE'
        });

        if(res.status === 200) {
          setIsDeleted(true);
          setUnreadNumber((prevNum)=> prevNum - 1);
          toast.success('Message Deleted');

        }
       } catch (error) {
         console.log(error);
         toast.error('Message was not deleted');
       }
    }

    if(isDeleted) return null;

  return (
    <div
    className="relative bg-white p-4 rounded-md shadow-md border border-gray-200"
  >
    { !isRead && (
       <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>New</div>
    )}
    <h2 className="text-xl mb-4">
      <span className="font-bold">Property Inquiry:</span>
      {" "} {message.property.name}
    </h2>
    <p className="text-gray-700">
     {message.body}
    </p>

    <ul className="mt-4">
      <li><strong>Name:</strong> {message.sender.username}</li>

      <li>
        <strong>Reply Email:</strong>{" "}
        <a href={`mailto:${message.email}`} className="text-blue-500"
          >{message.email}</a
        >
      </li>
      <li>
        <strong>Reply Phone:</strong>{" "}
        <a href={`tel:${message.phone}`} className="text-blue-500"
          >{message.phone}</a
        >
      </li>
      <li><strong>Received:</strong>{new Date(message.createdAt).toLocaleString()}</li>
    </ul>
    <button
    onClick={handleReadClick}
      className={`mt-4 mr-3 ${isRead ? 'bg-gray' : 'bg-pink-600  text-white'} py-1 px-3 rounded-md`}
    >
    {isRead ? 'Mark As New' : 'Read'}
    </button>
    <button onClick={handleDeleteClick} className="mt-4 bg-orange-500 text-white py-1 px-3 rounded-md">
      Delete
    </button>
  </div>
  )
}

export default SingleMessage