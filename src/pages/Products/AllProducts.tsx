import React from "react";
import { Table, Button } from "antd";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai"; // Import AiOutlineEye for the eye icon
import type { TableColumnsType } from "antd";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../redux/api/api";
import ProductDetailsModal from "../../components/common/Modals/ProductDetailsModal";
import Swal from "sweetalert2";
import ProductEditModal from "../../components/common/Modals/ProductEditModal";

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
  const [productDetailsModal, setProductDetailsModal] = React.useState(false);
  const [productEditModal, setProductEditModal] = React.useState(false);
  const [selectedProductDetails, setSelectedProductDetails] =
    React.useState<DataType | null>(null);
  const {
    data: getAllProducts,
    isLoading,
    isError,
    refetch,
  } = useGetAllProductsQuery(undefined);

  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Unable to fetch products.</div>;
  }

  const handleProductDetails = (record: DataType) => {
    setProductDetailsModal(true);
    setSelectedProductDetails(record);
  };

  const handleProductEdit = (record: DataType) => {
    setProductEditModal(true);
    setSelectedProductDetails(record);
  };

  const handleProductDelete = (record: DataType) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        deleteProduct(record.key)
          .unwrap()
          .then(() => {
            refetch();
            Swal.fire(
              "Deleted!",
              "The product has been successfully deleted.",
              "success"
            );
          })
          .catch(() => {
            Swal.fire(
              "Error!",
              "An error occurred while trying to delete the product.",
              "error"
            );
          });
      }
    });
  };

  // Define columns for the Ant Design Table
  const columns: TableColumnsType<DataType> = [
    {
      title: "Index", // Column for row number/index
      key: "index",
      render: (_: any, record: DataType, index: number) => index + 1, // Display the row number (index starts from 0, so add 1)
    },
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: DataType) => (
        <div className="flex items-center space-x-2">
          {/* View Details Button (Eye Icon) */}
          <Button
            icon={<AiOutlineEye />}
            size="small"
            onClick={() => handleProductDetails(record)}
            className="text-green-500"
          />
          {/* Edit Button */}
          <Button
            icon={<FaEdit />}
            size="small"
            onClick={() => handleProductEdit(record)}
            className="text-blue-500"
          />
          {/* Delete Button */}
          <Button
            icon={<AiOutlineDelete />}
            size="small"
            onClick={() => handleProductDelete(record)}
            className="text-red-500"
          />
        </div>
      ),
    },
  ];

  // Handle edit functionality
  const handleEdit = (record: DataType) => {
    console.log("Edit product:", record);
    // Implement your edit logic here (e.g., open a modal or navigate to an edit page)
  };

  // Prepare rows from the fetched products
  const data: DataType[] = getAllProducts?.data?.map((product: any) => ({
    key: product._id,
    name: product.name,
    description: product.description.slice(0, 20),
    price: `$${product.price.offered_price} (Reg: $${product.price.regular_price})`,
    stock: product.stock,
    category: product.category,
    images: product.images.map((img: any) => img.url),
  }));

  return (
    <>
      <div className="p-6">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            All Products ({getAllProducts?.data?.length || 0})
          </h1>
        </div>

        <div className="h-96 overflow-y-auto">
          {data && data.length > 0 ? (
            <Table<DataType>
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 10 }} // Remove pagination if needed
              // expandable={false} // Disable expandable (no "+" icons)
            />
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
      {productDetailsModal && (
        <ProductDetailsModal
          modalOpen={productDetailsModal}
          setModalOpen={setProductDetailsModal}
          selectedProductDetails={selectedProductDetails}
        />
      )}
      {productEditModal && (
        <ProductEditModal
          modalOpen={productEditModal}
          setModalOpen={setProductEditModal}
          selectedProductDetails={selectedProductDetails}
        />
      )}
    </>
  );
};

export default AllProducts;
