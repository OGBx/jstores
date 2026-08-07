declare module 'bcryptjs' {
  export function compare(value:string, hash:string):Promise<boolean>;
}
