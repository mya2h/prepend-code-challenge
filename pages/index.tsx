import React from 'react';
import Router from 'next/router'

export default function AlignItemsList() {
  React.useEffect(() => {
    Router.push('/pokemon')
  }, [])
  return (
    <div>
    </div>
  );
}
