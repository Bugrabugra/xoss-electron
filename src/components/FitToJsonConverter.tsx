import { Button, Form, Input } from "antd";
import { useState } from "react";

type FieldType = {
  fitFilePath: string;
};

const FitToJsonConverter = () => {
  const [form] = Form.useForm();
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleSelectFitFile = async () => {
    const selectedFitFile = await window.xossApi.selectFitFile();
    form.setFieldValue("fitFilePath", selectedFitFile);
    const result = await form.validateFields();

    setIsFileSelected(!!result.fitFilePath);
  };

  const convertFitToJson = async () => {
    await window.xossApi.convertFitToJson(form.getFieldValue("fitFilePath"));
  };

  return (
    <div className="file-converter">
      <Form form={form} className="select-fit-file">
        <Form.Item<FieldType>
          className="file-path"
          label="Fit file"
          name="fitFilePath"
          rules={[{ required: true, message: "Please select a .fit file" }]}
        >
          <Input readOnly disabled />
        </Form.Item>

        <Button onClick={handleSelectFitFile}>Select</Button>
      </Form>

      <button disabled={!isFileSelected} onClick={convertFitToJson}>
        Convert
      </button>
    </div>
  );
};

export default FitToJsonConverter;
