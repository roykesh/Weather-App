const renderer = new Renderer()
const tempMan = new TempManager()

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

$('body').on('click', '.save', function () {
    let cityName = $(this).closest('.city').data()
    tempMan.saveCity(cityName.name)
    renderer.renderData(tempMan.cityData)
    console.log(`saving ${cityName.name}`)
})

$('body').on('click', '.remove', function () {
    let cityName = $(this).closest('.city').data()
    tempMan.removeCity(cityName.name)
    console.log(`removing ${cityName.name}`)
})

// Enter to search
$("#city-input").keypress(function (e) {
    const key = e.which;
    if (key == 13) {
        $("#weather-button").trigger("click")
    }
});

loadPage()