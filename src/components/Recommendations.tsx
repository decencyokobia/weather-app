import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}

const Recommendations = ({ children }: Prop) => {
  return <>{children}</>;
};

export default Recommendations;
