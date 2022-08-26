import * as mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'

export const AccountSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  email: { type: String, required: true },
});


AccountSchema.plugin(passportLocalMongoose, { usernameField: 'email'})

export default mongoose.model('Account', AccountSchema)
