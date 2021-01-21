import { Consumer, KafkaClient } from "kafka-node";
import dispatch from "process-utils/dispatch";

// kafka的地址
export const KAFKA_HOST = "116.62.48.82:9092";

export function init() {
  const client = new KafkaClient({
    kafkaHost: KAFKA_HOST
  });

  const consumer = new Consumer(client, [{ topic: "testTopic2", partition: 0 }], {
    autoCommit: true
  });

  consumer.on("message", function(message) {
    dispatch({
      message
    });
  });

  consumer.on("error", function(error) {
    if (error) console.error(error);
  });

  // setInterval(() => dispatch({ a: "value" }), 1000);
  return consumer;
}
