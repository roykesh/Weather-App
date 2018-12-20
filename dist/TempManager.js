class TempManager {
    constructor(renderer) {
        this.renderer = renderer,
            this.cityData = []
    }

    async getDataFromDB() {
        let data = await $.get('/cities')
        data ? this.cityData = data : null
        console.log(data)
    }

    async getCityData(cityName) {
        let data = await $.get(`/city/${cityName}`)
        this.cityData.push({
            name: data.location.name,
            updatedAt: data.current.last_updated,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            conditionPic: data.current.condition.icon
        })
        console.log(this.cityData)
    }

    saveCity(cityName) {
        console.log(cityName)
        let cityToSave = this.cityData.find(c => c.name === cityName)
        $.post(`/city`, cityToSave, function () {})
    }

    removeCity(cityName) {
        $.ajax({
            url: `/city/${cityName}`,
            method: "DELETE",
            success: function () {}
        })
    }
}