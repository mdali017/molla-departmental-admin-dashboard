import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllProductsQuery } from "../../redux/api/api";

interface DataType {
  key: React.Key;
  name: string;
  description: string;
  price: string;
  stock: number;
  category: string;
  images: string[];
}

const AllProducts: React.FC = () => {
  const {
    data: getAllProducts,
    isLoading,
    isError,
  } = useGetAllProductsQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Unable to fetch products.</div>;
  }

  // Define columns for the Ant Design Table
  const columns: TableColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images: string[]) => (
        <img
          src={images[0]}
          alt="product"
          style={{ width: 40, height: 40, objectFit: "cover" }}
        />
      ),
    },
    { title: "Product Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    { title: "Category", dataIndex: "category", key: "category" },
  ];

  // Prepare rows from the fetched products
  const data: DataType[] = getAllProducts?.data?.map((product: any) => ({
    key: product._id,
    name: product.name,
    description: product.description,
    price: `$${product.price.offered_price} (Reg: $${product.price.regular_price})`,
    stock: product.stock,
    category: product.category,
    images: product.images.map((img: any) => img.url),
  }));

  return (
    <div className="p-6">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Products</h1>
      </div>

      {data && data.length > 0 ? (
        <Table<DataType>
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <div>
                <p>
                  <strong>Description:</strong> {record.description}
                </p>
                <p>
                  <strong>Category:</strong> {record.category}
                </p>
              </div>
            ),
          }}
          dataSource={data}
        />
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default AllProducts;
