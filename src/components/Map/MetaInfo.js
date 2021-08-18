
import centroid from '@turf/centroid';
import bbox from '@turf/bbox';
class MetaInfo {
    constructor() {
        ///属性
        this.attributes = [];

        this.tempAttributes = {}
    }

    getAttribute(name) {

        if (this.tempAttributes[name]) {
            return this.tempAttributes[name]
        }
        if (this.attributes) {
            let result = this.attributes.filter(data => data.field.name === name)
            if (result.length > 0) {
                this.tempAttributes[name] = result[0]
                return result[0];
            }
        }
        return {}
    }
    /**
     * 获取中心经纬度
     */
    getCenterLatLng() {

        if (this.center) {
            return this.center
        }
        let geometry = JSON.parse(this.obj.geometry)
        this.center = centroid(geometry);
        return this.center

    }
    getBBox() {
        if (this.box) {
            return this.box
        }
        try {
            if (this.obj.geometry) {
                let geometry = JSON.parse(this.obj.geometry)
                this.box = bbox(geometry);
                return this.box
            }

        } catch (err) {         

        }
        return null

    }

    getGeoJson() {
        if (this.geojson) {
            return this.geojson
        }
        this.geojson = {
            "type": "Feature",
            "properties": {
                "name": this.name,
                "id": this.id,
                "acquireTime": this.obj.acquireTime,
                "imgType": this.obj.imgType,
            },
            "geometry": JSON.parse(this.obj.geometry)
        };
        return this.geojson
    }

}

export default MetaInfo;