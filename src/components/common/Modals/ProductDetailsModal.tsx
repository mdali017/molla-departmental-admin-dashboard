import React from "react";
import { Modal, Divider, Image } from "antd";

interface ProductDetailsModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProductDetails: any;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  setModalOpen,
  modalOpen,
  selectedProductDetails,
}) => {
  if (!selectedProductDetails) return null;

  const { name, description, price, stock, category, images } =
    selectedProductDetails;

  return (
    <Modal
      title={<h2 className="text-xl font-semibold">{name}</h2>}
      centered
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      footer={null}
      width={800} // Custom modal width
    >
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

        {/* Product Details */}
        <Divider />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div>
              <h3 className="text-lg font-semibold">Description:</h3>
              <p>{description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Price:</h3>
              <p className="text-green-600 font-bold">{price}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Stock:</h3>
              <p>{stock} units available</p>
            </div>
          </div>
          <div>
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
        </div>

        <Divider />
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
