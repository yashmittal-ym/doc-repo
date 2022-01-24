import React  from 'react';
import Form from "./Form";
import DocDataTable from './DocDataTable';
export default function Welcome({handleLogout}) {
  return (
    <div className='hero'>
        <nav>
            <h2>Welcome</h2>
            <button onClick={handleLogout}>Logout</button>
        </nav>
        <Form />
        <DocDataTable />
    </div>
  );
}
