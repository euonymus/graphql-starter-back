const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// スキーマ定義
const schema = buildSchema(`
  type Query {
    items: [Item]
  }
  
  type Item {
    id: ID
    name: String
  }
`);

// ダミーデータ
const items = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' }
];

// ルートのリゾルバー
const root = {
  items: () => items
};

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`));
