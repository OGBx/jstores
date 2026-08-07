type Entry={count:number;reset:number};
const globalStore=globalThis as unknown as {orderRateLimits?:Map<string,Entry>};
const store=globalStore.orderRateLimits??new Map<string,Entry>();
if(process.env.NODE_ENV!=='production')globalStore.orderRateLimits=store;

export function rateLimit(key:string,limit=5,windowMs=60*60*1000){const now=Date.now();const current=store.get(key);if(!current||current.reset<=now){store.set(key,{count:1,reset:now+windowMs});return {allowed:true,remaining:limit-1,reset:now+windowMs};}current.count++;if(store.size>5000)for(const [item,value] of store)if(value.reset<=now)store.delete(item);return {allowed:current.count<=limit,remaining:Math.max(0,limit-current.count),reset:current.reset};}
