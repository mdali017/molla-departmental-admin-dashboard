import React, { useEffect } from "react";
import {
  Modal,
  Divider,
  Image,
  Form,
  Input,
  InputNumber,
  Button,
  Spin,
  message,
} from "antd";
import { useUpdateProductMutation } from "../../../redux/api/api";

interface ProductDetailsModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProductDetails: any;
}

const ProductEditModal: React.FC<ProductDetailsModalProps> = ({
  setModalOpen,
  modalOpen,
  selectedProductDetails,
}) => {
  const [form] = Form.useForm();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  // Reset form when modal opens with new product details
  useEffect(() => {
    if (selectedProductDetails && modalOpen) {
      form.setFieldsValue({
        name: selectedProductDetails.name,
        description: selectedProductDetails.description,
        price: parseFloat(
          selectedProductDetails.price.replace(/[^0-9.-]+/g, "")
        ),
        stock: selectedProductDetails.stock,
      });
    }
  }, [selectedProductDetails, modalOpen, form]);

  if (!selectedProductDetails) return null;

  const { name, category, images } = selectedProductDetails;

  const handleUpdateProductData = async (values: {
    name: string;
    description: string;
    price: number;
    stock: number;
  }) => {
    try {
      const formattedPrice = values.price.toFixed(2) || 0;

      await updateProduct({
        productId: selectedProductDetails.key,
        data: {
          ...values,
          price: formattedPrice, // Send formatted price string
        },
      }).unwrap();

      message.success("Product updated successfully!");
      setModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error(
        "Failed to update product. Please try again." +
          (error instanceof Error ? `: ${error.message}` : "")
      );
      console.error("Error updating product:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setModalOpen(false);
  };

  return (
    <Modal
      title={<h2 className="text-xl font-semibold">Edit Product: {name}</h2>}
      centered
      open={modalOpen}
      onCancel={handleCancel}
      footer={null}
      width={800}
      destroyOnClose
    >
      <Spin spinning={isLoading}>
        <div className="space-y-6">
          {/* Product Images */}
          <div className="grid grid-cols-2 gap-4">
            {images.map((image: any, index: any) => (
              <Image
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="rounded"
                width="100%"
                height={200}
              />
            ))}
          </div>

          <Divider />

          {/* Update Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateProductData}
            validateMessages={{
              required: "${label} is required!",
            }}
          >
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                placeholder="Enter product description"
                rows={4}
              />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              //   rules={[
              //     { required: true },
              //     {
              //       type: "number",
              //       min: 0,
              //       message: "Price must be greater than or equal to 0",
              //     },
              //   ]}
            >
              <InputNumber
                placeholder="Enter price"
                prefix="$"
                style={{ width: "100%" }}
                precision={2}
                step={0.01}
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                // parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>

            <Form.Item
              name="stock"
              label="Stock"
              rules={[
                { required: true },
                {
                  type: "number",
                  min: 0,
                  message: "Stock must be greater than or equal to 0",
                },
              ]}
            >
              <InputNumber
                placeholder="Enter stock"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={isLoading}
              >
                Update Product
              </Button>
            </Form.Item>
          </Form>

          <Divider />

          {/* Category Details */}
          <div className="flex items-center gap-4">
            <Image
              src={category.image}
              alt={category.name}
              width={80}
              height={80}
              className="rounded"
            />
            <div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p>{category.description}</p>
            </div>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default ProductEditModal;
