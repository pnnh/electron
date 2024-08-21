export class LibraryService {
    static async selectLibraries(uid: string, queryString: string = '') {
        const url = `/server/console/accounts/${uid}/libraries?${queryString}`
        const response = await fetch(url)
        return response
    }
}
