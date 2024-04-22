import React from "react";

type Props = {
  text: string;
};

export default function Title({ text }: Props) {
  return <div className="w-full text-4xl font-bold">{text}</div>;
}
