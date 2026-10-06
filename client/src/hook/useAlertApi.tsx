import { useState } from "react";
import axios from "axios";
import type {
  UpdateMapAlert,
  ResponseMap,
  createMapAlert,
} from "../types/MapTypes";
import { apiRequest } from "../utils/apiRequest";
import useAlertStore from "../store/useAlertStore";
import authStore from "../store/useUserStore";

const getErrorMessage = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || defaultMessage;
  }

  return defaultMessage;
};

const useALertApi = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const setAlerts = useAlertStore((state) => state.setAlerts);
  const setAddAlerts = useAlertStore((state) => state.add);
  const setUpdateAlerts = useAlertStore((state) => state.update);
  const setDeleteAlerts = useAlertStore((state) => state.delete);
  const token = authStore((state) => state.token);

  const getAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiRequest<ResponseMap[]>({
        method: "GET",
        url: "http://localhost:3001/api/alerts",
        token,
      });
      setAlerts(result.data);

      return result;
    } catch (error) {
      setError(getErrorMessage(error, "Failed to get alerts"));

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAlertById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiRequest<ResponseMap>({
        method: "GET",
        url: `http://localhost:3001/api/alerts/${id}`,
        token,
      });

      return result;
    } catch (error) {
      setError(getErrorMessage(error, "Failed to get alerts"));

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createAlert = async (data: createMapAlert) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiRequest<ResponseMap, createMapAlert>({
        method: "POST",
        url: "http://localhost:3001/api/alerts",
        data,
        token,
      });

      setAddAlerts(result.data);

      return result;
    } catch (error) {
      setError(getErrorMessage(error, "Add alert failed"));

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAlert = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiRequest<ResponseMap>({
        method: "DELETE",
        url: `http://localhost:3001/api/alerts/${id}`,
        token,
      });

      setDeleteAlerts(id);
      return result;
    } catch (error) {
      setError(getErrorMessage(error, "Deleted Failed"));

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: UpdateMapAlert) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiRequest<ResponseMap>({
        method: "PUT",
        url: `http://localhost:3001/api/alerts/${id}`,
        data,
        token,
      });

      setUpdateAlerts(id, data);
      return result;
    } catch (error) {
      console.log(axios.AxiosError);
      setError(getErrorMessage(error, "Update failed"));

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createAlert,
    deleteAlert,
    getAllData,
    update,
    getAlertById,
    loading,
    error,
  };
};

export default useALertApi;
