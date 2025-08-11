import { useState } from "react";
import {
  Button,
  Modal,
  Upload,
  Table,
  message,
  Input,
  InputNumber,
  Select,
  Tag,
  Space,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";

interface ProductExcelModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface ExcelProduct {
  key: number;
  name?: string;
  description?: string;
  regular_price?: number;
  offered_price?: number;
  stock?: number;
  category?: string;
  brand?: string;
  ratings?: number;
  tags?: string;
  reviews?: string;
  isFeatured?: boolean;
  images?: string; // Comma-separated image URLs
  [key: string]: any;
}

const ProductExcelModal = ({ open, setOpen }: ProductExcelModalProps) => {
  const [excelData, setExcelData] = useState<ExcelProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [_fileName, setFileName] = useState<string>("");
  const [editingKey, setEditingKey] = useState<number | null>(null);
  // @ts-ignore
  const [editingData, setEditingData] = useState<ExcelProduct>({});

  const isEditing = (record: ExcelProduct) => record.key === editingKey;

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
      }) as any[][];

      if (jsonData.length === 0) {
        message.error("Excel file is empty");
        setLoading(false);
        return;
      }

      const headers = jsonData[0] as string[];

      const products: ExcelProduct[] = jsonData
        .slice(1)
        .map((row: any[], index: number) => {
          const product: ExcelProduct = { key: index };

          headers.forEach((header: string, colIndex: number) => {
            const normalizedHeader = header.toLowerCase().replace(/\s+/g, "_");
            let value = row[colIndex] || "";

            if (
              ["regular_price", "offered_price", "stock", "ratings"].includes(
                normalizedHeader
              )
            ) {
              value = value !== "" ? Number(value) : "";
            }

            if (normalizedHeader === "isfeatured") {
              value =
                value === true ||
                value === "true" ||
                value === "TRUE" ||
                value === 1;
            }

            product[normalizedHeader] = value;
          });

          return product;
        });

      setExcelData(products);
      setFileName(file.name);
      message.success(
        `Successfully loaded ${products.length} products from ${file.name}`
      );
    } catch (error) {
      console.error("Error reading Excel file:", error);
      message.error(
        "Failed to read Excel file. Please make sure it's a valid Excel file."
      );
    }
    setLoading(false);
  };

  const beforeUpload = (file: File) => {
    const isExcel =
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel" ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls");

    if (!isExcel) {
      message.error("Please upload only Excel files (.xlsx or .xls)");
      return false;
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("File must be smaller than 10MB");
      return false;
    }

    handleFileUpload(file);
    return false;
  };

  const handleEdit = (record: ExcelProduct) => {
    setEditingKey(record.key);
    setEditingData({ ...record });
  };

  const handleCancel = () => {
    setEditingKey(null);
    // @ts-ignore
    setEditingData({});
  };

  const handleSave = (key: number) => {
    const newData = [...excelData];
    const index = newData.findIndex((item) => item.key === key);
    if (index > -1) {
      newData[index] = { ...editingData };
      setExcelData(newData);
      setEditingKey(null);
      // @ts-ignore
      setEditingData({});
      message.success("Product updated successfully");
    }
  };

  const handleDelete = (key: number) => {
    const newData = excelData.filter((item) => item.key !== key);
    setExcelData(newData);
    message.success("Product deleted successfully");
  };

  const handleFieldChange = (field: string, value: any) => {
    setEditingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderEditableCell = (
    text: any,
    record: ExcelProduct,
    dataIndex: string
  ) => {
    const editing = isEditing(record);

    if (!editing) {
      // Display mode
      if (dataIndex === "images" && text) {
        const imageUrls = text
          .split(",")
          .map((url: string) => url.trim())
          .filter(Boolean);
        return (
          <div className="flex flex-wrap gap-1">
            {imageUrls.map((url: string, index: number) => (
              <Tag
                key={index}
                color="blue"
                className="cursor-pointer"
                title={url}
              >
                <EyeOutlined /> Image {index + 1}
              </Tag>
            ))}
          </div>
        );
      }

      if (dataIndex === "tags" && text) {
        const tagList = text
          .split(",")
          .map((tag: string) => tag.trim())
          .filter(Boolean);
        return (
          <div className="flex flex-wrap gap-1">
            {tagList.map((tag: string, index: number) => (
              <Tag key={index} color="green">
                {tag}
              </Tag>
            ))}
          </div>
        );
      }

      if (dataIndex === "isFeatured") {
        return (
          <Tag color={text ? "green" : "default"}>{text ? "Yes" : "No"}</Tag>
        );
      }

      if (typeof text === "number") {
        return text.toLocaleString();
      }

      return text || "-";
    }

    // Edit mode
    const value = editingData[dataIndex];

    if (
      ["regular_price", "offered_price", "stock", "ratings"].includes(dataIndex)
    ) {
      return (
        <InputNumber
          value={value}
          onChange={(val) => handleFieldChange(dataIndex, val)}
          style={{ width: "100%" }}
          min={0}
          max={dataIndex === "ratings" ? 5 : undefined}
          step={dataIndex === "ratings" ? 0.1 : 1}
        />
      );
    }

    if (dataIndex === "isFeatured") {
      return (
        <Select
          value={value}
          onChange={(val) => handleFieldChange(dataIndex, val)}
          style={{ width: "100%" }}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ]}
        />
      );
    }

    if (dataIndex === "description" || dataIndex === "reviews") {
      return (
        <Input.TextArea
          value={value}
          onChange={(e) => handleFieldChange(dataIndex, e.target.value)}
          rows={2}
          placeholder={`Enter ${dataIndex}`}
        />
      );
    }

    return (
      <Input
        value={value}
        onChange={(e) => handleFieldChange(dataIndex, e.target.value)}
        placeholder={`Enter ${dataIndex.replace(/_/g, " ")}`}
      />
    );
  };

  const getTableColumns = () => {
    if (excelData.length === 0) return [];

    const firstRow = excelData[0];
    const dataColumns = Object.keys(firstRow)
      .filter((key) => key !== "key")
      .map((key) => ({
        title: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        dataIndex: key,
        key: key,
        width:
          key === "description" || key === "reviews"
            ? 200
            : key === "images" || key === "tags"
            ? 180
            : 120,
        ellipsis: true,
        render: (text: any, record: ExcelProduct) =>
          renderEditableCell(text, record, key),
      }));

    // Add actions column
    const actionsColumn = {
      title: "Actions",
      key: "actions",
      width: 120,
      fixed: "right" as const,
      render: (_: any, record: ExcelProduct) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="small">
            <Button
              type="primary"
              size="small"
              icon={<SaveOutlined />}
              onClick={() => handleSave(record.key)}
              title="Save"
            />
            <Button
              size="small"
              icon={<CloseOutlined />}
              onClick={handleCancel}
              title="Cancel"
            />
          </Space>
        ) : (
          <Space size="small">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              disabled={editingKey !== null}
              title="Edit"
            />
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.key)}
              disabled={editingKey !== null}
              danger
              title="Delete"
            />
          </Space>
        );
      },
    };

    return [...dataColumns, actionsColumn];
  };

  const handleDownloadTemplate = () => {
    const templateData = [
      [
        "name",
        "description",
        "regular_price",
        "offered_price",
        "stock",
        "category",
        "brand",
        "ratings",
        "tags",
        "reviews",
        "isFeatured",
        "images",
      ],
      [
        "Sample Product",
        "This is a sample product description",
        100,
        80,
        50,
        "Electronics",
        "Sample Brand",
        4.5,
        "tag1, tag2, tag3",
        "Great product with excellent quality!",
        true,
        "https://example.com/image1.jpg, https://example.com/image2.jpg, https://example.com/image3.jpg",
      ],
      [
        "Another Product",
        "Another sample description with more details",
        200,
        180,
        30,
        "Clothing",
        "Another Brand",
        4.0,
        "fashion, style, trendy",
        "Nice quality and comfortable to wear",
        false,
        "https://example.com/cloth1.jpg, https://example.com/cloth2.jpg",
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    XLSX.writeFile(wb, "product_template.xlsx");
    message.success("Template downloaded successfully!");
  };

  const handleClearData = () => {
    setExcelData([]);
    setFileName("");
    setEditingKey(null);
    // @ts-ignore
    setEditingData({});
    message.info("Data cleared");
  };

  const handleModalClose = () => {
    if (editingKey !== null) {
      message.warning("Please save or cancel editing before closing");
      return;
    }
    setExcelData([]);
    setFileName("");
    setEditingKey(null);
    // @ts-ignore
    setEditingData({});
    setOpen(false);
  };

  const handleBulkImport = () => {
    if (editingKey !== null) {
      message.warning("Please save or cancel editing before importing");
      return;
    }

    // Validate required fields
    const invalidRows = excelData.filter(
      (product) =>
        !product.name ||
        !product.regular_price ||
        !product.stock ||
        !product.category ||
        !product.brand ||
        product.ratings === undefined
    );

    if (invalidRows.length > 0) {
      message.error(
        `${invalidRows.length} products have missing required fields. Please check and edit them.`
      );
      return;
    }

    // Here you can add logic to actually import the data
    message.success(`Ready to import ${excelData.length} products`);
    console.log("Products to import:", excelData);
    // You might want to pass this data back to parent component
    // or call an API to bulk import
  };

  return (
    <Modal
      // title={
      //   <div className="flex items-center gap-2">
      //     <FileExcelOutlined className="text-green-600" />
      //     <span>Excel Product Import & Management</span>
      //   </div>
      // }
      centered
      open={open}
      onCancel={handleModalClose}
      footer={[
        <Button key="template" onClick={handleDownloadTemplate}>
          Download Template
        </Button>,
        <Button
          key="clear"
          onClick={handleClearData}
          disabled={excelData.length === 0}
        >
          Clear Data
        </Button>,
        <Button key="cancel" onClick={handleModalClose}>
          Close
        </Button>,
        <Button
          key="import"
          type="primary"
          disabled={excelData.length === 0 || editingKey !== null}
          onClick={handleBulkImport}
        >
          Import Products ({excelData.length})
        </Button>,
      ]}
      // @ts-ignore
      width={{
        xs: "95%",
        sm: "90%",
        md: "85%",
        lg: "80%",
        xl: "75%",
        xxl: "70%",
      }}
      style={{ maxWidth: "1400px" }}
      destroyOnClose
    >
      <div className="space-y-4">
        {/* Upload Section */}
        {excelData.length <= 0 && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
            <Upload
              accept=".xlsx,.xls"
              beforeUpload={beforeUpload}
              showUploadList={false}
              disabled={loading}
            >
              <Button
                icon={<UploadOutlined />}
                size="large"
                loading={loading}
                className="mb-2"
              >
                {loading ? "Processing..." : "Upload Excel File"}
              </Button>
            </Upload>
            <p className="text-gray-500 text-sm mt-2">
              Support .xlsx and .xls files (Max 10MB)
            </p>
          </div>
        )}

        {/* File Info */}

        {/* Data Table */}
        {excelData.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-3">
              Product Data Management ({excelData.length} products)
              {editingKey !== null && (
                <Tag color="orange" className="ml-2">
                  Editing Row {editingKey + 1}
                </Tag>
              )}
            </h4>
            <Table
              dataSource={excelData}
              columns={getTableColumns()}
              scroll={{ x: "max-content", y: 400 }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} products`,
              }}
              size="small"
              bordered
              rowClassName={(record) =>
                isEditing(record) ? "bg-blue-50 border-blue-200" : ""
              }
            />
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
          <svg
            className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p className="text-sm text-blue-700">
            Upload with required columns • Comma-separate tags/images •
            TRUE/FALSE for featured
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ProductExcelModal;
