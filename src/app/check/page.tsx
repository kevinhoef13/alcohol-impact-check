"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <p className="text-gray-600">Redirecting...</p>
    </div>
  );
}
