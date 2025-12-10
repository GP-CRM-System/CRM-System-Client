import { useState } from "react";
import SideModal from "../../../components/SideModal";

const STAGE_OPTIONS = [
  "Open",
  "Processed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function OrderFormModal({
  open,
  onClose,
  form,
  formError,
  onFormChange,
  onSubmit,
  contacts,
  employees,
  isLoadingContacts,
  isSubmitting,
  isEditing,
}) {
  const [productForm, setProductForm] = useState({
    name: "",
    unitPrice: "",
    quantity: "",
  });

  const handleAddProduct = () => {
    if (!productForm.name || !productForm.unitPrice || !productForm.quantity)
      return;

    const newProduct = {
      name: productForm.name.trim(),
      unitPrice: parseFloat(productForm.unitPrice),
      quantity: parseInt(productForm.quantity),
    };

    onFormChange("products", [...(form.products || []), newProduct]);
    setProductForm({ name: "", unitPrice: "", quantity: "" });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = form.products.filter((_, i) => i !== index);
    onFormChange("products", updatedProducts);
  };

  const handleStageChange = (newStage) => {
    const currentStages = form.stage || [];
    const newStageObj = {
      stageType: newStage,
      date: new Date().toISOString().split("T")[0],
    };
    onFormChange("stage", [...currentStages, newStageObj]);
  };

  const getCurrentStage = () => {
    if (!form.stage || form.stage.length === 0) return "Open";
    return form.stage[form.stage.length - 1].stageType;
  };

  const calculateTotal = () => {
    if (!form.products || form.products.length === 0) return "0.00";
    return form.products
      .reduce((sum, p) => sum + p.unitPrice * p.quantity, 0)
      .toFixed(2);
  };

  return (
    <SideModal
      open={open}
      onClose={onClose}
      title={isEditing ? "Edit Order" : "Create Orders"}
    >
      <div className="space-y-4 pb-20">
        {formError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
            {formError}
          </div>
        )}

        {/* Employee */}
        <div>
          <label className="block text-[20px] mb-4 font-medium text-gray-700 ">
            Employee
          </label>
          <div className="relative">
            <select
              value={form.employee || ""}
              onChange={(e) => onFormChange("employee", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10"
            >
              <option value="">Select Employee</option>
              {employees?.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.fullName || emp.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Stage */}
        <div>
          <label className="block text-[20px] font-medium text-gray-700 mb-4">
            Stage
          </label>
          <div className="relative">
            <select
              value={getCurrentStage()}
              onChange={(e) => handleStageChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10"
            >
              {STAGE_OPTIONS.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {/* Stage History   */}
          {form.stage && form.stage.length > 1 && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs font-medium text-gray-600 mb-2">
                Stage History:
              </p>
              <div className="space-y-1">
                {form.stage.map((stage, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-gray-700">
                      {stage.stageType || stage.name}
                    </span>
                    <span className="text-gray-500">{stage.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Products Section */}
        <div>
          <label className="block text-[20px] font-medium text-gray-700 mb-4">
            Products
          </label>

          {/* Product List */}
          {form.products && form.products.length > 0 && (
            <div className="mb-3 space-y-2">
              {form.products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      ${product.unitPrice} × {product.quantity} = $
                      {(product.unitPrice * product.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(index)}
                    className="text-red-500 hover:text-red-700 transition ml-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Product Form */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 space-y-2">
            <input
              type="text"
              placeholder="Product name"
              value={productForm.name}
              onChange={(e) =>
                setProductForm({ ...productForm, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Unit price"
                min="0"
                step="0.01"
                value={productForm.unitPrice}
                onChange={(e) =>
                  setProductForm({ ...productForm, unitPrice: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <input
                type="number"
                placeholder="Quantity"
                min="1"
                value={productForm.quantity}
                onChange={(e) =>
                  setProductForm({ ...productForm, quantity: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleAddProduct}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm transition flex items-center justify-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Product
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div>
          <label className="block text-[20px] font-medium text-gray-700 mb-4">
            Total Price
          </label>
          <input
            type="text"
            value={
              form.products && form.products.length > 0
                ? `$${calculateTotal()}`
                : ""
            }
            placeholder="Price"
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-gray-50 text-gray-600 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[20px] font-medium text-gray-700 mb-4">
            Description
          </label>
          <textarea
            placeholder="Type a short description"
            value={form.description || ""}
            onChange={(e) => onFormChange("description", e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
          />
        </div>

        {/* Associate Deal With Section */}
        <div className="pt-2 mt-22">
          <h3 className="text-base font-medium text-[24px] t text-gray-800 mb-4">
            Associate Deal With
          </h3>

          {/* Contact */}
          <div className="mb-5">
            <label className="block text-[20px] font-medium text-gray-700 mb-4">
              Contact
            </label>
            <div className="relative">
              <select
                value={form.contact || ""}
                onChange={(e) => onFormChange("contact", e.target.value)}
                disabled={isLoadingContacts}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10 disabled:bg-gray-50"
              >
                <option value="">
                  {isLoadingContacts ? "Loading contacts..." : "Select Contact"}
                </option>
                {contacts?.map((con) => (
                  <option key={con._id} value={con._id}>
                    {con.fullName || con.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Owner */}
          <div>
            <label className="block text-[20px] font-medium text-gray-700 mb-4">
              Owner
            </label>
            <div className="relative">
              <select
                value={form.owner || ""}
                onChange={(e) => onFormChange("owner", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10"
              >
                <option value="">Select Owner</option>
                {employees?.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.fullName || emp.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Create/Update Button */}
        <div className="pt-4">
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
          >
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
              ? "Update"
              : "Create"}
          </button>
        </div>
      </div>
    </SideModal>
  );
}
