import { makeAutoObservable, runInAction } from 'mobx'

class HistoryStore {
    constructor() {
        makeAutoObservable(this)
    }

    currDefaultCity = '杭州'

    
}

export default new HistoryStore()