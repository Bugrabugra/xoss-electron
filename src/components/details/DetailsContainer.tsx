import { Tabs } from "antd";
import Details from "@/components/details/Details";
import Charts from "@/components/details/Charts";

const DetailsContainer = () => {
  const items = [
    { label: "Details", key: "data", children: <Details /> },
    {
      label: "Chart",
      key: "chart",
      children: <Charts />
    }
  ];

  return <Tabs defaultActiveKey="details" type="card" items={items} className="details-container" />;
};

export default DetailsContainer;
