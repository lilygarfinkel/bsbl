var data =  d3.json("https://raw.githubusercontent.com/iamspruce/intro-d3/main/nigeria-states.json")
console.log(data)
var colors = ['Red','Blue','Green', 'Orange', 'Yellow', 'Purple', 'Pink', 'White', 'Black', 'Brown', 'Grey', 'Beige']  // add as many colors as there will be areas (maximum)

myJSONData.forEach(function (e) {
    // create labels
    var labelIndex = data.labels.indexOf(e.sign)
    if (labelIndex === -1) {
        labelIndex = data.labels.length;
        data.labels.push(e.sign);
        // dummy entries for each dataset for the label
        data.datasets.forEach(function (dataset) {
            dataset.data.push(0)
        })
    }

    // get the area dataset
    var area = data.datasets.filter(function(area){
        return (area.label === e.Area);
    })[0]
    // otherwise create it
    if (area === undefined) {
        area = {
            label: e.Area,
            // create a dummy array with an entry for each of the existing labels
            data: data.labels.map(function () {
                return 0;
            }),
            fillColor: colors[data.datasets.length]
        };
        data.datasets.push(area)
    }

    // set the value
    area.data[labelIndex] = e.Value;
})