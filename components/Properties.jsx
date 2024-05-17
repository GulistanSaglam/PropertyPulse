"use client";
import React, {useState, useEffect} from 'react'
import PropertyCard from '@/components/PropertyCard'
import Spinner from '@/components/Spinner'

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async() => {
            try {
                const res = await fetch('/api/properties');
                if(!res.ok){
                    throw new Eroor('failed to fetch the properties')
                }
                const data = await res.json()
                setProperties(data);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }

        fetchProperties();
    }, [])
  
  
  return loading ? (<Spinner loading={loading}/>) : (
    <section class="px-4 py-6">
    <div class="container-xl lg:container m-auto px-4 py-6">
       {properties.length === 0 ? (
         <p>No properties found</p>
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

export default Properties
