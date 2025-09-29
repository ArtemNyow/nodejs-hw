import { Schema,model } from "mongoose";

const TAGS =[
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
  'Todo',
];

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    enum: TAGS,
    default:'Todo'
  },
  timestamps: true,
});

const Note = model('Note', noteSchema);
export default Note;
