import React from "react";
import { Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import {
  useGetAllOrdersQuery,
  // useUpdateOrderStatusMutation,
} from "../../redux/api/api";

// const { Option } = Select;

interface DataType {
  key: React.Key;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  orderStatus: string;
  totalAmount: number;
  items: string;
}

const CompletedOrders: React.FC = () => {
  const {
    data: getAllOrders,
    isLoading,
    isError,
    // refetch,
  } = useGetAllOrdersQuery(undefined);
  // const [updateOrderStatus] = useUpdateOrderStatusMutation();
  // const [updatingKey, setUpdatingKey] = useState<string | null>(null);

  // console.log(updatingKey);

  const allCompletedOrders = getAllOrders?.data?.filter(
    (order: any) => order.orderStatus === "Delivered"
  );

  console.log(allCompletedOrders);

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
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus: string) => {
        let color = "";
        switch (orderStatus) {
          case "Delivered":
            color = "green";
            break;
        }

        return <Tag color={color}>{orderStatus}</Tag>;
      },
    },
  ];

  // Prepare rows from the fetched orders
  const dataSource: DataType[] =
    allCompletedOrders?.map((order: any) => ({
      key: order._id,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerEmail: order.customerEmail,
      orderStatus: order.orderStatus,
      totalAmount: order.totalAmount,
      items: order.items.map((item: any) => item.product.name).join(", "),
    })) || [];

  // Handle order status update
  // const handleStatusChange = async (newStatus: string, key: React.Key) => {
  //   setUpdatingKey(key as string);
  //   try {
  //     // Pass the status as the request body
  //     await updateOrderStatus({
  //       data: { orderStatus: newStatus },
  //       id: key as string, // Order ID
  //     }).unwrap();
  //     message.success("Order status updated successfully!");
  //     refetch();
  //   } catch (error) {
  //     message.error("Failed to update order status.");
  //   } finally {
  //     setUpdatingKey(null);
  //   }
  // };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          All Completed Orders ({allCompletedOrders?.length})
        </h1>
      </div>

      <div className="h-96 overflow-y-auto">
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
          <p className="text-xl text-center font-bold my-10">
            No completed orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CompletedOrders;
