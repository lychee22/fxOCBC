/** SDK 需要在浏览器构建中读取 process.env.NODE_ENV（由打包器注入），此声明避免依赖 @types/node */
declare const process: {
  env: {
    NODE_ENV?: string;
  };
};
