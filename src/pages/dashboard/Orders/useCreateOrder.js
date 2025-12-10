import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../store/queryClient";
import { createOrder } from "../../../api/orders";

export const useCreateOrder = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: async (form) => {
      const payload = {
        description: form.description,
        owner: form.owner,
        stage:
          form.stage && form.stage.length > 0
            ? form.stage.map((s) => ({
                stageType: s.name || s.stageType,
                date: s.date,
              }))
            : [
                {
                  stageType: "Open",
                  date: new Date().toISOString().split("T")[0],
                },
              ],
        contact: form.contact,
        employee: form.employee,
        products: form.products || [],
      };

      console.log("📤 Sending payload:", payload);

      try {
        const res = await createOrder(payload);

        if (res.error || res.message === "Error creating order") {
          console.error("❌ Backend returned error:", res.error);
          throw new Error(JSON.stringify(res.error));
        }

        return res;
      } catch (err) {
        console.error("❌ Error creating order:", err.response?.data || err);
        throw err;
      }
    },
    onSuccess: (data) => {
      console.log("🔄 Invalidating queries...");
      queryClient.invalidateQueries(["orders"]);
      console.log("✅ Queries invalidated!");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      console.error("❌ Mutation error:", error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
