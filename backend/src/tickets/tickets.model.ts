import * as mongoose from 'mongoose';

import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt
} from 'graphql';

import Ticket from './ticket.interface';

const ticketSchema = new mongoose.Schema({
  author: String,
  content: String,
  state: String,
  created: Date,
  title: String,
});

export const ticketModel = mongoose.model<Ticket & mongoose.Document>('Ticket', ticketSchema);

const ticketType = new GraphQLObjectType({
  name: 'Ticket',
  description: 'Ticket',
  fields: () => ({
    state: {
      type: GraphQLString,
      description: 'The state',
    },
    title: {
      type: GraphQLString,
      description: 'The title',
    },
  }),
});

const TableInfo = new GraphQLObjectType({
  name: 'TableInfo',
  description: 'TableInfo',
  fields: () => ({
    count: {
      type: GraphQLInt
    }
  }),
});

const query = {
  tickets: {
    type: new GraphQLList(ticketType),
    args: {
      limit: {
        description: 'limit items in the results',
        type: GraphQLInt
      }
    },
    resolve: (root, { limit }) => ticketModel.find().limit(limit)
  },
  ticketByState: {
    type: TableInfo,
    args: {
      state: {
        description: 'find by state',
        type: GraphQLString
      }
    },
    resolve: (root, { state }) => {
      return { count: ticketModel.count({ state: state }) }
    }
  },
};

const mutation = {
  addTicket: {
    type: ticketType,
    args: {
      state: {
        type: new GraphQLNonNull(GraphQLString)
      },
      title: {
        type: new GraphQLNonNull(GraphQLString)
      },
    },
    resolve: (obj, input) => ticketModel.create(input)
  },
};

export const TicketSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => Object.assign(
      query
    )
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => Object.assign(
      mutation
    )
  }),
  types: [
    ticketType
  ]
});;