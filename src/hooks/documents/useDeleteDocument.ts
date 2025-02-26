import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteDocumentById = async (documentId: string): Promise<void> => {
  const response = await axios.delete(`/api/documents/${documentId}`);

  return response.data;
};

const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocumentById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    }
  });
};

export default useDeleteDocument;
