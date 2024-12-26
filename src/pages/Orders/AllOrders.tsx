import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllOrdersQuery } from "../../redux/api/api";

interface DataType {
  key: React.Key;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  orderStatus: string;
  totalAmount: number;
  items: string; // Here you can display the item names or any other details from the items array
}

const AllOrders: React.FC = () => {
  const {
    data: getAllOrders,
    isLoading,
    isError,
  } = useGetAllOrdersQuery(undefined);

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  // Define columns for the Ant Design Table
  const columns: TableColumnsType<DataType> = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Phone",
      dataIndex: "customerPhone",
      key: "customerPhone",
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
    },

    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => `$${totalAmount.toFixed(2)}`,
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: string) => items,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
  ];

  // Prepare rows from the fetched orders
  const dataSource: DataType[] =
    getAllOrders?.data.map((order: any) => ({
      key: order._id,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerEmail: order.customerEmail,
      orderStatus: order.orderStatus,
      totalAmount: order.totalAmount,
      items: order.items.map((item: any) => item.product.name).join(", "), // Displaying product names as a comma-separated string
    })) || [];

  return (
    <>
      <div className="p-6">
        {/* Section Header with Tailwind CSS styling */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">All Orders</h1>
        </div>

        {dataSource && dataSource.length > 0 ? (
          <Table<DataType>
            columns={columns}
            rowSelection={{}}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.items}</p>
              ),
            }}
            dataSource={dataSource}
          />
        ) : (
          <p>No orders found.</p>
        )}
      </div>
      {/* {modalOpen && (
        <AddOrderModal
          refetch={() => {}}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
        />
      )} */}
    </>
  );
};

export default AllOrders;
