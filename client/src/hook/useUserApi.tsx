import { useState } from "react";
import axios from "axios";
import authStore from "../store/useUserStore";
import type {
  Login,
  Register,
  ResponseLoginRegister,
  ResponseUserMe,
} from "../types/UsersTypes";
import { apiRequest } from "../utils/apiRequest";

const getErrorMessage = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || defaultMessage;
  }

  return defaultMessage;
};

const useUserApi = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const setAdd = authStore((state) => state.setAdd);
  const token = authStore((state) => state.token);

  const registerUser = async (data: Register) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiRequest<ResponseLoginRegister, Register>({
        method: "POST",
        url: "http://localhost:3001/api/auth/register",
        data,
        token,
      });

      return result;
    } catch (error) {
      setError(getErrorMessage(error, "Failed to registered"));

      throw error;
    } finally {
      setLoading(false);
    }
  };
  const loginUser = async (data: Login) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiRequest<ResponseLoginRegister, Login>({
        method: "POST",
        url: "http://localhost:3001/api/auth/login",
        data,
      });

      setAdd(result.data.user, result.data.token);

      return result.data;
    } catch (error) {
      setError(getErrorMessage(error, "Failed to login"));

      throw error;
    } finally {
      setLoading(false);
    }
  };
  const getAllUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiRequest<unknown>({
        method: "GET",
        url: "http://localhost:3001/api/auth/users",
        token,
      });

      return result;
    } catch (error) {
      setError(getErrorMessage(error, "Failed to get all user "));

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiRequest<ResponseUserMe>({
        method: "DELETE",
        url: `http://localhost:3001/api/auth/users/${id}`,
        token,
      });

      return result.data;
    } catch (error) {
      setError(getErrorMessage(error, "Failed to delete"));

      throw error;
    } finally {
      setLoading(false);
    }
  };
  const getCurrentUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiRequest<ResponseUserMe>({
        method: "GET",
        url: `http://localhost:3001/api/auth/users/${id}`,
        token,
      });

      return result.data;
    } catch (error) {
      setError(getErrorMessage(error, "Failed to get current user "));

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getAllUser,
    getCurrentUser,
    deleteUser,
    loginUser,
    registerUser,
  };
};

export default useUserApi;
