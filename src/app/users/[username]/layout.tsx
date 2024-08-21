import React from 'react';
import Navbar from "@/components/views/navbar"
import RightBar from '../../../components/right_bar';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <RightBar />
      <section className='body_wrapper_section'>
        {children}
      </section>
    </>
  )
}