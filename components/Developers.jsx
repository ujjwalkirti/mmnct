import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Teamcard from './Teamcard';

export default function DeveloperComponent({ developers, text }) {
    return (
      <div  >
        <div className="text-center mt-10 mb-10">
          <h1 className="text-3xl font-semibold mb-2">{text}</h1>
          <div className="border-b-4 border-[#F4A68D] w-9/12 md:w-2/5 lg:w-2/12 mx-auto mb-4 lg:mb-8"></div>
          {developers.length == 0 && (
            <Image
              src="/loader.gif"
              width={330}
              height={400}
              className="w-full md:w-2/5 md:mx-auto md:rounded-xl"
              alt="loading"
            />
          )}
          <div className={`grid gap-2  justify-items-center place-items-center ${developers.length === 1 ? '' : 'lg:grid-cols-2'}`} >
          {/* className="grid gap-2 lg:grid-cols-2 justify-items-center place-items-center " */}
            {developers.length != 0 &&
              developers.map((developer, index) => {
                return <Teamcard details={developer} key={index} />;
              })}
          </div>
        </div>
        
      </div>
    );
  }
  