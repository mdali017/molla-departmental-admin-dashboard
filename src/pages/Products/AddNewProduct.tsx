import { useState } from "react";
import {
  useAddNewProductMutation,
  useGetAllCategoriesQuery,
} from "../../redux/api/api";
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  message,
  Alert,
  Select,
  Card,
} from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import ProductExcelModal from "./ProductExcelModal/ProductExcelModal";

const AddNewProduct = () => {
  const [addNewProduct, { isLoading }] = useAddNewProductMutation();
  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery(undefined);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [error, setError] = useState("");
  const [excelProductModalOpen, setExcelProductModalOpen] = useState(false);

  const categoryOptions =
    categoriesResponse?.data.map((category: any) => ({
      label: category.name,
      value: category._id,
    })) || [];

  const handleImageChange = ({ fileList: newFileList }: { fileList: any }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      const priceData = {
        regular_price: values.regular_price,
        offered_price: values.offered_price || values.regular_price,
      };

      const tags = values.tags
        ? values.tags.split(",").map((tag: any) => tag.trim())
        : [];

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

      formData.append("data", JSON.stringify(productData));

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
    <div className="">
      <Card
        className="shadow-lg rounded-xl border-0"
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Add New Product
            </h1>

            <Button
              type="primary"
              icon={<DownloadOutlined className="" />}
              onClick={() => setExcelProductModalOpen(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md"
              style={{
                height: "44px",
                padding: "0 20px",
                fontWeight: 600,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              Export to Excel
            </Button>
          </div>

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              className="mb-6 rounded-lg"
            />
          )}

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ isFeatured: false }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1 */}
              <div className="space-y-4">
                <Card className="shadow-sm p-4 rounded-lg">
                  <Form.Item
                    name="name"
                    label={<span className="font-medium">Product Name</span>}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the product name",
                      },
                    ]}
                  >
                    <Input
                      className="h-10 rounded-lg"
                      placeholder="Enter product name"
                    />
                  </Form.Item>

                  <Form.Item
                    name="regular_price"
                    label={<span className="font-medium">Regular Price</span>}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the regular price",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      placeholder="Enter regular price"
                      className="h-10 rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    name="offered_price"
                    label={<span className="font-medium">Offered Price</span>}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      placeholder="Enter offered price"
                      className="rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    name="stock"
                    label={<span className="font-medium">Stock Quantity</span>}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the stock quantity",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      placeholder="Enter stock quantity"
                      className="rounded-lg"
                    />
                  </Form.Item>
                </Card>

                <Card className="shadow-sm p-4 rounded-lg">
                  <Form.Item
                    name="description"
                    label={<span className="font-medium">Description</span>}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the description",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Enter product description"
                      className="rounded-lg"
                    />
                  </Form.Item>
                </Card>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <Card className="shadow-sm p-4 rounded-lg">
                  <Form.Item
                    name="category"
                    label={<span className="font-medium">Category</span>}
                    rules={[
                      { required: true, message: "Please select a category" },
                    ]}
                  >
                    <Select
                      options={categoryOptions}
                      placeholder="Select a category"
                      loading={categoriesLoading}
                      className="rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    name="brand"
                    label={<span className="font-medium">Brand</span>}
                    rules={[
                      { required: true, message: "Please enter the brand" },
                    ]}
                  >
                    <Input
                      placeholder="Enter brand name"
                      className="rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    name="ratings"
                    label={<span className="font-medium">Ratings</span>}
                    rules={[
                      { required: true, message: "Please enter the ratings" },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      max={5}
                      step={0.1}
                      placeholder="Enter ratings"
                      className="rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    name="tags"
                    label={<span className="font-medium">Tags</span>}
                  >
                    <Input
                      placeholder="Enter tags (comma separated)"
                      className="rounded-lg"
                    />
                  </Form.Item>
                </Card>

                <Card className="shadow-sm p-4 rounded-lg">
                  <Form.Item
                    name="reviews"
                    label={<span className="font-medium">Reviews</span>}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Enter reviews"
                      className="rounded-lg"
                    />
                  </Form.Item>
                </Card>

                <Card className="shadow-sm p-4 rounded-lg">
                  <Form.Item
                    name="images"
                    label={<span className="font-medium">Product Images</span>}
                  >
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onChange={handleImageChange}
                      beforeUpload={() => false}
                      multiple
                      maxCount={5}
                      className="rounded-lg"
                    >
                      {fileList.length < 5 && (
                        <div className="flex flex-col items-center">
                          <UploadOutlined className="text-lg" />
                          <div className="mt-2 text-sm">Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                </Card>
              </div>
            </div>

            <div className="mt-8">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full h-12 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                size="large"
              >
                {isLoading ? "Adding Product..." : "Add Product"}
              </Button>
            </div>
          </Form>
        </div>
      </Card>

      {excelProductModalOpen && (
        <ProductExcelModal
          open={excelProductModalOpen}
          setOpen={setExcelProductModalOpen}
        />
      )}
    </div>
  );
};

export default AddNewProduct;
