import { Typography } from "antd";
import SelectWorkout from "@/components/SelectWorkout";
import ActionButtons from "@/components/ActionButtons";
import DetailsContainer from "@/components/details/DetailsContainer";

const SideMenu = () => {
  return (
    <div className="side-menu">
      <span className="main-title">
        <Typography className="xoss">XOSS</Typography>
        <Typography className="archiver">Archiver</Typography>
      </span>
      <div className="menu">
        <SelectWorkout />
        <DetailsContainer />
        <ActionButtons />
      </div>
    </div>
  );
};

export default SideMenu;
