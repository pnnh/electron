import {PLSelectResult, PSNoteModel} from "@pnnh/polaris-business";
import {clientSigninDomain} from "@/services/client/domain";

export async function selectNotes(libraryUrn: string, notebookUrn: string, queryString: string = '') {
    const domain = await clientSigninDomain()
    const url = `/personal/libraries/${libraryUrn}/notebooks/${notebookUrn}/notes?${queryString}`
    return await domain.makeGet<PLSelectResult<PSNoteModel>>(url)
}

export async function getNoteByKey(pk: string) {
    // const url = '/server/console/notes/' + pk
    // const response = await axios.get<NoteModel>(url)
    // return response.data
    return {} as PSNoteModel
}

export async function selectSubNotes(parent: string, queryString: string = '') {
    // const url = `/server/console/notes/${parent}/notes?${queryString}`
    // const response = await axios.get<PLSelectResult<NoteModel>>(url)
    // return response.data
    return {} as PLSelectResult<PSNoteModel>
}
