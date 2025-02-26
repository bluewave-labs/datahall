import axios from "axios";
import { useQuery } from "@tanstack/react-query";
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


export default useDocuments;
