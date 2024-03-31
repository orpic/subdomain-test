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
        <div className="z-10 text-xl  w-full items-center justify-between font-mono lg:flex">
          <p className="w-96  flex  justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <p className="">
              Try a different subdomain&nbsp; <br />
            </p>
            subdomain:&nbsp;{subdomain},<br />
            templateId:&nbsp;{templateId}, <br />
            videoId:&nbsp;{videoId}
          </p>
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
