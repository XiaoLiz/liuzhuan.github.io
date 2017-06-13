var nameEl = document.querySelector('#name');
var outputEl = document.querySelector('#output');

var first = [];
var second = [];

/** 默认选项 */
var selectedIndex = [0, 0];

first = createProvinceList(provinces);

var pid = first[selectedIndex[0]].value;
second = createCityList(source, pid);

function createProvinceList(obj) {
    var rawdatas = obj['CN'];
    var list = [];
    for (var key in rawdatas) {
        list.push({
            text: rawdatas[key],
            value: key
        });
    }
    return list;
}

function createCityList(obj, pid) {
    var rawdatas = obj[pid];
    var list = [];
    for (var key in rawdatas) {
        list.push({
            text: rawdatas[key].name,
            value: key
        })
    }
    return list;
}

var picker = new Picker({
    data: [first, second],
    selectedIndex: selectedIndex,
    title: '请选择所在地区'
});

picker.on('picker.select', function(selectedVal, selectedIndex){
    var province = first[selectedIndex[0]];
    var city = second[selectedIndex[1]];
    
    var provinceName = province.text;
    var cityName = city.text;

    var provinceID = province.value;
    var cityID = city.value;

    nameEl.innerHTML = provinceName + ' ' + cityName;
    outputEl.innerHTML = provinceID + ' ' + cityID;
});

picker.on('picker.change', function(index, selectedIndex) {
    if (index == 0) {
        var pid = first[selectedIndex].value;
        second = createCityList(source, pid);

        picker.refillColumn(1, second);
        picker.scrollColumn(1, 0);
    }
});

picker.on('picker.valuechange', function(selectedVal, selectedIndex) {

});

nameEl.onclick = function() {
    picker.show();
}