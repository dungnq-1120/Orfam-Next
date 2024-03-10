import { Quicksand } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={quicksand.className}>{children}</div>;
};

export default PublicLayout;
