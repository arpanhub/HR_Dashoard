import Navbar from '@/Component/Navbar';

export default function BookmarksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className='pt-20'>{children}</main>
    </>
  );
}
