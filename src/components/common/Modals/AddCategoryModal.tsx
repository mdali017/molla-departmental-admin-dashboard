import React, { useState } from "react";
import { Modal, Input, Form, Button, Spin, Upload, message } from "antd";
import { useAddCategoryMutation } from "../../../redux/api/api";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";

interface AddCategoryModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  setModalOpen,
  modalOpen,
  refetch
}) => {
  const [addCategory, { isLoading, isError }] = useAddCategoryMutation();
  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const [form] = Form.useForm();

  const handleAddCategory = async (values: {
    name: string;
    description: string;
  }) => {
    try {
      const formData = new FormData();
      
      // Create a data object to match backend expectations
      const categoryData = {
        name: values.name,
        description: values.description,
      };
      
      // Append the stringified data
      formData.append("data", JSON.stringify(categoryData));
      
      // Append the file with the correct field name
      if (imageFile) {
        formData.append("file", imageFile); // Changed from 'image' to 'file' to match backend
      }

      await addCategory(formData).unwrap();

      refetch()
      
      setModalOpen(false);
      form.resetFields();
      setImageFile(null);
      message.success("Category added successfully!");
    } catch (err) {
      console.error("Failed to add category:", err);
      message.error("Failed to add category. Please try again.");
    }
  };

  const handleImageChange = (info: { file: RcFile }) => {
    const { file } = info;

    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
      return;
    }
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return;
    }

    setImageFile(file);
    message.success(`${file.name} file uploaded successfully`);
  };

  return (
    <Modal
      title="Add New Category"
      centered
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      footer={null}
    >
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Form form={form} layout="vertical" onFinish={handleAddCategory}>
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the category description!",
              },
            ]}
          >
            <Input.TextArea placeholder="Enter category description" />
          </Form.Item>

          <Form.Item
            label="Upload Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please upload an image for the category!",
              },
            ]}
          >
            <Upload
              name="file"
              listType="picture"
              maxCount={1}
              customRequest={({ file }) =>
                handleImageChange({ file: file as RcFile })
              }
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {imageFile && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Category"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                  }}
                />
              </div>
            )}
          </Form.Item>

          {isError && (
            <p style={{ color: "red" }}>
              Failed to add category. Please try again.
            </p>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Add Category
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default AddCategoryModal;