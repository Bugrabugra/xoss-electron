import { useEffect } from "react";
import "./App.scss";
import { ConfigProvider, theme } from "antd";
import { useAppStore } from "@/store";
import WorkoutMap from "@/components/map/WorkoutMap";
import SideMenu from "@/components/SideMenu";

function App() {
  const setWorkouts = useAppStore((state) => state.setWorkouts);
  const loadStore = useAppStore((state) => state.loadStore);
  const setSelectedWorkout = useAppStore((state) => state.setSelectedWorkout);

  useEffect(() => {
    setWorkouts();
    loadStore();
  }, []);

  useEffect(() => {
    window.xossApi.setSelectedWorkout((workoutId) => {
      setSelectedWorkout(workoutId);
    });
  }, []);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm, token: { fontFamily: "Fira Sans" } }}>
      <div className="app-container">
        <SideMenu />
        <WorkoutMap />
      </div>
    </ConfigProvider>
  );
}

export default App;
