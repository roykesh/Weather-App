class TempManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        let data = await $.get('/cities')
        this.cityData = data

    }

    async getCityData(cityName) {
        let data = await $.get(`/city/${cityName}`)
        this.cityData.push({
            name: data.location.name,
            updatedAt: data.current.last_updated,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            conditionPic: data.current.condition.icon,
        })
    }

    saveCity(cityName) {
        let cityToSave = this.cityData.find(c => c.name === cityName)
        $.post(`/city`, cityToSave, function () {})
    }

    async removeCity(cityName) {
        const unsavedCity = await $.ajax({
            url: `/city/${cityName}`,
            method: "delete",
            success: function (res) {
                return res
            }
        })
        this.cityData = this.cityData.filter(c => c.name !== unsavedCity.name)
        this.cityData.push(unsavedCity)
    }
    // async removeCity(cityName) {
    //     await $.ajax({
    //         url: `/city/${cityName}`,
    //         method: "DELETE",
    //         success: function () {}
    //     })
    //     this.renderer.renderData(this.cityData)
    // }
}