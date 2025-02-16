'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import Image from 'next/image';
import Link from 'next/link';
import { Sidebar } from 'primereact/sidebar';
import { useLocation } from '@/app/contexts/location-context';
import { LocationOption } from '@/app/utils/types/interfaces';


const Header = () => {
  const [visible, setVisible] = useState(false);
  const [, setIsMobile] = useState(false);
  const { location } = useLocation();

  const locationOption = useMemo<LocationOption | null>(() => {
    return location ? { label: location, value: location } : null;
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const locationOptions = useMemo(() => {
    return location ? [{ label: location, value: location }] : [];
  }, [location]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logo Section - Flexible sizing */}
          <div className="flex-shrink-0 min-w-[100px] md:min-w-[200px]">
            <Link href="/" className="relative block w-full h-full">
              <Image 
                src="/logo.svg"
                alt="Enatega Logo"
                width={200}
                height={48}
                className="object-contain w-auto h-[28px] md:h-[48px]"
                priority={true}
                style={{
                  width: 'auto',
                  minWidth: '100px',
                  maxWidth: '200px'
                }}
              />
            </Link>
          </div>
    
          {/* Location Dropdown - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-grow max-w-[200px]">
            <i className={`pi pi-map-marker mr-2 ${location ? 'text-green-500' : 'text-gray-500'}`}></i>
            <Dropdown
              data-testid="header-location"
              value={locationOption}
              placeholder={location || "Select Location"}
              options={locationOptions}
              optionLabel="label"
              className="w-full [&_.p-dropdown-label]:text-black"
              panelClassName="text-black"
              disabled={locationOptions.length === 0}
            />
          </div>
    
          {/* Actions Section */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Desktop Buttons */}
            <div className="hidden md:flex gap-3">
              <Button 
                label="Login"
                className="p-button-outlined border border-black rounded-full 
                          hover:bg-green-500 hover:border-green-500 text-black
                          px-6 py-2 text-base md:px-7 md:py-2.5 md:text-[1.05rem]"
              />
              <Button
                label="Sign up" 
                className="p-button-outlined border border-black rounded-full 
                          hover:bg-green-500 hover:border-green-500 text-black
                          px-6 py-2 text-base md:px-7 md:py-2.5 md:text-[1.05rem]"
              />
            </div>

            {/* Cart Button */}
            <Button 
              icon="pi pi-shopping-bag" 
              className="p-button-text text-black border-0 shadow-none"
              onClick={() => console.log('Cart')}
            />
            
            {/* Mobile Menu Button */}
            <Button
              icon="pi pi-bars"
              className="md:hidden p-button-text text-black"
              onClick={() => setVisible(true)}
            />
          </div>
        </div>
      </div>
    
      {/* Mobile Location Selector */}
      <div className="md:hidden border-t mt-2 py-2">
        <div className="container mx-auto px-4 flex items-center">
          <i className={`pi pi-map-marker mr-2 ${location ? 'text-green-500' : 'text-gray-500'}`}></i>
          <Dropdown
            value={locationOption}
            placeholder={location || "Select Location"}
            options={locationOptions}
            optionLabel="label"
            className="w-full text-black"
            disabled={locationOptions.length === 0}
          />
        </div>
      </div>
    
      {/* Mobile Sidebar */}
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
        className="p-sidebar-sm w-[80vw]"
        style={{ backgroundColor: 'white' }}
      >
        <div className="p-2">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b">Account</h2>
          <div className="flex flex-col space-y-3">
            <Button 
              label="Login"
              className="p-button-outlined w-full justify-center font-medium rounded-full border border-black text-black hover:bg-green-500 hover:text-white"
              onClick={() => console.log('Login')}
            />
            <Button 
              label="Sign up" 
              className="p-button-success w-full justify-center font-medium rounded-full border border-black text-black hover:bg-green-500 hover:text-white"
              onClick={() => console.log('Sign up')}
            />
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Header;