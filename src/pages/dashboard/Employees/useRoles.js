import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../../api/roles";

export const useRoles = () => {
  const { data: rolesData, isLoading: isLoadingRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  let roles = [];

  if (rolesData) {
    if (Array.isArray(rolesData)) {
      roles = rolesData;
    } else if (rolesData.data && Array.isArray(rolesData.data.roles)) {
      roles = rolesData.data.roles;
    } else if (Array.isArray(rolesData.roles)) {
      roles = rolesData.roles;
    }
  }

  return { roles, isLoadingRoles };
};
