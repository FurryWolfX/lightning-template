import { createServer, Socket } from "net";
import logger from "log-utils";

const tcpServer = createServer(); // 创建 tcp server

const sockets: Map<number, Socket> = new Map();
let socketId = 1;

// 监听 端口
tcpServer.listen(5678, () => {
  logger.info("tcp_server listening 5678");
});

// 处理客户端连接
tcpServer.on("connection", function(socket) {
  logger.info("tcp client connected");
  // logger.info(socket.address());
  sockets.set(socketId, socket);
  socketId++;
  dealConnect(socket);
});

tcpServer.on("error", () => {
  logger.info("tcp_server error!");
});

tcpServer.on("close", () => {
  logger.info("tcp_server close!");
});

// 处理每个客户端消息
function dealConnect(socket: Socket) {
  socket.on("data", async (data: Buffer) => {
    // logger.info("received data");
    const start = data.readUInt8(0);
    const end = data.readUInt8(data.length - 1);
    if (start === 0x7e && end === 0x7e) {
      // await saveParserData(data);
      // await replayRegister(data, socket);
      // await saveHexData(hexStr);
      // socket.write(Buffer.from([1, 2, 3]));
    } else {
      logger.info("丢弃分包");
    }
  });
  // 客户端正常断开时执行
  socket.on("close", () => {
    logger.info("client disconnected!");
  });
  // 客户端正异断开时执行
  socket.on("error", err => {
    console.error(err.stack);
  });
}
