'use client';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: 'block',
    margin: '100px auto',
    
}

const loading = ({ loading }) => {
  return (
    <ClipLoader
    color= 'bg-pink-500'
    loading={loading}
    cssOverride={override}
    size={150}
    aria-label="Loading Spinner"
    data-testid="Loading Spinner"
    />
  );
};

export default loading