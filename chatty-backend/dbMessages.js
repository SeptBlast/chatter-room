import mongoose from 'mongoose';

const chatterRoomSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
});

export default mongoose.model('messagecontents', chatterRoomSchema)