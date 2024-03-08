import Layout from "@/components/layouts/privateLayout";
import { Checkbox } from "@/shared/checkbox";
import Card from "@/shared/card";

import type { ReactElement } from "react";

const Home = () => {
  return <></>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
