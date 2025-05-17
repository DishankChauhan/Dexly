'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    redirect('/landing');
  }, []);
  
  return null;
} 