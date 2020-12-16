import { makeAutoObservable, runInAction } from 'mobx'

class CityStore {
    constructor() {
        makeAutoObservable(this)
    }

    currDefaultCity = '杭州'

    
}

export default new CityStore()