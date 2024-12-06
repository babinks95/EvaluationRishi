import { Schema, model, Document } from "mongoose";
// schéma pour une tache
const tacheSchema = new Schema<ITache>({
    projectId: {type: Schema.Types.ObjectId, ref: 'Projet', required: true},
    title: {type: String, required: true},
    done: {type: Boolean, default : false},
    dueDate: {type: Date, required: false},
})
// définitioon pour  une interface
interface ITache extends Document {
    projectId: Schema.Types.ObjectId;
    title : string;
    done : boolean;
    dueDate : Date;
}


const Tache = model<ITache>('Tache', tacheSchema);

export default Tache