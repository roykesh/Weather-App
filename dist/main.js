const renderer = new Renderer()
const tempMan = new TempManager(renderer)

const loadPage = async () => {
    await tempMan.getDataFromDB()
    renderer.renderData(tempMan.cityData)
}

const handleSearch = async (cityInput) => {
    await tempMan.getCityData(cityInput)
    renderer.renderData(tempMan.cityData)
}

$('#weather-button').on('click', function () {
    let cityInput = $('#city-input').val()
    handleSearch(cityInput)
})

$('body').on('click', '.save-city', function () {
    let cityName = $(this).closest('.city').data()
    console.log(cityName)
    tempMan.saveCity(cityName.name)
    renderer.renderData(tempMan.cityData)
})

$('body').on('click', '#remove-city', function () {
    let cityName = $(this).closest('.city').data()
    tempMan.removeCity(cityName.name)
    renderer.renderData(allCityData)
})

loadPage()