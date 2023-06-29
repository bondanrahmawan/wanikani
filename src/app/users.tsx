"use client"

import { useEffect, useState } from 'react';

interface RadicalData {
  level: number;
  slug: string 
}

interface Radical {
  id: number;
  data: RadicalData
}

interface DummyData {
  id: number;
  title: String
}

const MyComponent = () => {
  const [users, setUsers] = useState<DummyData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        console.log(data)
        setUsers(data.products);
        console.log(users)
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((radical) => (
          <li key={radical.id}>{radical.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
