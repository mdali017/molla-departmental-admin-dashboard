import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllCategoriesQuery } from "../../redux/api/api";
import AddCategoryModal from "../../components/common/Modals/AddCategoryModal";

interface DataType {
  key: React.Key;
  name: string;
  description: string;
  image: string;
}

const Category: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    data: getAllCategories,
    refetch,
    isLoading,
    isError,
  } = useGetAllCategoriesQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }



  if (isError) {
    return <div>Error: </div>;
  }

  // Define columns for the Ant Design Table
  const columns: TableColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="category"
          style={{ width: 40, height: 40, objectFit: "cover" }}
        />
      ),
    },
    { title: "Category Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
  ];

  // Prepare rows from the fetched categories
  const data: DataType[] = getAllCategories?.data?.map((category: any) => ({
    key: category._id,
    name: category.name,
    description: category.description,
    image: category.image,
  }));

  return (
    <>
      <div className="p-6">
        {/* Section Header with Tailwind CSS styling */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            All Categories
          </h1>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Category
          </button>
        </div>

        {data && data.length > 0 ? (
          <Table<DataType>
            columns={columns}
            rowSelection={{}}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
            }}
            dataSource={data}
          />
        ) : (
          <p>No categories found.</p>
        )}
      </div>
      {modalOpen && (
        <AddCategoryModal refetch={refetch} setModalOpen={setModalOpen} modalOpen={modalOpen} />
      )}
    </>
  );
};

export default Category;
