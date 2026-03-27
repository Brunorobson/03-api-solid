export class MaxNumberOfCheckInsError extends Error {
    constructor(){
        super('Max number of chack-ins reached')
    }
}