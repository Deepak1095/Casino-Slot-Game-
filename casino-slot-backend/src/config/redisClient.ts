import Redis from 'ioredis';

// const redis = new Redis(process.env.REDIS_URL!, {
//   password: process.env.REDIS_TOKEN,
// });

const redis = new Redis('rediss://:AYsSAAIjcDFlZGNmYzUxMDI3YmI0OTMwODcwNDkyY2M1OTBjYmUxN3AxMA@ace-dory-35602.upstash.io:6379');

export default redis;
