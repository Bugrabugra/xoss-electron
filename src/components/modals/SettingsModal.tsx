import { ColorPicker, Form, Modal, Slider, Switch } from "antd";
import { useAppStore } from "@/store";
import { StoreSchema } from "../../../index";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";

type SettingsModalProps = {
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (value: boolean) => void;
};

const SettingsModal = ({ isSettingsModalOpen, setIsSettingsModalOpen }: SettingsModalProps) => {
  const [form] = Form.useForm();
  const settings = useAppStore((state) => state.settings);
  const updateStore = useAppStore((state) => state.updateStore);

  const handleSaveStore = () => {
    const color = form.getFieldValue("pathColor");
    updateStore({
      ...form.getFieldsValue(),
      pathColor: typeof color === "string" ? color : color.toHexString()
    });
    setIsSettingsModalOpen(false);
  };

  return (
    <Modal
      title="Settings"
      open={isSettingsModalOpen}
      closable={false}
      onOk={handleSaveStore}
      okButtonProps={{ icon: <SaveOutlined /> }}
      onCancel={() => setIsSettingsModalOpen(false)}
      cancelButtonProps={{ icon: <CloseOutlined /> }}
      maskClosable={false}
    >
      <Form form={form}>
        <Form.Item<StoreSchema> label="Path color" name="pathColor" initialValue={settings.pathColor}>
          <ColorPicker format="hex" showText />
        </Form.Item>
        <Form.Item<StoreSchema> label="Path width" name="pathWidth" initialValue={settings.pathWidth}>
          <Slider min={1} max={8} />
        </Form.Item>
        <Form.Item<StoreSchema> label="Show ant path" name="isAntPathEnabled" initialValue={settings.isAntPathEnabled}>
          <Switch />
        </Form.Item>
        <Form.Item<StoreSchema>
          label="Show start and end points"
          name="isStartAndEndPointsEnabled"
          initialValue={settings.isStartAndEndPointsEnabled}
        >
          <Switch />
        </Form.Item>
        <Form.Item<StoreSchema>
          label="Show distance signs"
          name="isDistanceSignsEnabled"
          initialValue={settings.isDistanceSignsEnabled}
        >
          <Switch />
        </Form.Item>
        <Form.Item<StoreSchema>
          label="Distance signs visible zoom level"
          name="distanceSignsVisibleZoomLevel"
          initialValue={settings.distanceSignsVisibleZoomLevel}
        >
          <Slider min={1} max={18} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SettingsModal;
