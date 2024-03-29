import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const { subdomain, templateId, videoId } = router.query;
  console.log("sub:", subdomain, templateId, videoId, router);

  useEffect(() => {
    console.log("subeffect:", subdomain, templateId, videoId, router);
  }, [router, subdomain, templateId, videoId]);

  return (
    <>
      <Head>
        <title>{subdomain?.toString()}</title>
        <meta property="og:title" content={subdomain as string} />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Get started by editing&nbsp; <br />
            subdomain:&nbsp;{subdomain}
            ,<br />
            templateId:&nbsp;{templateId}, <br />
            videoId:&nbsp;{videoId}
            <code className="font-mono font-bold">src/pages/index.tsx</code>
          </p>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  // console.log("context", context);
  const host = context.req.headers.host;
  const subdomain = host.split(".")[0]; // Simple extraction; enhance as needed.
  const queryParams = context.query;

  return {
    props: { subdomain, queryParams }, // Passed to the page component as props
  };
}
