import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DocumentType } from '@/shared/models/models';

interface DocumentResponse {
  documents: DocumentType[];
}

const fetchDocuments = async (): Promise<DocumentResponse> => {
  const response = await axios.get('/api/documents/list');

  return response.data;
};

const useDocuments = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: fetchDocuments
  });
};

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

const addDocument = async (formData: FormData) => {
  const response = await axios.post("/api/documents/upload", formData);

  return response.data;
};

const useAddDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      console.error("Error adding document: ", error);
    }
  });
};

export { useDocuments, useDeleteDocument, useAddDocument };
