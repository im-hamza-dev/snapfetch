import React from "react";
import "./card.scss";
// interface ICard  {
// children: React.PropsWithChildren
// }
export const Card = ({ children }: React.PropsWithChildren) => {
  return <div className="card-wrapper">{children}</div>;
};
