import { Redis } from 'ioredis';

let redisConnection: undefined;


const loadRedis = async () => {
    if (redisConnection) {
      console.log('cached redis connection instance');
      return redisConnection;
    }
    let redis:any;
 
      redis = new Redis({
        port: 6379,
        host: '127.0.0.1',
      });
     
    
    redisConnection = redis;
    return redis;
  };

export const setState = async (
  data: object,
  request: any
) => {
    const redis = await loadRedis();
  const key = `terminal-${request.sessionId}`;
  const response = await redis.get(key);

  const decodedResponse = JSON.parse(response as string);
  const newData = { ...decodedResponse, ...data };
  await redis.set(key, JSON.stringify(newData),'EX',process.env.STATE_CACHE_EXIPRY || '300' as string);

};
export const getState = async (
  request: any
) => {
   const redisClient:Redis = await loadRedis();
  const key = `terminal-${request.sessionId}`;
  const response =  await redisClient.get(key);
  if (!response) {
      return null;
  }
  const decodedResponse = JSON.parse(response as string);
  return decodedResponse;
};

export const clearState = async (request:any) => {
    const redisClient = await loadRedis();
  const key1 = `terminal-${request.sessionId}`;
  await redisClient.del(key1);
};
