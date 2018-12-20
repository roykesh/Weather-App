class Renderer {

    renderData(allCityData) {
        $('#city-container').empty()
        let source = $('#city-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({
            allCityData
        });
        $('#city-container').append(newHTML);
    }
}