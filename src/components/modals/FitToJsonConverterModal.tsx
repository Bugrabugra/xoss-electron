import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { CloseOutlined, DeleteOutlined, FileOutlined, SettingOutlined } from "@ant-design/icons";

type FieldType = {
  fitFilePath: string;
};

type FitToJsonConverterProps = {
  isImportFitFileModalOpen: boolean;
  setIsImportFitFileModalOpen: (value: boolean) => void;
};

const FitToJsonConverterModal = ({
  isImportFitFileModalOpen,
  setIsImportFitFileModalOpen
}: FitToJsonConverterProps) => {
  const [form] = Form.useForm();
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleSelectFitFile = async () => {
    const selectedFitFile = await window.xossApi.selectFitFile();
    form.setFieldValue("fitFilePath", selectedFitFile);
    const result = await form.validateFields();

    setIsFileSelected(!!result.fitFilePath);
  };

  const convertFitToJson = () => {
    window.xossApi.convertFitToJson(form.getFieldValue("fitFilePath"));
  };

  return (
    <Modal title="Import .fit file" open={isImportFitFileModalOpen} footer={null} closable={false}>
      <div className="file-converter">
        <Form onFinish={convertFitToJson} form={form} className="select-fit-file">
          <Form.Item<FieldType>
            className="file-path"
            label="Fit file"
            name="fitFilePath"
            rules={[{ required: true, message: "Please select a .fit file" }]}
          >
            <Input readOnly disabled />
          </Form.Item>

          <div className="buttons">
            <Button icon={<FileOutlined />} disabled={isFileSelected} onClick={handleSelectFitFile}>
              Select
            </Button>

            <Button
              disabled={!isFileSelected}
              icon={<DeleteOutlined />}
              onClick={() => {
                form.setFieldValue("fitFilePath", null);
                form.validateFields();
                setIsFileSelected(false);
              }}
              danger
            >
              Clear
            </Button>

            <Button type="primary" icon={<SettingOutlined />} disabled={!isFileSelected} htmlType="submit">
              Convert
            </Button>

            <Button icon={<CloseOutlined />} onClick={() => setIsImportFitFileModalOpen(false)}>
              Close
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default FitToJsonConverterModal;
