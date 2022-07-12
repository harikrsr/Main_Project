import Head from "next/head";
import Link from "next/link";
import { routes } from "../components/Sidebar";
export default function Home() {
  return (
    <>
      <Head>
        <title>StarDust Voting</title>
        <meta name="description" content="Secure Vote" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-10">
       StarDust Voting Page <br />
        {routes.map((route, i) => (
          <Link key={i} href={route.path}><a className="block text-primary">{route.name}</a></Link>
        ))}
        <Link href="/404"><a className="text-primary block">404 page</a></Link>
        <Link href="/login"><a className="text-primary block">Login page</a></Link>
      </main>
    </>
  );
}
