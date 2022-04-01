const amqp = require("amqplib");
const queueName = process.argv[2] || "JobsQueue";

connect_rabbitmq();
async function connect_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue(queueName);
    //
    console.log("wating message...");
    channel.consume(queueName, (message) => {
      console.log("message", message.content.toString());
      channel.ack(message);
    });
  } catch (error) {
    console.log("Error", error);
  }
}
