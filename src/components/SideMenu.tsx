import FitToJsonConverter from "@/components/FitToJsonConverter";
import { Typography } from "antd";
import SelectWorkout from "@/components/SelectWorkout";

const SideMenu = () => {
  return (
    <div className="side-menu">
      <Typography className="main-title">XOSS</Typography>
      <FitToJsonConverter />
      <SelectWorkout />
    </div>
  );
};

export default SideMenu;
