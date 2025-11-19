"use client";

import DepositChart from "@/components/charts/deposit";
import WeekChart from "@/components/charts/week";
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
    <div className="flex p-9 w-full">
      <div className="grid grid-cols-12 gap-4 w-full">
        <div className="col-span-4 flex">
          <DepositChart />
        </div>
        <div className="col-span-4 flex">
          <WeekChart />
        </div>
      </div>
    </div>
  );
}

export default Home;