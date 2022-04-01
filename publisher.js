const amqp = require("amqplib");
const queueName = process.argv[2] || "JobsQueue";
const message = {
  description: "This is test",
};
connect_rabbitmq();
async function connect_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue(queueName);

    setInterval(() => {
      message.description = new Date().getTime();
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
      console.log("Sended message", message);
    }, 1);
  } catch (error) {
    console.log("Error", error);
  }
}
