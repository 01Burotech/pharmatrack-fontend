"use client";
import Image from "next/image";

export default function Avatar({ src, size }: { src: string; size: number }) {
  return (
    <Image
      src={src}
      alt="Avatar"
      width={size}
      height={size}
      className="rounded-full object-cover"
    />
  );
}
