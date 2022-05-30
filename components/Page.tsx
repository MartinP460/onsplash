import Head from "next/head";
import React from "react";

type PageProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};
const Page: React.FC<PageProps> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

export default Page;
