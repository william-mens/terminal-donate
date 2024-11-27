import { Redis } from 'ioredis';
import { getState, setState } from './terminal.state.js';

export const setUserState = async (
  redis: Redis,
  data: object,
  request: any
) => {
  await setState(data,request);
};

export const getUserState = async (request: any) => {
  const state = await getState(request);
  return state;
};
export const getUserField = async (
  request: any,
  field: string
) => {
  const data = await getUserState(request);
  try {
    return data[field];
  } catch (error) {
    console.log('An error occured', { error });
    return false;
  }
};
