import { useState } from "react";
import { useAddNewProductMutation } from "../../redux/api/api";
import { Form, Input, InputNumber, Upload, Button, message, Alert } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddNewProduct = () => {
  const [addNewProduct, { isLoading }] = useAddNewProductMutation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [error, setError] = useState("");

  const handleImageChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      // Handle price structure
      const priceData = {
        regular_price: values.regular_price,
        offered_price: values.offered_price || values.regular_price,
      };

      // Handle tags
      const tags = values.tags
        ? values.tags.split(",").map((tag: any) => tag.trim())
        : [];

      // Create the main product data object
      const productData = {
        name: values.name,
        description: values.description,
        price: priceData,
        stock: values.stock,
        category: values.category,
        brand: values.brand,
        ratings: values.ratings,
        reviews: values.reviews || "",
        isFeatured: values.isFeatured || false,
        tags: tags,
      };

      // Append the stringified product data
      formData.append("data", JSON.stringify(productData));

      // Append files
      fileList.forEach((file: any) => {
        formData.append("files", file.originFileObj);
      });

      await addNewProduct(formData).unwrap();
      message.success("Product added successfully!");
      form.resetFields();
      setFileList([]);
      setError("");
    } catch (err: any) {
      setError(err.data?.message || "Failed to add product");
      message.error("Failed to add product");
    }
  };

  return (
    <div className="p-6 h-screen overflow-y-auto mb-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-6"
        />
      )}

      <div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ isFeatured: false }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Form.Item
              name="name"
              label="Product Name"
              rules={[
                { required: true, message: "Please enter the product name" },
              ]}
            >
              <Input className="h-10" placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              name="regular_price"
              label="Regular Price"
              rules={[
                { required: true, message: "Please enter the regular price" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="Enter regular price"
                className="h-10"
              />
            </Form.Item>

            <Form.Item name="offered_price" label="Offered Price">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="Enter offered price"
              />
            </Form.Item>

            <Form.Item
              name="stock"
              label="Stock Quantity"
              rules={[
                { required: true, message: "Please enter the stock quantity" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="Enter stock quantity"
              />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category ID"
              rules={[
                { required: true, message: "Please enter the category ID" },
              ]}
            >
              <Input placeholder="Enter category ID" />
            </Form.Item>

            <Form.Item
              name="brand"
              label="Brand"
              rules={[{ required: true, message: "Please enter the brand" }]}
            >
              <Input placeholder="Enter brand name" />
            </Form.Item>

            <Form.Item
              name="ratings"
              label="Ratings"
              rules={[{ required: true, message: "Please enter the ratings" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                max={5}
                step={0.1}
                placeholder="Enter ratings"
              />
            </Form.Item>

            <Form.Item name="tags" label="Tags">
              <Input placeholder="Enter tags (comma separated)" />
            </Form.Item>

            {/* <Form.Item name="isFeatured" valuePropName="checked">
              <Checkbox>Featured Product</Checkbox>
            </Form.Item> */}

            {/* description */}
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter product description"
              />
            </Form.Item>

            {/* reviews */}
            <Form.Item name="reviews" label="Reviews">
              <Input.TextArea rows={4} placeholder="Enter reviews" />
            </Form.Item>

            <Form.Item name="images" label="Product Images">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleImageChange}
                beforeUpload={() => false}
                multiple
                maxCount={5}
              >
                {fileList.length < 5 && (
                  <div>
                    <UploadOutlined />
                    <div className="mt-2">Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>

          <Form.Item className="mb-20">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ width: "100%", height: "40px" }}
            >
              {isLoading ? "Adding Product..." : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddNewProduct;
