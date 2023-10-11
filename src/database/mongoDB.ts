import mongoose from 'mongoose';

import 'dotenv/config';

const databaseConnection = async () => {
  try {
    console.log('Conectando ao MongoDB...');

    await mongoose.connect(<string>process.env.MONGODB_URL);

    console.log('Conectado ao MongoDB com sucesso!');
  } catch (err) {
    console.log(`Erro ao se conectar ao MongoDB: ${err}`);
  }
};

export default databaseConnection;
