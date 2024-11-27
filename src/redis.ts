import RedisHelper from 'ioredis';

const runtimeEnv = process.env.NODE_ENV || 'development';
 class Redis {
  private static instance: Redis;
  private redis!: RedisHelper;

  private constructor() {}

  public static async getInstance(): Promise<Redis> {
    if (!Redis.instance) {
      Redis.instance = new Redis();
      await Redis.instance.initialize();
    }
    return Redis.instance;
  }

  private async initialize() {
    this.redis = new RedisHelper({port:6379,host:'127.0.0.1' });
  }

  public async get(key: string) {
    const value = await this.redis.get(key);
    if (value === null) {
      console.log(`Value of ${key} not found in Redis`);
      return false;
    }
    console.log(`Value of ${key}: `);
    return value;
  }

  public async set(key: string, value: any,isExpiry:number|null = null) {
    let result;
    if (isExpiry) {
      result = await this.redis.set(key,value,'EX',isExpiry);
    }else{
      result = await this.redis.set(key, value);
    }
    console.log(`Result of setting ${key}:  value:`);
    return result;
  }


  public async getHash(key: string, id: any) {
    const value = await this.redis.hget(key, id);
    if (value === null) {
      console.log(`Value of ${key}:${id} not found in Redis`);
      return false;
    }
    console.log(`Value of ${key}:${id}: `);
    return value;
  }

  public async setHash(key: string, id: any, data: any) {
    const result = await this.redis.hmset(key, id, data);
    console.log(`Result of setting ${key}:${id}: `, result);
    return result;
  }

  public async deleteHash(key: string, id: any) {
    const result = await this.redis.hdel(key, id);
    console.log(`Result of deleting ${key}:${id}: `, result);
    return result;
  }

  public async expireHash(key:string,ttlInSeconds:number){
    const result = await this.redis.expire(key,ttlInSeconds);
    console.log(`Hash '${key}' has been set with a TTL of ${ttlInSeconds} seconds (1 week).`,result);
    return result;
  }

  public async deleteSet(key: string) {
    const result = await this.redis.del(key);
    console.log(`Result of deleting ${key}:`, result);
    return result;
  }
  public async redisConn(){
    return  this.redis;
  }
}
export default Redis.getInstance();
