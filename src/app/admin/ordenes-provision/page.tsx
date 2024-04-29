"use client";
import { Button, Flex } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const currentPage = usePathname();

  return <Flex height="95vh" bg="#dcdcdc"></Flex>;
}
