import { PlusCircleFilled, SettingFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import FitToJsonConverterModal from "@/components/modals/FitToJsonConverterModal";
import SettingsModal from "@/components/modals/SettingsModal";

const ActionButtons = () => {
  const [isImportFitFileModalOpen, setIsImportFitFileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <div className="action-buttons">
      <FitToJsonConverterModal
        isImportFitFileModalOpen={isImportFitFileModalOpen}
        setIsImportFitFileModalOpen={setIsImportFitFileModalOpen}
      />
      <SettingsModal isSettingsModalOpen={isSettingsModalOpen} setIsSettingsModalOpen={setIsSettingsModalOpen} />

      <Button icon={<SettingFilled />} shape="circle" size="large" onClick={() => setIsSettingsModalOpen(true)} />
      <Button
        icon={<PlusCircleFilled />}
        shape="circle"
        size="large"
        onClick={() => setIsImportFitFileModalOpen(true)}
      />
    </div>
  );
};

export default ActionButtons;
