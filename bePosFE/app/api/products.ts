import { mainAxios } from "../libs/axios";
import { notification } from "antd";

export const getAll = async (payload: any) => {
  try {
    const response = await mainAxios.request({
      methodType: "POST",
      url: `/products/get-all`,
      payload: payload,
      requiresToken: false,
      config: {
        headers: {
          contentType: "application/json",
        },
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDetails = async (payload: any) => {
  try {
    const response = await mainAxios.request({
      methodType: "POST",
      url: `/products/details`,
      requiresToken: false,
      payload: payload,
      config: {
        headers: {
          contentType: "application/json",
        },
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const create = async (payload: any) => {
  try {
    const response = await mainAxios.request({
      methodType: "POST",
      url: `/products/create`,
      requiresToken: false,
      payload: payload,
      config: {
        headers: {
          contentType: "application/json",
        },
      },
    });
    return response;
  } catch (error: any) {
    notification.error({
      message: "Lỗi",
      description: error[0].msg,
    });
    throw error;
  }
};
export const update = async (payload: any) => {
  try {
    const response = await mainAxios.request({
      methodType: "POST",
      url: `/products/update`,
      requiresToken: false,
      payload: payload,
      config: {
        headers: {
          contentType: "application/json",
        },
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const disable = async (payload: any) => {
  try {
    const response = await mainAxios.request({
      methodType: "POST",
      url: `/products/disable`,
      requiresToken: false,
      payload: payload,
      config: {
        headers: {
          contentType: "application/json",
        },
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteproducts = async (payload: any) => {
  try {
    const response = await mainAxios.request({
      methodType: "POST",
      url: `/products/delete-cate`,
      requiresToken: false,
      payload: payload,
      config: {
        headers: {
          contentType: "application/json",
        },
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
