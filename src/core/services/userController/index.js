import axios from 'axios';
import api from '@/config/axios';
import { customParamsSerializer } from '@/utils/generateSortString';

const ENDPOINT = '/user';

export const getUsers = async (searchString = '', page = 0, size = 1, sort = ['']) => {
  // Convert array of attributes to header string
  let sortString = '';

  if (sort === null || sort.length === 0) {
    sortString = null
  } else {
    sortString = sort.length > 0 ? sort.join('&sort=') : '';
  }

  // Create custom endpoint to using with both search and get feature
  let CUSTOM_ENDPOINT = `${ENDPOINT}/`;
  if (searchString.length !== 0) {
    CUSTOM_ENDPOINT += searchString
  }

  try {
    return await api.get(
      `${CUSTOM_ENDPOINT}`,
      {
        paramsSerializer: customParamsSerializer,
        params: {
          page: page,
          size: size,
          sort: sortString
        }
      }
    )
  } catch {
    return [];
  }
}

export const createUser = async (data) => {
  return await api.post(
    `${ENDPOINT}/create`,
    {
      name: data.name,
      userEmail: data.userEmail,
      dob: data.dob,
      phone: data.phone,
      updateDate: (new Date()).toISOString(),
      male: data.male,
      active: data.active,
      userPermissionId: data.userPermissionId
    }
  )
}

export const updateUser = async (data) => {
  return await api.put(
    `${ENDPOINT}/update/`,
    {
      id: data.id,
      name: data.name,
      dob: new Date(data.dob),
      phone: data.phone,
      male: data.male
    }
  )
}

export const deactiveUser = async (id, status) => {
  return await api.delete(
    `${ENDPOINT}/disable/${id}/${status}`
  )
}

export const changeRole = async (userId, roleName) => {
  let permissionId = 1; // SUPER ADMIN
  if(roleName === 'ADMIN') {
    permissionId = 2;
  } else if (roleName === 'TRAINER') {
    permissionId = 3;
  }

  return await api.put(
    `${ENDPOINT}/role-permission/${userId}/${permissionId}`
  )
}