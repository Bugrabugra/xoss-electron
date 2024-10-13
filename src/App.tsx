import { useEffect } from "react";
import "./App.scss";
import { ConfigProvider, Flex, theme } from "antd";
import { useAppStore } from "@/store";
import WorkoutMap from "@/components/WorkoutMap";
import SideMenu from "@/components/SideMenu";

function App() {
  const { setWorkouts } = useAppStore();

  useEffect(() => {
    setWorkouts();
  }, []);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Flex>
        <SideMenu />
        <WorkoutMap />
      </Flex>
    </ConfigProvider>
  );
}

export default App;
