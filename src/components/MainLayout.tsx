// src/components/MainLayout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="font-segoe">
      <Header isScrolled={false} />  {/* Đưa Header vào trang */}
      <main className="pt-16">
        {children}  {/* Nội dung của từng trang sẽ được render tại đây */}
      </main>
      <Footer />  {/* Đưa Footer vào trang */}
    </div>
  );
};

export default MainLayout;
