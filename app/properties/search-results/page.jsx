"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';

const SearchResultPage = () => {
    const searchParams = useSearchParams();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = searchParams.get('location');
    const type = searchParams.get('type');

    useEffect(() => {
        const fetchSearch = async() => {
            try {
                const res = await fetch(`/api/properties/search?location=${location}&type=${type}`);

                if(res.status === 200){
                  const data = await res.json();
                  setProperties(data);
                }else{
                  setProperties([])
                }
            } catch (error) {
                console.log(error);
            }finally{
              setLoading(false);
            }
        };
        fetchSearch();
    }, [location, type]);

  return loading ? (<Spinner loading={loading}/>) : (
    <section class="px-4 py-6">
    <div class="container-xl lg:container m-auto px-4 py-6">
      <Link href='/properties' className='flex items-center text-pink-600 hover:underline mb-3'>
        <FaArrowAltCircleLeft className='mr-2 mb-1' />Back to Properties
      </Link>
       <h1 className='text-2xl mb-4'>Search Result</h1>
       {properties.length === 0 ? (
         <p>No search results found</p>
       ) : (
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        { properties.map((property)=> (
          <PropertyCard key={property._id} property={property}/>
        ))}
       </div>
       )}

        </div>
    </section>
  )
}

export default SearchResultPage