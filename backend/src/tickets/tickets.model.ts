import * as mongoose from 'mongoose';
import Ticket from './ticket.interface';
 
const ticketSchema = new mongoose.Schema({
  author: String,
  content: String,
  created: Date,
  title: String,
});
 
const ticketModel = mongoose.model<Ticket & mongoose.Document>('Ticket', ticketSchema);
 
export default ticketModel;