import { GetServerSidePropsContext } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const router = useRouter();

  const { subdomain, templateId, videoId } = router.query;
  console.log("props", props, "dddd:", subdomain);

  return (
    <>
      <Head>
        <title>{subdomain?.toString()}</title>
        <meta property="og:title" content={subdomain as string} />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <div className="z-10 text-xl flex flex-col w-full items-center justify-between font-mono gap-7">
          <div className="w-96  flex  justify-center border-b border-gray-300  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:from-inherit lg:static  lg:rounded-xl lg:border lg:p-4 lg bg-gray-700">
            <p className="">
              Try a different subdomain&nbsp; <br />
            </p>
          </div>
          <div className="flex justify-start flex-col">
            subdomain:&nbsp;{subdomain},<br />
            templateId:&nbsp;{templateId}, <br />
            videoId:&nbsp;{videoId}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryParams = context.query;
  return {
    props: queryParams, // Passed to the page component as props
  };
}
