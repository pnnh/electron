import {PLSelectResult} from '@/models/common-result'
import {NoteModel} from '@/models/personal/note'

export class NoteService {
    static async getNoteByKey(pk: string) {
        // const url = '/server/console/notes/' + pk
        // const response = await axios.get<NoteModel>(url)
        // return response.data
        return {} as NoteModel
    }

    static async selectNotes(notebook: string, queryString: string = '') {
        // const url = `/server/console/notebook/${notebook}/notes?${queryString}`
        // const response = await axios.get<PLSelectResult<NoteModel>>(url)
        // return response.data
        return {} as PLSelectResult<NoteModel>
    }

    static async selectSubNotes(parent: string, queryString: string = '') {
        // const url = `/server/console/notes/${parent}/notes?${queryString}`
        // const response = await axios.get<PLSelectResult<NoteModel>>(url)
        // return response.data
        return {} as PLSelectResult<NoteModel>
    }
}
