/**
 * 获取从昨天起的num个日期,降序
 * @param {*} num 
 */
export const getHistoryDate = (num) => {
    const res = []
    const indexDate = new Date()
    indexDate.setDate(indexDate.getDate() - 1)
    for(let i = 0; i < num; i ++) {
        const tmpDate = '' + indexDate.getFullYear() + (indexDate.getMonth() + 1) + indexDate.getDate()
        res.push(tmpDate)
        indexDate.setDate(indexDate.getDate() - 1)
    }
    return res
}