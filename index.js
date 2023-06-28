const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  const connectionId = event.requestContext.connectionId;
  const playerName = event.queryStringParameters.playerName;

  const putParams = {
    TableName: "tictactoe-games",
    Item: {
      connectionId: connectionId,
      playerName: playerName,
    },
  };

  try {
    await ddb.put(putParams).promise();
    return { statusCode: 200, body: "Connected." };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Failed to connect: " + JSON.stringify(err) };
  }
};
