"use client";

import DepositChart from "@/components/charts/deposit";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const { data: me, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && me) {
      router.push(`/`);
    } else {
      router.push('/login');
    }
  }, [me, isLoading]);

  return (
    <div className="flex items-center justify-center h-full">
      <DepositChart />
    </div>
  );
}

export default Home;