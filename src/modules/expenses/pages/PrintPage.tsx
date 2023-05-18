import React from 'react';
import { useParams } from 'react-router-dom';

const PrintPage = () => {
  const { ids } = useParams();

  return <div>Print - {JSON.stringify(ids)}</div>;
};

export default PrintPage;
